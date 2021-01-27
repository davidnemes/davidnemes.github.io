//first line

//questionMaker

const randomNum = (max) => {
    return Math.floor(Math.random() * max + 1)
}

const getAQuestion = () => {
    let firstNum = randomNum(20)
    let secondNum = randomNum(20)
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

    let question = {
        questionString: firstNum + task.string + secondNum,
        answer: answer,
        wrongAnswer: wrongAnswer,
        firstButtonIsCorrect: firstButtonIsCorrect,
    }
    return question
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
    }

    handleFailure() {
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
        })
    }

    render() {
        return (
            this.state.isGameOver ?
            <div>
                <h1>GAME OVER</h1>
                <h3>Your final score: {this.state.currentPoints}</h3>
                <button onClick={this.handleRestart}>Restart</button> <br></br>
                <button onClick={this.props.quit}>Back to Menu</button>
            </div>
            :
            <div>
                <h1 id='currentScore'><span id='notTooImportant'>Your Score: </span><br></br>{this.state.currentPoints}</h1>
                <h1 id='currentQuestion'>{this.state.questionString2}</h1>
                <div id='answerBox'>
                    <button className='answerButton' onClick={this.state.firstButtonIsCorrect2 ? this.handleGoodAnswer : this.handleFailure}>{this.state.firstButtonIsCorrect2 ? this.state.answer2 : this.state.wrongAnswer2}</button>
                    <button className='answerButton' onClick={this.state.firstButtonIsCorrect2 ? this.handleFailure : this.handleGoodAnswer}>{this.state.firstButtonIsCorrect2 ? this.state.wrongAnswer2 : this.state.answer2}</button>
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