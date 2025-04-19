import bundleAnalyzer from '@next/bundle-analyzer';


/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
  },
  compress: true,
  reactStrictMode: false,
    webpack(config, {dev, isServer}) {
      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        };
      }
        config.module.rules.push({
            test: /\.(mp3)$/,
            use: [{
              loader: 'file-loader',
              options: {
                publicPath: '/_next/static/sounds/',
                outputPath: 'static/sounds/',
                name: '[name].[ext]',
                esModule: false,
              },
            }],
          });
          
      return config;
    },
  });



export default nextConfig;
