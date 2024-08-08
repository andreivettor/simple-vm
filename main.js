import * as THREE from "three";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

window.addEventListener(
  "resize",
  () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const controls = new OrbitControls(camera, renderer.domElement);

let globalFont;

const loader = new FontLoader();

let textGeo, textMesh, centerOffset;

loader.load("fonts/Outfit.json", function (font) {
  globalFont = font;

  textGeo = new TextGeometry("Blah blah!", {
    font: globalFont,

    size: 80,
    depth: 0,
  });
  textMesh = new THREE.Mesh(textGeo, textMats);
  textGeo.computeBoundingBox();
  centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
  textMesh.position.x = centerOffset;
  textMesh.position.y = 100;
  textMesh.position.z = -300;
  scene.add(textMesh);
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const textMats = [
  new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
  new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
];

const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
scene.add(light);

var grid = new THREE.GridHelper(100, 20);
scene.add(grid);

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
