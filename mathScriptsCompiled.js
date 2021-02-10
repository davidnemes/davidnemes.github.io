"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

//first line
//questionMaker
var easterEgg = false;

var randomNum = function randomNum(max) {
  return Math.floor(Math.random() * max + 1);
};

var getAQuestion = function getAQuestion() {
  var firstNum;
  var secondNum;

  if (isNormal) {
    firstNum = randomNum(20);
    secondNum = randomNum(20);
  } else {
    firstNum = randomNum(50);
    secondNum = randomNum(50);
  }

  var task;

  if (randomNum(2) === 1) {
    task = {
      string: ' + ',
      operation: true
    };
  } else {
    task = {
      string: ' - ',
      operation: false
    };
  }

  var answer;

  if (task.operation) {
    answer = firstNum + secondNum;
  } else {
    answer = firstNum - secondNum;
  }

  var wrongAnswer;
  var difference = randomNum(4);

  if (randomNum(2) === 1) {
    wrongAnswer = answer + difference;
  } else {
    wrongAnswer = answer - difference;
  }

  var firstButtonIsCorrect = randomNum(2) === 1;
  var question;

  if (randomNum(100) === 77) {
    easterEgg = true;
    question = {
      questionString: 'Do you like the game?',
      answer: "Yeah, it's cool",
      wrongAnswer: "Bro it's shit",
      firstButtonIsCorrect: firstButtonIsCorrect
    };
  } else {
    easterEgg = false;
    question = {
      questionString: firstNum + task.string + secondNum,
      answer: answer,
      wrongAnswer: wrongAnswer,
      firstButtonIsCorrect: firstButtonIsCorrect
    };
  }

  return question;
}; //timers


var set;
var go;
var theTimer;
var firstTimer;
var secondTimer;
var thirdTimer;
var fourthTimer; //styles

var dB = {
  display: 'block'
};
var dN = {
  display: 'none'
}; //difficulty function and isNormal

var isNormal = true;

var handleDifficultChange = function handleDifficultChange() {
  if (isNormal) {
    isNormal = false;
  } else {
    isNormal = true;
  }
};

var currentName = 'Anonymous';

var handleNameChange = function handleNameChange(e) {
  currentName = e.target.value;
}; //leaderboard


var currentPoints = 0;
var currentBestScores = [];
var scoreIDGlobal = 0;

var orderBestScores = function orderBestScores() {
  var raw = currentBestScores;
  var usedScoreIDs = [];
  var ordered = [];

  for (var bigI = 0; bigI < raw.length; bigI++) {
    var currentBest = {
      points: 0
    };

    var _loop = function _loop(i) {
      var currentScoreObj = raw[i];

      if (usedScoreIDs.every(function (x) {
        return x !== currentScoreObj.scoreID;
      })) {
        if (currentBest.points === currentScoreObj.points) {
          if (!currentScoreObj.difficult && currentBest.difficult) {
            currentBest = currentScoreObj;
          }
        }

        if (currentBest.points < currentScoreObj.points) {
          currentBest = currentScoreObj;
        }
      }
    };

    for (var i = 0; i < raw.length; i++) {
      _loop(i);
    }

    ordered.push(currentBest);
    usedScoreIDs.push(currentBest.scoreID);
  }

  currentBestScores = ordered;
  return;
};

var refreshLeaderBoard = function refreshLeaderBoard() {
  document.getElementById('leaderBoardOl').innerHTML = null;
  var maxScore;

  if (currentBestScores.length <= 10) {
    maxScore = currentBestScores.length;
  } else {
    maxScore = 10;
  }

  for (var i = 0; i < maxScore; i++) {
    var node = document.createElement("LI");
    var textNode = document.createTextNode(currentBestScores[i].name + ': ' + currentBestScores[i].points);
    node.appendChild(textNode);

    if (currentBestScores[i].difficult) {
      node.style.color = "blue";
    } else {
      node.style.color = "red";
    }

    document.getElementById('leaderBoardOl').appendChild(node);
  }
}; //components


