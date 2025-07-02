document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('nodes-container');
  const svg = document.getElementById('lines');
  const radius = 200;
  const center = { x: 250, y: 250 };
  const nodes = [];

  techNodes.forEach((nodeData, i) => {
    const phi = Math.acos(-1 + (2 * i) / techNodes.length);
    const theta = Math.sqrt(techNodes.length * Math.PI) * phi;

    const x = radius * Math.cos(theta) * Math.sin(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);

    const node = document.createElement('a');
    node.className = 'node';
    node.href = nodeData.url;
    node.target = '_blank';
    node.textContent = nodeData.label;
    node.style.left = `${center.x + x}px`;
    node.style.top = `${center.y + y}px`;
    container.appendChild(node);

    nodes.push({ x: center.x + x, y: center.y + y, element: node });
  });

  // Dibujar líneas
  nodes.forEach((n1, i) => {
    for (let j = i + 1; j < nodes.length; j++) {
      const n2 = nodes[j];
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", n1.x);
      line.setAttribute("y1", n1.y);
      line.setAttribute("x2", n2.x);
      line.setAttribute("y2", n2.y);
      line.setAttribute("stroke", "rgba(0,234,255,0.15)");
      svg.appendChild(line);
    }
  });
});
