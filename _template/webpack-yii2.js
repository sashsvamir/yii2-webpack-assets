
const config = {

	// This directory was cleaned on every webpack builds
	envOutputPath: './webpack/dist',

	// Webpack assets root directory
	webpackAssetsPath: './webpack/',

	// Here you can set file with global style variables, this file was imported for every loaded style file:
	// globalStyleVariablesFile: './frontend/assets/WebpackApp/src/_settings.sass',

	entry: {

		// Here you set webpack entry points (where key is a name of asset bundle), example:

		// app: [
		// 	'./frontend/assets/WebpackApp/src/app.js',
		// 	'./frontend/assets/WebpackApp/src/app.sass',
		// ],
		//
		// category: [
		// 	'./modules/category/frontend/assets/src/category.sass',
		// ],


	},

}

module.exports = config