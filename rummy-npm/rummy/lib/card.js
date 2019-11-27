"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _keys = require("babel-runtime/core-js/object/keys")

var _keys2 = _interopRequireDefault(_keys)

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck")

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require("babel-runtime/helpers/createClass")

var _createClass3 = _interopRequireDefault(_createClass2)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    rankSymbols = { A: 1, J: 11, Q: 12, K: 13 },
    suitSymbols = ["s", "h", "d", "c"],
    wildCard = ["w", ""],
    wildCardJoker = parseCardCode("2sw"),
    wildCardJokerRank = wildCardJoker.rank
console.log("wildCardJoker", wildCardJoker)
var Card = (function() {
    /**
     * @param {Object|string} objectOrCode
     */

    function Card(objectOrCode) {
        ;(0, _classCallCheck3.default)(this, Card)

        if (typeof objectOrCode == "string") {
            console.log("objectOrCode", objectOrCode)
            var object = parseCardCode(objectOrCode)
            console.log("object", object)

            this.rank = object.rank
            this.suit = object.suit
            this.joker = object.joker
           
        } else {
            if (objectOrCode.joker) {
                this.joker = objectOrCode.joker
                this.suit = "joker"
                this.rank = "joker"
                
            }

            if (typeof objectOrCode.suit == "number") {
                this.suit = objectOrCode.suit
            }

            if (typeof objectOrCode.rank == "number") {
                this.rank = objectOrCode.rank
            }
        }
    }

    /**
     * @return {boolean} isValid
     */

    ;(0, _createClass3.default)(Card, [
        {
            key: "valid",
            get: function get() {
                return (
                    (typeof this.rank == "number" &&
                        this.suit >= 0 &&
                        this.suit <= 3 &&
                        typeof this.suit == "number" &&
                        this.rank >= 1 &&
                        this.rank <= 13) ||
                    !!this.joker
                )
            }

            /**
             * @return {string} code
             */
        },
        {
            key: "code",
            get: function get() {
                return this.rankCode + this.suitCode
            },

            /**
             * @param {string} newCode
             */
            set: function set(newCode) {
                var object = parseCardCode(newCode)
                this.rank = object.rank
                this.suit = object.suit
            }

            /**
             * @return {string} rankCode
             */
        },
        {
            key: "rankCode",
            get: function get() {
                if (this.rank === "joker") {
                    return "X"
                }

                for (var symbol in rankSymbols) {
                    if (rankSymbols[symbol] == this.rank) {
                        return symbol
                    }
                }

                if (this.rank) {
                    return this.rank.toString()
                }

                return ""
            }

            /**
             * @return {string} suitCode
             */
        },
        {
            key: "suitCode",
            get: function get() {
                if (suitSymbols[this.suit]) {
                    return suitSymbols[this.suit].toString()
                }
                return ""
            }
        }
    ])
    return Card
})()

exports.default = Card

/* Private helper functions
 * ========================================================================= */

function parseCardCode(code) {
    if (code === "X") {
        return { joker: 1, suit: "joker", rank: "joker" }
    }

    var rankCodes = ranks.concat((0, _keys2.default)(rankSymbols)),
        regex = new RegExp(
            "(" +
                rankCodes.join("|") +
                ")(" +
                suitSymbols.join("|") +
                ")(" +
                wildCard.join("|") +
                ")",
            "g"
        )
    console.log("regex", regex)
    var match = regex.exec(code)
    console.log("match", match)
    if (!match) {
        return false
    }

    var rank =
            match[1] in rankSymbols
                ? rankSymbols[match[1]]
                : parseInt(match[1]),
        suit = suitSymbols.indexOf(match[2]),
        wc
    if (match[1] == wildCardJokerRank) {
        wc = 1
    }
    // console.log("wildCardJokerRank", wildCardJokerRank)
    return { rank: rank, suit: suit, joker: wc }
}
