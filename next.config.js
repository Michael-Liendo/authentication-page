/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/new',
        destination: `${process.env.SERVER_URL}new`,
      },
    ];
  },
};

module.exports = nextConfig;
