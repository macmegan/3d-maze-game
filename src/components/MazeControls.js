import React, { useEffect } from 'react';
import * as THREE from 'three'; 
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'; 
import { snapToGrid, checkCollision } from '../utils/MazeUtils';

const MazeControls = ({ cameraRef, setGameOver }) => {
  useEffect(() => {
    const controls = new PointerLockControls(cameraRef.current, document.body);

    const onKeyDown = (event) => {
      if (setGameOver) return; 

      const moveStep = 1; 
      const moveDirection = new THREE.Vector3();
      const currentPosition = cameraRef.current.position.clone();
      const direction = new THREE.Vector3();

      cameraRef.current.getWorldDirection(direction);
      direction.y = 0; 
      direction.normalize();

      switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
          moveDirection.copy(direction).multiplyScalar(moveStep);
          break;
        case 'ArrowDown':
        case 'KeyS':
          moveDirection.copy(direction).multiplyScalar(-moveStep);
          break;
        default:
          break;
      }

      if (['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS'].includes(event.code)) {
        const newPosition = snapToGrid(currentPosition.clone().add(moveDirection));

        if (!checkCollision(newPosition)) {
          cameraRef.current.position.copy(newPosition);
        }
      }
    };

    const handleClick = () => {
      controls.lock();
    };

    document.addEventListener('keydown', onKeyDown, false);
    document.body.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.body.removeEventListener('click', handleClick);
    };
  }, [cameraRef, setGameOver]);

  return null;
};

export default MazeControls;
