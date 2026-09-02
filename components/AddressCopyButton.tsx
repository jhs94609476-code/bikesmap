'use client';

import { useState } from 'react';

interface Props {
  address: string;
}

export default function AddressCopyButton({ address }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      // 구형 브라우저 fallback
      const el = document.createElement('textarea');
      el.value = address;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 22px',
        background: copied ? '#10b981' : '#f3f4f6',
        color: copied ? '#fff' : '#374151',
        border: '1px solid',
        borderColor: copied ? '#10b981' : '#d1d5db',
        borderRadius: '10px',
        fontWeight: 600,
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {copied ? '✓ 복사됨!' : '📋 주소 복사'}
    </button>
  );
}
