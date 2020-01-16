const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
module.exports = withSass(withBundleAnalyzer({
  webpack (config) {
    const { module = {target: 'serverless'} } = config
    return {
      ...config,
      module: {
        ...module,
        rules: [
          ...(module.rules || []),
          {
            test: /\.(png|woff|woff2|eot|ttf|gif|jpg|ico|svg)$/,
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              publicPath: `/_next/static/files`,
              outputPath: 'static/files'
            }
          }
        ]
      }
    }
  }
}))