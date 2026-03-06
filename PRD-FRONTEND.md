# BitHarvest Frontend - Product Requirements Document

## Executive Summary

BitHarvest is a premium sBTC lending vault protocol on Stacks blockchain. This PRD defines the frontend implementation for an enterprise-grade, production-ready DeFi application that prioritizes trust, clarity, and seamless user experience.

**Contract Address:** `ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.bitharvest-vault`
**Network:** Stacks Testnet (initial), Mainnet (production)
**sBTC Token:** `ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token`

---

## 1. Design Philosophy

### 1.1 Core Principles

| Principle | Description |
|-----------|-------------|
| **Trust Through Transparency** | Every number, rate, and action is clearly explained |
| **Calm Confidence** | Muted, sophisticated palette that reduces anxiety around financial decisions |
| **Progressive Disclosure** | Simple by default, detailed on demand |
| **Micro-Interactions** | Subtle animations that confirm actions and guide attention |
| **Data-Dense, Not Cluttered** | Professional traders need information; casual users need clarity |

### 1.2 Brand Personality

- **Professional** — Not playful or gamified
- **Trustworthy** — Banking-grade seriousness
- **Modern** — Clean, contemporary, forward-thinking
- **Bitcoin-Native** — Orange accents nodding to Bitcoin heritage

---

## 2. Design System

### 2.1 Color Palette

```css
/* Primary - Deep Trust */
--color-primary-900: #0D1117;      /* Background */
--color-primary-800: #161B22;      /* Card background */
--color-primary-700: #21262D;      /* Elevated surfaces */
--color-primary-600: #30363D;      /* Borders, dividers */
--color-primary-500: #484F58;      /* Muted text */
--color-primary-400: #6E7681;      /* Secondary text */
--color-primary-300: #8B949E;      /* Tertiary text */
--color-primary-200: #C9D1D9;      /* Body text */
--color-primary-100: #F0F6FC;      /* Headings, emphasis */

/* Accent - Bitcoin Orange */
--color-accent-500: #F7931A;       /* Primary accent */
--color-accent-400: #FFAB40;       /* Hover states */
--color-accent-300: #FFD180;       /* Highlights */
--color-accent-600: #E5850F;       /* Pressed states */
--color-accent-glow: rgba(247, 147, 26, 0.15); /* Glow effects */

/* Semantic - Status Colors */
--color-success-500: #238636;      /* Positive actions */
--color-success-400: #2EA043;      /* Success hover */
--color-success-bg: rgba(35, 134, 54, 0.15);

--color-warning-500: #D29922;      /* Warnings */
--color-warning-400: #E3B341;      /* Warning hover */
--color-warning-bg: rgba(210, 153, 34, 0.15);

--color-danger-500: #DA3633;       /* Errors, destructive */
--color-danger-400: #F85149;       /* Danger hover */
--color-danger-bg: rgba(218, 54, 51, 0.15);

--color-info-500: #58A6FF;         /* Informational */
--color-info-bg: rgba(88, 166, 255, 0.15);

/* Gradients */
--gradient-hero: linear-gradient(135deg, #161B22 0%, #0D1117 100%);
--gradient-card: linear-gradient(180deg, #21262D 0%, #161B22 100%);
--gradient-accent: linear-gradient(135deg, #F7931A 0%, #FFAB40 100%);
--gradient-glow: radial-gradient(ellipse at center, rgba(247, 147, 26, 0.2) 0%, transparent 70%);
```

### 2.2 Typography

```css
/* Font Stack */
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

/* Scale - Using Perfect Fourth (1.333) */
--text-xs: 0.75rem;      /* 12px - Labels, captions */
--text-sm: 0.875rem;     /* 14px - Secondary text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Lead text */
--text-xl: 1.5rem;       /* 24px - Section headers */
--text-2xl: 2rem;        /* 32px - Page titles */
--text-3xl: 2.5rem;      /* 40px - Hero text */
--text-4xl: 3rem;        /* 48px - Display text */

/* Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Letter Spacing */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.02em;
--tracking-wider: 0.05em;
```

### 2.3 Spacing System

```css
/* 8px base unit */
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### 2.4 Border Radius

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### 2.5 Shadows & Elevation

```css
/* Elevation System */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);

/* Glow Effects */
--glow-accent: 0 0 20px rgba(247, 147, 26, 0.3);
--glow-success: 0 0 20px rgba(35, 134, 54, 0.3);
--glow-danger: 0 0 20px rgba(218, 54, 51, 0.3);

/* Card Shadow */
--shadow-card: 0 0 0 1px var(--color-primary-600), var(--shadow-lg);
--shadow-card-hover: 0 0 0 1px var(--color-accent-500), var(--shadow-xl), var(--glow-accent);
```

### 2.6 Animation Tokens

```css
/* Durations */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 400ms;
--duration-slower: 600ms;

/* Easings */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

/* Common Transitions */
--transition-colors: color var(--duration-fast) var(--ease-in-out), 
                     background-color var(--duration-fast) var(--ease-in-out),
                     border-color var(--duration-fast) var(--ease-in-out);
--transition-transform: transform var(--duration-normal) var(--ease-out);
--transition-shadow: box-shadow var(--duration-normal) var(--ease-out);
--transition-all: all var(--duration-normal) var(--ease-in-out);
```

---

## 3. Component Library

### 3.1 Buttons

#### Primary Button
```
- Background: var(--gradient-accent)
- Text: #000000 (black for contrast)
- Border-radius: var(--radius-lg)
- Padding: 12px 24px
- Font-weight: 600
- Min-width: 140px
- Height: 48px
- Hover: brightness(1.1), scale(1.02), glow
- Active: brightness(0.95), scale(0.98)
- Disabled: opacity 0.5, cursor not-allowed
- Loading: spinner replacing text
```

#### Secondary Button
```
- Background: transparent
- Border: 1px solid var(--color-primary-500)
- Text: var(--color-primary-200)
- Hover: border-color accent, text accent
- Active: background var(--color-primary-700)
```

#### Ghost Button
```
- Background: transparent
- Text: var(--color-primary-300)
- Hover: background var(--color-primary-700)
- Used for: Cancel, Back, tertiary actions
```

#### Danger Button
```
- Background: var(--color-danger-500)
- Used for: Withdraw all, Liquidate
- Requires confirmation modal
```

### 3.2 Input Fields

#### Text/Number Input
```
Structure:
┌─────────────────────────────────────────┐
│ Label                          Optional │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ [Icon] Placeholder           [Unit] │ │
│ └─────────────────────────────────────┘ │
│ Helper text or error message            │
└─────────────────────────────────────────┘

