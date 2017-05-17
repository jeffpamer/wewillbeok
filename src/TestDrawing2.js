import Fathom from './fathom';
import * as THREE from 'three';

import revenant from './Revenant.mp3';

const materialStandardParams = {
  roughness: 0.054676705160855, // calculated from shininess = 1000
  metalness: 0.0
};

export default class TestDrawing2 extends Fathom {
  constructor() {
    super([revenant]);
  }

  setup() {
    const materialStandardFloor = new THREE.MeshStandardMaterial(
      materialStandardParams
    );

    const geometryFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
    const geometrySphere = new THREE.SphereGeometry(1.5, 32, 32);

    const meshStandardFloor = new THREE.Mesh(
      geometryFloor,
      materialStandardFloor
    );

    const ambientLight = new THREE.AmbientLight(0x000000);

    this.camera.position.set(0, 6, 35);

    this.rectLight = new THREE.RectAreaLight(0xffffff, undefined, 1.5, 15);
    this.rectLight.matrixAutoUpdate = true;
    this.rectLight.intensity = 100.0;
    this.rectLight.position.set(0, 0, 0);

    this.pointLight = new THREE.PointLight(0xffffff, 2, 50);
    this.lightSphere = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    this.pointLight.add(this.lightSphere);
    this.pointLight.position.set(0, 0.2, 0);

    materialStandardFloor.color.set(0x808080);

    this.lightSphere.castShadow = true;
    this.lightSphere.receiveShadow = true;

    this.scene.add(meshStandardFloor);
    this.scene.add(ambientLight);
    this.scene.add(this.pointLight);

    this.scene.fog = new THREE.Fog(0xffffff, 1, 5000);
    this.scene.fog.color.setHSL(1, 0, 1);
    // this.scene.add(this.rectLight);
  }

  update(t, frequencyData) {
    const r = 0.01 + frequencyData / 255;
    const l = Math.abs(Math.sin(t));

    this.pointLight.intensity = 0;
    this.lightSphere.scale.set(r, r, r);
    this.lightSphere.material.color = new THREE.Color(r, r, r);
  }
}
