import { NETWORK_CONFIG, type NetworkType } from "./config";

// --- Rate Limiting & Caching ---

const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 10_000; // 10 seconds

let lastRequestTime = 0;
const MIN_INTERVAL = 500; // 500ms between requests

async function rateLimitedFetch(url: string, options?: RequestInit): Promise<Response> {
  const now = Date.now();
  const wait = Math.max(0, MIN_INTERVAL - (now - lastRequestTime));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequestTime = Date.now();

  // Exponential backoff retry for 429
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(url, options);
    if (res.status !== 429) return res;
    const delay = 1000 * Math.pow(2, attempt);
    console.warn(`Rate limited (429), retrying in ${delay}ms...`);
    await new Promise((r) => setTimeout(r, delay));
  }
  return fetch(url, options); // final attempt
}

async function cachedFetch<T>(cacheKey: string, fetcher: () => Promise<T>): Promise<T> {
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }
  const data = await fetcher();
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}

// --- Clarity Value Parsers ---

export function parseClarityUint(val: { value: string } | string | number): number {
  if (typeof val === "number") return val;
  if (typeof val === "string") return parseInt(val, 10);
  return parseInt(val.value, 10);
}

export function parseClarityBool(val: { value: boolean } | boolean): boolean {
  if (typeof val === "boolean") return val;
  return val.value;
}

// --- Read-Only Contract Calls ---

interface ReadOnlyResponse {
  okay: boolean;
  result?: string;
  cause?: string;
}

export async function callReadOnly(
  contractId: string,
  functionName: string,
  args: string[] = [],
  network: NetworkType = "testnet"
): Promise<ReadOnlyResponse> {
  const [address, name] = contractId.split(".");
  const baseUrl = NETWORK_CONFIG[network].url;
  const url = `${baseUrl}/v2/contracts/call-read/${address}/${name}/${functionName}`;
  const cacheKey = `${url}:${JSON.stringify(args)}`;

  return cachedFetch(cacheKey, async () => {
    const res = await rateLimitedFetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: address,
        arguments: args,
      }),
    });

    if (!res.ok) {
      throw new Error(`Contract call failed: ${res.status} ${res.statusText}`);
    }

    return res.json();
  });
}

// --- Transaction History ---

export interface RawTransaction {
  tx_id: string;
  tx_status: string;
  tx_type: string;
  burn_block_time_iso: string;
  contract_call?: {
    contract_id: string;
    function_name: string;
    function_args?: Array<{ repr: string }>;
  };
}

export async function fetchAddressTransactions(
  address: string,
  network: NetworkType = "testnet",
  limit = 50
): Promise<RawTransaction[]> {
  const baseUrl = NETWORK_CONFIG[network].url;
  const url = `${baseUrl}/extended/v1/address/${address}/transactions?limit=${limit}`;
  const cacheKey = `txs:${address}:${limit}`;

  return cachedFetch(cacheKey, async () => {
    const res = await rateLimitedFetch(url);
    if (!res.ok) throw new Error(`Failed to fetch transactions: ${res.status}`);
    const data = await res.json();
    return data.results || [];
  });
}
