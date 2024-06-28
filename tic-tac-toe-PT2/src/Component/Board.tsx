import { useState } from "react";
import Squares from "./Squares";
import {
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

const Board = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));
  const initialSquares = Array(9).fill(null);

  const handleClick = (i: number) => {
    //calculates if there is a winner OR if box is already prefilled, if so return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    //xIsNext state to determine if it's X or O's turn
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //Sets the square to X or O depending on the xIsNext state
    setSquares(nextSquares);
    //Sets xIsNext boolean value to the opposite of itself (true/false)
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares: string[]) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    //Added additional functions ot check for ties
    if (squares.every((square) => square !== null)) {
      return "tie";
    }
    return null;
  };

  const winner = calculateWinner(squares);

  let status;
  if (winner === "tie") {
    status = "It's a tie!";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function restartGame() {
    setSquares(initialSquares);
    setXIsNext(true);
  }

  return (
    <>
      <Container>
        <Center>
          <Heading>{status}</Heading>
        </Center>
        <Center>
          <SimpleGrid columns={3}>
            {squares.map((value, index) => (
              <Squares
                key={index}
                value={value}
                onSquareClick={() => handleClick(index)}
              />
            ))}
          </SimpleGrid>
        </Center>
        <Center>
          <Button onClick={restartGame}>Restart Game</Button>
        </Center>
      </Container>
    </>
  );
};

export default Board;
