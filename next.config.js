/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:hash',
        destination: `${process.env.SERVER_URL}:hash`,
      },
      {
        source: '/api/new',
        destination: `${process.env.SERVER_URL}new`,
      },
    ];
  },
};

module.exports = nextConfig;
