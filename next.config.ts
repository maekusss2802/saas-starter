import type { NextConfig } from 'next';

// When the app is served through a reverse proxy (preview environments, tunnels,
// container platforms) the forwarded host does not match the browser's origin.
// Next.js then rejects Server Action POSTs and warns about cross-origin requests
// for /_next/* dev assets. Accept a comma-separated allowlist from the
// environment so no proxy hostname has to be hardcoded. Empty by default, so
// normal local and production behaviour is unchanged.
const proxyOrigins = (process.env.ALLOWED_PROXY_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  ...(proxyOrigins.length > 0 ? { allowedDevOrigins: proxyOrigins } : {}),
  experimental: {
    ppr: true,
    clientSegmentCache: true,
    ...(proxyOrigins.length > 0
      ? { serverActions: { allowedOrigins: proxyOrigins } }
      : {})
  }
};

export default nextConfig;
