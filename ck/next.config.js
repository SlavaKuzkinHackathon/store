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
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      issuer: {
        and: [/\.(js|ts|css|scss|sass)x?$/],
      },
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
      issuer: {
        and: [/\.(js|ts|css|scss|sass)x?$/],
      },
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    });

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
   output: 'standalone',
  //pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
   images: {
    remotePatterns: nextImageRemotes,
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 3600,
    formats: ['image/webp'],
  }, 
}

module.exports = withPlugins([withBundleAnalyzer], nextConfig);
