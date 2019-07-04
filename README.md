Yii2 Webpack assets extension
=============================


Description
------------

With this extension you can buid Yii assets (with js, css) for your app with Webpack.
You can create separately assets with different dependencies.
All frontend dependencies of your app stored in `package.json` file.




Installation
------------

1. `composer require sashsvamir/yii2-webpack-assets:"*@dev"`


2. Copy contents of `_template` directory to root directory of your project. 


3. Set `@webpack` alias to common bootstrap config `/common/config/bootstrap.php` of your app:
```php
Yii::setAlias('@webpack', dirname(dirname(__DIR__)) . '/webpack');
```


4. Next, install webpack dependencies:
```
npm install
```

5. Also, probably you want to add directory `node_modules` to `.gitignore` in root
```
# js
/node_modules
```





Usage
------------



To add `js` and `css` files to webpack bundle, follow next steps:

1. Install if needed requires npm modules of your js asset:
```
npm i --save-dev axios
```

2. Add bundle name (ex: `mybundle`) and sources `js`, `sass` files to `entry` section of `./webpack-yii.js`, example:
```js
  entry: {
	// ...
    "mybundle": [
      './modules/category/frontend/assets/src/category.js',
      './modules/category/frontend/assets/src/category.sass',
    ],
	  globalStyleVariablesFile: '...',
  }
```

Note: You can set only sass file, in that case js file will not be generated.

Note: You can prepare each style files with pre-imported global variables from file specified in `globalStyleVariablesFile` section of `./webpack-yii.js`,
in that case also you must uncomment `loader: 'sass-resources-loader'` block in `webpack.config.js`:


3. Next run building the bundles by one of follow commands:
```sh
yarn run dev
yarn run watch
yarn run production
```


4. Extends `WebpackAssetBundle` class and fill `bundles` attribute with bundles name, need to be registered in view:
(get entry key as bundle name from `@webpack/dist/webpack-assets.json`)
```php
class WebpackMyAsset extends WebpackAssetBundle {
	public $bundles = [ 'mybundle' ];
}
```


5. Now, register created on step `4` asset class in view:
```php
\Yii::$app->getView()->registerAssetBundle(WebpackMyAsset::class);
// or in view:
WebpackMyAsset::register($this);
```

