/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/upload',
        destination: 'http://localhost:5000/upload',
      },
      {
        source: '/status/:videoId',
        destination: 'http://localhost:5000/status/:videoId',
      },
      {
        source: '/video/:videoId',
        destination: 'http://localhost:5000/video/:videoId',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
      {
        source: '/processed/:path*',
        destination: 'http://localhost:5000/processed/:path*',
      },
    ];
  },
};

export default nextConfig;

