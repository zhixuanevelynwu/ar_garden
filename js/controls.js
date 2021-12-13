class Control {
  constructor(x = 0, y = 1.25, z = -1.5) {
    this.name = "control";

    this.x = x;
    this.y = y;
    this.z = z;

    this.btnW = 0.4;
    this.btnH = 0.4;
    this.btnD = 0.4;

    this.color = [0, 0, 0];

    this.container = new Container3D({
      x: this.x,
      y: this.y,
      z: this.z,
    });
    staticContainer.addChild(this.container);

    this.button = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.5,
      width: this.btnW,
      height: this.btnH,
      Depth: this.btnD,
    });

    this.frame = 0;
  }

  onHover() {
    if (marker1.isVisible()) {
      // which static container are we closest to?
      let markerPosition = new THREE.Vector3().setFromMatrixPosition(
        marker1.tag.object3D.matrixWorld
      );
      if (dist(markerPosition.x, markerPosition.y, this.x, this.y) < 1) {
        console.log(this.name);
        this.glow.show();
        this.frame++;
        if (this.frame % 15 == 0) this.effect();
      } else {
        this.glow.hide();
      }
    }
  }

  effect() {}
}

class treeControl extends Control {
  constructor(x = -1.5, y = 1.25, z = -1.5) {
    super(x, y, z);
    this.name = "plant tree";
    this.color = [150, 255, 80];
    this.button = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.5,
      width: this.btnW,
      height: this.btnH,
      Depth: this.btnD,
    });
    this.container.add(this.button);

    this.glow = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.8,
      width: this.btnW * 1.1,
      height: this.btnH * 1.1,
      Depth: this.btnD * 1.1,
    });
    this.container.addChild(this.glow);
    this.glow.hide();
  }

  effect() {
    garden.addTree();
  }
}

class flower0Control extends Control {
  constructor(x = 0, y = 1.25, z = -1.5) {
    super(x, y, z);
    this.name = "plant flower";
    this.color = [255, 255, 255];
    this.button = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.5,
      width: this.btnW,
      height: this.btnH,
      Depth: this.btnD,
    });
    this.container.add(this.button);

    this.glow = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.8,
      width: this.btnW * 1.1,
      height: this.btnH * 1.1,
      Depth: this.btnD * 1.1,
    });
    this.container.addChild(this.glow);
    this.glow.hide();
  }

  effect() {
    garden.addFlower0();
  }
}

class flower1Control extends Control {
  constructor(x = 1.5, y = 1.25, z = -1.5) {
    super(x, y, z);
    this.name = "purple flower";
    this.color = [100, 168, 232];
    this.button = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.5,
      width: this.btnW,
      height: this.btnH,
      Depth: this.btnD,
    });
    this.container.add(this.button);

    this.glow = new Box({
      x: 0,
      y: 0,
      z: 0,
      red: this.color[0],
      green: this.color[1],
      blue: this.color[2],
      opacity: 0.8,
      width: this.btnW * 1.1,
      height: this.btnH * 1.1,
      Depth: this.btnD * 1.1,
    });
    this.container.addChild(this.glow);
    this.glow.hide();
  }

  effect() {
    garden.addFlower1();
  }
}
