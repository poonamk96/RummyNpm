"use strict"

Object.defineProperty(exports, "__esModule", {
    value: true
})

var _set = require("babel-runtime/core-js/set")

var _set2 = _interopRequireDefault(_set)

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck")

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2)

var _createClass2 = require("babel-runtime/helpers/createClass")

var _createClass3 = _interopRequireDefault(_createClass2)

var _weakMap = require("babel-runtime/core-js/weak-map")

var _weakMap2 = _interopRequireDefault(_weakMap)

var _card = require("./card")

var _card2 = _interopRequireDefault(_card)

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj }
}

var _type = new _weakMap2.default()

var Group = (function() {
    /**
     * @param {Object|string} group
     */

    function Group(group) {
        ;(0, _classCallCheck3.default)(this, Group)

        _type.set(this, null)

        if (typeof group == "string") {
            group = group
                .trim()
                .replace(/(\s+)/g, " ")
                .split(" ")
        }

        this.cards = group
            .map(function(card) {
                return new _card2.default(card)
            })
            .filter(function(x) {
                return x.valid
            })

        if (!this.rummy.options("jokers")) {
            this.cards = this.cards.filter(function(x) {
                return !x.joker
            })
        }
    }

    /**
     * @return {string} The string representation of the Group
     */

    ;(0, _createClass3.default)(Group, [
        {
            key: "toString",
            value: function toString() {
                return this.cards
                    .map(function(x) {
                        return x.code
                    })
                    .join(" ")
            }

            /**
             * @return {string} type Either a 'run' or a 'set'
             */
        },
        {
            key: "type",
            get: function get() {
                return this.valid ? _type.get(this) : "invalid"
            }

            /**
             * @return {boolean} Whether the Group is valid
             */
        },
        {
            key: "valid",
            get: function get() {
                var group = this.cards
                if (!group) {
                    return false
                }
                if (
                    group.length >= 2 &&
                    group.every(function(x) {
                        return x.joker == 1
                    })
                ) {
                    console.log("hieee")
                    return true
                }

                if (group.length < 3) {
                    return false
                }
                //assign all wildcard as joker
                for (var i = 0; i < group.length - 1; i++) {
                    if (group[i].rank >= 0 && group[i].joker == 1) {
                        for (var j = i; j < group.length; j++) {
                            if (group[i].rank == group[j].rank) {
                                group[j].joker = 1
                            }
                        }
                    }
                }
                console.log("Group:", group)
                var ranks = group.map(function(card) {
                        return card.rank
                    }),
                    ranksWithoutJokers = ranks.filter(function(x) {
                        return x != "joker"
                    }),
                    //NORMAL =  WithoutWildCardsAndJoker

                    cardsWithoutWildCardsAndJoker = group.filter(function(x) {
                        return x.joker != 1
                    }),
                    normalSuits = cardsWithoutWildCardsAndJoker.map(function(
                        x
                    ) {
                        return x.suit
                    }),
                    uniqueNormalSuits = unique(normalSuits),
                    normalRanks = cardsWithoutWildCardsAndJoker.map(function(
                        x
                    ) {
                        return x.rank
                    }),
                    uniqueNormalRanks = unique(normalRanks),
                    uniqueValues = unique(ranksWithoutJokers),
                    jokerCount = group.reduce(function(total, x) {
                        return x.joker == 1 ? total + 1 : total
                    }, 0)

                console.log("JokerCount:", jokerCount)
                var suits = group.map(function(card) {
                        return card.suit
                    }),
                    suitsWithoutJokers = suits.filter(function(x) {
                        return x != "joker"
                    }),
                    uniqueSuits = unique(suitsWithoutJokers)

                // Set
                if (
                    uniqueNormalRanks.length == 1 &&
                    uniqueNormalSuits.length == normalSuits.length
                ) {
                    _type.set(this, "set")
                    return " Set " + true
                }
                //Pure Sequence

                // If there is an ace
                var aceIndex1 = ranks.indexOf(1)

                if (
                    aceIndex1 >= 0 &&
                    this.rummy.options("acePosition") === "both"
                ) {
                    if (
                        ranks.indexOf(13) >= 0 ||
                        (jokerCount > 0 && ranks.indexOf(12) >= 0)
                    ) {
                        ranks[aceIndex1] = 14
                    } else if (
                        ranks.indexOf(2) >= 0 ||
                        (jokerCount > 0 && ranks.indexOf(3) >= 0)
                    ) {
                        ranks[aceIndex1] = 1
                    }
                } else if (
                    aceIndex1 &&
                    this.rummy.options("acePosition") === "high"
                ) {
                    ranks[aceIndex1] = 14
                }
                console.log("Ranks", ranks)
                // Run

                if (uniqueSuits.length == 1 && pureSequence(ranks)) {
                    _type.set(this, "run")

                    return "Pure Sequence " + true
                }

                //Impure Sequence

                // If there is an ace
                //var aceIndex = ranksWithoutJokers.indexOf(1)
                var aceIndex = normalRanks.indexOf(1)

                if (
                    aceIndex >= 0 &&
                    this.rummy.options("acePosition") === "both"
                ) {
                    if (
                        ranks.indexOf(13) >= 0 ||
                        (jokerCount > 0 && ranks.indexOf(12) >= 0)
                    ) {
                        //ranksWithoutJokers[aceIndex] = 14
                        normalRanks[aceIndex] = 14
                    } else if (
                        ranks.indexOf(2) >= 0 ||
                        (jokerCount > 0 && ranks.indexOf(3) >= 0)
                    ) {
                        //ranksWithoutJokers[aceIndex] = 1
                        normalRanks[aceIndex] = 1
                    }
                } else if (
                    aceIndex &&
                    this.rummy.options("acePosition") === "high"
                ) {
                    //ranksWithoutJokers[aceIndex] = 14
                    normalRanks[aceIndex] = 14
                }

                // Run

                if (
                    ((uniqueNormalSuits.length == 1 &&
                        cardsWithoutWildCardsAndJoker.length ==
                            uniqueNormalRanks.length) ||
                        (uniqueSuits.length == 1 &&
                            uniqueValues.length ==
                                ranksWithoutJokers.length)) &&
                    isConsecutive(normalRanks, jokerCount)
                ) {
                    _type.set(this, "run")

                    return "Impure Sequence " + true
                }

                return false
            }
        }
    ])

    return Group
})()