States:
- Default: border var(--color-primary-600)
- Focus: border var(--color-accent-500), glow
- Error: border var(--color-danger-500), red glow
- Disabled: background var(--color-primary-800), opacity 0.6
```

#### Amount Input (Special)
```
┌─────────────────────────────────────────┐
│ Deposit Amount                          │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ ₿ 0.00000000                  sBTC  │ │
│ └─────────────────────────────────────┘ │
│ ≈ $0.00 USD          Balance: 1.5 sBTC  │
│                                         │
│ [25%] [50%] [75%] [MAX]                 │
└─────────────────────────────────────────┘

Features:
- Real-time USD conversion
- Quick percentage buttons
- MAX button with safety check
- Balance display
- Input validation (8 decimal places max)
```

### 3.3 Cards

#### Stat Card
```
┌─────────────────────────────────────────┐
│  📊                                     │
│                                         │
│  Total Value Locked                     │
│  ₿ 125.45678901                        │
│  ≈ $5,234,567.89                       │
│                                    ↑12% │
└─────────────────────────────────────────┘

- Subtle gradient background
- Icon top-left
- Label (muted)
- Primary value (large, white)
- Secondary value (small, muted)
- Change indicator bottom-right
```

#### Position Card
```
┌─────────────────────────────────────────┐
│  Your Supply Position              ⓘ   │
├─────────────────────────────────────────┤
│                                         │
│  ₿ 1.25000000                          │
│  ≈ $52,345.67                          │
│                                         │
│  ┌─────────────────┐ ┌────────────────┐ │
│  │ APY             │ │ Earned         │ │
│  │ 3.00%           │ │ ₿ 0.00125000   │ │
│  └─────────────────┘ └────────────────┘ │
│                                         │
│  [ Deposit More ]     [ Withdraw ]      │
└─────────────────────────────────────────┘
```

#### Borrow Position Card
```
┌─────────────────────────────────────────┐
│  Your Borrow Position              ⓘ   │
├─────────────────────────────────────────┤
│                                         │
│  Borrowed: ₿ 0.50000000                │
│  Interest Owed: ₿ 0.00125000           │
│                                         │
│  ┌─────────────────────────────────────┐│
│  │ Health Factor                       ││
│  │ ████████████████░░░░  156%  SAFE   ││
│  └─────────────────────────────────────┘│
│                                         │
│  Liquidation at < 120%                  │
│                                         │
│  [ Borrow More ]       [ Repay ]        │
└─────────────────────────────────────────┘

Health Factor Colors:
- > 150%: Green (Safe)
- 120-150%: Yellow (Caution)
- < 120%: Red (Danger - Liquidatable)
```

### 3.4 Health Factor Visualization

```
Premium Gauge Component:

        ╭───────────────────╮
       ╱                     ╲
      │   ┌─────────────┐    │
      │   │    156%     │    │
      │   │    SAFE     │    │
      │   └─────────────┘    │
      │ 🔴    🟡    🟢       │
       ╲    ▲              ╱
        ╰───────────────────╯
             Pointer

- Animated needle pointer
- Gradient arc (red → yellow → green)
- Large percentage display
- Status label (DANGER / CAUTION / SAFE)
- Pulsing glow when in danger zone
```

### 3.5 Transaction Flow Modal

```
┌─────────────────────────────────────────────┐
│                                        ✕    │
│              Deposit sBTC                   │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ ₿ 0.10000000                  sBTC  │    │
│  └─────────────────────────────────────┘    │
│  Balance: 1.50000000 sBTC                   │
│                                             │
│  [25%] [50%] [75%] [MAX]                    │
│                                             │
├─────────────────────────────────────────────┤
│  Transaction Summary                        │
│  ───────────────────────────────────────    │
│  You deposit           ₿ 0.10000000         │
│  You receive           100,000,000 shares   │
│  New balance           ₿ 1.35000000         │
│  Estimated APY         3.00%                │
│  Network fee           ~0.001 STX           │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│      [ Cancel ]        [ Confirm Deposit ]  │
│                                             │
└─────────────────────────────────────────────┘

States:
1. Input (shown above)
2. Confirming (wallet popup)
3. Broadcasting (spinner)
4. Success (checkmark + tx link)
5. Error (retry option)
```

### 3.6 Toast Notifications

```
Success Toast:
┌─────────────────────────────────────────┐
│ ✓  Deposit successful!                  │
│    ₿ 0.10000000 deposited               │
│    View transaction →                   │
└─────────────────────────────────────────┘

Error Toast:
┌─────────────────────────────────────────┐
│ ✕  Transaction failed                   │
│    Insufficient sBTC balance            │
│    [ Dismiss ]                          │
└─────────────────────────────────────────┘

Position: Bottom-right
Auto-dismiss: 5 seconds (success), manual (error)
Animation: Slide in from right, fade out
```

---

## 4. Page Layouts

### 4.1 Navigation Header

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ◆ BitHarvest         Dashboard   Vault   Docs      [ Connect Wallet ] │
└─────────────────────────────────────────────────────────────────────────┘

- Sticky on scroll
- Backdrop blur effect
- Logo: Orange diamond + "BitHarvest" wordmark
- Nav links: Dashboard, Vault, Documentation
- Wallet button: 
  - Disconnected: "Connect Wallet" (primary button style)
  - Connected: Address truncated + avatar + dropdown
```

### 4.2 Hero Section

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│                    ◆                                                    │
│                                                                         │
│              Earn Yield on Your sBTC                                    │
│                                                                         │
│        The premier lending vault for Bitcoin on Stacks.                 │
│        Deposit sBTC, earn interest, borrow against collateral.          │
│                                                                         │
│                    [ Launch App ]                                       │
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                  │
│  │ Total Value  │  │ Supply APY   │  │ Borrow APY   │                  │
│  │ ₿ 1,234.56   │  │ 3.00%        │  │ 5.00%        │                  │
│  └──────────────┘  └──────────────┘  └──────────────┘                  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

