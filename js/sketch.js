/* WORLD VARS */
let world;
let marker1, marker2;
let noiseLocation = 0;
let staticContainer;
let videoRepositioned = false;

/* SPEECH VARS */
let mic;
let speechRec;
let rain = false;
let scared = false;
let scaredBuffer = 0;

/* GARDEN */
let garden;
let controls = [];
let flowers = [];
let birds = [];
let snail;

function setup() {
  /* SET UP THE AR WORLD */
  world = new World("ARScene");
  background(0, 50);
  staticContainer = new Container3D({
    x: 0,
    y: 0,
    z: -5,
  });
  world.scene.appendChild(staticContainer.tag);
  marker1 = world.getMarker("hiro");
  marker2 = world.getMarker("zb");

  /* SET UP SPEECH RECGONITION */
  //Connect mic
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  //mic.connect();

  //Connect Speech Recognition
  speechRec = new p5.SpeechRec("en-US");
  speechRec.continuous = true;
  //Listens for word 'rain' and toggles rain boolean
  speechRec.onResult = function () {
    if (speechRec.resultString.toLowerCase().indexOf("rain") >= 0) {
      rain = !rain;
      console.log("rain: " + rain);
    }
  };
  speechRec.start();

  /* GARDEN */
  garden = new Garden();
  birds = [
    new Bird(random(-2, 2), random(0, 0.5), random(-1, 1)),
    new Bird(random(-2, 2), random(0, 0.5), random(-1, 1)),
    new Bird(random(-2, 2), random(0, 0.5), random(-1, 1)),
  ];
  snail = new Snail(-1, -0.8, 1);
  controls = [new sunControl(), new flowerControl(), new treeControl()];
}

function draw() {
  /* FLIP VIDEO FOR EASIER USER INTERACTION */
  // flip the order of the video, if necessary
  if (!videoRepositioned) {
    // get a DOM reference to the video and canvas
    let videoElement = document.querySelector("video");
    let canvasElement = document.querySelector("canvas");
    if (videoElement) {
      videoElement.style["transform"] = "scale(-1,1)";
      videoElement.style["filter"] = "flipH";

      canvasElement.style["transform"] = "scale(-1,1)";
      canvasElement.style["filter"] = "flipH";

      videoRepositioned = true;
    }
  }

  /* SPEECH RELATED */
  //Listen for volume, if > 0.5 then birds/butterflies will become scared for ~10 seconds?
  if (mic.getLevel() > 0.5 && scared == false) {
    scared = true;
    scaredBuffer = 10;
    console.log("kinda loud");
  }
  //Assuming frame rate is ~24
  if (scaredBuffer > 0 && frameCount % 24 == 0) {
    scaredBuffer--;
    if (scaredBuffer == 0) {
      scared = false;
    }
  }

  /* UI RELATED */
  for (let i = 0; i < controls.length; i++) {
    controls[i].onHover();
  }

  /* GARDEN */
  snail.move(rain);
}
