function TriviaQuestion(props) {
  return (
    <h1 style= {{margin: '15px'}}>What is {props.question}?</h1>
  )
}

function Button(props) {
  let color = 'white' // make answer true/false change border
  // also add in onMouseEnter and onMouseLeave to highlight choice -- either border or color of hovered answer or background or something
  let style = {
    backgroundColor: color,
    width: '100%',
    maxWidth: '250px',
    border: '2px solid black',
    borderRadius: '10px',
    height: '50px',
    display: 'block',
    fontWeight: 900,
    cursor: 'pointer'
  }

  return (
    <div>
      <button style= {style} onClick= {() => props.clickHandler(props.id)}>{props.choiceValue}</button>
    </div>
  )
}

function Score(props) {
  let styleDiv = {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '250px',
    margin: 'auto',
    justifyContent: 'space-between',
    fontWeight: '900'
  }

  return (
    <div style= {styleDiv}>
      <span>Correct: {props.correct}</span>
      <span>Incorrect: {props.incorrect}</span>
    </div>
  )
}


class TriviaApp extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      activeArray: [0,0,0,0], // use to highlight border before updating state -- maybe add in timeout ~ 500
      question: '',
      answer: 0,
      correct: 0,
      incorrect: 0,
      choicesArray: [],
      answerLocation: 0
    }
    
    this.clickHandler = this.clickHandler.bind(this)
  }

  componentDidMount() {
    this.QuestionElements()
  }

  QuestionElements() {
    let firstElement
    let secondElement
    let answer
    let operatorArray = ['+', '-', 'x']
    let chooseOperator = Math.floor((Math.random() * 3) + 0)
    let operator = operatorArray[chooseOperator]
    
    if (chooseOperator === 0 || chooseOperator === 1) {
      firstElement = Math.floor((Math.random() * 100) + 1)
      secondElement = Math.floor((Math.random() * 100) + 1)
      if (chooseOperator === 0) {
        answer = firstElement + secondElement  
      } else {
        answer = firstElement - secondElement
      } 
    }
    if (chooseOperator === 2) {
      firstElement = Math.floor((Math.random() * 25) + 1)
      secondElement = Math.floor((Math.random() * 25) + 1)
      answer = firstElement * secondElement
    }
    let question = firstElement + ' ' + operator + ' ' + secondElement

    this.setState({question: question, answer: answer})
    this.FormatQuestionAnswer(answer, chooseOperator, firstElement, secondElement)
  }

  FormatQuestionAnswer(answer, chooseOperator, firstElement, secondElement) {
    let answerLocation = Math.floor((Math.random() *4) + 0)
    let choicesArray = [0,0,0,0]
    
    choicesArray = choicesArray.map((elem) => {
      if (chooseOperator === 0) {
        return elem + Math.floor((Math.random() * 200) + 2)
      } else if (chooseOperator === 1 && firstElement >= secondElement) {
        return elem + Math.floor((Math.random() * 99) + 0)
      } else if (chooseOperator === 1 && firstElement < secondElement) {
        return elem + Math.floor((Math.random() * 100) - 100)
      } else {
        return elem + Math.floor((Math.random() * 625) + 1)
      }
    })
    choicesArray[answerLocation] = answer
    // add in check for if a number in array that is not answerLocation is equal to answer, and return different number if so, and place callback to do this until there is no dubplicates of answer
    // maybe just check for duplicate, if dup is not answer leave alone, if dup is answer, replace with number +- some number or copy map function -- this will return slower but will ensure no irrational answers supplied ex)if answer is -100 and answer is dup then subtracting 1 will create answer choice not in possible range
    // check during map will not ensure no duplicate after setting answer
    this.setState({choicesArray: choicesArray, answerLocation: answerLocation})
  }

  clickHandler(id) {
    if (id === this.state.answerLocation) {
      this.setState({correct: this.state.correct + 1})
    } else {
      this.setState({incorrect: this.state.incorrect + 1})
    }
    this.QuestionElements()
  }

  render() {
    return (
      <div>
        <TriviaQuestion question= {this.state.question} />
        <Button id= {0} choiceValue= {this.state.choicesArray[0]} clickHandler= {this.clickHandler} />
        <Button id= {1} choiceValue= {this.state.choicesArray[1]} clickHandler= {this.clickHandler} />
        <Button id= {2} choiceValue= {this.state.choicesArray[2]} clickHandler= {this.clickHandler} />
        <Button id= {3} choiceValue= {this.state.choicesArray[3]} clickHandler= {this.clickHandler} />
        <Score correct= {this.state.correct} incorrect= {this.state.incorrect} />
      </div>
    )
  }
}


ReactDOM.render(
  <TriviaApp />,
  document.getElementById('root')
)