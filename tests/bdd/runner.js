/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global define, require */
define({
    cache: false,
    paths: {
        'bdd': '.',
        'js': '/../../js',
        'languages': '/../../languages',

        // FIXME!! (In Modular)
        'Modular': require.config().paths.Modular,

        'vendor': '/../../vendor'
    }
}, [
    'chai/chai',
    'modular',
    'require',
    'sinon/sinon',
    'sinon-chai/sinon-chai',
    'Mocha',

    // Init util.js
    'js/Uniter'
], function (
    chai,
    modular,
    require,
    sinon,
    sinonChai,
    Mocha
) {
    'use strict';

    var global = modular.util.global;

    chai.use(sinonChai);

    global.expect = chai.expect;
    global.sinon = sinon;

    return function (options, callback) {
        var mocha = new Mocha({
            'ui': 'bdd',
            'reporter': options.reporter || mocha.reporters.HTML,
            'globals': ['setTimeout', 'setInterval', 'clearTimeout', 'clearInterval']
        });

        // Expose Mocha functions in the global scope
        mocha.suite.emit('pre-require', global, null, mocha);

        require([
            'bdd/integration/languages/PHP/engine/smallTest',
            'bdd/integration/languages/PHP/grammar/smallTest',
            'bdd/integration/languages/PHP/interpreter/smallTest',
            'bdd/unit/js/InterpreterTest',
            'bdd/unit/js/ParserTest',
            'bdd/unit/js/StreamTest'
        ], function () {
            mocha.run(callback);
        });
    };
});