Background: 
- Dark gradient with subtle grid pattern
- Floating orange glow orb behind logo
- Subtle particle animation (optional)
```

### 4.3 Dashboard Layout (Connected)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Header                                             [ST33...79PZ ▼]    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Welcome back                                                           │
│  ST33S3T4B78...9PZ7M0KN                                                │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     Protocol Overview                            │   │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐│   │
│  │  │ Total TVL   │ │ Your Supply │ │ Your Borrow │ │ Net APY     ││   │
│  │  │ ₿ 1,234.56  │ │ ₿ 1.250000  │ │ ₿ 0.500000  │ │ +2.12%      ││   │
│  │  │ $51.2M      │ │ $52,345     │ │ $20,938     │ │             ││   │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘│   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────┐ ┌──────────────────────────────┐     │
│  │     Your Supply Position     │ │     Your Borrow Position     │     │
│  │                              │ │                              │     │
│  │     ₿ 1.25000000             │ │     ₿ 0.50000000             │     │
│  │     ≈ $52,345.67             │ │     Interest: ₿ 0.00125      │     │
│  │                              │ │                              │     │
│  │  APY: 3.00%  Earned: ₿0.001  │ │  Health: ████████░░ 156%     │     │
│  │                              │ │                              │     │
│  │  [Deposit]      [Withdraw]   │ │  [Borrow]        [Repay]     │     │
│  └──────────────────────────────┘ └──────────────────────────────┘     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     Recent Transactions                          │   │
│  │  ───────────────────────────────────────────────────────────────│   │
│  │  ↓ Deposit    ₿ 0.50000000    2 hours ago    Confirmed  [View]  │   │
│  │  ↑ Borrow     ₿ 0.25000000    1 day ago      Confirmed  [View]  │   │
│  │  ↓ Deposit    ₿ 1.00000000    3 days ago     Confirmed  [View]  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Vault Detail Page

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Header                                                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ← Back to Dashboard                                                    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ₿ sBTC Vault                                                    │   │
│  │  ─────────────────────────────────────────────────────────────  │   │
│  │                                                                  │   │
│  │  ┌───────────────────────────┐  ┌───────────────────────────┐   │   │
│  │  │ Total Supplied            │  │ Total Borrowed            │   │   │
│  │  │ ₿ 1,234.56789012          │  │ ₿ 456.78901234            │   │   │
│  │  │ $51,234,567.89            │  │ $19,123,456.78            │   │   │
│  │  └───────────────────────────┘  └───────────────────────────┘   │   │
│  │                                                                  │   │
│  │  ┌───────────────────────────┐  ┌───────────────────────────┐   │   │
│  │  │ Utilization Rate          │  │ Available Liquidity       │   │   │
│  │  │ ████████░░░░░░░░ 37%      │  │ ₿ 777.77887778            │   │   │
│  │  └───────────────────────────┘  └───────────────────────────┘   │   │
│  │                                                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌──────────────────────────────┐ ┌──────────────────────────────┐     │
│  │         SUPPLY               │ │         BORROW               │     │
│  │  ─────────────────────────── │ │  ─────────────────────────── │     │
│  │                              │ │                              │     │
│  │  Supply APY                  │ │  Borrow APY                  │     │
│  │  ┌────────────────────────┐  │ │  ┌────────────────────────┐  │     │
│  │  │        3.00%           │  │ │  │        5.00%           │  │     │
│  │  └────────────────────────┘  │ │  └────────────────────────┘  │     │
│  │                              │ │                              │     │
│  │  Collateral Ratio: 150%      │ │  Liquidation: 120%           │     │
│  │                              │ │                              │     │
│  │  ┌────────────────────────┐  │ │  ┌────────────────────────┐  │     │
│  │  │ Amount to Supply       │  │ │  │ Amount to Borrow       │  │     │
│  │  │ ₿ 0.00000000      sBTC │  │ │  │ ₿ 0.00000000      sBTC │  │     │
│  │  └────────────────────────┘  │ │  └────────────────────────┘  │     │
│  │  [25%] [50%] [75%] [MAX]     │ │  Max: ₿ 0.83333333           │     │
│  │                              │ │                              │     │
│  │  [ Supply sBTC ]             │ │  [ Borrow sBTC ]             │     │
│  └──────────────────────────────┘ └──────────────────────────────┘     │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  Protocol Parameters                                             │   │
│  │  ─────────────────────────────────────────────────────────────  │   │
│  │  Supply APY        3.00%         Borrow APY        5.00%        │   │
│  │  Collateral Ratio  150%          Liquidation       120%         │   │
│  │  Protocol Fee      10%           Blocks/Year       52,560       │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. User Flows

### 5.1 Wallet Connection Flow

```
1. User clicks "Connect Wallet"
2. Modal appears with wallet options:
   ┌─────────────────────────────────────┐
   │     Connect Your Wallet             │
   │  ─────────────────────────────────  │
   │                                     │
   │  ┌─────────────────────────────┐    │
   │  │ 🦊 Leather Wallet           │    │
   │  │    Recommended              │    │
   │  └─────────────────────────────┘    │
   │                                     │
   │  ┌─────────────────────────────┐    │
   │  │ 🔷 Xverse Wallet            │    │
   │  └─────────────────────────────┘    │
   │                                     │
   │  By connecting, you agree to our    │
   │  Terms of Service                   │
   └─────────────────────────────────────┘

3. Wallet popup requests connection
4. User approves
5. Address appears in header
6. Dashboard loads user positions
```

### 5.2 Deposit Flow

```
States:

1. IDLE
   - Amount input empty
   - "Supply sBTC" button disabled
   - Balance shown

2. INPUT
   - User enters amount
   - Real-time validation
   - USD conversion updates
   - Button enables if valid

3. REVIEW
   - User clicks "Supply sBTC"
   - Transaction summary modal opens
   - Shows: amount, shares, new balance, fee

4. CONFIRM
   - User clicks "Confirm Deposit"
   - Wallet popup appears
   - UI shows "Waiting for wallet..."

5. BROADCASTING
   - User signed transaction
   - Spinner with "Broadcasting..."
   - Estimated confirmation time

