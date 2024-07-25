import * as THREE from 'three';
import { mazeLayout } from './MazeLayout';

export const findStartPosition = () => {
  for (let i = 0; i < mazeLayout.length; i++) {
    for (let j = 0; j < mazeLayout[i].length; j++) {
      if (mazeLayout[i][j] === 'S') {
        return new THREE.Vector3(j, 0.5, i);
      }
    }
  }
  return new THREE.Vector3(0, 0.5, 0); // Default position if 'S' is not found
};

export const findEndPosition = () => {
  for (let i = 0; i < mazeLayout.length; i++) {
    for (let j = 0; j < mazeLayout[i].length; j++) {
      if (mazeLayout[i][j] === 'E') {
        return new THREE.Vector3(j, 0.5, i);
      }
    }
  }
  return new THREE.Vector3(0, 0.5, 0); // Default position if 'E' is not found
};

export const snapToGrid = (position) => {
  return new THREE.Vector3(
    Math.round(position.x),
    position.y,
    Math.round(position.z)
  );
};

export const checkCollision = (position) => {
  const cellX = Math.round(position.x);
  const cellZ = Math.round(position.z);

  if (cellX < 0 || cellX >= mazeLayout[0].length || cellZ < 0 || cellZ >= mazeLayout.length) {
    return true; // Out of bounds
  }
  
  return mazeLayout[cellZ][cellX] === 1; // Return true if it's a wall
};
