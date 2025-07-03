document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('nodes-container');
  const rotator = document.getElementById('sphere-rotator');
  const radius = 200;
  const center = { x: 250, y: 250 };
  const nodes = [];

  techNodes.forEach((nodeData, i) => {
    const phi = Math.acos(-1 + (2 * i) / techNodes.length);
    const theta = Math.sqrt(techNodes.length * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(phi);

    const node = document.createElement('a');
    node.className = 'node';
    node.href = nodeData.url;
    node.target = '_blank';
    node.textContent = nodeData.label;
    node.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    container.appendChild(node);

    nodes.push({ x, y, z, element: node, theta, phi });
  });

  // Rotar al pasar el mouse
  nodes.forEach(n => {
    n.element.addEventListener('mouseenter', () => {
      const rotateY = -n.theta * (180 / Math.PI);
      const rotateX = (90 - n.phi * (180 / Math.PI));
      rotator.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      // Correccion de orientacion de nodos
      n.element.style.transform += `rotateY(${rotateY * -1}deg) rotateX(${rotateX * -1}deg)`;
    });
    n.element.addEventListener('mouseleave', () => {
      rotator.style.transform = `rotateY(0deg) rotateX(0deg)`;
      n.element.style.transform = `translate3d(${n.x}px, ${n.y}px, ${n.z}px)`;
    });
  });
});
