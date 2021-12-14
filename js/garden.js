let dirtBoxes = [];
let selectedBoxMinX;
let selectedBoxMaxX;
let selectedBoxMinZ;
let selectedBoxMaxZ;
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

    this.dirt1 = new OBJ({
      asset: "garden1_obj",
      mtl: "garden1_mtl",
      x: 1,
      y: 0.01,
      z: 1
    });
    this.container.add(this.dirt1);

    this.dirt2 = new OBJ({
      asset: "garden2_obj",
      mtl: "garden2_mtl",
      x: -1,
      y: 0.01,
      z: -1,
    });
    this.container.add(this.dirt2);

    this.dirt3 = new OBJ({
      asset: "garden3_obj",
      mtl: "garden3_mtl",
      x: 1,
      y: 0.01,
      z: -1
    });
    this.container.add(this.dirt3);

    this.dirt4 = new OBJ({
      asset: "garden4_obj",
      mtl: "garden4_mtl",
      x: -1,
      y: 0.01,
      z: 1
    });
    this.container.add(this.dirt4);

    this.dirt1Box = new Box({
      x: 1,
      y: 0,
      z: 1,
      width: 2,
      height: .5,
      depth: 2,
      clickFunction: function (e) {
        dirtBoxes[3].show();
        dirtBoxes[0].hide();
        dirtBoxes[1].hide();
        dirtBoxes[2].hide();
        this.selectedBox = 1;
        selectedBoxMinX = -1.75;
        selectedBoxMaxX = 0;
        selectedBoxMinZ = 0;
        selectedBoxMaxZ = 1.75;
      },
      visible: false,
      opacity: .1
    });
    this.container.add(this.dirt1Box);
    dirtBoxes.push(this.dirt1Box);
    this.dirt2Box = new Box({
      x: -1,
      y: 0,
      z: -1,
      width: 2,
      height: 1,
      depth: 2,
      clickFunction: function (e) {
        dirtBoxes[2].show();
        dirtBoxes[0].hide();
        dirtBoxes[1].hide();
        dirtBoxes[3].hide();
        this.selectedBox = 2;
        selectedBoxMinX = 0;
        selectedBoxMaxX = 1.75;
        selectedBoxMinZ = -1.5;
        selectedBoxMaxZ = 0;
      },
      visible: false,
      opacity: .1
    })
    this.container.add(this.dirt2Box);
    dirtBoxes.push(this.dirt2Box);
    this.dirt3Box = new Box({
      x: 1,
      y: 0,
      z: -1,
      width: 2,
      height: 1,
      depth: 2,
      clickFunction: function (e) {
        dirtBoxes[1].show();
        dirtBoxes[0].hide();
        dirtBoxes[2].hide();
        dirtBoxes[3].hide();
        this.selectedBox = 3;
        selectedBoxMinX = -1.75;
        selectedBoxMaxX = 0;
        selectedBoxMinZ = -1.5;
        selectedBoxMaxZ = 0;
      },
      visible: false,
      opacity: 0.1
    });
    this.container.add(this.dirt3Box);
    dirtBoxes.push(this.dirt3Box);
    this.dirt4Box = new Box({
      x: -1,
      y: 0,
      z: 1,
      width: 2,
      height: .5,
      depth: 2,
      clickFunction: function (e) {
        dirtBoxes[0].show();
        dirtBoxes[1].hide();
        dirtBoxes[2].hide();
        dirtBoxes[3].hide();
        selectedBoxMinX = 0;
        selectedBoxMaxX = 1.75;
        selectedBoxMinZ = 0;
        selectedBoxMaxZ = 1.75;

      },
      visible: false,
      opacity: 0.1
    });
    this.container.add(this.dirt4Box);
    dirtBoxes.push(this.dirt4Box);

    this.selectedBox = 1;
    selectedBoxMinX = 0;
    selectedBoxMaxX = 1;
    selectedBoxMinZ = 0;
    selectedBoxMaxZ = 1;
    dirtBoxes[3].show();
    dirtBoxes[0].hide();
    dirtBoxes[1].hide();
    dirtBoxes[2].hide();

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
      let flowerX = random(selectedBoxMinX, selectedBoxMaxX);
      let flowerY = 0;
      let flowerZ = random(selectedBoxMinZ, selectedBoxMaxZ);
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
      let flowerX = random(selectedBoxMinX, selectedBoxMaxX);
      let flowerY = 0;
      let flowerZ = random(selectedBoxMinZ, selectedBoxMaxZ);
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
      let flowerX = random(selectedBoxMinX, selectedBoxMaxX);
      let flowerY = 0.05;
      let flowerZ = random(selectedBoxMinZ, selectedBoxMaxZ);
      let treeScale = random(0.5, 0.6);
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
