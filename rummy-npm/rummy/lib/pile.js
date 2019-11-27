"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Pile = function () {
  function Pile(array, options) {
    (0, _classCallCheck3.default)(this, Pile);

    this.cards = array && array.slice ? array.slice() : [];

    if (options && options.discard === true) {
      this.discard = true;
    }
  }

  /**
   * Clears the pile
   *
   * @return {Array} Removed elements
   */


  (0, _createClass3.default)(Pile, [{
    key: "clear",
    value: function clear() {
      return this.cards.splice(0, this.cards.length);
    }

    /**
     * Shuffles the pile
     *
     * @return {Pile} this
     */

  }, {
    key: "shuffle",
    value: function shuffle() {
      for (var i = this.cards.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
      }
      return this;
    }

    /**
     * Calls `push()` on the underlying array
     *
     * @param {object} card
     */

  }, {
    key: "push",
    value: function push(card) {
      return this.cards.push(card);
    }

    /**
     * Calls `pop()` on the underlying array
     *
     * @return {object} item
     */

  }, {
    key: "pop",
    value: function pop() {
      return this.cards.pop();
    }

    /**
     * The bottom of the pile (the first element of the array)
     */

  }, {
    key: "bottom",
    get: function get() {
      return this.cards[0];
    }

    /**
     * The top of the pile (the last element of the array)
     */

  }, {
    key: "top",
    get: function get() {
      return this.cards[this.cards.length - 1];
    }
  }]);
  return Pile;
}();

exports.default = Pile;