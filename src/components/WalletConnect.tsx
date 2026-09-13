import React, { useState } from 'react';
import { WalletState, MidnightNetwork, safeString } from '../hooks/useMidnight';

interface WalletConnectProps {
  wallet: WalletState;
  onConnect: () => Promise<void>;
  onConnectDev: () => Promise<void>;
  onDisconnect: () => void;
  onSwitchNetwork: (network: MidnightNetwork) => void;
  contractAddress?: string;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  wallet,
  onConnect,
  onConnectDev,
  onDisconnect,
  onSwitchNetwork,
  contractAddress = '',
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedContract, setCopiedContract] = useState<boolean>(false);

  const copyToClipboard = (text: any, isContract: boolean = false) => {
    const clean = safeString(text);
    if (!clean) return;
    navigator.clipboard.writeText(clean);
    if (isContract) {
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncate = (val: any, start = 12, end = 8): string => {
    if (!val) return '—';
    const str = safeString(val);
    if (str.length <= start + end) return str;
    return `${str.substring(0, start)}...${str.substring(str.length - end)}`;
  };

  const safeNetwork = (wallet?.network || 'preprod').toLowerCase() as MidnightNetwork;
  const explorerBase =
    safeNetwork === 'preview'
      ? 'https://explorer.preview.midnight.network'
      : 'https://explorer.preprod.midnight.network';

  const balanceDisplay = typeof wallet?.balance === 'number' && !isNaN(wallet.balance)
    ? wallet.balance.toLocaleString()
    : '0';

  return (
    <div className="crescent-card wallet-card">
      <div className="card-header">
        <div className="card-header-left">
          <div className="status-indicator">
            <span
              className={`ping-dot ${
                wallet?.isConnected ? 'ping-active' : 'ping-idle'
              }`}
            />
            <span className="status-text">
              {wallet?.isConnected
                ? wallet.isDevKeystore
                  ? 'Dev Keystore Active'
                  : 'Lace Connected'
                : 'Wallet Disconnected'}
            </span>
          </div>
          <span className="network-pill">
            Midnight {safeNetwork.toUpperCase()}
          </span>
        </div>

        {/* Network selector toggle */}
        <div className="network-toggle-group">
          <button
            type="button"
            className={`network-chip ${
              safeNetwork === 'preprod' ? 'active' : ''
            }`}
            onClick={() => onSwitchNetwork('preprod')}
          >
            Preprod
          </button>
          <button
            type="button"
            className={`network-chip ${
              safeNetwork === 'preview' ? 'active' : ''
            }`}
            onClick={() => onSwitchNetwork('preview')}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Disconnected State */}
      {!wallet?.isConnected ? (
        <div className="disconnected-body">
          <div className="connect-prompt">
            <h3 className="section-heading">Connect Midnight Wallet</h3>
            <p className="section-subtext">
              Connect your <strong>Midnight Lace</strong> browser extension or use the in-memory{' '}
              <strong>Dev Keystore</strong> to test zero-knowledge solvency verification.
            </p>
          </div>

          {wallet?.error && (
            <div className="error-banner">
              <div className="error-icon">!</div>
              <div className="error-content">
                <strong>Connection Error:</strong>
                <p>{safeString(wallet.error)}</p>
              </div>
            </div>
          )}

          <div className="wallet-actions-stack">
            <button
              className="btn btn-crescent btn-large btn-full"
              onClick={onConnect}
              disabled={Boolean(wallet?.isConnecting)}
            >
              {wallet?.isConnecting ? (
                <>
                  <span className="spinner" />
                  Connecting to Lace...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="4" />
                    <circle cx="16" cy="12" r="2" />
                  </svg>
                  Connect Midnight Lace Extension
                </>
              )}
            </button>

            <button
              className="btn btn-secondary-subtle btn-full"
              onClick={onConnectDev}
              disabled={Boolean(wallet?.isConnecting)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Quick Test with Dev Keystore (Browser Sandbox)
            </button>
          </div>

          {!wallet?.isInstalled && (
            <div className="notice-banner" style={{ marginTop: '16px' }}>
              <span className="notice-badge">Extension Guide</span>
              <p>
                Don&apos;t have Lace installed yet? Use the <strong>Dev Keystore</strong> above for immediate evaluation, or install Lace from the store.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflim"
                target="_blank"
                rel="noreferrer"
                className="external-link"
              >
                Install Midnight Lace Extension &rarr;
              </a>
            </div>
          )}
        </div>
      ) : (
        /* Connected State */
        <div className="connected-body">
          <div className="wallet-details-grid">
            <div className="detail-item">
              <span className="detail-label">Transparent Address</span>
              <div className="address-row">
                <span className="mono address-value">
                  {truncate(wallet.address, 12, 8)}
                </span>
                <button
                  type="button"
                  className="btn-icon"
                  onClick={() => copyToClipboard(wallet.address)}
                  title="Copy address"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Wallet Reserve Balances</span>
              <div className="balance-row">
                <div>
                  <span className="balance-number">{balanceDisplay}</span>
                  <span className="balance-unit"> tDUST</span>
                </div>
                <div className="shield-tag-pill">
                  <span className="shield-dot" />
                  <span>Shielded Vault Ready</span>
                </div>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-label">Active Contract</span>
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
                  href={explorerBase}
                  target="_blank"
                  rel="noreferrer"
                  className="explorer-anchor"
                  title="Open Night Scan Explorer"
                >
                  Explorer &#8599;
                </a>
              </div>
            </div>
          </div>

          <div className="wallet-footer-row">
            <div className="wallet-status-tag">
              <span className="vault-check">✓</span>
              <span>{safeString(wallet.walletName) || 'Midnight Session'}</span>
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
