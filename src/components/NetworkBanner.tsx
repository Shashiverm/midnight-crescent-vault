import React, { useState, useEffect } from 'react';
import { safeString } from '../hooks/useMidnight';

interface NetworkBannerProps {
  contractAddress?: string;
  network?: string;
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({
  contractAddress = '',
  network = 'preprod',
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [latency, setLatency] = useState<number>(134);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(120 + Math.floor(Math.random() * 25));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    const clean = safeString(contractAddress);
    if (!clean) return;
    navigator.clipboard.writeText(clean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncate = (val: any, start = 12, end = 10): string => {
    if (!val) return '—';
    const str = safeString(val);
    if (str.length <= start + end) return str;
    return `${str.substring(0, start)}...${str.substring(str.length - end)}`;
  };

  const safeNet = safeString(network) || 'preprod';
  const explorerBase =
    safeNet.toLowerCase() === 'preview'
      ? 'https://explorer.preview.midnight.network'
      : 'https://explorer.preprod.midnight.network';

  return (
    <div className="network-banner-container">
      <div className="network-status-left">
        <span className="live-orb" />
        <div className="network-labels">
          <div className="network-title-line">
            <span className="network-name">Midnight {safeNet.toUpperCase()}</span>
            <span className="latency-badge mono">{latency}ms</span>
          </div>
          <span className="network-sub">Zero-Knowledge Consensus Engine</span>
        </div>
      </div>

      <div className="contract-address-strip">
        <span className="contract-strip-label">Contract:</span>
        <span className="mono contract-strip-hash" title={contractAddress}>
          {truncate(contractAddress)}
        </span>
        <button
          type="button"
          className="btn-copy-strip"
          onClick={handleCopy}
          title="Copy contract address"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <a
          href={explorerBase}
          target="_blank"
          rel="noreferrer"
          className="btn-link-strip"
          title="Open Midnight Night Scan Explorer"
        >
          Explorer &#8599;
        </a>
      </div>
    </div>
  );
};