exports.default = Group

/* Private helper functions
 * ========================================================================= */

function unique(array) {
    var seen = new _set2.default()
    return array.filter(function(item) {
        if (!seen.has(item)) {
            seen.add(item)

            return true
        }
    })
}

function pureSequence(array) {
    //array.sort()

    var i,
        temp,
        n = array.length

    for (var i = 0; i < n - 1; i++)
        for (var j = 0; j < n - i - 1; j++)
            if (array[j] > array[j + 1]) {
                var temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }

    console.log("Sorted array", array)

    var count = 0

    for (var i = 0; i < array.length - 1; i++) {
        if (array[i] + 1 == array[i + 1]) {
            count++
        } else {
            return false
        }
    }
    if (array.length - 1 == count) return true
}

function isConsecutive(array, jokerCount) {
    //array.sort()

    // console.log("lodash",_.sortBy([array]))

    var i,
        temp,
        n = array.length

    for (var i = 0; i < n - 1; i++)
        for (var j = 0; j < n - i - 1; j++)
            if (array[j] > array[j + 1]) {
                var temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }

    console.log("Sorted array", array)

    var Y = 0,
        X = jokerCount

    for (var i = 0; i < array.length - 1; i++) {
        if (array[i] + 1 !== array[i + 1]) {
            Y = array[i + 1] - array[i] - 1
            if (X - Y >= 0) {
                X = X - Y
            } else {
                return false
            }
        }
    }

    return true
}
