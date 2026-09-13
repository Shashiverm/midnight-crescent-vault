import React, { useState } from 'react';

export const PrivacyExplainer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'model' | 'lifecycle' | 'guarantee'>('model');

  return (
    <div className="crescent-card privacy-explainer-card">
      <div className="card-header">
        <div>
          <div className="card-tag">Zero-Knowledge Architecture</div>
          <h2 className="card-title">Privacy Model &amp; Deliberate Disclosure</h2>
        </div>
        <div className="tab-pill-group">
          <button
            type="button"
            className={`tab-pill ${activeTab === 'model' ? 'active' : ''}`}
            onClick={() => setActiveTab('model')}
          >
            Boundary
          </button>
          <button
            type="button"
            className={`tab-pill ${activeTab === 'lifecycle' ? 'active' : ''}`}
            onClick={() => setActiveTab('lifecycle')}
          >
            Lifecycle
          </button>
          <button
            type="button"
            className={`tab-pill ${activeTab === 'guarantee' ? 'active' : ''}`}
            onClick={() => setActiveTab('guarantee')}
          >
            Guarantee
          </button>
        </div>
      </div>

      {activeTab === 'model' && (
        <div className="explainer-content">
          <p className="explainer-intro">
            Midnight decouples private computation from public consensus. The
            architecture enforces a mathematical boundary between your client browser
            and the distributed ledger.
          </p>

          <div className="privacy-boundary-grid">
            {/* Private Domain */}
            <div className="domain-column domain-private">
              <div className="domain-header">
                <span className="domain-icon">&#128737;</span>
                <div>
                  <h4 className="domain-title">What Stays Private</h4>
                  <span className="domain-badge">Client Prover Environment</span>
                </div>
              </div>
              <ul className="domain-list">
                <li>
                  <strong>Shielded Keystore:</strong> Private keys, salt seeds, and balance records stored locally.
                </li>
                <li>
                  <strong>Private Witness:</strong> Queried locally by the circuit prover via <code>get_increment_secret()</code>.
                </li>
                <li>
                  <strong>Actual Reserve Balance:</strong> Never transmitted over RPC, mempool, or consensus blocks.
                </li>
              </ul>
            </div>

            {/* Public Domain */}
            <div className="domain-column domain-public">
              <div className="domain-header">
                <span className="domain-icon">&#127760;</span>
                <div>
                  <h4 className="domain-title">What is Disclosed</h4>
                  <span className="domain-badge">Consensus Block Ledger</span>
                </div>
              </div>
              <ul className="domain-list">
                <li>
                  <strong>Public Counter:</strong> Cumulative accumulator on-chain tracking verified state transitions.
                </li>
                <li>
                  <strong>Disclosed Delta:</strong> The verified threshold wrapped explicitly in <code>disclose(step)</code>.
                </li>
                <li>
                  <strong>Zero-Knowledge Proof:</strong> Compact verification token demonstrating constraint satisfiability.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lifecycle' && (
        <div className="explainer-content">
          <div className="lifecycle-steps">
            <div className="lifecycle-step">
              <div className="lifecycle-num">01</div>
              <div className="lifecycle-text">
                <h5>Private Witness Evaluation</h5>
                <p>
                  The browser loads the secret witness from local wallet storage. Zero network requests occur during witness extraction.
                </p>
              </div>
            </div>

            <div className="lifecycle-step">
              <div className="lifecycle-num">02</div>
              <div className="lifecycle-text">
                <h5>Halo2 Constraint Proof Synthesis</h5>
                <p>
                  The Compact compiler ZKIR rules enforce that the witness satisfies <code>witness &gt;= threshold</code> and <code>witness &gt; 0</code>.
                </p>
              </div>
            </div>

            <div className="lifecycle-step">
              <div className="lifecycle-num">03</div>
              <div className="lifecycle-text">
                <h5>Deliberate Disclosure &amp; Submission</h5>
                <p>
                  Only the validity proof and public counter delta are broadcast to Midnight validators, guaranteeing zero witness leaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guarantee' && (
        <div className="explainer-content">
          <div className="quote-box">
            <div className="quote-label">Cryptographic Privacy Guarantee</div>
            <p className="quote-text">
              &ldquo;An on-chain observer or block explorer analyst inspecting transactions on the Midnight
              network can verify that the counter increment was produced by an authorized, solvent participant.
              However, the observer <strong>cannot ascertain</strong> the sender&apos;s raw private balance,
              unshielded identity, or secret witness value. The assertion is proven with mathematical certainty
              without ever being shown.&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
