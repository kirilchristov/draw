// eslint-disable-next-line max-classes-per-file
import React from 'react';


import Board from './Board'
import './App.css';



// eslint-disable-next-line react/prefer-stateless-function




// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <h1>I am game</h1>
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


export default App;