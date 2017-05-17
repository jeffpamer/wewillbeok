import React, { Component } from 'react';
import * as THREE from 'three';

export default class Fathom extends Component {
  constructor(audioTracks, audioOptions) {
    super();

    this.audioTracks = audioTracks;

    this.scene = new THREE.Scene();
    this.origin = new THREE.Object3D();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    if (this.audioTracks.length) {
      const audioLoader = new THREE.AudioLoader();
      this.listener = new THREE.AudioListener();
      this.sound = new THREE.Audio(this.listener);
      this.analyser = new THREE.AudioAnalyser(this.sound, 32);

      audioLoader.load(this.audioTracks[0], buffer => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(true);
        this.sound.setVolume(0.1);
        // this.sound.play();
        this.audioLoaded = true;
      });

      this.camera.add(this.listener);
    }
  }

  componentDidMount() {
    this.__resized = true;
    this.__clock = new THREE.Clock();

    window.addEventListener('resize', () => (this.__resized = true));

    this.scene.add(this.camera);
    this.scene.add(this.origin);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.antialias = true;

    this.setup();
    this.__loop();
  }

  setup() {}
  update(timeElapsed, frequencyData) {}

  __loop() {
    if (this.audioLoaded) {
      const freqData = this.analyser.getFrequencyData();
      const freqBand = freqData[4];

      this.update(this.__clock.getElapsedTime(), freqBand);
    }

    this.__render();
    window.requestAnimationFrame(this.__loop.bind(this));
  }

  __render() {
    if (this.__resized) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.__resized = false;
    }

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <canvas
        ref={canvas => {
          this.renderer = new THREE.WebGLRenderer({
            canvas
          });
        }}
      />
    );
  }
}
