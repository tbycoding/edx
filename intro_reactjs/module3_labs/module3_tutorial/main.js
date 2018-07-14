function PostButton(props) {
  let style = {
    width: 24,
    height: 24
  }
  
  return (
    <button style= {style} onClick= {() => props.handleClick()} >
      {props.label}
    </button>
  )
}

function PostText(props) {
  let style = {
    border: '1px solid black',
    width: props.width
  }

  return (
    <div style= {style} >{props.text}</div>
  )
}

function Post(props) {
  let style = {
    display: 'flex'
  }

  return (
    <div style= {style} >
      <PostButton label= 'x' handleClick= {props.removeItem} />
      <PostText text= {props.title} width= '200' />
      <PostButton label= '+' handleClick= {props.incrementScore} />
      <PostText text= {props.score} width= '200' />
      <PostButton label= '-' handleClick= {props.decrementScore} />
    </div>
  )
}

function PostList(props) {
  return (
    <ol>
      {
        props.postList.map((item, index) => {
          return (
            <Post key= {index} 
            title= {item.title} 
            score= {item.score} 
            incrementScore= {() => props.updateScore(index, 1)}
            decrementScore= {() => props.updateScore(index, -1)}
            removeItem= {() => props.removeItem(index)}
            />
          ) // why no return in tutorial
        })
      }
    </ol>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      items: []
    }
  }

  handleChange(event) {
    this.setState({value: event.target.value})
    console.log(this.state.value)
  }

  addItem() {
    let itemsCopy = this.state.items.slice()
    let truncatedString = this.state.value.substring(0, 20)
    itemsCopy.push({'title': truncatedString, 'score': 0})
    itemsCopy.sort((a, b) => {
      return b.score - a.score
    })
    this.setState({items: itemsCopy, value: ''})
  }

  updateScore(index, val) {
    let itemsCopy = this.state.items.slice()
    itemsCopy[index].score += val
    itemsCopy.sort((a, b) => {
      return b.score - a.score
    })
    this.setState({items: itemsCopy})
  }

  removeItem(index) {
    let itemsCopy = this.state.items.slice()
    itemsCopy.splice(index, 1)
    itemsCopy.sort((a, b) => {
      return b.score - a.score
    })
    this.setState({items: itemsCopy})
  }

  
  render() {
    return (
      <div>
        <input value= {this.state.value} 
        onChange= {this.handleChange.bind(this)} />
        <PostList postList= {this.state.items} 
        updateScore= {this.updateScore.bind(this)}
        removeItem= {this.removeItem.bind(this)} />
        <button onClick= {() => this.addItem()}>Submit</button>
      </div>
    )
  }
}


ReactDOM.render(
  //<Post title= 'Post Title' score= '0' />, // find out why when testing at this state (Post, PostButton, and PostText set up) the score throws error when a number but works when a string
  <App />,
  document.getElementById('root')
)