var Menu = /*#__PURE__*/function (_React$Component) {
  _inherits(Menu, _React$Component);

  var _super = _createSuper(Menu);

  function Menu(props) {
    _classCallCheck(this, Menu);

    return _super.call(this, props);
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Are you good in Math?"), /*#__PURE__*/React.createElement("h3", null, "Do this minigame to find out!"), /*#__PURE__*/React.createElement("button", {
        id: "startButton",
        onClick: this.props.start
      }, "START"), /*#__PURE__*/React.createElement("div", {
        id: "difficultContainer"
      }, /*#__PURE__*/React.createElement("h3", null, "Difficulty"), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        name: "difficult",
        id: "normal",
        value: "normal",
        defaultChecked: isNormal,
        onChange: handleDifficultChange
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "normal"
      }, "Normal"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
        type: "radio",
        name: "difficult",
        id: "hard",
        value: "hard",
        defaultChecked: !isNormal,
        onChange: handleDifficultChange
      }), /*#__PURE__*/React.createElement("label", {
        htmlFor: "hard"
      }, "Hard")), /*#__PURE__*/React.createElement("div", {
        id: "nameContainer"
      }, /*#__PURE__*/React.createElement("label", {
        htmlFor: "nameInput",
        id: "nameInputLabel"
      }, "Your Name: "), /*#__PURE__*/React.createElement("input", {
        type: "text",
        id: "nameInput",
        defaultValue: currentName,
        onChange: handleNameChange
      })));
    }
  }]);

  return Menu;
}(React.Component);

var Game = /*#__PURE__*/function (_React$Component2) {
  _inherits(Game, _React$Component2);

  var _super2 = _createSuper(Game);

  function Game(props) {
    var _this;

    _classCallCheck(this, Game);

    _this = _super2.call(this, props);
    _this.state = {
      questionString2: '2 + 3',
      answer2: 5,
      wrongAnswer2: 4,
      firstButtonIsCorrect2: false,
      isGameOver: false,
      areButtonsDisabled: true
    };
    _this.handleGoodAnswer = _this.handleGoodAnswer.bind(_assertThisInitialized(_this));
    _this.handleFailure = _this.handleFailure.bind(_assertThisInitialized(_this));
    _this.handleRestart = _this.handleRestart.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      currentPoints = 0;
      var newQ = getAQuestion();
      this.setState({
        questionString2: newQ.questionString,
        answer2: newQ.answer,
        wrongAnswer2: newQ.wrongAnswer,
        firstButtonIsCorrect2: newQ.firstButtonIsCorrect
      });
      this.readySetGo();
    }
  }, {
    key: "readySetGo",
    value: function readySetGo() {
      var _this2 = this;

      set = setTimeout(function () {
        document.getElementById('readySetGoH1').innerHTML = 'Set..';
      }, 1000);
      go = setTimeout(function () {
        document.getElementById('readySetGoH1').innerHTML = 'Go!';
      }, 2000);
      theTimer = setTimeout(function () {
        _this2.setState({
          areButtonsDisabled: false
        });

        _this2.timingStarts();
      }, 2500);
    }
  }, {
    key: "timingStarts",
    value: function timingStarts() {
      var _this3 = this;

      if (easterEgg) {
        return;
      } else {
        firstTimer = setTimeout(function () {
          document.getElementById('timer').innerHTML = '3...';
        }, 1000);
        secondTimer = setTimeout(function () {
          document.getElementById('timer').innerHTML = '2...';
        }, 2000);
        thirdTimer = setTimeout(function () {
          document.getElementById('timer').innerHTML = '1...';
        }, 3000);
        fourthTimer = setTimeout(function () {
          _this3.handleFailure();
        }, 4000);
      }
    }
  }, {
    key: "stopTiming",
    value: function stopTiming() {
      clearInterval(firstTimer);
      clearInterval(secondTimer);
      clearInterval(thirdTimer);
      clearInterval(fourthTimer);
      document.getElementById('timer').innerHTML = '4...';
    }
  }, {
    key: "handleGoodAnswer",
    value: function handleGoodAnswer() {
      currentPoints++;
      var newQ = getAQuestion();
      this.setState({
        questionString2: newQ.questionString,
        answer2: newQ.answer,
        wrongAnswer2: newQ.wrongAnswer,
        firstButtonIsCorrect2: newQ.firstButtonIsCorrect
      });
      this.stopTiming();
      this.timingStarts();
    }
  }, {
    key: "handleFailure",
    value: function handleFailure() {
      this.stopTiming();

      if (currentPoints !== 0) {
        currentBestScores.push({
          points: currentPoints,
          difficult: isNormal,
          scoreID: scoreIDGlobal,
          name: currentName
        });
      }

      orderBestScores();
      refreshLeaderBoard();
      scoreIDGlobal++;
      this.setState({
        isGameOver: true
      });
    }
  }, {
    key: "handleRestart",
    value: function handleRestart() {
      currentPoints = 0;
      var newQ = getAQuestion();
      this.setState({
        questionString2: newQ.questionString,
        answer2: newQ.answer,
        wrongAnswer2: newQ.wrongAnswer,
        firstButtonIsCorrect2: newQ.firstButtonIsCorrect,
        isGameOver: false,
        areButtonsDisabled: true
      });
      this.readySetGo();
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.isGameOver ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "GAME OVER"), /*#__PURE__*/React.createElement("h3", null, "Your final score: ", this.state.currentPoints), /*#__PURE__*/React.createElement("button", {
        onClick: this.handleRestart,
        id: "restartButton"
      }, "Restart"), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
        onClick: this.props.quit,
        id: "bactToMenuButton"
      }, "\u2190 Back to Menu")) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
        id: "currentScore"
      }, /*#__PURE__*/React.createElement("span", {
        id: "notTooImportant"
      }, "Your Score: "), /*#__PURE__*/React.createElement("br", null), currentPoints), /*#__PURE__*/React.createElement("h1", {
        id: "currentQuestion"
      }, this.state.questionString2), /*#__PURE__*/React.createElement("div", {
        id: "answerBox"
      }, /*#__PURE__*/React.createElement("button", {
        className: "answerButton",
        onClick: this.state.firstButtonIsCorrect2 ? this.handleGoodAnswer : this.handleFailure,
        disabled: this.state.areButtonsDisabled
      }, this.state.firstButtonIsCorrect2 ? this.state.answer2 : this.state.wrongAnswer2), /*#__PURE__*/React.createElement("button", {
        className: "answerButton",
        onClick: this.state.firstButtonIsCorrect2 ? this.handleFailure : this.handleGoodAnswer,
        disabled: this.state.areButtonsDisabled
      }, this.state.firstButtonIsCorrect2 ? this.state.wrongAnswer2 : this.state.answer2)), /*#__PURE__*/React.createElement("p", {
        id: "timer"
      }, "4..."), /*#__PURE__*/React.createElement("div", {
        id: "readySetGoDiv"
      }, /*#__PURE__*/React.createElement("h1", {
        id: "readySetGoH1",
        style: this.state.areButtonsDisabled ? dB : dN
      }, "Ready...")));
    }
  }]);

  return Game;
}(React.Component);

