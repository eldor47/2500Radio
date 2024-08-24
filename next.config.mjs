/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eldor.s3.us-west-1.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
