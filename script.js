const canvas = document.createElement("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
document.body.appendChild(canvas);
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});
const ctx = canvas.getContext("2d");
// ctx.fillRect(0, 0, canvas.width, canvas.height)

const stars = [];
let rotation = 0;
let velocity = 0.001;
let increment = 0.0002;
let alpha = 1;
class Star {
  constructor(canvas) {
    this.x = Math.random() * (canvas.width * 2) - (canvas.width * 2) / 2;
    this.y = Math.random() * (canvas.height * 2) - (canvas.height * 2) / 2;
    this.radius = Math.floor(Math.random() * 2 + 1);
    this.color = this.getRBAColor();
  }

  getRBAColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b},0.6)`;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.closePath();
  }
}

//aux
const generateStars = (number) => {
  for (let i = 0; i < number; i++) {
    stars.push(new Star(canvas));
  }
};

const drawStars = () => {
  stars.map((star) => star.draw());
};

const drawBg = () => {
  // alpha = (1 - 0.1) * (Math.abs(velocity)) / (.03 - .003)
  // if (Math.abs(velocity) > 0.019 && alpha > 0) {
  //   alpha -= 0.009;
  // } else {
  //   if (alpha < 1) {
  //     alpha += 0.009;
  //   }
  // }

  // console.log("v=>", velocity)
  ctx.fillStyle = `rgba(10,10,10,${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // rotation
  rotation += velocity;
  velocity += increment;
  if (velocity > 0.03 || velocity < -0.03) {
    // velocity = -velocity
    increment = -increment;
  }
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotation);
  drawStars();
  ctx.restore();
};

// loop
const update = () => {
  // ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBg();
  requestAnimationFrame(update);
};
generateStars(1800);
update();