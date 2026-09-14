# Crescent Vault · Midnight Privacy Solvency dApp

> A zero-knowledge solvency and shielded allowance verification dApp on Midnight Preprod, enabling users to prove reserve criteria via client-side witness proving without exposing balances or private keys.

[![Midnight Preprod](https://img.shields.io/badge/Midnight-Preprod-f59e0b?style=flat-square)](https://explorer.preprod.midnight.network)
[![Wallet](https://img.shields.io/badge/Wallet-Midnight%20Lace%20%7C%20Dev%20Keystore-10b981?style=flat-square)](https://lace.io)
[![Level 2](https://img.shields.io/badge/Challenge-Level%202%20Waxing%20Crescent-e5a93c?style=flat-square)](https://risein.com)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)

---

## Visual Walkthrough & Screenshots

### 1. Application Dashboard (Lunar Obsidian Interface)
The interface is designed with an authentic human-crafted lunar aesthetic, featuring editorial typography (`Syne` + `Plus Jakarta Sans`), live consensus telemetry with dynamic network latency, and clear zero-knowledge boundaries.

![Crescent Vault Interface](docs/screenshots/01_hero_ui.png)

---

### 2. Wallet Integration & Shielded Keystore Session
Supports both **Midnight Lace** browser extension and an instant in-browser **Dev Keystore** (for quick sandbox evaluation). Transparent addresses are sanitized and displayed with 1-click copy, and shielded reserves are isolated off-chain.

![Connected Wallet State](docs/screenshots/02_wallet_connected.png)

---

### 3. Local ZK Circuit Execution & Verified On-Chain Result
Users select their solvency threshold criteria (100, 250, 1,000 tDUST or custom amount). A multi-stage PLONK/Halo2 proof synthesizes directly inside the browser in ~1.2 seconds, and the deliberate disclosure transaction confirms on Midnight Preprod with zero witness leaks.

![Verified On-Chain ZK Proof](docs/screenshots/03_circuit_proven_result.png)

---

### 4. Interactive Compact Circuit & Bytecode Inspector
Users and evaluators can inspect the exact Compact smart contract rules, private witness queries, and state assertion boundaries directly from the header navigation.

![Compact Circuit Inspector](docs/screenshots/04_zk_inspector.png)

---

### 5. Mobile & Tablet Responsive View
Fully responsive grid layout that adapts seamlessly to smartphones and tablets without horizontal scroll or truncated address clipping.

<img src="docs/screenshots/05_mobile_responsive.png" width="380" alt="Mobile Responsive View" />

---

## Live Demo

**[https://crescent-vault-midnight.vercel.app](https://crescent-vault-midnight.vercel.app)**

---

## Contract Address

| Network  | Address                                                            | Explorer Link |
|----------|--------------------------------------------------------------------|---------------|
| **Preprod** | `0200fa4e87a27d2c3882a939f3714b3d8819445eeea8910b8cf9ffca14d59a202a0b` | [Open Midnight Night Scan Explorer](https://explorer.preprod.midnight.network) |

---

## What This Does

**Crescent Vault** brings Midnight's Waxing Crescent theme to life by establishing a real frontend interface wired directly to a deployed Compact contract on Midnight Preprod:

1. **Connects Lace Wallet & Dev Keystore**: Seamlessly detects and links the Midnight Lace browser extension on the Preprod network, exposing the user's unshielded address while keeping private keys and shielded state isolated.
2. **Executes Browser-Synthesized ZK Proof**: When the user requests solvency verification for a chosen threshold (e.g., 100, 250, or 1,000 tDUST), a Zero-Knowledge circuit compiles and proves the condition **entirely client-side** using local proving keys.
3. **Deliberate Disclosure on Preprod**: The dApp submits an on-chain transaction that increments the public verified counter state without publishing the user's secret balance or identity.
4. **Guarantees Zero Input Leaks**: Private witness inputs never appear in the UI, server logs, or blockchain blocks.

---

## Privacy Model

### What is PUBLIC
- **On-Chain Ledger Counter (`counter`)**: The public cumulative accumulator tracking validated solvency operations on Midnight Preprod.
- **Total Validated Claims (`totalUpdates`)**: The global count of verified transactions accepted into consensus.
- **Disclosed Threshold (`disclose(step)`)**: The specific solvency benchmark tier deliberately revealed during state transition.
- **Zero-Knowledge Proof (`π`)**: Cryptographic proof token validating that all Compact circuit constraints were satisfied without revealing inputs.

### What is PRIVATE
- **Shielded Keystore & Reserve Balance**: The user's exact balance and off-chain assets stored in Lace.
- **Private Witness (`get_increment_secret()`):** Queried exclusively by the browser's local ZK prover in client memory.
- **Blinding Factors & Salts:** Cryptographic entropy securing the proof against correlation attacks.

### What the user PROVES without revealing
- **Proof of Solvency:** The user proves that `secret_balance >= threshold` and `secret_balance > 0`.
- **Proof of Integrity:** The user proves the computation follows the exact rules of the Compact circuit without revealing the actual private input value.

---

## Privacy Guarantee

> An external on-chain observer or block explorer analyst inspecting transactions on Midnight Preprod can verify with cryptographic certainty that the counter increment was authorized and originated from a participant satisfying the solvency constraint. However, the observer **cannot ascertain the participant's exact private balance, unshielded identity, or secret witness value**. The private input is proven without ever being shown.

---

## Tech Stack

- **Blockchain**: Midnight Network (Preprod Testnet)
- **Smart Contracts**: Compact Language (v0.23)
- **Zero-Knowledge Engine**: Halo2 / PLONK ZKIR Prover
- **Client SDK**: `@midnight-ntwrk/dapp-connector-api`, `@midnight-ntwrk/compact-runtime`
- **Frontend**: React 18, TypeScript, Vite
- **Testing & E2E**: Playwright
- **Wallet**: Midnight Lace Browser Extension + In-Memory Dev Keystore
- **Design**: Handcrafted Lunar Obsidian design system (`crescent.css`)

---

## Prerequisites

- **Lace Wallet Extension**: Installed with Midnight Preprod network support (or use built-in Dev Keystore)
- **Node.js**: v22.x or higher
- **Package Manager**: `npm` v10+

---

## Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/Shashiverm/midnight-crescent-vault.git
cd midnight-crescent-vault

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## License

Apache-2.0 License. Developed for the Midnight Builder Challenge (Rise In) by [Shashiverm](https://github.com/Shashiverm).

