const canvas = document.getElementById('sphere-canvar');
const ctx = canvas.getContext('2d');
const width	= canvas.width;
const radius = 200;
const center = { x: width / 2, y: height / 2 };

const topics = [
  { label: 'Apple', url: 'https://www.apple.com' },
  { label: 'Microsoft', url: 'https://www.micrsoft.com' },
  { label: 'Android', url: 'https://www.android.com' },
  { label: 'Asus', url: 'https://www.asus.com' },
  { label: 'Xbox', url: 'https://www.xbox.com' },
  { label: 'Playstation', url: 'https://www.playstation.com' },
  { label: 'Nintendo', url: 'https://www.nintendo.com' },
  { label: 'VR', url: '#' },
  { label: 'Audio', url: '#' },
  { label: 'Impresión', url: '#' },
  { label: '3D Print', url: '#' }
  ];

  const points = topics.map((topic, i) => {
  	const phi = Math.acos(-1 + (2 * i) / topics.length);
  	const theta = Math.sqrt(topics.length * Math.PI) * phi;
  	return {
  		x: radius * Math.cos(theta) * Math.sin(phi),
  		y: radius * Math.sin(theta) * Math.sin(phi),
  		z: radius * Math.cos(phi),
  		label: topic.label,
  		url: topic.url
  	};
  });

  function draw() {
  	ctx.clearRect(0, 0, width, height);

  	//Dibujar lineas entre nodos
  	ctx.strokeStyle = 'rgba(0, 234, 255, 0.2)';
  	points.forEach((p1, i) => {
  		for (let j = i +1; j < points.length; j++) {
  			const p2 = points[j];
  			ctx.beginPath();
  			ctx.moveTo(center.x + p1.x, center.y + p1.y);
  			ctx.lineTo(center.x + p2.x, center.y + p2.y);
  			ctx.stroke();
  		}
  	});

  	//Dibujar Nodos
  	points.forEach(p => {
  		ctx.beginPath();
  		ctx.arc(center.x +p.x, center.y + p.y, 6, 0, 2 * Math.PI);
  		ctx.fillStyle = '#00eaff';
  	});
  }

  draw();