'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = function () {

  /**
   * Constructs the Player object
   *
   * @param {any} identity The custom player identifier
   */

  function Player(identity) {
    (0, _classCallCheck3.default)(this, Player);

    this.identity = identity;
    this.cards = new Array();
    this.drewFromDiscard = null; // {Card}
    this.melded = false; // {boolean}
    this.madeFirstMove = false; // {boolean}
  }

  /**
   * Draws a card from the given pile. It can be a Pile object or a string,
   * one of: 'stock' or 'discard'.
   *
   * @param {object|string} pile
   * @return {Card} card
   */


  (0, _createClass3.default)(Player, [{
    key: 'draw',
    value: function draw(pile) {
      if (typeof pile == 'undefined') {
        return null;
      }

      var card = void 0;

      if (typeof pile == 'string') {
        switch (pile) {
          case 'stock':
            card = this.rummy.stock.pop();
            this.drewFromDiscard = null;
            break;
          case 'discard':
            card = this.rummy.discard.pop();
            this.drewFromDiscard = card;
            break;
        }
      } else if (pile.pop) {
        card = pile.pop();
        this.drewFromDiscard = pile.discard ? card : null;
      }

      if (card) {
        this.cards.push(card);
        return card;
      }

      return null;
    }

    /**
     * Discards the given card and return it to the discard pile
     *
     * @param {Card} card
     * @return {Card} discarded
     */

  }, {
    key: 'discard',
    value: function discard(card) {
      var discarded = null;
      for (var i in this.cards) {
        if (typeof card == 'string' && this.cards[i].code === card || card.code && card === this.cards[i]) {
          discarded = this.cards[i];
          this.cards.splice(i, 1);
          this.rummy.discard.push(discarded);
          break;
        }
      }
      return discarded;
    }
  }]);
  return Player;
}();

exports.default = Player;