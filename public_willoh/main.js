import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class ThreeDModel {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.model = null;
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.loadModel('images/test.gltf');
    this.camera.position.z = 5;

    window.addEventListener('resize', () => this.onWindowResize());
    this.animate();

    this.camera.position.set(0, 0, 5);
  }

  loadModel(path) {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      this.model = gltf.scene;
      this.model.position.set(0, 0, 0); // Adjust as needed
      this.scene.add(this.model);
    }, undefined, (error) => {
      console.error('An error happened', error);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.model) {
      // Add any animations or rotations here
      this.model.rotation.y += 0.01;
    }
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

const threeDModel = new ThreeDModel();
threeDModel.init();
