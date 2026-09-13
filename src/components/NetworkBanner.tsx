import React, { useState } from 'react';

interface NetworkBannerProps {
  contractAddress: string;
  network: string;
}

export const NetworkBanner: React.FC<NetworkBannerProps> = ({
  contractAddress,
  network,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="network-banner-container">
      <div className="network-status-left">
        <span className="live-orb" />
        <div className="network-labels">
          <span className="network-name">Midnight {network.toUpperCase()}</span>
          <span className="network-sub">Zero-Knowledge Consensus</span>
        </div>
      </div>

      <div className="contract-address-strip">
        <span className="contract-strip-label">Preprod Contract:</span>
        <span className="mono contract-strip-hash">{contractAddress}</span>
        <button
          type="button"
          className="btn-copy-strip"
          onClick={handleCopy}
          title="Copy contract address"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
        <a
          href={`https://explorer.preprod.midnight.network/contract/${contractAddress}`}
          target="_blank"
          rel="noreferrer"
          className="btn-link-strip"
        >
          Explorer &#8599;
        </a>
      </div>
    </div>
  );
};
