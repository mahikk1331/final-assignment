let balls = [];
let speed = 3
let colorVal;
let colors = []
let cameraY = 0
let sound1 = new Audio("./sound.mp3")
let sound2 = new Audio("./drum.mp3")
let sound3 = new Audio("./disc.mp3")
let sounds = [sound1, sound2, sound3]

let image1
let image2
let image3
let images = []

let curimage
let size = 80

function preload() {
	image1 = loadImage("./bg1.jpg")
	image2 = loadImage("./bg2.jpg")
	image3 = loadImage("./bg3.jpg")
	images.push(image1)
	images.push(image2)
	images.push(image3)
}

function setup() {
	createCanvas(800, 2000);
	curimage = image1
	colors.push(
		color(random(255), random(255), random(255)),
		color(random(255), random(255), random(255)),
		color(random(255), random(255), random(255)),
	)
	balls.push({
		x: random(0, width),
		y: random(0, 200),
		size: 20,
		direction: 1,
		color: random(colors)
	});

	balls.push({
		x: random(0, width),
		y: random(0, 200),
		size: 20,
		direction: 1,
		color: random(colors)
	});


	balls.push({
		x: random(0, width),
		y: random(0, 200),
		size: 20,
		direction: 1,
		color: random(colors)
	});


	balls.push({
		x: random(0, width),
		y: random(0, 200),
		size: 20,
		direction: 1,
		color: color(random(255), random(255), random(255))
	});

	window.scrollTo(0, document.body.scrollHeight);
}


function draw() {
	// Draw pixelated background
	background(0);

	for (let i = 0; i < height; i += size) {
		image(curimage, 0, i, size, size)
		image(curimage, width - size, i, size, size)
	}

	// Ball logic
	noStroke();
	for (let i = 0; i < balls.length; i++) {
		let ball = balls[i]
		fill(ball.color);
		rect(ball.x, ball.y + cameraY, ball.size, ball.size); // pixelated ball
		ball.x += speed * ball.direction;
		ball.y -= speed; // always moves up

		if (ball.x <= 0 || ball.x + ball.size >= width) {
			ball.direction *= -1; // Change direction
			let index = floor(random(0, 3))
			ball.color = colors[index]
			let sound = sounds[index]
			curimage = images[index]
			sound.currentTime = 0
			sound.play()
		}

		// Reset when it goes off screen (for looping)
		if (ball.y + cameraY < 0) {
			cameraY += height - 100
		}
	}
}



function mousePressed() {
	let index = floor(random(0, 3))
	let sound = sounds[index]
	sound.currentTime = 0
	sound.play()
	balls.push({
		x: random(0, width),
		y: random(0, 300),
		size: 20,
		direction: 1,
		color: color(random(255), random(255), random(255))
	});
}
