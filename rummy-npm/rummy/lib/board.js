'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Board = function () {
  function Board() {
    (0, _classCallCheck3.default)(this, Board);

    this.groups = new Array();
  }

  (0, _createClass3.default)(Board, [{
    key: 'add',
    value: function add(item) {
      if (item == undefined) {
        return false;
      }

      var group = void 0;
      if (typeof item == 'string') {
        group = new this.rummy.Group(item);
      } else {
        group = item;
      }

      if (group.valid) {
        this.groups.push(group);
        return true;
      }

      return false;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.groups.splice(0, this.groups.length);
    }
  }, {
    key: 'cards',
    get: function get() {
      var _cards = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(this.groups), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var group = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(group.cards), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var card = _step2.value;

              _cards.push(card);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _cards;
    }
  }]);
  return Board;
}();

exports.default = Board;