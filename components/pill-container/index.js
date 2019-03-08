"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _selectedListbox = require("./private/selected-listbox");

var _selectedListbox2 = _interopRequireDefault(_selectedListbox);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `listboxLabel`: This is a label for the listbox. The default is `Selected Options:`.
   * * `removePill`: Used to remove a selected item (pill). Focus is on the pill. This is not a button. The default is `Press delete or backspace to remove`.
   */
  assistiveText: _propTypes2.default.shape({
    listboxLabel: _propTypes2.default.string,
    removePill: _propTypes2.default.string
  }),

  /**
   * CSS classes to be added to the pill container
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * HTML id for pill container
   */
  id: _propTypes2.default.string,

  /**
   * **Text labels for internationalization**
   * * `removePillTitle`: Title on `X` icon
   */
  labels: _propTypes2.default.shape({
    removePillTitle: _propTypes2.default.string
  }),

  /**
   * **Array of pill objects.**
   * Each object can contain:
   * * `avatar`: An `Avatar` component.
   * * `error`: Adds error styling
   * * `icon`: An `Icon` component.
   * * `id`: A unique identifier string.
   * * `label`: A primary string of text.
   * * `title`: Text that appears on mouse hover. Most helpful for long labels.
   * ```
   * {
   * 	id: '2',
   * 	label: 'Salesforce.com, Inc.',
   * 	title: 'Salesforce.com, Inc. - Want to work here?',
   * },
   * ```
   * `options` with array length of zero will remove this component from the DOM.
   */
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    avatar: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
      imgSrc: _propTypes2.default.string,
      title: _propTypes2.default.string,
      variant: _propTypes2.default.string
    })]),
    bare: _propTypes2.default.bool,
    error: _propTypes2.default.bool,
    icon: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
      category: _propTypes2.default.string,
      name: _propTypes2.default.string
    })]),
    id: _propTypes2.default.string,
    label: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),
    title: _propTypes2.default.string
  })),

  /**
   * Function called when a pill is clicked
   */
  onClickPill: _propTypes2.default.func,

  /**
   * Function called when a pill is requested to be 'removed' via the delete key or 'X' icon click.
   */
  onRequestRemovePill: _propTypes2.default.func,

  /**
   * Custom style object to be passed to the pill container
   */
  style: _propTypes2.default.object,

  /**
   * Specifies the pill styling at the container level. `bare` removes border styling from all pills.
   */
  variant: _propTypes2.default.oneOf(['base', 'bare'])
};
/**
 * A `PillContainer` is a container that holds one or more pills. Use it for a list of pills in a container that resembles an `input` form field. It is not intended for navigation.
 */

var PillContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PillContainer, _React$Component);

  function PillContainer(props) {
    var _this;

    _classCallCheck(this, PillContainer);

    _this = _possibleConstructorReturn(this, (PillContainer.__proto__ || Object.getPrototypeOf(PillContainer)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "getId", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.id || _this.generatedId;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "getNewActiveOptionIndex", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(_ref) {
        var activeOptionIndex = _ref.activeOptionIndex,
            offset = _ref.offset,
            options = _ref.options;
        var nextIndex = activeOptionIndex + offset;
        return options.length > nextIndex && nextIndex >= 0 ? nextIndex : activeOptionIndex;
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleBlurPill", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this.preserveFocus) {
          _this.setState({
            listboxHasFocus: false
          });
        } else {
          _this.preserveFocus = false;
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleClickPill", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
        _this.setState({
          activeSelectedOption: data.option,
          activeSelectedOptionIndex: data.index,
          listboxHasFocus: true
        });

        if (_this.props.onClickPill) {
          _this.props.onClickPill(event, {
            index: data.index,
            option: data.option
          });
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handlePillFocus", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this.state.listboxHasFocus) {
          _this.setState({
            listboxHasFocus: true
          });
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleNavigatePillContainer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref2) {
        var direction = _ref2.direction;
        var offsets = {
          next: 1,
          previous: -1
        };

        _this.setState(function (prevState) {
          var options = _this.props.options;
          var isLastOptionAndRightIsPressed = prevState.activeSelectedOptionIndex + 1 === options.length && direction === 'next';
          var isFirstOptionAndLeftIsPressed = prevState.activeSelectedOptionIndex === 0 && direction === 'previous';
          var newState;

          if (isLastOptionAndRightIsPressed) {
            newState = {
              activeSelectedOption: options[0],
              activeSelectedOptionIndex: 0,
              listboxHasFocus: true
            };
          } else if (isFirstOptionAndLeftIsPressed) {
            newState = {
              activeSelectedOption: options[options.length - 1],
              activeSelectedOptionIndex: options.length - 1,
              listboxHasFocus: true
            };
          } else {
            var newIndex = _this.getNewActiveOptionIndex({
              activeOptionIndex: prevState.activeSelectedOptionIndex,
              offset: offsets[direction],
              options: options
            });

            newState = {
              activeSelectedOption: options[newIndex],
              activeSelectedOptionIndex: newIndex,
              listboxHasFocus: true
            };
          }

          _this.preserveFocus = true;
          return newState;
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleRequestFocusPillContainer", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, _ref3) {
        var ref = _ref3.ref;

        if (ref) {
          _this.activeSelectedOptionRef = ref;

          _this.activeSelectedOptionRef.focus();
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleRequestRemove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, data) {
        if (_this.props.onRequestRemovePill) {
          _this.preserveFocus = true;

          _this.props.onRequestRemovePill(event, {
            index: data.index,
            option: data.option
          });
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "resetActiveSelectedOption", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        var options = _this.props.options;
        var activeSelectedOptionIndex = _this.state.activeSelectedOptionIndex;

        if (!options[activeSelectedOptionIndex]) {
          if (options.length > 0 && activeSelectedOptionIndex >= options.length) {
            activeSelectedOptionIndex = options.length - 1;
          } else {
            activeSelectedOptionIndex = 0;
          }
        }

        _this.setState({
          activeSelectedOption: options[activeSelectedOptionIndex] || undefined,
          activeSelectedOptionIndex: activeSelectedOptionIndex,
          listboxHasFocus: !!options[activeSelectedOptionIndex]
        });
      }
    });
    _this.state = {
      // seeding initial state with this.props.options[0]
      activeSelectedOption: _this.props.options && _this.props.options[0] || undefined,
      activeSelectedOptionIndex: 0,
      listboxHasFocus: false
    };
    _this.activeSelectedOptionRef = null;
    _this.generatedId = _shortid2.default.generate();
    _this.preserveFocus = false;
    return _this;
  }

  _createClass(PillContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.options && this.props.options.length > 0 && !this.props.options[this.state.activeSelectedOptionIndex] || this.preserveFocus) {
        this.resetActiveSelectedOption();
        this.preserveFocus = false;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.options.length > 0 ? _react2.default.createElement(_selectedListbox2.default, {
        activeOption: this.state.activeSelectedOption,
        activeOptionIndex: this.state.activeSelectedOptionIndex,
        assistiveText: {
          removePill: this.props.assistiveText.removePill,
          selectedListboxLabel: this.props.assistiveText.listboxLabel
        },
        className: this.props.className,
        events: {
          onBlurPill: this.handleBlurPill,
          onClickPill: this.handleClickPill,
          onPillFocus: this.handlePillFocus,
          onRequestFocus: this.handleRequestFocusPillContainer,
          onRequestFocusOnNextPill: this.handleNavigatePillContainer,
          onRequestFocusOnPreviousPill: this.handleNavigatePillContainer,
          onRequestRemove: this.handleRequestRemove
        },
        id: "".concat(this.getId(), "-listbox-of-pill-options"),
        isBare: this.props.variant === 'bare',
        isPillContainer: true,
        labels: this.props.labels,
        listboxHasFocus: this.state.listboxHasFocus,
        renderAtSelectionLength: 0,
        selection: this.props.options,
        style: this.props.style
      }) : null;
    }
  }]);

  return PillContainer;
}(_react2.default.Component);

PillContainer.displayName = _constants.PILL_CONTAINER;
PillContainer.defaultProps = {
  assistiveText: {
    listboxLabel: 'Selected Options:',
    removePill: 'Press delete or backspace to remove'
  },
  labels: {
    removePillTitle: 'Remove'
  }
};
PillContainer.propTypes = propTypes;
exports.default = PillContainer;