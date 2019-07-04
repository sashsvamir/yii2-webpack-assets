const path = require('path');
const argv = require('yargs').argv;
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

// also, see: https://github.com/AnujRNair/webpack-extraneous-file-cleanup-plugin
const DeleteNoJsEntriesPlugin = require('webpack-delete-no-js-entries-plugin');




// load config
let confPath = './webpack-yii2.js';
if (argv.env && argv.env.config) {
	confPath = path.join(__dirname, argv.env.config, confPath);
}
if (!fs.existsSync(confPath)) {
	throw 'Error: file "' + confPath + '" not found.';
}
const config = require(confPath);







const webpackConfig = (env) => {

	const	IS_PROD = (env !== undefined) ? (env.production === true) : false;
	const ENV = IS_PROD ? 'production' : 'development';
	// console.log(IS_PROD)
	// console.log(ENV)
	// todo: fix when WebpackAssetBundle can't find dev directory
	// outputPath = IS_PROD ? config.envOutputPath : config.envOutputPath + '-dev';
	outputPath = config.envOutputPath;


	return {

		entry: config.entry,

		output: {
			path: path.resolve(__dirname, outputPath),
			filename: IS_PROD ? '[name].js?v=wp[chunkhash:6]' : '[name].dev-[chunkhash:6].js',
			// chunkFilename: IS_PROD ? '[id].bundle.js?v=wp[chunkhash:6]' : '[id].bundle.dev-[chunkhash:6].js',
		},


		mode: ENV,
		devtool: IS_PROD ? 'none' : 'eval', // source map
		stats: {
			colors: true
		},



		module: {
			rules: [

				/*{
					test: /\.css$/,
					use: [
						'style-loader', // creates style nodes from JS strings
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader', // translates CSS into CommonJS
							options: {
								url: false
							}
						},
					],
				},*/

				{
					test: /\.sass$/,
					use: [
						// 'style-loader', // creates style nodes from JS strings (comment to remove from bundle follow modules: "addStyles", "urls")
						{
							loader: MiniCssExtractPlugin.loader
						},
						{
							loader: 'css-loader', // translates css into CommonJS
							options: {
								url: true // handle urls
							}
						},
						{
							loader: 'sass-loader', // compiles sass to css
							options: {
								outputStyle: IS_PROD ? 'compressed' : 'nested',
							}
						},
						// {
						// 	loader: 'sass-resources-loader',
						// 	options: {
						// 		resources: config.globalStyleVariablesFile, // Provide path to the file or array of files with resources
						// 	},
						// },
					]
				},

				{
					test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
					loader: 'url-loader',
					options: {
						limit: 10000 // in bytes
					}
				},

				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					}
				},

			]
		},




		plugins: [

			new CleanWebpackPlugin([
				outputPath,
			], {
				verbose: false,
			}),

			new DeleteNoJsEntriesPlugin({}), // own plugin

			new MiniCssExtractPlugin({
				// Options similar like webpackOptions.output
				filename: IS_PROD ? '[name].css?v=wp[chunkhash:6]' : '[name].dev-[chunkhash:6].css',
				// chunkFilename: IS_PROD ? '[id].bundle.css?v=[chunkhash:6]' : '[id].bundle.dev-[chunkhash:6].css',
			}),

			new AssetsPlugin({
				prettyPrint: true,
				path: path.join(__dirname, config.webpackAssetsPath),
				includeAllFileTypes: false,
				// fileTypes: ['js', 'css'],
				// includeManifest: true,
			}),

		],




		optimization: {

			/*
			// see: https://webpack.js.org/configuration/optimization
			// minimize: true,
			// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true // set to true if you want JS source maps
				}),
			],*/

			// runtimeChunk: 'multiple', // make additional chunk with runtime code to each entrypoint
			// runtimeChunk: 'single', // make additional common chunk with runtime code of each entrypoint

			removeEmptyChunks: true,

			// see: https://webpack.js.org/plugins/split-chunks-plugin
			splitChunks: {

				// name: 'common',
				// chunks: 'all',

				cacheGroups: {

					// extracting all CSS in a single file:
					/*styles: {
						name: 'styles',
						test: /\.sass$/,
						chunks: 'all',
						enforce: true,
					},*/


					/*commons: {
						name: 'common',
						// filename: 'hz.js',
						test: /\.js$/,
						// test: (module, chunk) => {}
						chunks: 'all', // 'initial'
						enforce: true, // form this chunk irrespective of the size of the chunk
						// fallbackCacheGroup: 'hz',
					}*/

				},



			},


			/*runtimeChunk: {
				name: 'manifest',
			},*/

		},




	}
};

module.exports = webpackConfig
