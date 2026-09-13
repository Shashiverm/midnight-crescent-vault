import React, { useState } from 'react';
import { WalletState, MidnightNetwork } from '../hooks/useMidnight';

interface WalletConnectProps {
  wallet: WalletState;
  onConnect: () => Promise<void>;
  onDisconnect: () => void;
  onSwitchNetwork: (network: MidnightNetwork) => void;
  contractAddress: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  wallet,
  onConnect,
  onDisconnect,
  onSwitchNetwork,
  contractAddress,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedContract, setCopiedContract] = useState<boolean>(false);

  const copyToClipboard = (text: string, isContract: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isContract) {
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncate = (str: string | null, start = 8, end = 6) => {
    if (!str) return '—';
    if (str.length <= start + end) return str;
    return `${str.substring(0, start)}...${str.substring(str.length - end)}`;
  };

  return (
    <div className="crescent-card wallet-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="status-indicator">
            <span
              className={`ping-dot ${
                wallet.isConnected ? 'ping-active' : 'ping-idle'
              }`}
            />
            <span className="status-text">
              {wallet.isConnected ? 'Lace Connected' : 'Disconnected'}
            </span>
          </div>
          <span className="network-pill">
            Midnight {wallet.network.toUpperCase()}
          </span>
        </div>

        {/* Network selector toggle */}
        <div className="network-toggle-group">
          <button
            type="button"
            className={`network-chip ${
              wallet.network === 'preprod' ? 'active' : ''
            }`}
            onClick={() => onSwitchNetwork('preprod')}
          >
            Preprod
          </button>
          <button
            type="button"
            className={`network-chip ${
              wallet.network === 'preview' ? 'active' : ''
            }`}
            onClick={() => onSwitchNetwork('preview')}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Disconnected State */}
      {!wallet.isConnected ? (
        <div className="disconnected-body">
          <div className="connect-prompt">
            <h3 className="section-heading">Connect Lace Wallet</h3>
            <p className="section-subtext">
              Link your Midnight Lace extension on <strong>Preprod</strong> to
              generate local ZK proofs and interact with the Crescent Vault.
            </p>
          </div>

          {wallet.error && (
            <div className="error-banner">
              <div className="error-icon">!</div>
              <div className="error-content">
                <strong>Connection Alert:</strong>
                <p>{wallet.error}</p>
              </div>
            </div>
          )}

          {!wallet.isInstalled && (
            <div className="notice-banner">
              <span className="notice-badge">Extension Guide</span>
              <p>
                Lace wallet is not detected. Please install the Midnight Lace
                extension for Chromium/Brave and switch the network to{' '}
                <strong>Midnight Preprod</strong>.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflim"
                target="_blank"
                rel="noreferrer"
                className="external-link"
              >
                Get Lace Extension &rarr;
              </a>
            </div>
          )}

          <div className="wallet-actions">
            <button
              className="btn btn-crescent btn-glow"
              onClick={onConnect}
              disabled={wallet.isConnecting}
            >
              {wallet.isConnecting ? (
                <>
                  <span className="spinner" />
                  Connecting to Lace...
                </>
              ) : (
                'Connect Lace on Preprod'
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Connected State */
        <div className="connected-body">
          <div className="wallet-details-grid">
            <div className="detail-item">
              <span className="detail-label">Transparent Address</span>
              <div className="address-row">
                <span className="mono address-value">
                  {truncate(wallet.address, 10, 8)}
                </span>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => copyToClipboard(wallet.address || '')}
                  title="Copy wallet address"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Shielded Reserve Status</span>
              <div className="shielded-badge-row">
                <span className="shield-tag">ZK Shielded Witness Ready</span>
                <span className="shield-sub">Off-Chain Client Storage</span>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Preprod Contract</span>
              <div className="address-row">
                <span className="mono address-value">
                  {truncate(contractAddress, 8, 8)}
                </span>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => copyToClipboard(contractAddress, true)}
                  title="Copy contract address"
                >
                  {copiedContract ? '✓ Copied' : 'Copy'}
                </button>
                <a
                  href={`https://explorer.preprod.midnight.network/contract/${contractAddress}`}
                  target="_blank"
                  rel="noreferrer"
                  className="explorer-anchor"
                  title="View contract on Midnight Preprod Explorer"
                >
                  Explorer &#8599;
                </a>
              </div>
            </div>
          </div>

          <div className="wallet-footer-row">
            <div className="wallet-status-tag">
              <span className="vault-check">✓</span>
              <span>Lace Session Active ({wallet.walletName || 'Midnight'})</span>
            </div>
            <button
              type="button"
              className="btn btn-ghost-danger"
              onClick={onDisconnect}
            >
              Disconnect Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
