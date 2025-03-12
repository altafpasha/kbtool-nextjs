// next.config.mjs
const nextConfig = {
    // ... your existing config
    async headers() {
      return [
        {
          source: '/sw.js',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, max-age=0',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;