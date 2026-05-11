import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
    workerThreads: false,
    cpus: 1,
  },
};

export default nextConfig;
