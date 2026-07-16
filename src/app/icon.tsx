import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f6efe7',
          borderRadius: 18,
        }}
      >
        <svg width="52" height="52" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <rect width="64" height="64" rx="16" fill="#f6efe7" />
          <path d="M20 19c0-6 5-10 10-10 7 0 11 4 11 10 0 3-2 6-3 9h-3c-1-2-2-4-3-6-1 2-2 4-3 6h-3c-1-3-3-6-3-9Z" fill="#8d7a4e" />
          <path d="M18 37c0-5 5-9 10-9h8c5 0 10 4 10 9v3H18v-3Z" fill="#6f7957" />
        </svg>
      </div>
    ),
    size,
  );
}