6. SUCCESS
   - Checkmark animation
   - "Deposit successful!"
   - Transaction hash link
   - Updated balance
   - Auto-dismiss after 5s

7. ERROR
   - Error message
   - "Try Again" button
   - "Contact Support" link
```

### 5.3 Borrow Flow

```
Pre-conditions:
- User must have supply position (collateral)
- Health factor must remain > 150% after borrow

Flow:
1. Show max borrowable amount
2. Real-time health factor preview
3. Warning if health factor < 180%
4. Block if health factor would drop < 150%
5. Clear liquidation risk explanation
```

### 5.4 Repay Flow

```
Special considerations:
- Show principal + accrued interest
- "Repay All" option (may need extra for interest accrual during tx)
- Update health factor preview
- Show collateral unlocked after repayment
```

### 5.5 Withdraw Flow

```
Pre-conditions:
- Must have supply position
- If has borrow, health factor must stay > 150%

Validation:
- Cannot withdraw if it would make loan liquidatable
- Show warning for partial withdrawals with active loan
```

---

## 6. Empty States

### 6.1 No Wallet Connected

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                           🔒                                    │
│                                                                 │
│                   Connect Your Wallet                           │
│                                                                 │
│         Connect a Stacks wallet to view your positions          │
│         and interact with the BitHarvest vault.                 │
│                                                                 │
│                   [ Connect Wallet ]                            │
│                                                                 │
│         Don't have a wallet? Get Leather →                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 No Positions

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                           📊                                    │
│                                                                 │
│                   No Positions Yet                              │
│                                                                 │
│         You haven't supplied any sBTC to the vault yet.         │
│         Start earning yield on your Bitcoin today.              │
│                                                                 │
│                   [ Make First Deposit ]                        │
│                                                                 │
│         Current Supply APY: 3.00%                               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 No sBTC Balance

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                           ₿                                     │
│                                                                 │
│                   No sBTC in Wallet                             │
│                                                                 │
│         You need sBTC to deposit into the vault.                │
│                                                                 │
│         For testnet, get free sBTC from:                        │
│         https://platform.hiro.so (Faucet tab)                   │
│                                                                 │
│                   [ Get Testnet sBTC ]                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Loading States

### 7.1 Skeleton Loading

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │   │
│  │  ░░░░░░░░░░░░░░░░░░░░                                   │   │
│  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Animation: Shimmer effect (left to right gradient)
Color: var(--color-primary-700) base, var(--color-primary-600) shimmer
```

### 7.2 Transaction Pending

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          ⟳                                      │
│                    (animated spinner)                           │
│                                                                 │
│              Broadcasting Transaction...                        │
│                                                                 │
│              This may take 10-30 seconds.                       │
│              Do not close this window.                          │
│                                                                 │
│              ░░░░░░░░░░░░░░░░▓▓▓▓░░░░░░░░░░░░░░░░              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Error States

### 8.1 Network Error

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          ⚠️                                     │
│                                                                 │
│              Unable to Connect to Network                       │
│                                                                 │
│         We couldn't connect to the Stacks testnet.              │
│         Please check your internet connection.                  │
│                                                                 │
│                     [ Try Again ]                               │
│                                                                 │
│         Status: api.testnet.hiro.so - Unreachable               │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 8.2 Transaction Failed

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                          ❌                                     │
│                                                                 │
│              Transaction Failed                                 │
│                                                                 │
│         Error: Insufficient sBTC balance                        │
│         Code: ERR_INSUFFICIENT_BALANCE (102)                    │
│                                                                 │
│         Your wallet doesn't have enough sBTC for this           │
│         transaction. Please check your balance.                 │
│                                                                 │
│         [ Try Again ]    [ View Details ]                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Error Code Mapping:
100: "You don't have permission for this action"
101: "The vault is currently paused"
102: "Not enough sBTC in your wallet"
103: "This would exceed your borrow limit"
104: "You don't have an active loan"
105: "This position cannot be liquidated"
106: "Amount must be greater than zero"
107: "Token transfer failed - please try again"
```

---

## 9. Responsive Design

### 9.1 Breakpoints

```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet portrait */
--breakpoint-lg: 1024px;  /* Tablet landscape / Small desktop */
--breakpoint-xl: 1280px;  /* Desktop */
--breakpoint-2xl: 1536px; /* Large desktop */
```

### 9.2 Mobile Layout (< 768px)

```
┌─────────────────────┐
│ ◆ BitHarvest    ☰   │
├─────────────────────┤
│                     │
│  Protocol Stats     │
│  ┌───────────────┐  │
│  │ TVL: ₿1234.56 │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ APY: 3.00%    │  │
│  └───────────────┘  │
│                     │
│  Your Position      │
│  ┌───────────────┐  │
│  │ ₿ 1.25000000  │  │
│  │ [Deposit]     │  │
│  │ [Withdraw]    │  │
│  └───────────────┘  │
│                     │
│  ┌───────────────┐  │
│  │ Borrow        │  │
│  │ ₿ 0.50000000  │  │
│  │ Health: 156%  │  │
│  │ [Borrow]      │  │
│  │ [Repay]       │  │
│  └───────────────┘  │
│                     │
└─────────────────────┘

Mobile-specific:
- Hamburger menu
- Single column layout
- Sticky CTA at bottom
- Full-width cards
- Larger touch targets (48px min)
```

### 9.3 Tablet Layout (768px - 1024px)

```
┌─────────────────────────────────────┐
│ ◆ BitHarvest     Dashboard   [ ★ ] │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ TVL         │ │ Your Supply │   │
│  │ ₿ 1,234.56  │ │ ₿ 1.250000  │   │
│  └─────────────┘ └─────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Your Supply Position        │   │
│  │                             │   │
│  │ [Deposit]      [Withdraw]   │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ Your Borrow Position        │   │
│  │                             │   │
│  │ [Borrow]        [Repay]     │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

---

## 10. Accessibility (WCAG 2.1 AA)

### 10.1 Requirements

| Requirement | Implementation |
|-------------|----------------|
| Color Contrast | All text meets 4.5:1 minimum |
| Focus Indicators | Visible focus ring on all interactive elements |
| Keyboard Navigation | Full tab navigation, Enter/Space for actions |
| Screen Readers | ARIA labels on all interactive elements |
| Motion | Respect `prefers-reduced-motion` |
| Text Scaling | Supports up to 200% zoom |

