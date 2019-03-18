const withSass = require('@zeit/next-sass')
module.exports = withSass({
  webpack (config) {
    const { module = {} } = config
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
})