/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-global-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
import React from 'react';
import Board from './Board';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      salary: [0],
      name: [''],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  // Fetching data with promises
  fetchData = async () => {
    try {
      const result = await fetch('http://dummy.restapiexample.com/api/v1/employees');
      const json = await result.json();
      // Generating random number based on the fetched data size, so we can stay in limits
      const randomNum = (Math.round(Math.random() * (json.data.length - 1)));
      // Getting Sallary and First Name
      const { salary, name } = this.state;
      const fetchedSalary = json.data[randomNum].employee_salary;
      const fetchedName = json.data[randomNum].employee_name.split(' ')[0];
      this.setState({
        salary: salary.concat(fetchedSalary),
        name: name.concat(fetchedName),
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Within handleClick we check if the click is a valid move and call fetch, only if it is valid
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const salary = this.state.salary.slice(0, this.state.stepNumber + 1);
    const name = this.state.name.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();

    // Check if we have winner or the field is already taken
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Check if the move is valid
    if (squares[i + 3] === undefined || (squares[i + 3] === 'X' || squares[i + 3] === 'O')) {
      this.fetchData();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares,
        }]),
        salary,
        name,
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    } else {
      console.log('Move not allowed', squares[i + 3]);
    }
  }


  // Jump to move - history function
  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: (step % 2) === 0,
  //   });
  // }

  // Back one move function
  backOneMove() {
    this.setState({
      stepNumber: (this.state.stepNumber > 0) ? (this.state.stepNumber - 1) : 0,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const currentNameList = this.state.name.slice(0, this.state.stepNumber + 1);
    const currentSalaryList = this.state.salary.slice(0, this.state.stepNumber + 1);
    const winner = calculateWinner(current.squares);

    // The items that we will print (firstname, salary)
    const nameAndSalary = currentNameList.map((name, idx) => {
      const itemToPrint = `${name}, ${currentSalaryList[idx]}`;
      if (idx > 0) {
        return (
          <p key={idx}>
            <h1>
              {itemToPrint}
            </h1>
          </p>
        );
      }
    });


    // const moves = history.map((step, move) => {
    //   const desc = move
    //     ? `Go to move #${move}`
    //     : 'Go to game start';
    //   return (
    //     <li key={move}>
    //       <button onClick={() => this.jumpTo(move)}>
    //         {desc}
    //       </button>
    //     </li>
    //   );
    // });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="left-panel">
          <div className="game-info">
            <h1>game-info left-panel</h1>
            <div>{status}</div>
            {/* <ol>{moves}</ol> */}
          </div>
          <div className="charts">
            <h1>charts left-panel</h1>
            <button onClick={() => this.backOneMove()}>BACK</button>
            <ol>{nameAndSalary}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// Helper function for calculating the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
