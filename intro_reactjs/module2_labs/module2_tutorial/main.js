function Circle(props) {
  let color = 'white'
  if (props.cell === 1) {
    color = 'black'
  } else if (props.cell === 2) {
    color = 'red'
  }

  let style = {
    backgroundColor: color,
    border: '1px solid black',
    borderRadius: '100%',
    paddingTop: '98%'
  }

  return (
    <div style= {style}></div>
  )
}

function Cell(props) {
  let style = {
    height: 50,
    width: 50,
    border: '1px solid black',
    backgroundColor: 'yellow'
  }
  return (
  <div style= {style} onClick= {() => props.handleClick(props.row, props.col)} >
    <Circle cell= {props.cell} />
  </div>
  )
}

function Row(props) {
  let style = {
    display: 'flex'
  }
  let cells = []
  for (let i = 0; i < 7; i++) {
    cells.push(<Cell key= {i} cell= {props.cells[i]} row= {props.row} col= {i} handleClick= {props.handleClick} />)
  }
  return (
    <div style= {style}>
      {cells}
    </div>
  )
}

function Board(props) {
  let rows = []
  // must decrement instead of increment to allow for checking available rows
  for (let i = 5; i >= 0; i--) {
    rows.push(<Row key= {i} row= {i} cells= {props.cells[i]} handleClick= {props.handleClick} />)
  }
  return (
    <div>
      {rows}
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props)

    let cells = []
    for (let i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0))
    }

    this.state = {
      player: false,
      cells: cells,
      winner: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(row, col) {
    if (this.state.winner) {
      return
    }
    console.log('row: ' + row + ' | col: ' + col)
    console.log(this.state.cells)
    let temp = []
    for (let i = 0; i < 6; i++) {
      temp.push(this.state.cells[i].slice())
    }
    let newRow = this.findAvailableRow(col)
    temp[newRow][col] = this.state.player ? 1 : 2
    this.setState({cells: temp, player: !this.state.player}, () => {
      if (this.checkVictory(newRow, col) > 0) {
        console.log('win')
        this.setState({winner: this.state.player ? 2 : 1})
      }
    })
  }

  findAvailableRow(col) {
    for (var i = 0; i < 6; i++) {
      if (this.state.cells[i][col] == 0) {
        return i
      }
    }
    return -1
  }

  checkDiagonal(row, col) {
    // find right and left tops
    let c = this.state.cells
    let val = this.state.player ? 2 : 1
    let rR = row
    let cR = col
    while (rR < 5 && cR < 6) {
      rR++
      cR++
    }
    // checks right diagonal
    while (rR >= 3 && cR >= 3) {
      if (c[rR][cR] == val && c[rR-1][cR-1] == val && c[rR-2][cR-2] == val && c[rR-3][cR-3] == val) {
        return 1
      }
      rR--
      cR--
    }

    let rL = row
    let cL = col
    while (rL < 5 && cL > 0) {
      rL++
      cL--
    }
    // checks left diagonal
    while (rL >= 3 && cL <=3) {
      if (c[rL][cL] == val && c[rL-1][cL+1] == val && c[rL-2][cL+2] == val && c[rL-3][cL+3] == val) {
        return 1
      }
      rL--
      cL++
    }
    return 0
  }
  checkHorizontal(row, col) {
    let c = this.state.cells
    let i = 6
    let val = this.state.player ? 2 : 1
    while (i >= 3) {
      if (c[row][i] == val && c[row][i-1] == val && c[row][i-2] == val && c[row][i-3] == val) {
        return 1
      }
      i--
    }
    return 0
  }
  checkVertical(row, col) {
    let c = this.state.cells
    let i = row
    let val = this.state.player ? 2 : 1
    if (i >= 3) {
      if (c[i][col] == val && c[i-1][col] == val && c[i-2][col] == val && c[i-3][col] == val) {
        return 1
      }
    }
    return 0
  }
  checkVictory(row, col) {
    return (
      this.checkVertical(row, col) || this.checkHorizontal(row, col) || this.checkDiagonal(row, col)
    )
  }

  restart() {
    let cells = []
    for (let i = 0; i < 6; i++) {
      cells.push(new Array(7).fill(0))
    }
    this.setState({player: false, cells: cells, winner: 0})
  }

  render() {
    return (
      <div>
        <h1>
          {this.state.winner > 0 ?  this.state.winner == 1? "Black Wins" : "Red Wins": this.state.player? "Blacks Turn" : "Reds Turn"}
        </h1>
        <Board cells= {this.state.cells} handleClick= {this.handleClick} />
        <button onClick= {() => this.restart()} >Restart</button>
      </div>
    )
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
)