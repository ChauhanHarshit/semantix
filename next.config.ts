/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Configure rewrites if needed
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.example.com/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig; 