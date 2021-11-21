/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  env: {
    testnetApi: process.env.TESTNET_API,
    mainnetApi: process.env.MAINNET_API,
    profileApi: process.env.PROFILE_API,
    ssrBackendApi: process.env.SSR_BACKEND_API,
  },
  // TODO: delete this after marketplace is done
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: true,
      },
      {
        source: '/auctions',
        destination: '/coming-soon',
        permanent: true,
      },
    ];
  },
});
