class Bird {
  /* constructor(x, y, z) {
    this.startX = x;
    this.startY = y;
    this.startZ = z;

    this.scale = random(0.15, 0.2);

    this.container = new Container3D({
      x: this.startX,
      y: this.startY,
      z: this.startZ,
      rotationX: 45,
      rotationY: random(0, 45),
      rotationZ: random(0, 45),
    });
    staticContainer.addChild(this.container);

    let birdTypes = ["bird0", "bird1"];
    let birdType = birdTypes[int(random(0, birdTypes.length))];

    this.asset = new OBJ({
      asset: birdType + "_obj",
      mtl: birdType + "_mtl",
      x: 0,
      y: 0,
      z: 0,
      scaleX: this.scale,
      scaleY: this.scale,
      scaleZ: this.scale,
    });
    this.container.add(this.asset);

    this.spd = 0.05;

    this.rangeW = 1;
    this.rangeH = 1;
    this.desiredX = random(-this.rangeW / 2, this.rangeW / 2);
    this.desiredY = random(-this.rangeH / 2, this.rangeH / 2);
    this.desiredZ = 0;
  } */

  constructor(startX, startY, startZ) {
    this.birdType = "bird" + Math.floor(random(0, numBirdTypes));

    this.container = new Container3D({
      x: startX,
      y: startY,
      z: startZ,
    });
    staticContainer.addChild(this.container);


    this.container.addChild(new OBJ({
      asset: this.birdType + "_obj",
      mtl: this.birdType + "_mtl",
      x: 0,
      y: 0,
      z: 0,
      scaleX: 0.1,
      scaleY: 0.1,
      scaleZ: 0.1,
    }));

    this.speed = 0.005;

    this.targetX = random(-gridLength, gridLength);
    this.targetY = random(minHeight, maxHeight);
    this.targetZ = random(-gridWidth, gridWidth);
    angleMode(DEGREES);
    
    //+180 to compensate for it facing right at the beginning (needs to face left)
    this.container.rotateX(map(atan2(this.targetY - this.container.y, this.targetZ - this.container.z), -180, 180, -60, 60, true));
    this.container.rotateY(180 + atan2(-(this.targetZ - this.container.z), this.targetX - this.container.x));
    this.container.rotateZ(atan(this.targetY - this.container.y, this.targetX - this.container.x));

    this.atTargetFlower = false;
    this.atFlowerBuffer = 0;
  }

  /* move() {
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
  } */

  move() {
    if (!rain && !scared) {
      this.speed = 0.005;
      if(!this.container.getVisibility()){
        this.container.show();
      }
      if(!this.targetFlower && garden.flowers.length > 0){
        this.targetFlower = garden.flowers[Math.floor(random(0, garden.flowers.length))];
        this.targetX = this.targetFlower.x;
        this.targetY = this.targetFlower.y -.4;
        this.targetZ = this.targetFlower.z + zOffset;
      }
      let nudgeX = 0;
      let nudgeY = 0;
      let nudgeZ = 0;
      if (!this.targetFlower && dist(this.container.x, this.container.y, this.container.z, this.targetX, this.targetY, this.targetZ) <= .01) {
        this.targetX = random(-gridLength, gridLength);
        this.targetY = random(minHeight, maxHeight);
        this.targetZ = random(-gridWidth, gridWidth);
      } else if (dist(this.container.x, this.container.y, this.container.z, this.targetX, this.targetY, this.targetZ) <= .05){
        this.atTargetFlower = true;
        this.atFlowerBuffer = 7;
      }

      if(this.atTargetFlower && this.atFlowerBuffer > 0){
        if(frameCount % 30 == 0){
          this.atFlowerBuffer--;
        }
        if(this.container.y >= -.4){
          this.targetY = -.75;
        }
        if(this.container.y <= -.6){
          this.targetY = 0;
        }

        if(this.atFlowerBuffer <= 0){
          if(garden.flowers.length > 0){
            this.targetFlower = garden.flowers[Math.floor(random(0, garden.flowers.length))];
            this.targetX = this.targetFlower.x;
            this.targetY = this.targetFlower.y + yOffset;
            this.targetZ = this.targetFlower.z + zOffset;
            this.atTargetFlower = false;
          } else {
            this.targetX = random(-gridLength, gridLength);
            this.targetY = random(minHeight, maxHeight);
            this.targetZ = random(-gridWidth, gridWidth);
          }
        }
      }
      this.container.rotateX(map(atan2(this.targetY - this.container.y, this.targetZ - this.container.z), -180, 180, -60, 60, true));
      this.container.rotateY(180 + atan2(-(this.targetZ - this.container.z), this.targetX - this.container.x));
      this.container.rotateZ(-atan(this.targetY - this.container.y, this.targetX - this.container.x));
      //calc nudge X
      if (abs(this.container.x - this.targetX) <= .005) {
        nudgeX = 0;
      }
      else if (this.container.x > this.targetX) {
        nudgeX = -this.speed;
      } else if (this.container.x < this.targetX) {
        nudgeX = this.speed;
      }
      //calc nudge Y
      if(abs(this.container.y - this.targetY) <= .005) {
        nudgeY = 0;
      } else if (this.container.y > this.targetY) {
        nudgeY = -this.speed;
      } else if (this.container.y < this.targetY) {
        nudgeY = this.speed;
      }
      //calc nudge Z
      if (abs(this.container.z - this.targetZ) <= .005) {
        nudgeZ = 0;
      }
      else if (this.container.z > this.targetZ) {
        nudgeZ = -this.speed;
      } else if (this.container.z < this.targetZ) {
        nudgeZ = this.speed;
      }

      this.container.nudge(nudgeX, nudgeY, nudgeZ);
    } else {

      //check if bird is off the garden (hiding from the rain or running from sound)
      if (this.container.z < -gridWidth) {
        this.container.hide();
      } else {
        this.container.rotateX(0);
        this.container.rotateY(-90);
        this.container.rotateZ(0);
        if(scared){
          this.speed = 0.05;
        }
        this.container.nudge(0, 0, -this.speed);
      }
    }
  }

}