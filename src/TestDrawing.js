import React from "react";
import * as THREE from "three";
import "./canvas.css";

export default class TestDrawing extends React.Component {
  constructor(props) {
    super();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.__render = this.__render.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x003366
    });
    this.cube = new THREE.Mesh(geometry, material);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.scene.add(this.cube);
    this.camera.position.z = 2.5;
    requestAnimationFrame(this.__render);
  }

  __render() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.__render);
  }

  render() {
    return (
      <canvas
        ref={canvas => {
          this.renderer = new THREE.WebGLRenderer({ alpha: true, canvas });
        }}
      />
    );
  }
}
