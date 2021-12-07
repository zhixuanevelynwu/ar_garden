class Bird {
  constructor(x, y, z) {
    this.startX = x;
    this.startY = y;
    this.startZ = z;

    this.container = new Container3D({
      x: this.startX,
      y: this.startY,
      z: this.startZ,
      rotationX: -45,
      rotationY: random(0, 45),
      rotationZ: random(0, 45),
    });
    marker1.add(this.container);

    let birdTypes = ["bird0", "bird1"];
    let birdType = birdTypes[int(random(0, birdTypes.length))];

    this.asset = new OBJ({
      asset: birdType + "_obj",
      mtl: birdType + "_mtl",
      x: 0,
      y: 0,
      z: 0,
      scaleX: 0.25,
      scaleY: 0.25,
      scaleZ: 0.25,
    });
    this.container.add(this.asset);

    this.spd = 0.05;

    this.rangeW = 1;
    this.rangeH = 1;
    this.desiredX = random(-this.rangeW / 2, this.rangeW / 2);
    this.desiredY = random(-this.rangeH / 2, this.rangeH / 2);
    this.desiredZ = 0;
  }

  move() {
    // get our current position
    let currentPosition = this.container.getMarkerPosition();

    let n = noise(noiseLocation);
    let s = map(n, 0, 1, -0.01, 0.01);

    // see how we need to adjust our position to get to our desired position
    let xMove = 0;
    let yMove = 0;
    //let zMove = 0;
    if (abs(currentPosition.x - this.desiredX) > 0.3) {
      if (currentPosition.x < this.desiredX) {
        xMove = this.spd + s;
      } else {
        xMove = -this.spd - s;
      }
    }

    if (abs(currentPosition.y - this.desiredY) > 0.3) {
      if (currentPosition.y < this.desiredY) {
        yMove = this.spd + s;
      } else {
        yMove = -this.spd - s;
      }
    }

    // if (abs(currentPosition.z - this.desiredZ) > 0.3) {
    //   if (currentPosition.z < this.desiredZ) {
    //     zMove = this.spd + s;
    //   } else {
    //     zMove = -this.spd - s;
    //   }
    // }

    //this.container.nudge(xMove, yMove, 0);
    noiseLocation += 0.001;

    // did we get to our destination?  if so,
    // pick a new one
    if (
      dist(
        this.desiredX,
        this.desiredY,
        this.desiredZ,
        currentPosition.x,
        currentPosition.y,
        currentPosition.z
      ) < 0.5
    ) {
      this.desiredX = random(-this.rangeW / 2, this.rangeW / 2);
      this.desiredY = random(-this.rangeH / 2, this.rangeH / 2);
      this.desiredZ = 0;
    }
    console.log(currentPosition.z, this.desiredZ);
  }
}
