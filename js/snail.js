class Snail {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.container = new Container3D({
            x: this.x,
            y: this.y,
            z: this.z,
            rotationY: 90
        });
        staticContainer.addChild(this.container);

        this.container.addChild(new OBJ({
            asset: "snail_obj",
            mtl: "snail_mtl",
            x: 0,
            y: 0,
            z: 0,
            scaleX: 0.1,
            scaleY: 0.1,
            scaleZ: 0.1,
        }));

        this.speed = 0.005;

        this.targetX = random(0, 1);
        this.targetZ = random(0, 1);
        angleMode(DEGREES);
        //Rotation not currently accurate.. :(
        this.container.rotateY(atan2(this.targetZ - this.container.z,this.targetX - this.container.x) + 90);
    }

    move(rain) {
        if(!rain) {
            let nudgeX = 0;
            let nudgeZ = 0;
            if(dist(this.container.x, this.container.z, this.targetX, this.targetZ) <= .25){
                this.targetX = random(0, 1);
                this.targetZ = random(0, 1);
                
                this.container.rotateY(atan2(this.targetZ - this.container.z,this.targetX - this.container.x) + 90);
            }

            //calc nudge X
            if(this.container.x > this.targetX) {
                nudgeX = -this.speed;
            } else if (this.container.x < this.targetX) {
                nudgeX = this.speed;
            } 
            //calc nudge Z
            if(this.container.z > this.targetZ) {
                nudgeZ = -this.speed;
            } else if (this.container.z < this.targetZ) {
                nudgeZ = this.speed;
            }

            //if moving forward on Z axis, want to - y, if moving backwards want to + y, need to work out the math later.
            this.container.nudge(nudgeX, 0, nudgeZ);
        } else {
            this.container.nudge(0, 0, -this.speed);
        }
    }
}