### 10.2 ARIA Labels

```html
<!-- Wallet Button -->
<button aria-label="Connect wallet">Connect Wallet</button>

<!-- Amount Input -->
<input 
  aria-label="Deposit amount in sBTC"
  aria-describedby="balance-hint"
/>
<span id="balance-hint">Your balance: 1.5 sBTC</span>

<!-- Health Factor -->
<div 
  role="meter" 
  aria-valuemin="0" 
  aria-valuemax="200" 
  aria-valuenow="156"
  aria-label="Health factor: 156%, status safe"
>

<!-- Transaction Status -->
<div role="status" aria-live="polite">
  Transaction submitted. Waiting for confirmation...
</div>
```

---

## 11. Motion Design

### 11.1 Micro-interactions

| Element | Interaction | Animation |
|---------|-------------|-----------|
| Button Hover | Scale + glow | 150ms ease-out, scale(1.02) |
| Card Hover | Border glow | 250ms ease-out |
| Number Change | Count up/down | 400ms ease-out, number animation |
| Success | Checkmark | 400ms spring, draw SVG path |
| Error | Shake | 300ms, translateX oscillate |
| Loading | Spin | 1000ms linear, infinite |
| Page Enter | Fade + slide up | 300ms ease-out |
| Modal Enter | Scale + fade | 200ms ease-out |
| Toast Enter | Slide from right | 300ms ease-spring |

### 11.2 Page Transitions

```css
/* Page enter animation */
@keyframes pageEnter {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: pageEnter 300ms var(--ease-out) forwards;
}

/* Stagger children */
.stagger-children > * {
  animation: pageEnter 300ms var(--ease-out) forwards;
}
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 50ms; }
.stagger-children > *:nth-child(3) { animation-delay: 100ms; }
.stagger-children > *:nth-child(4) { animation-delay: 150ms; }
```

---

## 12. Technical Specifications

### 12.1 Contract Integration

```typescript
// Contract Details
const CONTRACT_ADDRESS = "ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN";
const CONTRACT_NAME = "bitharvest-vault";
const SBTC_CONTRACT = "ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token";

// Read-Only Functions
interface VaultReadFunctions {
  'get-total-deposits': () => uint;
  'get-total-borrows': () => uint;
  'get-user-shares': (user: principal) => uint;
  'get-user-balance': (user: principal) => uint;
  'get-max-borrow': (user: principal) => uint;
  'get-borrow-position': (user: principal) => optional<BorrowPosition>;
  'calculate-accrued-interest': (user: principal) => uint;
  'get-estimated-yield': (user: principal) => uint;
  'get-utilization-rate': () => uint;
  'is-paused': () => boolean;
  'shares-to-sbtc': (shares: uint) => uint;
  'sbtc-to-shares': (amount: uint) => uint;
}

// Public Functions
interface VaultPublicFunctions {
  'deposit': (amount: uint, token: trait) => response<uint, uint>;
  'withdraw': (shares: uint, token: trait) => response<uint, uint>;
  'borrow': (amount: uint, token: trait) => response<boolean, uint>;
  'repay': (amount: uint, token: trait) => response<boolean, uint>;
  'liquidate': (borrower: principal, token: trait) => response<boolean, uint>;
}

// BorrowPosition type
interface BorrowPosition {
  amount: uint;
  'start-block': uint;
}
```

### 12.2 State Management

```typescript
interface AppState {
  // Wallet
  wallet: {
    connected: boolean;
    address: string | null;
    network: 'testnet' | 'mainnet';
    stxBalance: bigint;
    sbtcBalance: bigint;
  };
  
  // Vault
  vault: {
    totalDeposits: bigint;
    totalBorrows: bigint;
    utilizationRate: number;
    isPaused: boolean;
    supplyApy: number;
    borrowApy: number;
  };
  
  // User Position
  position: {
    shares: bigint;
    balance: bigint; // sBTC value of shares
    borrowAmount: bigint;
    interestOwed: bigint;
    healthFactor: number;
    maxBorrow: bigint;
    estimatedYield: bigint;
  };
  
  // UI State
  ui: {
    activeModal: 'deposit' | 'withdraw' | 'borrow' | 'repay' | null;
    pendingTx: string | null;
    txStatus: 'idle' | 'signing' | 'broadcasting' | 'confirming' | 'success' | 'error';
    error: string | null;
  };
}
```

### 12.3 API Rate Limiting

```typescript
// Hiro API limits: ~20 requests/minute for free tier
// Implement:
// 1. Request queue with 500ms minimum between calls
// 2. Retry with exponential backoff on 429
// 3. Cache responses for 10 seconds
// 4. Batch related queries where possible
```

---

## 13. Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| First Input Delay | < 100ms | Lighthouse |
| Bundle Size (gzipped) | < 200KB | Build output |

---

## 14. Security Considerations

### 14.1 Frontend Security

- [ ] Never store private keys
- [ ] Validate all user inputs
- [ ] Sanitize displayed data
- [ ] Use Content Security Policy headers
- [ ] Implement rate limiting on retries

### 14.2 Transaction Security

- [ ] Always use post-conditions
- [ ] Show transaction preview before signing
- [ ] Require confirmation for high-value transactions
- [ ] Display clear warnings for liquidation risk
- [ ] Timeout stale transaction states

---

## 15. Testing Requirements

### 15.1 Component Testing

- [ ] All components render correctly
- [ ] Form validation works
- [ ] Error states display properly
- [ ] Loading states appear
- [ ] Responsive layouts work

### 15.2 Integration Testing

- [ ] Wallet connection flow
- [ ] Transaction flows (deposit, withdraw, borrow, repay)
- [ ] Error handling
- [ ] Network switching

### 15.3 E2E Testing

- [ ] Complete user journey: connect → deposit → borrow → repay → withdraw
- [ ] Error recovery flows
- [ ] Mobile flows

---

## 16. Deliverables Checklist

### Phase 1: Foundation
- [ ] Design system tokens (CSS variables)
- [ ] Core components (Button, Input, Card, Modal)
- [ ] Layout components (Header, Footer, Page)
- [ ] Wallet connection flow

