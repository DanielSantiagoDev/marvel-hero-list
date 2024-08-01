/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    MARVEL_PUBLIC_KEY: process.env.MARVEL_PUBLIC_KEY,
    MARVEL_PRIVATE_KEY: process.env.MARVEL_PRIVATE_KEY,
  },
  staticPageGenerationTimeout: 150000
};

export default nextConfig;
