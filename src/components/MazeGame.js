import React, { useRef, useState } from 'react';
import MazeRenderer from './MazeRenderer';
import MazeControls from './MazeControls';

const MazeGame = () => {
  const cameraRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);

  return (
    <div>
      <MazeRenderer cameraRef={cameraRef} setGameOver={setGameOver} />
      <MazeControls cameraRef={cameraRef} setGameOver={gameOver} />
    </div>
  );
};

export default MazeGame;