### Phase 2: Dashboard
- [ ] Hero section
- [ ] Protocol stats cards
- [ ] User position cards
- [ ] Transaction history

### Phase 3: Actions
- [ ] Deposit modal & flow
- [ ] Withdraw modal & flow
- [ ] Borrow modal & flow
- [ ] Repay modal & flow
- [ ] Transaction status tracking

### Phase 4: Polish
- [ ] Loading states
- [ ] Empty states
- [ ] Error handling
- [ ] Animations
- [ ] Responsive testing
- [ ] Accessibility audit

---

## 17. Assets Required

### 17.1 Logo Variations
- Logo mark (diamond icon) - SVG
- Wordmark - SVG
- Combined logo - SVG
- Favicon (16x16, 32x32, 180x180)

### 17.2 Icons (Lucide or Heroicons)
- Wallet
- Deposit (arrow down)
- Withdraw (arrow up)
- Borrow (arrow right)
- Repay (arrow left)
- Check (success)
- X (error/close)
- Info
- Warning
- Settings
- External link
- Copy
- Refresh

### 17.3 Illustrations (Optional)
- Empty state illustration
- Success celebration
- Error state

---

## 18. Copy/Microcopy Guidelines

### 18.1 Voice & Tone
- **Professional** — Not casual or playful
- **Clear** — No jargon without explanation
- **Reassuring** — Acknowledge financial anxiety
- **Concise** — Respect user's time

### 18.2 Button Labels
| Action | Label | NOT |
|--------|-------|-----|
| Deposit | "Supply sBTC" | "Deposit Now!" |
| Withdraw | "Withdraw" | "Get My Funds" |
| Borrow | "Borrow sBTC" | "Take a Loan" |
| Repay | "Repay Loan" | "Pay Back" |
| Connect | "Connect Wallet" | "Login" |

### 18.3 Error Messages
- Start with what happened
- Explain why (if helpful)
- Suggest what to do next
- Avoid technical jargon

Example:
```
✕ Transaction failed

Your wallet doesn't have enough sBTC for this deposit.

Current balance: 0.05 sBTC
Attempted deposit: 0.10 sBTC

[ Adjust Amount ]
```

---

## Appendix A: Figma-Ready Specs

### Color Tokens (Figma Variables)
```
Primary/900: #0D1117
Primary/800: #161B22
Primary/700: #21262D
Primary/600: #30363D
Primary/500: #484F58
Primary/400: #6E7681
Primary/300: #8B949E
Primary/200: #C9D1D9
Primary/100: #F0F6FC

Accent/600: #E5850F
Accent/500: #F7931A
Accent/400: #FFAB40
Accent/300: #FFD180

Success/500: #238636
Warning/500: #D29922
Danger/500: #DA3633
Info/500: #58A6FF
```

### Typography Styles
```
Display: Inter 48px / Bold / -0.02em
Heading 1: Inter 32px / Bold / -0.02em
Heading 2: Inter 24px / Semibold / -0.01em
Heading 3: Inter 18px / Semibold / 0
Body: Inter 16px / Regular / 0
Body Small: Inter 14px / Regular / 0
Caption: Inter 12px / Medium / 0.02em
Mono: JetBrains Mono 14px / Regular / 0
```

### Component Sizes
```
Button Large: H48px, PX24, R12
Button Medium: H40px, PX16, R8
Button Small: H32px, PX12, R6

Input Large: H48px, PX16, R12
Input Medium: H40px, PX12, R8

Card: P24, R16, Border 1px
Modal: P32, R24, MaxW 480px
```

---

*This PRD is ready for implementation in any modern React framework with Tailwind CSS.*

---

## Appendix B: Token Configuration

### B.1 Supported Tokens

The vault accepts **any SIP-010 compliant token**. Configure these in your environment:

```typescript
// config/tokens.ts
export const TOKENS = {
  testnet: {
    // Official testnet sBTC (get from Hiro faucet)
    sbtc: {
      address: "ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT",
      name: "sbtc-token",
      symbol: "sBTC",
      decimals: 8,
      faucetUrl: "https://platform.hiro.so",
    },
    // Mock sBTC (self-service faucet - backup option)
    mockSbtc: {
      address: "ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN",
      name: "mock-sbtc",
      symbol: "msBTC", 
      decimals: 8,
      hasFaucet: true, // Call contract's faucet function directly
    },
  },
  mainnet: {
    sbtc: {
      address: "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4",
      name: "sbtc-token",
      symbol: "sBTC",
      decimals: 8,
    },
  },
};

// Active token selection (user preference or default)
export type TokenOption = 'sbtc' | 'mockSbtc';
```

### B.2 Token Selector UI (Testnet Only)

```
┌─────────────────────────────────────────────────────────────────┐
│  Select Token                                              ✕    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ ₿  sBTC (Official)                              Selected  │  │
│  │    ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT              │  │
│  │    Get from Hiro Faucet →                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🧪 Mock sBTC (Testing)                                    │  │
│  │    ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN              │  │
│  │    [ Mint 10 msBTC ] ← Self-service faucet                │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ⓘ Both tokens work identically with the vault                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### B.3 Mock Token Faucet Integration

```typescript
// hooks/useMockFaucet.ts
import { useOpenContractCall } from '@stacks/connect-react';
import { uintCV } from '@stacks/transactions';

export function useMockFaucet() {
  const { openContractCall } = useOpenContractCall();
  
  const mintMockSbtc = async (amount: number = 1000000000) => { // 10 sBTC default
    await openContractCall({
      contractAddress: 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN',
      contractName: 'mock-sbtc',
      functionName: 'faucet',
      functionArgs: [uintCV(amount)],
      onFinish: (data) => {
        console.log('Minted mock sBTC:', data.txId);
      },
    });
  };
  
  return { mintMockSbtc };
}
```

---

## Appendix C: Network Configuration

### C.1 Multi-Network Support

```typescript
// config/networks.ts
export const NETWORKS = {
  testnet: {
    name: 'Stacks Testnet',
    chainId: 2147483648,
    apiUrl: 'https://api.testnet.hiro.so',
    explorerUrl: 'https://explorer.hiro.so/?chain=testnet',
    vaultContract: 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.bitharvest-vault',
  },
  mainnet: {
    name: 'Stacks Mainnet',
    chainId: 1,
    apiUrl: 'https://api.hiro.so',
    explorerUrl: 'https://explorer.hiro.so',
    vaultContract: 'SP_MAINNET_ADDRESS.bitharvest-vault', // Update after mainnet deploy
  },
};

