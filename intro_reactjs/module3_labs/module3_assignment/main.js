let data = {
  restrictions: [
    {id: 'a', description: 'Dietary Restrictions'},
    {id: 'b', description: 'Physical Disabilities'},
    {id: 'c', description: 'Medical Needs'},
    {id: 'd', description: 'Other'},
    //{id: 'e', description: 'AnotherOther'}
  ],
  activities: ['Cooking','Science Lab','Painting','Swimming','Other', /*'Another Other'*/],
  headers: ['Remove','First Name','Last Name','Activity','Restrictions']
}
// figure out how to add / remove styles when in JSX to condense code
// ex) use same style variable for headers/post but take out font weight
const buttonSelectStyle = { // used for dropdown select and submit button
  width: 156,
  height: 29,
  display: 'block'
}

function RemoveButton(props) {
  const styleDiv = {
    flex: 1,
    justifyContent: 'center'
  }
  const styleButton = {
    width: 24,
    height: 24,
    margin: 'auto'
  }

  return (
    <div style= {styleDiv} >
      <div style= {styleButton} >
        <button onClick= {props.removeItem} >X</button>
      </div>
    </div>
  )
}

function UserName(props) {
  const userInputStyle = {
    width: '150px',
    height: '25px',
    border: '1px solid black',
    paddingLeft: '3px'
  }

  return (
    <div>
      <span style= {{display: 'block'}}>{props.label}</span>
      <input type= 'input' name= {props.name} value= {props.value} onChange= {props.handleChange} style= {userInputStyle} />
    </div>
  )
}

function UserActivityOption(props) {
  return(
    <option value= {props.value}>{props.value}</option>
  )
}

function UserActivity(props) {
  const style = {
    display: 'block'
  }
  let activityList = props.data.map((e, i) => {
    return <UserActivityOption value= {e} key= {i} />
  })

  return (
    <div>
      <span style= {style}>Select Activity</span>
      <select style= {buttonSelectStyle} onChange= {props.handleChange} name= {props.name} value= {props.value} >
        {activityList}
      </select>
    </div>
  )
}

function UserRestrictionsLine(props) {
  return (
    <div>
      <label ><input style= {{verticalAlign: '-2px'}} type= 'checkbox' checked= {props.checked} onChange= {props.handleChecked} value= {props.index} name= {props.name} />{props.id}) {props.text}</label>
    </div>
  )
}

function UserRestrictions(props) {
  return (
  <div >
      <span style= {{display: 'block'}}>Check all that apply:</span>
      {props.data.map((e, i) => {
        return <UserRestrictionsLine key= {i} index= {i} id= {e.id} text= {e.description} checked= {props.checked[i]} name= {props.name} handleChecked= {props.handleChecked} />
        })
      }
    </div>
  )
}

function HeadersText(props) {
  const style = {
    fontWeight: 900,
    textAlign: 'center',
    height: 24,
    lineHeight: '24px',
    flex: 1
  }

  return (
    <div style= {style}>{props.text}</div>
  )
}

function PostHeaders(props) {
  const style = {
    display: 'flex',
    maxWidth: 800,
    minWidth: 410
  }

  return (
    <div style= {style}>
      {props.data.map((e, i) => {
        return <HeadersText text= {e} key= {i} />
        })
      }
    </div>
  )
}

function UsersText(props) {
  const style = {
    textAlign: 'center',
    height: 24,
    lineHeight: '24px',
    flex: 1
  }

  return (
    <div style= {style}>{props.text}</div>
  )
}

function User(props) {
  const style = {
    display: 'flex',
  }
  
  return (
    <div style= {style}>
      <RemoveButton removeItem= {props.removeItem} />
      <UsersText text= {props.firstName} />
      <UsersText text= {props.lastName} />
      <UsersText text= {props.activity} />
      <UsersText text= {props.restrictions} />
    </div>
  )
}

function PostUsers(props) {
  const style = {
    maxWidth: 800,
    padding: 0,
    marginTop: 5,
    minWidth: 410
  }

  return (
    <div style= {style} >
      {
        props.postUsers.map((item, index) => {
          return (
            <User key= {index} firstName= {item.firstName} lastName= {item.lastName} activity= {item.activity} restrictions= {item.restrictions} removeItem= {() => props.removeItem(index)} />
          )
        })
      }
    </div>
  )
}


class RegistrationApp extends React.Component {
  constructor(props) {
    super(props)

    let restrictionsArr = []
    data.restrictions.map(() => {
      return restrictionsArr.push(false)
    })

    this.state = {
      firstName: '',
      lastName: '',
      activity: data.activities[0],
      restrictions: '',
      restrictionsArr: restrictionsArr,
      items: [],
      defaultRestrictions: restrictionsArr
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChecked = this.handleChecked.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleChecked(event) {
    let restrictionsArrCopy = this.state.restrictionsArr.slice()
    restrictionsArrCopy.splice(event.target.value, 1, event.target.checked)
    this.setState({[event.target.name]: restrictionsArrCopy})
    // console.log(index) --- returning unidentified -> find out how to reach index without having to set value to index - why setting index does now work? -- see line 91
    let idInfo = data.restrictions
    let idValue = []
    let idJoinValue = ''
    idInfo.map((e, i) => {
      restrictionsArrCopy[i] ? idValue.push(e.id) : ''
      idJoinValue = idValue.join('')
      return (idJoinValue)
    })
    this.setState({restrictions: idJoinValue}, () => {
      console.log(this.state.restrictions)
    })
  }

  addItem() {
    let itemsCopy = this.state.items.slice()
    itemsCopy.push({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      activity: this.state.activity,
      restrictions: this.state.restrictions
    })
    //console.log(itemsCopy)
    this.setState({
      items: itemsCopy,
      firstName: '',
      lastName: '',
      activity: data.activities[0],
      restrictions: '',
      restrictionsArr: this.state.defaultRestrictions
    })
  }

  removeItem(index) {
    let itemsCopy = this.state.items.slice()
    itemsCopy.splice(index, 1)
    this.setState({items: itemsCopy})
  }

  render() {
    return (
      <div>
        <UserName name= 'firstName' value= {this.state.firstName} handleChange= {this.handleChange} label= 'First Name' />
        <UserName name= 'lastName' value= {this.state.lastName} handleChange= {this.handleChange} label= 'Last Name' />
        <UserActivity data= {data.activities} value= {this.state.activity} handleChange= {this.handleChange} name= 'activity' />
        <UserRestrictions data= {data.restrictions} handleChecked= {this.handleChecked} name= 'restrictionsArr' checked= {this.state.restrictionsArr} />
        <button style= {buttonSelectStyle} 
        onClick= {() => this.addItem()} >Submit</button>
        <PostHeaders data= {data.headers} />
        <PostUsers postUsers= {this.state.items} removeItem= {this.removeItem.bind(this)} />
      </div>
    )
  }
}


ReactDOM.render(
  <RegistrationApp />,
  document.getElementById('root')
)