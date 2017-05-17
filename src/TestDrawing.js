import React from 'react';
import * as THREE from 'three';
import './canvas.css';
import testAudio from './test-audio.mp3';

export default class TestDrawing extends React.Component {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      34,
      window.innerWidth / window.innerHeight,
      0.1,
      20000
    );

    this.__render = this.__render.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    const materialParams = {
      specular: 0xfffff0,
      shininess: 10000
    };

    // Materials, geometry, meshes
    const materialFloor = new THREE.MeshPhongMaterial(materialParams);
    const geometryFloor = new THREE.BoxGeometry(2000, 0.1, 2000);
    const meshFloor = new THREE.Mesh(geometryFloor, materialFloor);
    const materialBox = new THREE.MeshPhongMaterial(materialParams);
    const geometryBox = new THREE.BoxGeometry(Math.PI, Math.sqrt(2), Math.E);
    const meshBox = new THREE.Mesh(geometryBox, materialBox);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x080808);
    const directionalLight = new THREE.DirectionalLight(0xfffffff);
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      directionalLight
    );
    const raycaster = new THREE.Raycaster();

    const gl = this.renderer.context;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.antialias = true;

    this.camera.position.set(45, 20, 45);

    console.log('begin loading audio file');

    const listener = new THREE.AudioListener();
    this.camera.add(listener);

    this.sound = new THREE.Audio(listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(testAudio, buffer => {
      this.sound.setBuffer(buffer);
      this.sound.setLoop(true);
      this.sound.setVolume(0.5);
      // this.sound.play();
      console.log('audio loaded');
    });

    this.analyser = new THREE.AudioAnalyser(this.sound, 32);

    this.renderer.setSize(window.innerWidth, window.innerHeight, false);
    requestAnimationFrame(this.__render);
  }

  __render() {
    // console.log('frequency data', this.analyser.getFrequencyData());
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.__render);
  }

  render() {
    return (
      <canvas
        ref={canvas => {
          this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            canvas
          });
        }}
      />
    );
  }
}