export type NetworkKey = keyof typeof NETWORKS;
```

### C.2 Network Switcher Component

```
Header when on Testnet:
┌─────────────────────────────────────────────────────────────────┐
│  ◆ BitHarvest    [🔶 Testnet ▼]    Dashboard    [ ST33...M0KN ] │
└─────────────────────────────────────────────────────────────────┘

Dropdown:
┌─────────────────────┐
│ 🔶 Testnet     ✓    │
│ ─────────────────── │
│ 🟢 Mainnet          │
│                     │
│ ⚠️ Switching will   │
│ disconnect wallet   │
└─────────────────────┘
```

---

## Appendix D: Stacks Connect Integration

### D.1 Required Dependencies

```json
{
  "dependencies": {
    "@stacks/connect": "^7.0.0",
    "@stacks/connect-react": "^22.0.0",
    "@stacks/transactions": "^7.0.0",
    "@stacks/network": "^7.0.0",
    "@stacks/stacks-blockchain-api-types": "^7.0.0"
  }
}
```

### D.2 Wallet Provider Setup

```tsx
// providers/StacksProvider.tsx
import { Connect } from '@stacks/connect-react';

const appDetails = {
  name: 'BitHarvest',
  icon: 'https://bitharvest.app/logo.png',
};

export function StacksProvider({ children }: { children: React.ReactNode }) {
  return (
    <Connect
      authOptions={{
        appDetails,
        onFinish: () => window.location.reload(),
        userSession: userSession,
      }}
    >
      {children}
    </Connect>
  );
}
```

### D.3 Wallet Connection Hook

```typescript
// hooks/useWallet.ts
import { useConnect, useAuth } from '@stacks/connect-react';
import { userSession } from '../userSession';

export function useWallet() {
  const { doOpenAuth } = useConnect();
  const { isSignedIn } = useAuth();
  
  const connect = () => doOpenAuth();
  
  const disconnect = () => {
    userSession.signUserOut();
    window.location.reload();
  };
  
  const address = isSignedIn 
    ? userSession.loadUserData().profile.stxAddress.testnet
    : null;
  
  return {
    isConnected: isSignedIn,
    address,
    connect,
    disconnect,
  };
}
```

### D.4 Contract Call Hooks

```typescript
// hooks/useVaultActions.ts
import { useOpenContractCall } from '@stacks/connect-react';
import { 
  uintCV, 
  contractPrincipalCV,
  PostConditionMode,
  Pc,
} from '@stacks/transactions';

const VAULT = 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.bitharvest-vault';
const SBTC = 'ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token';

export function useVaultActions() {
  const { openContractCall } = useOpenContractCall();
  
  // DEPOSIT
  const deposit = async (amount: bigint, userAddress: string) => {
    await openContractCall({
      contractAddress: 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN',
      contractName: 'bitharvest-vault',
      functionName: 'deposit',
      functionArgs: [
        uintCV(amount),
        contractPrincipalCV('ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT', 'sbtc-token'),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        Pc.principal(userAddress)
          .willSendEq(amount)
          .ft('ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token', 'sbtc'),
      ],
      onFinish: (data) => console.log('Deposit TX:', data.txId),
      onCancel: () => console.log('User cancelled'),
    });
  };
  
  // WITHDRAW
  const withdraw = async (shares: bigint) => {
    await openContractCall({
      contractAddress: 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN',
      contractName: 'bitharvest-vault',
      functionName: 'withdraw',
      functionArgs: [
        uintCV(shares),
        contractPrincipalCV('ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT', 'sbtc-token'),
      ],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => console.log('Withdraw TX:', data.txId),
    });
  };
  
  // BORROW
  const borrow = async (amount: bigint) => {
    await openContractCall({
      contractAddress: 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN',
      contractName: 'bitharvest-vault',
      functionName: 'borrow',
      functionArgs: [
        uintCV(amount),
        contractPrincipalCV('ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT', 'sbtc-token'),
      ],
      postConditionMode: PostConditionMode.Deny,
      onFinish: (data) => console.log('Borrow TX:', data.txId),
    });
  };
  
  // REPAY
  const repay = async (amount: bigint, userAddress: string) => {
    await openContractCall({
      contractAddress: 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN',
      contractName: 'bitharvest-vault',
      functionName: 'repay',
      functionArgs: [
        uintCV(amount),
        contractPrincipalCV('ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT', 'sbtc-token'),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [
        Pc.principal(userAddress)
          .willSendLte(amount)
          .ft('ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token', 'sbtc'),
      ],
      onFinish: (data) => console.log('Repay TX:', data.txId),
    });
  };
  
  return { deposit, withdraw, borrow, repay };
}
```

### D.5 Read-Only Data Fetching

```typescript
// hooks/useVaultData.ts
import { fetchCallReadOnlyFunction, cvToJSON, uintCV, principalCV } from '@stacks/transactions';

const VAULT_ADDRESS = 'ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN';
const VAULT_NAME = 'bitharvest-vault';

async function callReadOnly(functionName: string, args: any[] = []) {
  const result = await fetchCallReadOnlyFunction({
    contractAddress: VAULT_ADDRESS,
    contractName: VAULT_NAME,
    functionName,
    functionArgs: args,
    network: 'testnet',
    senderAddress: VAULT_ADDRESS,
  });
  return cvToJSON(result);
}

export function useVaultData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchData() {
      const [deposits, borrows, paused, utilization] = await Promise.all([
        callReadOnly('get-total-deposits'),
        callReadOnly('get-total-borrows'),
        callReadOnly('is-paused'),
        callReadOnly('get-utilization-rate'),
      ]);
      
      setData({
        totalDeposits: BigInt(deposits.value),
        totalBorrows: BigInt(borrows.value),
        isPaused: paused.value,
        utilizationRate: parseInt(utilization.value) / 100,
      });
      setLoading(false);
    }
    
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);
  
  return { data, loading };
}

