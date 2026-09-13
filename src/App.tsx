import React, { useState } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { PrivacyExplainer } from './components/PrivacyExplainer';
import { NetworkBanner } from './components/NetworkBanner';
import './styles/crescent.css';

export const App: React.FC = () => {
  const {
    wallet,
    connect,
    connectDevKeystore,
    disconnect,
    setNetwork,
    callSolvencyCircuit,
    isProving,
    proofProgress,
    lastResult,
    contractAddress,
  } = useMidnight();

  const [showZkInspector, setShowZkInspector] = useState<boolean>(false);

  const explorerBase =
    wallet.network === 'preview'
      ? 'https://explorer.preview.midnight.network'
      : 'https://explorer.preprod.midnight.network';

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <header className="app-header">
        <div className="container header-inner">
          <div className="brand-group">
            <div className="brand-icon">
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c2.185 0 4.248-.503 6.084-1.397-7.228-1.572-12.63-7.962-12.63-15.603 0-6.196 3.513-11.573 8.647-14.237C17.382 2.26 16.702 2 16 2z"
                  fill="#e5a93c"
                />
              </svg>
            </div>
            <div className="brand-text-block">
              <span className="brand-title">Crescent Vault</span>
              <span className="brand-badge">Preprod Live</span>
            </div>
          </div>

          <div className="header-links">
            <button
              type="button"
              className="btn-header-outline"
              onClick={() => setShowZkInspector(!showZkInspector)}
            >
              {showZkInspector ? 'Hide ZK Inspector' : 'Inspect Circuit'}
            </button>
            <a
              href={explorerBase}
              target="_blank"
              rel="noreferrer"
              className="link-muted header-nav-link"
              title="Open Midnight Night Scan Explorer"
            >
              Night Scan Explorer &#8599;
            </a>
            <a
              href="https://github.com/Shashiverm"
              target="_blank"
              rel="noreferrer"
              className="link-muted header-nav-link"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <main className="container" style={{ flex: 1, paddingBottom: '60px' }}>
        {/* Editorial Hero */}
        <section className="hero-section">
          <div className="hero-pill">
            <span className="crescent-glyph">&#9789;</span>
            <span>Midnight Network &middot; Zero-Knowledge Solvency Protocol</span>
          </div>
          <h1 className="hero-title">
            Shielded Solvency &amp;{' '}
            <span className="highlight-gold">Deliberate Disclosure</span>
          </h1>
          <p className="hero-description">
            Prove verifiable reserve solvency and client allowance without publishing
            your wallet balance or transaction history to the blockchain.
            Most of your financial state rests in shadow; you simply disclose the verified edge.
          </p>
        </section>

        {/* Verifiable Contract Banner */}
        <NetworkBanner
          contractAddress={contractAddress}
          network={wallet.network}
        />

        {/* Collapsible ZK Circuit Inspector */}
        {showZkInspector && (
          <div className="zk-inspector-card">
            <div className="inspector-header">
              <span className="mono inspector-tag">Compact Specification: crescent_vault.compact</span>
              <button
                type="button"
                className="btn-close-inspector"
                onClick={() => setShowZkInspector(false)}
              >
                &times; Close
              </button>
            </div>
            <pre className="inspector-code mono">
{`// Public on-chain consensus state
export ledger counter: Uint<32>;
export ledger totalUpdates: Uint<32>;

// Client-side private witness (executed in browser Halo2 prover)
witness get_increment_secret(): Uint<32>;

export circuit increment_counter(disclosedStep: Uint<32>): [] {
    const secret = get_increment_secret();
    assert(secret == disclosedStep, "Constraint failed: Private witness mismatch");
    assert(secret > 0, "Solvency reserve must be positive");
    
    // Deliberate disclosure boundary: only the step delta reaches consensus
    counter = (counter + disclose(disclosedStep)) as Uint<32>;
    totalUpdates = (totalUpdates + 1) as Uint<32>;
}`}
            </pre>
          </div>
        )}

        {/* Main Application Grid */}
        <div className="main-grid">
          {/* Left Column: Circuit Execution & ZK Proof */}
          <div className="grid-column">
            <CircuitCall
              isConnected={wallet.isConnected}
              isProving={isProving}
              proofProgress={proofProgress}
              lastResult={lastResult}
              onCallCircuit={callSolvencyCircuit}
              onConnectPrompt={() => connect()}
            />

            <PrivacyExplainer />
          </div>

          {/* Right Column: Wallet Integration & Protocol Spec */}
          <div className="grid-column">
            <WalletConnect
              wallet={wallet}
              onConnect={() => connect()}
              onConnectDev={connectDevKeystore}
              onDisconnect={disconnect}
              onSwitchNetwork={setNetwork}
              contractAddress={contractAddress}
            />

            {/* Architecture Card */}
            <div className="crescent-card">
              <div className="card-header">
                <div>
                  <div className="card-tag">Technical Specification</div>
                  <h3 className="section-heading" style={{ fontSize: '1.1rem' }}>
                    Midnight Protocol Engine
                  </h3>
                </div>
              </div>
              <ul className="domain-list" style={{ gap: '14px' }}>
                <li>
                  <strong>Consensus Environment:</strong> Midnight Preprod Testnet
                </li>
                <li>
                  <strong>Wallet Interface:</strong> Lace DApp Connector API v4
                </li>
                <li>
                  <strong>ZK Proving Engine:</strong> PLONK &amp; Halo2 ZKIR Prover (Client-Side)
                </li>
                <li>
                  <strong>Disclosure Model:</strong> Deliberate disclosure via Compact <code>disclose()</code> primitive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-inner">
          <p>
            <strong>Crescent Vault</strong> &middot; Decentralized Zero-Knowledge Privacy Infrastructure on Midnight Network
          </p>
          <p className="footer-credit">
            Developed by <a href="https://github.com/Shashiverm" target="_blank" rel="noreferrer">Shashiverm</a>
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;
