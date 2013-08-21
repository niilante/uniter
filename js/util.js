/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global define, require */
define([
    'modular',
    'require'
], function (
    modular,
    scopedRequire
) {
    'use strict';

    var inheritFrom = Object.create || function (from) {
        function F() {}
        F.prototype = from;
        return new F();
    },
        util = inheritFrom(modular.util),
        Promise;

    return util.extend(util, {
        from: function (from) {
            return {
                to: function (to, callback) {
                    var number;

                    for (number = from; number < to; number += 1) {
                        callback(number, number - from);
                    }
                }
            };
        },

        get: util.global.process ? function (path) {
            var fs = require('fs'),
                promise = new Promise();

            fs.fs.readFile(fs.basePath + path, function (error, data) {
                if (error) {
                    promise.reject(error);
                } else {
                    promise.resolve(data.toString());
                }
            });

            return promise;
        } : function (uri) {
            var promise = new Promise(),
                xhr = new util.global.XMLHttpRequest();

            xhr.open('GET', uri, true);
            xhr.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        promise.resolve(this.responseText);
                    } else {
                        promise.reject();
                    }
                }
            };
            xhr.send('');

            return promise;
        },

        inherit: function (To) {
            return {
                from: function (From) {
                    To.prototype = inheritFrom(From.prototype);
                    To.prototype.constructor = To;
                }
            };
        },

        // Breaks the circular dependency between js/Uniter.js<->js/util.js
        init: function (callback) {
            scopedRequire([
                'js/Promise'
            ], function (
                PromiseClass
            ) {
                Promise = PromiseClass;
                callback();
            });
        },

        regexEscape: function (text) {
            // See http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
            return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        },

        sortObject: function (object) {
            var result;

            if (!util.isPlainObject(object)) {
                return object;
            }

            result = {};

            util.each(Object.keys(object).sort(), function (name) {
                result[name] = util.sortObject(object[name]);
            });

            return result;
        }
    });
});