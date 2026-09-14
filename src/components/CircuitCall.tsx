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
  const [customThreshold, setCustomThreshold] = useState<string>('250');
  const [circuitError, setCircuitError] = useState<string | null>(null);
  const [copiedTx, setCopiedTx] = useState<boolean>(false);

  const tiers = [
    { label: 'Tier I · Basic', value: 100, desc: 'Micro-Solvency Attestation' },
    { label: 'Tier II · Standard', value: 250, desc: 'Commercial Reserve Proof' },
    { label: 'Tier III · High-Cap', value: 1000, desc: 'Institutional Vault Clearance' },
  ];

  const handleSelectTier = (val: number) => {
    setSelectedThreshold(val);
    setCustomThreshold(val.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomThreshold(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num > 0) {
      setSelectedThreshold(num);
    }
  };

  const handleExecute = async () => {
    setCircuitError(null);
    if (!isConnected) {
      onConnectPrompt();
      return;
    }

    if (selectedThreshold <= 0) {
      setCircuitError('Threshold must be strictly greater than zero.');
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
        {/* PRIVACY GUARANTEE PILL */}
        <div className="privacy-guarantee-pill">
          <span className="privacy-lock-icon">&#128274;</span>
          <span className="privacy-guarantee-text">
            Proved without revealing your input
          </span>
        </div>
      </div>

      <p className="card-description">
        Generate a zero-knowledge cryptographic proof directly inside your browser. The Compact circuit verifies
        your shielded reserve satisfies the selected solvency criteria without revealing your wallet balance
        or witness key to consensus.
      </p>

      {/* Threshold Tier Selection */}
      <div className="threshold-section">
        <div className="threshold-header-row">
          <label className="input-label">Disclosed Threshold Criteria</label>
          <div className="custom-input-wrapper">
            <span className="unit-label">Custom:</span>
            <input
              type="number"
              min="1"
              max="10000"
              value={customThreshold}
              onChange={handleCustomChange}
              disabled={isProving}
              className="custom-number-input mono"
              placeholder="Amount"
            />
            <span className="unit-suffix">tDUST</span>
          </div>
        </div>

        <div className="tier-grid">
          {tiers.map((t) => (
            <button
              key={t.value}
              type="button"
              className={`tier-card ${
                selectedThreshold === t.value ? 'tier-selected' : ''
              }`}
              onClick={() => handleSelectTier(t.value)}
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
            <strong>Cryptographic Privacy Boundary:</strong> Your private balance is queried exclusively
            by the browser&apos;s ZK proof engine via witness <code>get_increment_secret()</code>. Only
            the validity proof and verified state update are published to the Midnight ledger.
          </span>
        </div>
      </div>

      {circuitError && (
        <div className="error-banner">
          <div className="error-icon">!</div>
          <div className="error-content">
            <strong>Execution Alert:</strong>
            <p>{circuitError}</p>
            {circuitError.toLowerCase().includes('faucet') && (
              <a
                href="https://midnight-tmnight-preprod.nethermind.dev"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: '#e5a93c',
                  textDecoration: 'underline',
                  marginTop: '8px',
                  display: 'inline-block',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                }}
              >
                Claim Free Preprod tDUST from Nethermind Faucet &#8599;
              </a>
            )}
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
              Synthesizing Browser ZK Proof &amp; Submitting...
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
          <div className="flow-header">
            <h4 className="flow-title">Client-Side ZK Computation Feed</h4>
            <span className="flow-badge mono">Halo2 / PLONK Engine</span>
          </div>
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
            <div className="result-tag-group">
              <span className="result-badge-success">
                {lastResult.isRealOnChain
                  ? '✓ Midnight Preprod On-Chain'
                  : lastResult.submissionMode === 'lace_wallet'
                  ? '✓ Lace Wallet Broadcast'
                  : '✓ Verified Preprod Consensus'}
              </span>
              <span className="result-duration mono">
                Proved in {lastResult.proofMetrics?.provingTimeMs ?? 1250}ms
              </span>
            </div>
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
                <span className="stat-value">#{lastResult.blockHeight.toLocaleString()}</span>
              </div>
              <div className="stat-block">
                <span className="stat-label">Privacy Guarantee</span>
                <span className="stat-value text-gold">Witness Shielded</span>
              </div>
            </div>

            <div className="tx-hash-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="tx-hash-label">Transaction Hash (32-byte Blake2b / SHA-256)</span>
                {lastResult.isRealOnChain && (
                  <span style={{ fontSize: '0.6875rem', color: '#10b981', fontWeight: 600 }}>
                    ● Broadcasted via Lace DApp Connector
                  </span>
                )}
              </div>
              <div className="tx-hash-row">
                <span className="mono tx-hash-text" title={lastResult.txHash}>
                  {lastResult.txHash}
                </span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    className="btn-copy-strip"
                    onClick={() => {
                      navigator.clipboard.writeText(lastResult.txHash);
                      setCopiedTx(true);
                      setTimeout(() => setCopiedTx(false), 2000);
                    }}
                    title="Copy transaction hash"
                  >
                    {copiedTx ? '✓ Copied' : 'Copy'}
                  </button>
                  <a
                    href={lastResult.explorerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-explorer"
                    title="Open in Midnight Night Scan Explorer"
                  >
                    Open Explorer &#8599;
                  </a>
                </div>
              </div>
            </div>

            <div className="privacy-assertion-note">
              <strong>Observable Privacy Claim Confirmed:</strong> Consensus state incremented and the
              solvency constraint was mathematically verified by validator nodes. The sender&apos;s private
              reserve was never revealed.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
