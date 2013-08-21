/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    'js/util',
    'js/Exception'
], function (
    util,
    Exception
) {
    'use strict';

    var hasOwn = {}.hasOwnProperty;

    function Interpreter(spec, stdin, stdout, stderr) {
        this.spec = spec;
        this.stderr = stderr;
        this.stdin = stdin;
        this.stdout = stdout;
    }

    util.extend(Interpreter.prototype, {
        interpret: function (node) {
            var interpreter = this,
                nodeName,
                spec = interpreter.spec,
                stderr = interpreter.stderr,
                stdin = interpreter.stdin,
                stdout = interpreter.stdout;

            if (!hasOwn.call(node, 'name')) {
                throw new Exception('Interpreter.interpret() :: Invalid AST node provided');
            }

            nodeName = node.name;

            if (!hasOwn.call(spec.nodes, nodeName)) {
                throw new Exception('Interpreter.interpret() :: Spec does not define how to handle node "' + nodeName + '"');
            }

            return spec.nodes[nodeName].call(interpreter, node, function (node) {
                if (util.isString(node)) {
                    return node;
                } else {
                    return interpreter.interpret(node);
                }
            }, stdin, stdout, stderr);
        }
    });

    return Interpreter;
});