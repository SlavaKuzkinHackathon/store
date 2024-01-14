/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextImageRemotes = [];

if (process.env.NEXT_IMAGE_REMOTES !== '') {
  const urls = process.env.NEXT_IMAGE_REMOTES.split(',');

  urls.forEach((url) => {
    nextImageRemotes.push({
      hostname: url,
    });
  });
}


const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
  },
}

module.exports = withPlugins([withBundleAnalyzer], nextConfig);

