import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

module.exports = {
  entry: path.join(__dirname,'src','index.js'),
  output: {
    path: path.join(__dirname,'build'),
    filename: 'index.bundle.js'
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
        {
            // this is so that we can compile any React,
            // ES6 and above into normal ES5 syntax
            test: /\.(js|jsx)$/,
            // we do not want anything from node_modules to be compiled
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.scss$/,
            use: [
                // fallback to style-loader in development
                process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                "css-loader",
                {
                    loader: 'sass-loader',
                    options: {includePaths: [path.resolve(__dirname, "src/assets/main")]}
                }
            ]
        },
        // {
        //   test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        //   loaders: ['file-loader']
        // },
        {
          test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 85000 // Convert images < 8kb to base64 strings
                  // name: 'assets/images/[hash]-[name].[ext]'
              } 
          }]
        }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname,'src'),
    historyApiFallback: true,
    // hot: true,
    // inline: true,
    host: "localhost",
    port: 8082,
    watchOptions: {
        poll: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'src','index.html')
    }),
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
  ]
};