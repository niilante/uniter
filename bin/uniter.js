#!/usr/bin/env node

/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global process, require */
(function () {
    'use strict';

    var modular = require('modular-amd'),
        optionsManager = require('node-getopt').create([
            ['r', 'run=<code>', 'Run PHP <code> without using script tags <? ... ?>']
        ]),
        parsedOptions = optionsManager.parseSystem();

    // FIXME!! (In Modular)
    modular.configure({
        paths: {
            'Modular': '/node_modules/modular-amd'
        }
    });

    modular.require([
        'uniter'
    ], function (
        uniter
    ) {
        var phpEngine;

        if (parsedOptions.options.run) {
            phpEngine = uniter.createEngine('PHP');

            phpEngine.execute('<?php ' + parsedOptions.options.run).fail(function (error) {
                process.stderr.write(error.getMessage() + '\n');
            });

            process.stdout.write(phpEngine.getStdout().readAll());
        } else {
            optionsManager.showHelp();
            process.exit(1);
        }
    });
}());