var LeaderBoard = /*#__PURE__*/function (_React$Component3) {
  _inherits(LeaderBoard, _React$Component3);

  var _super3 = _createSuper(LeaderBoard);

  function LeaderBoard(props) {
    _classCallCheck(this, LeaderBoard);

    return _super3.call(this, props);
  }

  _createClass(LeaderBoard, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        id: "leaderBoard"
      }, /*#__PURE__*/React.createElement("h3", null, "Leader Board"), /*#__PURE__*/React.createElement("ol", {
        id: "leaderBoardOl"
      }));
    }
  }]);

  return LeaderBoard;
}(React.Component);

var Main = /*#__PURE__*/function (_React$Component4) {
  _inherits(Main, _React$Component4);

  var _super4 = _createSuper(Main);

  function Main(props) {
    var _this4;

    _classCallCheck(this, Main);

    _this4 = _super4.call(this, props);
    _this4.state = {
      isInGame: false
    };
    _this4.handleStart = _this4.handleStart.bind(_assertThisInitialized(_this4));
    _this4.handleReturn = _this4.handleReturn.bind(_assertThisInitialized(_this4));
    return _this4;
  }

  _createClass(Main, [{
    key: "handleStart",
    value: function handleStart() {
      this.setState({
        isInGame: true
      });
    }
  }, {
    key: "handleReturn",
    value: function handleReturn() {
      this.setState({
        isInGame: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, this.state.isInGame ? /*#__PURE__*/React.createElement(Game, {
        quit: this.handleReturn
      }) : /*#__PURE__*/React.createElement(Menu, {
        start: this.handleStart
      }), /*#__PURE__*/React.createElement(LeaderBoard, null));
    }
  }]);

  return Main;
}(React.Component);

ReactDOM.render( /*#__PURE__*/React.createElement(Main, null), document.getElementById('main'));