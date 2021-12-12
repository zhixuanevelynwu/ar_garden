class Garden {
  constructor(x = 0, y = -1, z = -1) {
    this.flowers = [];

    this.x = x;
    this.y = y;
    this.z = z;

    this.groundW = 4;
    this.groundH = 0.1;
    this.groundD = 4;

    this.container = new Container3D({
      x: this.x,
      y: this.y,
      z: this.z,
    });
    staticContainer.addChild(this.container);

    this.ground = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: 0,
      green: 0,
      blue: 0,
      width: this.groundW,
      height: this.groundH,
      depth: this.groundD,
      opacity: 0.5,
    });
    this.container.add(this.ground);
  }

  addFlower() {
    let flowerX = random(-1, 1);
    let flowerY = 0;
    let flowerZ = random(1, 3);
    let flowerScale = random(0.1, 0.15);
    let flower = new OBJ({
      asset: "flower_obj",
      mtl: "flower_mtl",
      x: flowerX,
      y: flowerY,
      z: flowerZ,
      rotationX: 20,
      scaleX: flowerScale,
      scaleY: flowerScale,
      scaleZ: flowerScale,
    });
    append(this.flowers, flower);
    this.container.add(flower);
  }
}
