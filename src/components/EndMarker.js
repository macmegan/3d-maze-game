import React, { useEffect } from 'react';
import * as THREE from 'three';
import { findEndPosition } from '../utils/MazeUtils';

const EndMarker = ({ scene }) => {
  useEffect(() => {
    const endPosition = findEndPosition();

    const markerGeometry = new THREE.SphereGeometry(0.3, 32, 32); // Radius of 0.3
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.position.set(endPosition.x, 0.5, endPosition.z);

    scene.add(marker);

    return () => {
      scene.remove(marker);
    };
  }, [scene]);

  return null;
};

export default EndMarker;
