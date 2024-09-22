/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: 'standalone',
  productionBrowserSourceMaps: true,
  experimental: {
    instrumentationHook: true,
  },
};
