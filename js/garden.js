class Garden {
  constructor(x = 0, y = -1, z = -1) {
    this.flowers = [];
    this.trees = [];

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

    this.rain = [];
    for (let i = 0; i < 100; i++) {
      let b = new Box({
        x: random(-(this.groundW / 2), this.groundW / 2),
        y: random(minHeight, 2.25),
        z: random(-(this.groundD / 2), this.groundD / 2),
        width: 0.02,
        height: 0.07,
        depth: 0.01,
        opacity: 0.5,
        red: 145,
        green: 180,
        blue: 237,
        visible: false,
      });
      this.rain.push(b);
      this.container.add(b);
    }
    this.sky = new Box({
      x: 0,
      y: 2.5,
      z: 0,
      width: this.groundW,
      height: this.groundH,
      depth: this.groundD,
      red: 128,
      green: 128,
      blue: 128,
      opacity: 0.2,
      visible: false,
    });
    this.container.add(this.sky);
  }

  addFlower0() {
    if (this.flowers.length < 40) {
      let flowerX = random(-1, 1);
      let flowerY = 0;
      let flowerZ = random(0, 2.8);
      let flowerScale = random(0.1, 0.13);
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

  addFlower1() {
    if (this.flowers.length < 40) {
      let flowerX = random(-1.5, 1.5);
      let flowerY = 0;
      let flowerZ = random(0, 2.8);
      let flowerScale = random(0.08, 0.13);
      let flower = new OBJ({
        asset: "flower1_obj",
        mtl: "flower1_mtl",
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

  addTree() {
    if (this.trees.length < 20) {
      let treeX = random(-1.5, 1.5);
      let treeY = 0.05;
      let treeZ = random(-1, 1);
      let treeScale = random(0.25, 0.35);
      let tree = new OBJ({
        asset: "tree_obj",
        mtl: "tree_mtl",
        x: treeX,
        y: treeY,
        z: treeZ,
        rotationX: 20,
        scaleX: treeScale,
        scaleY: treeScale,
        scaleZ: treeScale,
      });
      append(this.trees, tree);
      this.container.add(tree);
    }
  }

  toggleRain() {
    if (rain) {
      for (let drop of this.rain) {
        this.sky.show();
        drop.show();
        drop.nudge(0, -0.01, 0);
        if (drop.y < 0) {
          drop.y = 2.25;
        }
      }
    } else {
      for (let drop of this.rain) {
        this.sky.hide();
        drop.hide();
      }
    }
  }
}
