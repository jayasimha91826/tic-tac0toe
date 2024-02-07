import Player from "./Player";  
import GameBoard from "./GameBoard";
import { useState } from "react";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];


function derrivedActivePlayer(gameTurns){
  let currentPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==="X"){
    currentPlayer="O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns]=useState([]);
  const[player, setPlayer]=useState(
    {
      X:"player1",
      O:"player2"
    }
  )
  //const [hasWinner, setHasWinner]=useState(false);
  //const [activePlayer, setActivePlayer]=useState('X');

  const activePlayer=derrivedActivePlayer(gameTurns);
  let gameBoard=[...initialGameBoard.map(array=>[...array])];

    for(const turn of gameTurns)
    {
        const{square,player}=turn;
        const{row,col}=square;
        gameBoard[row][col]=player;
    }

    let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]

    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && secondSquareSymbol===thirdSquareSymbol)
    {
      winner=player[firstSquareSymbol];
    }
  }
  const hasDraw=gameTurns.length===9 && !winner

  function handleSelectSquare(rowIndex, colIndex){
    //setActivePlayer((currentlyActive)=>currentlyActive==='X'?'O':'X');
    setGameTurns((previousTurn)=>{
      const currentPlayer=derrivedActivePlayer(previousTurn);
      const updatedTurn=[
        {square:{row:rowIndex,col:colIndex},
         player:currentPlayer},...previousTurn];
      return updatedTurn;
    });
  }
  
  function handleResart(){
    setGameTurns([])
  }
  function handlePlayerNameChange(symbol,newName){
    setPlayer(prevPlayers=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      };
    }
      );
  }

  return (
    <main>
      <div  id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialTitle="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
        <Player initialTitle="Player 2" symbol="O" isActive={activePlayer==='O'}
        onChangeName={handlePlayerNameChange}/>
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleResart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