export function useUserPosition(address: string | null) {
  const [position, setPosition] = useState(null);
  
  useEffect(() => {
    if (!address) return;
    
    async function fetchPosition() {
      const [shares, balance, maxBorrow, borrowPosition, interest, yield_] = await Promise.all([
        callReadOnly('get-user-shares', [principalCV(address)]),
        callReadOnly('get-user-balance', [principalCV(address)]),
        callReadOnly('get-max-borrow', [principalCV(address)]),
        callReadOnly('get-borrow-position', [principalCV(address)]),
        callReadOnly('calculate-accrued-interest', [principalCV(address)]),
        callReadOnly('get-estimated-yield', [principalCV(address)]),
      ]);
      
      setPosition({
        shares: BigInt(shares.value),
        balance: BigInt(balance.value),
        maxBorrow: BigInt(maxBorrow.value),
        hasBorrow: borrowPosition.type !== '(optional none)',
        borrowAmount: borrowPosition.type !== '(optional none)' 
          ? BigInt(borrowPosition.value.amount.value) 
          : 0n,
        interestOwed: BigInt(interest.value),
        estimatedYield: BigInt(yield_.value),
      });
    }
    
    fetchPosition();
  }, [address]);
  
  return position;
}
```

---

## Appendix E: Environment Variables

```env
# .env.local (Testnet)
NEXT_PUBLIC_NETWORK=testnet
NEXT_PUBLIC_VAULT_ADDRESS=ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.bitharvest-vault
NEXT_PUBLIC_SBTC_ADDRESS=ST1F7QA2MDF17S807EPA36TSS8AMEFY4KA9TVGWXT.sbtc-token
NEXT_PUBLIC_MOCK_SBTC_ADDRESS=ST33S3T4B78TTTVNZW687YY6KTN7SYNA79PZ7M0KN.mock-sbtc
NEXT_PUBLIC_API_URL=https://api.testnet.hiro.so
NEXT_PUBLIC_EXPLORER_URL=https://explorer.hiro.so/?chain=testnet

# .env.production (Mainnet - update after deployment)
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_VAULT_ADDRESS=SP_ADDRESS.bitharvest-vault
NEXT_PUBLIC_SBTC_ADDRESS=SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token
NEXT_PUBLIC_API_URL=https://api.hiro.so
NEXT_PUBLIC_EXPLORER_URL=https://explorer.hiro.so
```

---

## Appendix F: API Rate Limiting Strategy

```typescript
// utils/apiClient.ts

// Hiro free tier: ~20 requests/minute
// Strategy: Queue + Cache + Retry

class ApiClient {
  private queue: Array<() => Promise<any>> = [];
  private processing = false;
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_TTL = 10000; // 10 seconds
  private REQUEST_DELAY = 500; // 500ms between requests
  
  async request<T>(key: string, fn: () => Promise<T>): Promise<T> {
    // Check cache first
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data;
    }
    
    // Add to queue
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const data = await this.executeWithRetry(fn);
          this.cache.set(key, { data, timestamp: Date.now() });
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
      
      this.processQueue();
    });
  }
  
  private async executeWithRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        if (error.message?.includes('429') && i < retries - 1) {
          // Rate limited - wait and retry
          await this.delay(15000);
        } else {
          throw error;
        }
      }
    }
    throw new Error('Max retries exceeded');
  }
  
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      await task?.();
      await this.delay(this.REQUEST_DELAY);
    }
    this.processing = false;
  }
  
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const apiClient = new ApiClient();
```

---

## Appendix G: Transaction Status Tracking

```typescript
// hooks/useTransactionStatus.ts
import { useState, useEffect } from 'react';

type TxStatus = 'pending' | 'success' | 'failed';

export function useTransactionStatus(txId: string | null) {
  const [status, setStatus] = useState<TxStatus>('pending');
  
  useEffect(() => {
    if (!txId) return;
    
    const checkStatus = async () => {
      const response = await fetch(
        `https://api.testnet.hiro.so/extended/v1/tx/${txId}`
      );
      const data = await response.json();
      
      if (data.tx_status === 'success') {
        setStatus('success');
      } else if (data.tx_status === 'failed' || data.tx_status === 'abort_by_response') {
        setStatus('failed');
      }
    };
    
    // Poll every 5 seconds until confirmed
    const interval = setInterval(checkStatus, 5000);
    checkStatus(); // Initial check
    
    return () => clearInterval(interval);
  }, [txId]);
  
  return status;
}
```

---

## Appendix H: Health Factor Calculation

```typescript
// utils/calculations.ts

const COLLATERAL_RATIO = 15000; // 150%
const LIQUIDATION_THRESHOLD = 12000; // 120%

export function calculateHealthFactor(
  collateralValue: bigint, // User's deposited sBTC value
  borrowedAmount: bigint   // User's borrowed amount
): number {
  if (borrowedAmount === 0n) return Infinity;
  
  // Health Factor = (Collateral * 10000) / (Borrowed * LIQUIDATION_THRESHOLD / 10000)
  // Simplified: (Collateral * 10000 * 10000) / (Borrowed * LIQUIDATION_THRESHOLD)
  const healthFactor = Number(
    (collateralValue * 100000000n) / (borrowedAmount * BigInt(LIQUIDATION_THRESHOLD))
  ) / 10000;
  
  return healthFactor;
}

export function getHealthStatus(healthFactor: number): {
  status: 'safe' | 'warning' | 'danger';
  label: string;
  color: string;
} {
  if (healthFactor >= 1.5) {
    return { status: 'safe', label: 'Safe', color: 'var(--color-success-500)' };
  } else if (healthFactor >= 1.2) {
    return { status: 'warning', label: 'Caution', color: 'var(--color-warning-500)' };
  } else {
    return { status: 'danger', label: 'Danger', color: 'var(--color-danger-500)' };
  }
}

export function formatSbtc(satoshis: bigint): string {
  const sats = Number(satoshis);
  return (sats / 100_000_000).toFixed(8);
}

export function parseSbtc(sbtc: string): bigint {
  const cleaned = sbtc.replace(/[^0-9.]/g, '');
  const [whole, decimal = ''] = cleaned.split('.');
  const paddedDecimal = decimal.padEnd(8, '0').slice(0, 8);
  return BigInt(whole + paddedDecimal);
}
```

---

*PRD v2.0 - Updated with production-ready integration code, multi-token support, and complete Stacks Connect implementation.*
