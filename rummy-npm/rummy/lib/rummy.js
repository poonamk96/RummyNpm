"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})
exports.Card = exports.Rummy = undefined

var _typeof2 = require("babel-runtime/helpers/typeof")

var _typeof3 = _interopRequireDefault(_typeof2)

var _create = require("babel-runtime/core-js/object/create")

var _create2 = _interopRequireDefault(_create)

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck")

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require("babel-runtime/helpers/createClass")

var _createClass3 = _interopRequireDefault(_createClass2)

var _symbol = require("babel-runtime/core-js/symbol")

var _symbol2 = _interopRequireDefault(_symbol)

var _class, _class2, _temp
/**
 * @license
 * Copyright (c) 2016, Patryk Kalinowski
 * Released under the ISC license
 * https://github.com/patrislav/rummy.js/blob/master/LICENSE
 */

var _package = require("../package.json")

var _card = require("./card")

var _card2 = _interopRequireDefault(_card)

var _group = require("./group")

var _group2 = _interopRequireDefault(_group)

var _board = require("./board")

var _board2 = _interopRequireDefault(_board)

var _pile = require("./pile")

var _pile2 = _interopRequireDefault(_pile)

var _player = require("./player")

var _player2 = _interopRequireDefault(_player)

var _decorators = require("./decorators")

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var _opts = (0, _symbol2.default)("opts")
var defaultOptions = {
    jokers: true,
    jokerPoints: 50,
    acePosition: "both", // both | low | high
    aceInSetPoints: 11,
    ranks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    rankSymbols: { A: 1, J: 11, Q: 12, K: 13 },
    suitSymbols: ["s", "h", "d", "c"],
	wc:""
}

var Rummy = (exports.Rummy =
    (0, _decorators.CardConstants)(
        (_class =
            ((_temp = _class2 = (function() {
                function Rummy(options) {
                    ;(0, _classCallCheck3.default)(this, Rummy)

                    this[_opts] = (0, _create2.default)(defaultOptions)

                    this.Card = _card2.default
                    this.Card.prototype.rummy = this
                    this.Group = _group2.default
                    this.Group.prototype.rummy = this
                    this.Player = _player2.default
                    this.Player.prototype.rummy = this
                    this.Pile = _pile2.default
                    this.Pile.prototype.rummy = this
                    this.board = new _board2.default()
                    this.board.rummy = this

                    this.stock = new this.Pile()
                    this.discard = new this.Pile()
// console.log("11111",this.stock)
// console.log("22222",this.discard)
// console.log("33333",this.Card.prototype.rummy)

                    if (
                        (typeof options === "undefined"
                            ? "undefined"
                            : (0, _typeof3.default)(options)) == "object"
                    ) {
                        this.options(options)
                    }
                }

                /**
                 * @param {string|string[]|object[]} group The group to check
                 * @return {boolean} Whether the group is valid
                 */

                ;(0, _createClass3.default)(Rummy, [
                    {
                        key: "isValidGroup",
                        value: function isValidGroup(group) {
                            if (!group) {
                                return false
                            }

                            return this.createGroup(group).valid
                        }
                    },

                    {
                        key: "createGroup",
                        value: function createGroup(group) {
                            return new this.Group(group)
                        }

                        /**
                         * @param {Object|String} keyOrOpts One key to get that option or an object
                         * with options to set
                         * @return {Object|String} All options if called without arguments, or one
                         * value when used with key
                         */
                    },
                    {
                        key: "options",
                        value: function options(keyOrOpts) {
                            var opts = this[_opts]

                            if (!keyOrOpts) {
                                return opts
                            }

                            if (typeof keyOrOpts === "string") {
                                return keyOrOpts in opts
                                    ? opts[keyOrOpts]
                                    : null
                            }

                            for (var i in keyOrOpts) {
                                opts[i] = keyOrOpts[i]
                            }

                            // Update the reference to this object, otherwise the created objects have
                            // a reference to the old object.
                            this.Card.prototype.rummy = this
						
                            this.Group.prototype.rummy = this
                            this.Pile.prototype.rummy = this
                            this.Player.prototype.rummy = this
                        }
                    }
                ])
                return Rummy
            })()),
            (_class2.version = _package.version),
            _temp))
    ) || _class)

exports.Card = _card2.default
exports.default = Rummy
