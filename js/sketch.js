// create a variable to hold our world object
let world;

let noiseLocation = 0;

let groundW = 4,
  groundH = 4;

let flowers = [],
  birds = [];
let flower, bird0, bird1;

// create a variable to hold our marker
let marker1, marker2;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World("ARScene");
  background(0, 50);

  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker1 = world.getMarker("hiro");
  marker2 = world.getMarker("zb");

  // ground (temp placeholder)
  let littleCube1 = new Box({
    x: 0,
    y: 0,
    z: 1,
    rotationX: 45,
    red: 0,
    green: 0,
    blue: 0,
    width: groundW,
    height: groundH,
    depth: 0.1,
    opacity: 0.5,
  });
  marker1.addChild(littleCube1);

  flower = new OBJ({
    asset: "flower_obj",
    mtl: "flower_mtl",
    x: 0,
    y: 0,
    z: 1.5,
    rotationX: -45,
    rotationY: 0,
    scaleX: 0.25,
    scaleY: 0.25,
    scaleZ: 0.25,
  });
  marker1.add(flower);

  birds = [
    new Bird(random(-1, 1), random(0, 2), random(-1, 1)),
    new Bird(random(-1, 1), random(0, 2), random(-1, 1)),
    new Bird(random(-1, 1), random(0, 2), random(-1, 1)),
  ];
}

function draw() {
  for (let i = 0; i < birds.length; i++) {
    //birds[i].move();
  }
}
