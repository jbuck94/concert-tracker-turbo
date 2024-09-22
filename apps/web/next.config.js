/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['apollo-hooks'],
  output: 'standalone',
  productionBrowserSourceMaps: true,
  experimental: {
    instrumentationHook: true,
  },
};
