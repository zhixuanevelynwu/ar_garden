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

// a static container that represents some graphics that we always want visible to our users
let staticContainer;

let mic;
let speechRec;
let rain = false;
let scared = false;
let scaredBuffer = 0;

function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World("ARScene");
  background(0, 50);
  staticContainer = new Container3D({
    x: 0,
    y: 0,
    z: -5,
  });
  // grab a reference to the marker that we set up on the HTML side (connect to it using its 'id')
  marker1 = world.getMarker("hiro");
  marker2 = world.getMarker("zb");

  // ground (temp placeholder)
  let littleCube1 = new Box({
    x: 0,
    y: -1,
    z: 0,
    rotationX: -85,
    red: 0,
    green: 0,
    blue: 0,
    width: groundW,
    height: groundH,
    depth: 0.1,
    opacity: 0.5,
  });
  staticContainer.addChild(littleCube1);

  flower = new OBJ({
    asset: "flower_obj",
    mtl: "flower_mtl",
    x: 0,
    y: -1,
    z: 1.5,
    rotationX: 20,
    rotationY: 0,
    scaleX: 0.25,
    scaleY: 0.25,
    scaleZ: 0.25,
  });
  staticContainer.addChild(flower);

  birds = [
    new Bird(random(-1, 1), random(0, 2), random(-1, 1)),
    new Bird(random(-1, 1), random(0, 2), random(-1, 1)),
    new Bird(random(-1, 1), random(0, 2), random(-1, 1)),
  ];

  world.scene.appendChild(staticContainer.tag);  

  //Connect mic
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  //mic.connect();

  //Connect Speech Recognition
  speechRec = new p5.SpeechRec('en-US');
  speechRec.continuous = true;
  //Listens for word 'rain' and toggles rain boolean
  speechRec.onResult = function () {
    if(speechRec.resultString.toLowerCase().indexOf('rain') >= 0){
      rain = !rain;
      console.log("rain: " + rain);
    }
  }
  speechRec.start();
}

function draw() {
  for (let i = 0; i < birds.length; i++) {
    //birds[i].move();
  }

  //Listen for volume, if > 0.5 then birds/butterflies will become scared for ~10 seconds?
  if(mic.getLevel() > 0.5 && scared == false){
    scared = true;
    scaredBuffer = 10;
    console.log("kinda loud");
  }
  //Assuming frame rate is ~24
  if(scaredBuffer > 0 && frameCount % 24 == 0){
    scaredBuffer--;
    if(scaredBuffer == 0){
      scared = false;
    }
  }
}
