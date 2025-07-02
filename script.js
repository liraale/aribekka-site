const radius = 150;
const tags = document.querySelectorAll('#tag-sphere li');
const total = tags.length;

tags.forEach((tag, i) => {
  const angle = (i / total) * Math.PI * 2;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  tag.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});
