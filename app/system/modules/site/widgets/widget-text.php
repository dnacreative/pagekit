<?php

return [

    'name' => 'system/widget-text',

    'label' => 'Text',

    'type' => 'widget',

    'render' => function ($widget) use ($app) {
        return $app['view']->render('system/site/widget-text.php', compact('widget'));
    },

    'events' => [

        'view.scripts' => function ($event, $scripts) {
            $scripts->register('widget-text', 'system/site:app/bundle/widget-text.js', '~widgets');
        }

    ]

];
