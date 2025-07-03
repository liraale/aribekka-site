const container = document.getElementById('scene-container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, container.clientWidth / 600, 0.1, 1000);
camera.position.z = 300;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, 600);
container.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const sphereRadius = 100;
const segments = 16;
const rings = 16;

// Crear geometría de la esfera
const geometry = new THREE.SphereGeometry(sphereRadius, segments, rings);

//Wireframe
const wireframe = new THREE.WireframeGeometry(geometry);
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00f0ff });
const lines = new THREE.LineSegments(wireframe, lineMaterial);
scene.add(lines);

// Crear puntos en las intersecciones
const pointMaterial = new THREE.PointsMaterial({ color: 0x00f0ff, size: 3 });
const points = new THREE.Points(geometry, pointMaterial);
scene.add(points);

// Etiquetas HTML para algunos nodos
const labels = [
  { index: 0, name: 'Apple' },
  { index: 10, name: 'Microsoft' },
  { index: 20, name: 'Android' },
  { index: 30, name: 'PlayStation' },
  { index: 40, name: 'Nintendo' }
];

labels.forEach(label => {
  const div = document.createElement('div');
  div.className = 'label';
  div.textContent = label.name;
  container.appendChild(div);
  label.element = div;
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);

  // Actualizar posición de etiquetas
  labels.forEach(label => {
    const pos = new THREE.Vector3();
    pos.fromBufferAttribute(geometry.attributes.position, label.index);
    const projected = pos.clone().project(camera);
    const x = (projected.x * 0.5 + 0.5) * container.clientWidth;
    const y = (-projected.y * 0.5 + 0.5) * 600;
    label.element.style.left = `${x}px`;
    label.element.style.top = `${y}px`;
  });
}

animate();
