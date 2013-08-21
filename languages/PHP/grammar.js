/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*
 * PHP Grammar
 */

/*global define */
define(function () {
    'use strict';

    return {
        ignore: 'N_IGNORE',
        rules: {
            'T_ABSTRACT': /abstract\b/i,
            'T_AND_EQUAL': /&=/i,
            'T_ARRAY': /array\b/i,
            'T_ARRAY_CAST': /\(\s*array\s*\)/i,
            'T_AS': /as\b/i,

            // Anything below ASCII 32 except \t (0x09), \n (0x0a) and \r (0x0d)
            'T_BAD_CHARACTER': /(?![\u0009\u000A\u000D])[\u0000-\u001F]/,

            'T_BOOLEAN_AND': /&&/i,
            'T_BOOLEAN_OR': /\|\|/,
            'T_BOOL_CAST': /\(\s*bool(ean)?\s*\)/i,
            'T_BREAK': /break\b/i,
            'T_CALLABLE': /callable\b/i,
            'T_CASE': /case\b/i,
            'T_CATCH': /catch\b/i,
            'T_CLASS': /class/i,
            'T_CLASS_C': /__CLASS__/i,
            'T_CLONE': /clone/i,
            'T_CLOSE_TAG': /[?%]>\n?/,
            'T_COMMENT': /(?:\/\/|#)(.*?)[\r\n]+|\/\*(?!\*)([\s\S]*?)\*\//,
            'T_CONCAT_EQUAL': /\.=/,
            'T_CONST': /const\b/i,
            'T_CONSTANT_ENCAPSED_STRING': /(['"])((?:(?!\$\{?[\$a-z0-9_]+)(?:(?!\1)[\s\S]|\\\1))*)\1/,
            'T_CONTINUE': /continue\b/i,
            'T_CURLY_OPEN': /\{(?=\$)/,
            'T_DEC': /--/i,
            'T_DECLARE': /declare\b/i,
            'T_DEFAULT': /default\b/i,
            'T_DIR': /__DIR__\b/i,
            'T_DIV_EQUAL': /\/=/,

            // See http://www.php.net/manual/en/language.types.float.php
            'T_DNUMBER': /\d+\.\d+|\d\.\d+e\d+|\d+e[+-]\d+/i,

            'T_DOC_COMMENT': /\/\*\*([\s\S]*?)\*\//,
            'T_DO': /do\b/i,
            'T_DOLLAR_OPEN_CURLY_BRACES': /\$\{/,
            'T_DOUBLE_ARROW': /=>/,
            'T_DOUBLE_CAST': /\((real|double|float)\)/i,

            // Also defined as T_PAAMAYIM_NEKUDOTAYIM
            'T_DOUBLE_COLON': /::/i,

            'T_ECHO': /echo\b/i,
            'T_ELSE': /else\b/i,
            'T_ELSEIF': /elseif\b/i,
            'T_EMPTY': /empty\b/i,
            'T_ENCAPSED_AND_WHITESPACE': /(?:[^"\${]|\\["\${])+/,
            'T_ENDDECLARE': /enddeclare\b/i,
            'T_ENDFOR': /endfor\b/i,
            'T_ENDFOREACH': /endforeach\b/i,
            'T_ENDIF': /endif\b/i,
            'T_ENDSWITCH': /endswitch\b/i,
            'T_ENDWHILE': /endwhile\b/i,

            // Token gets defined as a pushed token after a Heredoc is found
            'T_END_HEREDOC': /(?!)/,

            'T_EVAL': /eval\b/i,
            'T_EXIT': /(?:exit|die)\b/i,
            'T_EXTENDS': /extends\b/i,
            'T_FILE': /__FILE__\b/i,
            'T_FINAL': /final\b/i,
            'T_FINALLY': /finally\b/i,
            'T_FOR': /for\b/i,
            'T_FOREACH': /foreach\b/i,
            'T_FUNCTION': /function\b/i,
            'T_FUNC_C': /__FUNCTION__\b/i,
            'T_GLOBAL': /global\b/i,
            'T_GOTO': /goto\b/i,
            'T_HALT_COMPILER': /__halt_compiler(?=\(\)|\s|;)/,
            'T_IF': /if\b/i,
            'T_IMPLEMENTS': /implements\b/i,
            'T_INC': /\+\+/,
            'T_INCLUDE': /include\b/i,
            'T_INCLUDE_ONCE': /include_once\b/i,
            'T_INLINE_HTML': /(?:[^<]|<[^?%]|<\?(?!php)[\s\S]{3})+/,
            'T_INSTANCEOF': /instanceof\b/i,
            'T_INSTEADOF': /insteadof\b/i,
            'T_INT_CAST': /\(\s*int(eger)?\s*\)/i,
            'T_INTERFACE': /interface\b/i,
            'T_ISSET': /isset\b/i,
            'T_IS_EQUAL': /==/i,
            'T_IS_GREATER_OR_EQUAL': />=/,
            'T_IS_IDENTICAL': /===/i,
            'T_IS_NOT_EQUAL': /!=|<>/,
            'T_IS_NOT_IDENTICAL': /!==/,
            'T_IS_SMALLER_OR_EQUAL': /<=/,
            'T_LINE': /__LINE__\b/i,
            'T_LIST': /list\b/i,
            'T_LNUMBER': /\d+|0x[0-9a-f]/i,
            'T_LOGICAL_AND': /and\b/i,
            'T_LOGICAL_OR': /or\b/i,
            'T_LOGICAL_XOR': /xor\b/i,
            'T_METHOD_C': /__METHOD__\b/i,
            'T_MINUS_EQUAL': /-=/i,

            // Not used anymore (PHP 4 only)
            'T_ML_COMMENT': /(?!)/,

            'T_MOD_EQUAL': /%=/i,
            'T_MUL_EQUAL': /\*=/,
            'T_NAMESPACE': /namespace\b/i,
            'T_NS_C': /__NAMESPACE__\b/i,
            'T_NS_SEPARATOR': /\\/,
            'T_NEW': /new\b/i,
            'T_NUM_STRING': /\d+/,
            'T_OBJECT_CAST': /\(\s*object\s*\)/i,
            'T_OBJECT_OPERATOR': /->/,

            // Not used anymore (PHP 4 only)
            'T_OLD_FUNCTION': /old_function\b/i,

            'T_OPEN_TAG': /(?:<\?(php)?|<%)\s?(?!=)/,

            'T_OPEN_TAG_WITH_ECHO': /<[?%]=/,
            'T_OR_EQUAL': /\|=/,

            // Also defined as T_DOUBLE_COLON
            'T_PAAMAYIM_NEKUDOTAYIM': /::/i,

            'T_PLUS_EQUAL': /\+=/,
            'T_PRINT': /print\b/i,
            'T_PRIVATE': /private\b/i,
            'T_PUBLIC': /public\b/i,
            'T_PROTECTED': /protected\b/i,
            'T_REQUIRE': /require\b/i,
            'T_REQUIRE_ONCE': /require_once\b/i,
            'T_RETURN': /return\b/i,
            'T_SL': /<</,
            'T_SL_EQUAL': /<<=/,
            'T_SR': />>/,
            'T_SR_EQUAL': />>=/,
            'T_START_HEREDOC': /<<<(["']?)([\$a-z0-9_]+)\1\n?/,
            'T_STATIC': /static\b/i,
            'T_STRING': /(?![\$0-9])[\$a-z0-9_]+/i,
            'T_STRING_CAST': /\(\s*string\s*\)/i,
            'T_STRING_VARNAME': /(?![\$0-9])[\$a-z0-9_]+/,
            'T_SWITCH': /switch\b/i,
            'T_THROW': /throw\b/i,
            'T_TRAIT': /trait\b/i,
            'T_TRAIT_C': /__TRAIT__\b/i,
            'T_TRY': /try\b/i,
            'T_UNSET': /unset\b/i,
            'T_UNSET_CAST': /\(\s*unset\s*\)/i,
            'T_USE': /use\b/i,
            'T_VAR': /var\b/i,
            'T_VARIABLE': /\$[\$a-z0-9_]+/i,
            'T_WHILE': /while\b/i,
            'T_WHITESPACE': /[\r\n\t ]+/,
            'T_XOR_EQUAL': /\^=/i,
            'T_YIELD': /yield\b/i,


            'N_ASSIGNMENT_STATEMENT': {
                components: [{name: 'target', oneOf: ['T_VARIABLE']}, (/=/), {name: 'expression', what: 'N_EXPRESSION'}, (/;/)]
            },
            'N_COMPOUND_STATEMENT': {
                components: [(/\{/), {name: 'statements', oneOrMoreOf: 'N_STATEMENT'}, (/\}/)]
            },
            'N_EMPTY_STATEMENT': {
                components: (/;/)
            },
            'N_EXPRESSION': {
                components: 'N_EXPRESSION_LEVEL_1'
            },
            // Precedence level 1 (lowest) - addition and subtraction
            'N_EXPRESSION_LEVEL_1': {
                captureAs: 'N_EXPRESSION',
                components: [{name: 'left', what: 'N_EXPRESSION_LEVEL_2'}, {name: 'right', zeroOrMoreOf: [{name: 'operator', oneOf: [(/\+/), (/-/)]}, {name: 'operand', what: 'N_EXPRESSION_LEVEL_2'}]}],
                ifNoMatch: {component: 'right', capture: 'left'}
            },
            // Precedence level 2 - multiplication and division
            'N_EXPRESSION_LEVEL_2': {
                captureAs: 'N_EXPRESSION',
                components: [{name: 'left', what: 'N_EXPRESSION_LEVEL_3'}, {name: 'right', zeroOrMoreOf: [{name: 'operator', oneOf: [(/\*/), (/\//)]}, {name: 'operand', what: 'N_EXPRESSION_LEVEL_3'}]}],
                ifNoMatch: {component: 'right', capture: 'left'}
            },
            // Precedence level 3 - binary XOR
            'N_EXPRESSION_LEVEL_3': {
                captureAs: 'N_EXPRESSION',
                components: [{name: 'left', what: 'N_EXPRESSION_LEVEL_4'}, {name: 'right', zeroOrMoreOf: [{name: 'operator', what: (/\^/)}, {name: 'operand', rule: 'N_EXPRESSION_LEVEL_3'}]}],
                ifNoMatch: {component: 'right', capture: 'left'}
            },
            // Precedence level 4 - unary positive and negative operators
            'N_EXPRESSION_LEVEL_4': {
                captureAs: 'N_EXPRESSION',
                components: [{name: 'operator', optionally: {oneOf: [(/\+/), (/-/)]}}, {name: 'operand', what: 'N_EXPRESSION_LEVEL_5'}],
                ifNoMatch: {component: 'operator', capture: 'operand'}
            },
            // Precedence level 5 (highest) - single terms and bracketed expressions
            'N_EXPRESSION_LEVEL_5': {
                components: [{oneOf: ['N_TERM', [(/\(/), 'N_EXPRESSION_LEVEL_1', (/\)/)]]}]
            },
            'N_IGNORE': {
                components: {oneOrMoreOf: {oneOf: ['T_WHITESPACE', 'T_COMMENT', 'T_DOC_COMMENT']}}
            },
            'N_INLINE_HTML_STATEMENT': [{oneOf: ['T_CLOSE_TAG', '<BOF>']}, {name: 'html', what: 'T_INLINE_HTML'}, {oneOf: ['T_OPEN_TAG', '<EOF>']}],
            'N_PROGRAM': {
                components: [{optionally: 'T_OPEN_TAG'}, {name: 'statements', zeroOrMoreOf: 'N_STATEMENT'}]
            },
            'N_RETURN_STATEMENT': {
                components: ['T_RETURN', {name: 'expression', optionally: 'N_EXPRESSION'}, (/;/)]
            },
            'N_STATEMENT': {
                components: {oneOf: ['N_ASSIGNMENT_STATEMENT', 'N_COMPOUND_STATEMENT', 'N_RETURN_STATEMENT', 'N_INLINE_HTML_STATEMENT', 'N_EMPTY_STATEMENT']}
            },
            'N_TERM': {
                components: {oneOf: ['T_VARIABLE', 'T_DNUMBER', 'T_LNUMBER', 'T_STRING']}
            }
        },
        start: 'N_PROGRAM'
    };
});