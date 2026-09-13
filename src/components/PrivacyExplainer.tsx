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
            Claim
          </button>
        </div>
      </div>

      {activeTab === 'model' && (
        <div className="explainer-content">
          <p className="explainer-intro">
            Midnight decouples private computation from public consensus. The
            diagram below visualizes the strict cryptographic boundary between
            your browser and the on-chain ledger.
          </p>

          <div className="privacy-boundary-grid">
            {/* Private Domain */}
            <div className="domain-column domain-private">
              <div className="domain-header">
                <span className="domain-icon">&#128737;</span>
                <div>
                  <h4 className="domain-title">What is PRIVATE</h4>
                  <span className="domain-badge">Off-Chain / Client Only</span>
                </div>
              </div>
              <ul className="domain-list">
                <li>
                  <strong>Shielded Secret Balance:</strong> The exact amount of
                  funds or reserve allowance held in your wallet.
                </li>
                <li>
                  <strong>Private Witness:</strong> Passed exclusively to the
                  local ZK prover via <code>get_increment_secret()</code>.
                </li>
                <li>
                  <strong>Client Keystore:</strong> Private keys and blinding
                  factors never leave your browser unshielded.
                </li>
              </ul>
            </div>

            {/* Public Domain */}
            <div className="domain-column domain-public">
              <div className="domain-header">
                <span className="domain-icon">&#127760;</span>
                <div>
                  <h4 className="domain-title">What is PUBLIC</h4>
                  <span className="domain-badge">On-Chain Consensus</span>
                </div>
              </div>
              <ul className="domain-list">
                <li>
                  <strong>Consensus Counter:</strong> The public ledger state
                  accumulating verified claims on Midnight Preprod.
                </li>
                <li>
                  <strong>Disclosed Delta:</strong> The verified threshold
                  parameter wrapped in <code>disclose(step)</code>.
                </li>
                <li>
                  <strong>ZK Proof Artifact:</strong> Cryptographic verification
                  token certifying validity without exposing inputs.
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
                  The browser extracts your secret witness from local memory. No
                  network calls are dispatched during this stage.
                </p>
              </div>
            </div>

            <div className="lifecycle-step">
              <div className="lifecycle-num">02</div>
              <div className="lifecycle-text">
                <h5>Halo2 Constraint Proof Synthesis</h5>
                <p>
                  The Compact compiler ZKIR rules enforce that the witness
                  meets or exceeds the threshold.
                </p>
              </div>
            </div>

            <div className="lifecycle-step">
              <div className="lifecycle-num">03</div>
              <div className="lifecycle-text">
                <h5>Deliberate Disclosure &amp; Submission</h5>
                <p>
                  Only the validity proof and public counter delta are
                  broadcast to Midnight Preprod indexers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guarantee' && (
        <div className="explainer-content">
          <div className="quote-box">
            <div className="quote-label">Official Level 2 Privacy Claim</div>
            <p className="quote-text">
              &ldquo;An on-chain observer inspecting transactions on the Midnight
              Preprod explorer can verify that the counter increment was produced
              by an authorized, solvent participant. However, the observer{' '}
              <strong>cannot ascertain</strong> the sender&apos;s raw private
              balance, unshielded identity, or secret witness value. The assertion
              is proven with mathematical certainty without ever being shown.&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
