import React from 'react';
import { useMidnight, PREPROD_CONTRACT_ADDRESS } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { PrivacyExplainer } from './components/PrivacyExplainer';
import { NetworkBanner } from './components/NetworkBanner';
import './styles/crescent.css';

export const App: React.FC = () => {
  const {
    wallet,
    connect,
    disconnect,
    setNetwork,
    callSolvencyCircuit,
    isProving,
    proofProgress,
    lastResult,
  } = useMidnight();

  return (
    <div className="app-shell">
      {/* Top Navigation */}
      <header className="app-header">
        <div className="container header-inner">
          <div className="brand-group">
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14c2.185 0 4.248-.503 6.084-1.397-7.228-1.572-12.63-7.962-12.63-15.603 0-6.196 3.513-11.573 8.647-14.237C17.382 2.26 16.702 2 16 2z"
                  fill="#e5a93c"
                />
              </svg>
            </div>
            <div>
              <span className="brand-title">Crescent Vault</span>
              <span className="brand-badge">Level 2</span>
            </div>
          </div>

          <div className="header-links">
            <a
              href="https://explorer.preprod.midnight.network/contract/0200fa4e87a27d2c3882a939f3714b3d8819445eeea8910b8cf9ffca14d59a202a0b"
              target="_blank"
              rel="noreferrer"
              className="link-muted"
            >
              Preprod Contract
            </a>
            <a
              href="https://github.com/Shashiverm"
              target="_blank"
              rel="noreferrer"
              className="link-muted"
            >
              GitHub / Shashiverm
            </a>
          </div>
        </div>
      </header>

      <main className="container" style={{ flex: 1 }}>
        {/* Editorial Hero */}
        <section className="hero-section">
          <div className="hero-pill">
            <span className="crescent-glyph">&#9789;</span>
            <span>Midnight Builder Challenge &middot; Level 2 Waxing Crescent</span>
          </div>
          <h1 className="hero-title">
            Shielded Solvency &amp;{' '}
            <span className="highlight-gold">Deliberate Disclosure</span>
          </h1>
          <p className="hero-description">
            The first thread of light. You prove your reserve allowance directly from
            the client through local zero-knowledge witness proving. Most of your
            financial state rests in shadow; you have simply chosen to reveal the edge.
          </p>
        </section>

        {/* Verifiable Preprod Contract Banner */}
        <NetworkBanner
          contractAddress={PREPROD_CONTRACT_ADDRESS}
          network={wallet.network}
        />

        {/* Main Application Grid */}
        <div className="main-grid">
          {/* Left Column: Circuit Execution & ZK Proof */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
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

          {/* Right Column: Lace Wallet Integration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <WalletConnect
              wallet={wallet}
              onConnect={() => connect()}
              onDisconnect={disconnect}
              onSwitchNetwork={setNetwork}
              contractAddress={PREPROD_CONTRACT_ADDRESS}
            />

            {/* Architecture Card */}
            <div className="crescent-card">
              <div className="card-header">
                <div>
                  <div className="card-tag">Technical Stack</div>
                  <h3 className="section-heading" style={{ fontSize: '1.1rem' }}>
                    Level 2 Protocol Architecture
                  </h3>
                </div>
              </div>
              <ul className="domain-list" style={{ gap: '12px' }}>
                <li>
                  <strong>Network:</strong> Midnight Preprod Testnet
                </li>
                <li>
                  <strong>Wallet:</strong> Lace Browser Extension (DApp Connector API v4)
                </li>
                <li>
                  <strong>Contract Engine:</strong> Compact v0.23 with Halo2 ZKIR Prover
                </li>
                <li>
                  <strong>Privacy Rule:</strong> Private witness queried locally; zero private leaks to consensus.
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
            Midnight Builder Challenge &middot; <strong>Level 2: Waxing Crescent</strong>
          </p>
          <p className="footer-credit">
            Constructed by <a href="https://github.com/Shashiverm" target="_blank" rel="noreferrer">Shashiverm</a> on Midnight Preprod
          </p>
        </div>
      </footer>
    </div>
  );
};
export default App;
