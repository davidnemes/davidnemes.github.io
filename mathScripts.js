//first line

//questionMaker

let easterEgg = false

const randomNum = (max) => {
    return Math.floor(Math.random() * max + 1)
}

const getAQuestion = () => {
    let firstNum
    let secondNum
    if (isNormal) {
        firstNum = randomNum(20)
        secondNum = randomNum(20)
    } else {
        firstNum = randomNum(50)
        secondNum = randomNum(50)
    }
    
    let task
    if(randomNum(2) === 1) {
        task = {string: ' + ', operation: true}
    } else {
        task = {string: ' - ', operation: false}
    }
    let answer
    if (task.operation) {
        answer = firstNum + secondNum
    } else {
        answer = firstNum - secondNum
    }
    let wrongAnswer
    let difference = randomNum(4)
    if (randomNum(2) === 1) {
        wrongAnswer = answer + difference
    } else {
        wrongAnswer = answer - difference
    }
    let firstButtonIsCorrect = randomNum(2) === 1

    let question
    if (randomNum(100) === 77) {
        easterEgg = true
        question = {
            questionString: 'Do you like the game?',
            answer: "Yeah, it's cool",
            wrongAnswer: "Bro it's shit",
            firstButtonIsCorrect: firstButtonIsCorrect,
        }
    } else {
        easterEgg = false
        question = {
            questionString: firstNum + task.string + secondNum,
            answer: answer,
            wrongAnswer: wrongAnswer,
            firstButtonIsCorrect: firstButtonIsCorrect,
        }
    }
    return question
}

//timers

let set
let go
let theTimer
let firstTimer
let secondTimer
let thirdTimer
let fourthTimer

//readySetGoH1 styles

const dB = {
    display: 'block'
}
const dN = {
    display: 'none'
}

//difficulty function and isNormal

let isNormal = true
const handleDifficultChange = () => {
    if (isNormal) {
        isNormal = false
    } else {
        isNormal = true
    }
}
//components

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Are you good in Math?</h1>
                <h3>Do this minigame to find out!</h3>
                <button id='startButton' onClick={this.props.start}>START</button>
                <div id='difficultContainer'>
                    <h3>Difficulty</h3>
                    <input type='radio' name='difficult' id='normal' value='normal' defaultChecked={isNormal} onChange={handleDifficultChange}></input>
                    <label htmlFor='normal'>Normal</label><br></br>
                    <input type='radio' name='difficult' id='hard' value='hard' defaultChecked={!isNormal} onChange={handleDifficultChange}></input>
                    <label htmlFor='hard'>Hard</label>
                </div>
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionString2: '2 + 3',
            answer2: 5,
            wrongAnswer2: 4,
            firstButtonIsCorrect2: false,
            currentPoints: 0,
            isGameOver: false,
            areButtonsDisabled: true,
        }
        this.handleGoodAnswer = this.handleGoodAnswer.bind(this)
        this.handleFailure = this.handleFailure.bind(this)
        this.handleRestart = this.handleRestart.bind(this)
    }

    componentDidMount() {
        let newQ = getAQuestion()
        this.setState({
            questionString2: newQ.questionString,
            answer2: newQ.answer,
            wrongAnswer2: newQ.wrongAnswer,
            firstButtonIsCorrect2: newQ.firstButtonIsCorrect,
        })
        this.readySetGo()
    }

    readySetGo() {
        set = setTimeout(
            () => {
                document.getElementById('readySetGoH1').innerHTML = 'Set..'
            }, 1000
        )
        go = setTimeout(
            () => {
                document.getElementById('readySetGoH1').innerHTML = 'Go!'
            }, 2000
        )
        theTimer = setTimeout(
            () => {
                this.setState({areButtonsDisabled: false})
                this.timingStarts()
            }, 2500)
    }

    timingStarts() {
        if(easterEgg) {
            return
        } else {
            firstTimer = setTimeout(
                () => {
                    document.getElementById('timer').innerHTML = '3...'
                }, 1000
            )
            secondTimer = setTimeout(
                () => {
                    document.getElementById('timer').innerHTML = '2...'
                }, 2000
            )
            thirdTimer = setTimeout(
                () => {
                    document.getElementById('timer').innerHTML = '1...'
                }, 3000
            )
            fourthTimer = setTimeout(
                () => {
                    this.handleFailure()
                }, 4000
            )
        }
    }

    stopTiming() {
        clearInterval(firstTimer)
        clearInterval(secondTimer)
        clearInterval(thirdTimer)
        clearInterval(fourthTimer)
        document.getElementById('timer').innerHTML = '4...'
    }

    handleGoodAnswer() {
        let newQ = getAQuestion()
        this.setState({
            questionString2: newQ.questionString,
            answer2: newQ.answer,
            wrongAnswer2: newQ.wrongAnswer,
            firstButtonIsCorrect2: newQ.firstButtonIsCorrect,
            currentPoints: this.state.currentPoints + 1,
        })
        this.stopTiming()
        this.timingStarts()
    }

    handleFailure() {
        this.stopTiming()
        this.setState({
            isGameOver: true,
        })
    }

    handleRestart() {
        let newQ = getAQuestion()
        this.setState({
            questionString2: newQ.questionString,
            answer2: newQ.answer,
            wrongAnswer2: newQ.wrongAnswer,
            firstButtonIsCorrect2: newQ.firstButtonIsCorrect,
            isGameOver: false,
            currentPoints: 0,
            areButtonsDisabled: true,
        })
        this.readySetGo()
    }

    render() {
        return (
            this.state.isGameOver ?
            <div>
                <h1>GAME OVER</h1>
                <h3>Your final score: {this.state.currentPoints}</h3>
                <button onClick={this.handleRestart} id='restartButton'>Restart</button> <br></br>
                <button onClick={this.props.quit} id='bactToMenuButton'>← Back to Menu</button>
            </div>
            :
            <div>
                <h1 id='currentScore'><span id='notTooImportant'>Your Score: </span><br></br>{this.state.currentPoints}</h1>
                <h1 id='currentQuestion'>{this.state.questionString2}</h1>
                <div id='answerBox'>
                    <button className='answerButton' onClick={this.state.firstButtonIsCorrect2 ? this.handleGoodAnswer : this.handleFailure} disabled={this.state.areButtonsDisabled}>{this.state.firstButtonIsCorrect2 ? this.state.answer2 : this.state.wrongAnswer2}</button>
                    <button className='answerButton' onClick={this.state.firstButtonIsCorrect2 ? this.handleFailure : this.handleGoodAnswer} disabled={this.state.areButtonsDisabled}>{this.state.firstButtonIsCorrect2 ? this.state.wrongAnswer2 : this.state.answer2}</button>
                </div>
                <p id='timer'>4...</p>
                <div id='readySetGoDiv'>
                    <h1 id='readySetGoH1' style={this.state.areButtonsDisabled ? dB : dN}>Ready...</h1>
                </div>
            </div>
        )
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isInGame: false,
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleReturn = this.handleReturn.bind(this)
    }

    handleStart() {
        this.setState({isInGame: true})
    }

    handleReturn() {
        this.setState({isInGame: false})
    }

    render() {
        return (
            this.state.isInGame ? <Game quit={this.handleReturn}/> : <Menu start={this.handleStart}/>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('main'))