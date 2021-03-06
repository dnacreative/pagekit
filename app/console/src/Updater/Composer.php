<?php

namespace Pagekit\Console\Updater;

use Composer\Package\Loader\ArrayLoader;

class Composer
{
    public static function packages($event)
    {
        global $packages;

        if (!$packages && file_exists(Updater::CONFIG_FILE)) {
            $packages = json_decode(file_get_contents(Updater::CONFIG_FILE), true);
        }

        if ($packages) {

            $loader = new ArrayLoader();
            $package = $event->getComposer()->getPackage();
            $requires = $loader->parseLinks($package->getName(), $package->getVersion(), 'requires', $packages);

            $package->setRequires(array_merge($package->getRequires(), $requires));
        }
    }
}
