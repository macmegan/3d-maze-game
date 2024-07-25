import React, { useRef, useEffect } from 'react';
import * as THREE from 'three'; 
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { mazeLayout } from '../utils/MazeLayout';
import { findStartPosition, findEndPosition } from '../utils/MazeUtils';

const MazeRenderer = ({ cameraRef, setGameOver }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const mountElement = mountRef.current;

    if (mountElement) {
      mountElement.appendChild(renderer.domElement);
    }

    const startPosition = findStartPosition();
    const endPosition = findEndPosition();

    // Create maze
    const createMaze = () => {
      const maze = new THREE.Group();
      const wallGeometry = new THREE.BoxGeometry(1, 1, 1);
      const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

      mazeLayout.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell === 1) {
            const wall = new THREE.Mesh(wallGeometry, wallMaterial);
            wall.position.set(j, 0.5, i); 
            maze.add(wall);
          }
        });
      });

      return maze;
    };

    const maze = createMaze();
    scene.add(maze);

    // Create red dot for the end position
    const createEndMarker = () => {
      const markerGeometry = new THREE.SphereGeometry(0.3, 32, 32); 
      const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(endPosition.x, 0.5, endPosition.z);
      return marker;
    };

    const endMarker = createEndMarker();
    scene.add(endMarker);

    // Create the floor with grid lines
    const createFloorWithGrid = () => {
      const gridGeometry = new THREE.BufferGeometry();
      const vertices = [];
      const gridMaterial = new THREE.LineBasicMaterial({ color: 0xaaaaaa });

      for (let i = 0; i <= 10; i++) {
        // Horizontal lines
        vertices.push(0, 0, i);
        vertices.push(10, 0, i);

        // Vertical lines
        vertices.push(i, 0, 0);
        vertices.push(i, 0, 10);
      }

      gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
      gridLines.position.y = 0; 
      return gridLines;
    };

    const floorWithGrid = createFloorWithGrid();
    scene.add(floorWithGrid);

    // Set camera position and initial rotation
    camera.position.copy(startPosition);
    camera.rotation.y = Math.PI; 

    cameraRef.current = camera;
    const controls = new PointerLockControls(camera, renderer.domElement);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      checkWinCondition(); // Check win condition on each frame
    };

    const checkWinCondition = () => {
      if (
        Math.abs(camera.position.x - endPosition.x) < 0.5 &&
        Math.abs(camera.position.z - endPosition.z) < 0.5
      ) {
        setGameOver(true);
        controls.unlock(); 
        alert('You have reached the end!'); 
      }
    };

    animate();

    return () => {
      if (mountElement) {
        mountElement.removeChild(renderer.domElement);
      }
    };
  }, [cameraRef, setGameOver]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default MazeRenderer;
