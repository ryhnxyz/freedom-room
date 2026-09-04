/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/app',
        destination: 'https://app.freedomroom.id',
        permanent: false,
      },
      {
        source: '/app/:path*',
        destination: 'https://app.freedomroom.id/:path*',
        permanent: false,
      },
      {
        source: '/models/:slug',
        destination: '/room/:slug',
        permanent: true,
      },
      {
        source: '/unit/:slug',
        destination: '/room/:slug',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
