/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)', // apply to all routes
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "frame-ancestors 'self' http://localhost:1337",
            },
          ],
        },
      ];
    },
  };

export default nextConfig;
