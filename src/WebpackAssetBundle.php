<?php
namespace sashsvamir\webpackAssets;

use yii\base\InvalidConfigException;
use yii\web\AssetBundle;
use yii\helpers\Json;
use Exception;
use Yii;


/**
 * see: https://github.com/pgaultier/yii2-webpack/blob/devel/src/WebpackAssetBundle.php
 *
 * See `/README.md` to instruction how to use this WebpackAssetBundle
 *
 */
class WebpackAssetBundle extends AssetBundle
{
	/**
	 * @var string
	 */
	public $assetPath = '@webpack/webpack-assets.json';

	/**
	 * @var string
	 */
	public $webpackPath = '@webpack';

	/**
	 * @var string
	 */
	public $distDirName = 'dist';

	/*
	 * array list of bundles from webpackAssets json file to register in view
	 */
	public $bundles = [];

	/**
	 * @inheritdoc
	 */
	public function init() {

		if (empty($this->bundles)) {
			throw new InvalidConfigException("You should set at least one bundle name to 'bundle' attribute of '" . static::class . "' class.");
		}

		try {
			$this->prepareBundle();
		} catch (Exception $e) {
			Yii::error($e->getMessage(), static::class);
			throw $e;
		}
		parent::init();
	}

	/**
	 * Prepare bundles to register on view
	 */
	public function prepareBundle() {
		// set public dir
		$this->sourcePath = Yii::getAlias($this->webpackPath . '/' . $this->distDirName);

		// prepare webpack bundles
		$webpackBundles = file_get_contents(Yii::getAlias($this->assetPath));
		$webpackBundles = Json::decode($webpackBundles);

		// register asset files
		foreach ($this->bundles as $bundle) {
			if ($webpackBundles[$bundle]) {
				if (isset($webpackBundles[$bundle]['js'])) {
					$this->js[] = $webpackBundles[$bundle]['js'];
				}
				if (isset($webpackBundles[$bundle]['css'])) {
					$this->css[] = $webpackBundles[$bundle]['css'];
				}
			} else {
				throw new Exception("Can't find bundle '${bundle}' in " . static::class);
			}
		}
	}

}
