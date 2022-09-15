/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:hash',
        destination: 'http://127.0.0.1:2000/:hash',
      },
      {
        source: '/api/new',
        destination: 'http://127.0.0.1:2000/new',
      },
    ];
  },
};

module.exports = nextConfig;
