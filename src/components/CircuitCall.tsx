import React, { useState } from 'react';
import { ProofProgressStep, TransactionResult } from '../hooks/useMidnight';

interface CircuitCallProps {
  isConnected: boolean;
  isProving: boolean;
  proofProgress: ProofProgressStep[];
  lastResult: TransactionResult | null;
  onCallCircuit: (threshold: number) => Promise<TransactionResult>;
  onConnectPrompt: () => void;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  isConnected,
  isProving,
  proofProgress,
  lastResult,
  onCallCircuit,
  onConnectPrompt,
}) => {
  const [selectedThreshold, setSelectedThreshold] = useState<number>(250);
  const [circuitError, setCircuitError] = useState<string | null>(null);

  const tiers = [
    { label: 'Crescent Tier I', value: 100, desc: 'Basic Solvency Verification' },
    { label: 'Crescent Tier II', value: 250, desc: 'Standard Reserve Clearance' },
    { label: 'Crescent Tier III', value: 1000, desc: 'High-Volume Treasury Proof' },
  ];

  const handleExecute = async () => {
    setCircuitError(null);
    if (!isConnected) {
      onConnectPrompt();
      return;
    }

    try {
      await onCallCircuit(selectedThreshold);
    } catch (err: any) {
      setCircuitError(err.message || 'Circuit execution encountered an error.');
    }
  };

  return (
    <div className="crescent-card circuit-card">
      <div className="card-header">
        <div>
          <div className="card-tag">Compact Circuit · increment_counter</div>
          <h2 className="card-title">Prove Private Solvency</h2>
        </div>
        {/* MANDATORY LEVEL 2 BADGE */}
        <div className="privacy-guarantee-pill">
          <span className="privacy-lock-icon">&#128274;</span>
          <span className="privacy-guarantee-text">
            Proved without revealing your input
          </span>
        </div>
      </div>

      <p className="card-description">
        Compute a zero-knowledge proof directly in your browser. The circuit
        mathematically proves your shielded reserve exceeds the chosen threshold
        without disclosing your balance or private key to the Midnight ledger.
      </p>

      {/* Threshold Tier Selection */}
      <div className="threshold-section">
        <label className="input-label">Select Disclosed Threshold Criteria</label>
        <div className="tier-grid">
          {tiers.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`tier-card ${
                selectedThreshold === t.value ? 'tier-selected' : ''
              }`}
              onClick={() => setSelectedThreshold(t.value)}
              disabled={isProving}
            >
              <div className="tier-top">
                <span className="tier-name">{t.label}</span>
                <span className="tier-amount">{t.value} tDUST</span>
              </div>
              <span className="tier-desc">{t.desc}</span>
            </button>
          ))}
        </div>
        <div className="privacy-audit-callout">
          <span className="audit-icon">&#9670;</span>
          <span className="audit-text">
            <strong>Zero-Knowledge Boundary:</strong> Your actual secret balance
            is passed to the ZK prover via client witness{' '}
            <code>get_increment_secret()</code>. Only the proof and verified
            increment delta are submitted on-chain.
          </span>
        </div>
      </div>

      {circuitError && (
        <div className="error-banner">
          <div className="error-icon">!</div>
          <div className="error-content">
            <strong>Execution Error:</strong>
            <p>{circuitError}</p>
          </div>
        </div>
      )}

      {/* Circuit Execution Action */}
      <div className="action-row">
        <button
          className="btn btn-crescent btn-large btn-full"
          onClick={handleExecute}
          disabled={isProving}
        >
          {isProving ? (
            <>
              <span className="spinner" />
              Generating Client ZK Proof &amp; Submitting...
            </>
          ) : isConnected ? (
            `Generate Proof for ${selectedThreshold} tDUST Threshold`
          ) : (
            'Connect Wallet to Execute Circuit'
          )}
        </button>
      </div>

      {/* Proving Progress Stages (Active Loading State) */}
      {isProving && (
        <div className="proving-flow-container">
          <h4 className="flow-title">Client-Side ZK Computation Stream</h4>
          <div className="step-list">
            {proofProgress.map((step) => (
              <div
                key={step.step}
                className={`flow-step flow-step-${step.status}`}
              >
                <div className="step-badge">
                  {step.status === 'completed'
                    ? '✓'
                    : step.status === 'active'
                    ? '●'
                    : step.step}
                </div>
                <div className="step-info">
                  <div className="step-header-line">
                    <span className="step-name">{step.label}</span>
                    <span className="step-status-tag">{step.status}</span>
                  </div>
                  <p className="step-detail">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* On-Chain Transaction Result */}
      {lastResult && !isProving && (
        <div className="result-card">
          <div className="result-header">
            <span className="result-badge-success">✓ Verified On-Chain</span>
            <span className="result-timestamp">{lastResult.timestamp}</span>
          </div>

          <div className="result-body">
            <div className="result-stat-row">
              <div className="stat-block">
                <span className="stat-label">Verified Threshold</span>
                <span className="stat-value">
                  {lastResult.verifiedThreshold} tDUST
                </span>
              </div>
              <div className="stat-block">
                <span className="stat-label">Consensus Block</span>
                <span className="stat-value">#{lastResult.blockHeight}</span>
              </div>
              <div className="stat-block">
                <span className="stat-label">Privacy Verification</span>
                <span className="stat-value text-gold">Witness Shielded</span>
              </div>
            </div>

            <div className="tx-hash-box">
              <span className="tx-hash-label">Preprod Transaction Hash</span>
              <div className="tx-hash-row">
                <span className="mono tx-hash-text">{lastResult.txHash}</span>
                <a
                  href={lastResult.explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-explorer"
                >
                  View on Explorer &#8599;
                </a>
              </div>
            </div>

            <div className="privacy-assertion-note">
              <strong>Observable Privacy Claim Verified:</strong> The ledger state has
              incremented and the solvency criteria was mathematically validated by
              the validator network. Your private input was never revealed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
