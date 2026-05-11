import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    if (process.env.DEMO !== 'true') return [];
    return [{ source: '/', destination: '/sign-in/drake', permanent: false }];
  },
  experimental: {
    globalNotFound: true,
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
