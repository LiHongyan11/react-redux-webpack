var webpack = require("webpack");
require("babel-polyfill");
const cssnext = require('postcss-cssnext');
const postcssFlexFallback = require('postcss-flex-fallback');
const postcssPx2rem = require('postcss-px2rem');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
	env = env || 'dev';
	var isDev = env === 'dev';
  var plugins = [];

  var entryList = ['index'];

	if (!isDev) {
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }));
    
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));

    plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }));
    
    entryList.map(function(name) {
      plugins.push(new HtmlWebpackPlugin({
        filename: './' + name + '.html',
        template: './dev/tmpl.html',
        jsName: name,
        inject: false
      }));
    });
  }

	var conf = {
		entry: {
      index: ['babel-polyfill', './app/index.js'],
      vendor: [
        'react',
        'react-dom',
        'react-router',
        'react-router-redux',
        'redux',
        'react-redux',
        'redux-thunk',
        'lodash',
        'history',
        'superagent'
      ]
    },

		output: {
			path: isDev ? './dev' : './dist',
      publicPath: "/",
			filename: isDev ? '[name].js' : '[name].[chunkhash:8].js',
		},

		debug: true,

		resolve: {
	    extensions: ['', '.js', '.jsx', '.scss']
	  },

		// externals: [
		// 	/^react(\/.*)?$/,
		// 	/^reflux(\/.*)?$/,
		// 	"superagent"
		// ],
		//
		// plugins: [new webpack.PrefetchPlugin("react")],
    plugins: plugins,
		module: {
			loaders: [
				{
					test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|otf)$/,
					loader: 'url-loader?limit=10000'
				},

				{
					test: /\.(js|jsx)$/,
					loader: 'react-hot-loader!babel?cacheDirectory=true&presets[]=react,presets[]=es2015,presets[]=react',
					exclude: /(node_modules|bower_components)/
				},

				{
				  test: /\.(scss|css)$/,
				  loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 versions", "Android >= 2.1", "iOS >= 7.0"]}!sass?outputStyle=expanded'
				}
			]
		},
    postcss: function() {
      return [
        cssnext({ browsers: ['last 2 versions', 'Android >= 2.1', 'iOS >= 7.0'] }),
        postcssFlexFallback(),
        postcssPx2rem({remUnit: 75})
      ]
    }
	};

	return conf;
};
