class Snail {
    constructor(startX, startY, startZ) {
        this.container = new Container3D({
            x: startX,
            y: startY,
            z: startZ,
            //rotationY: 90
        });
        staticContainer.addChild(this.container);

        this.container.addChild(new OBJ({
            asset: "snail_obj",
            mtl: "snail_mtl",
            x: 0,
            y: 0,
            z: 0,
            scaleX: 0.06,
            scaleY: 0.06,
            scaleZ: 0.06,
        }));

        this.speed = 0.0005;

        this.targetX = random(-gridLength, gridLength);
        this.targetZ = random(-gridWidth, gridWidth);
        angleMode(DEGREES);
        /* let deltaZ = this.targetZ - this.container.z;
        let deltaX = this.targetX - this.container.x;

        let theta = atan2(-deltaZ, deltaX);
        console.log("theta: " + theta); */
        //this.container.rotateY(atan2(-(this.targetZ - this.container.z), this.targetX - this.container.x));
    }

    move() {
        if (!rain) {
            if(!this.container.getVisibility()){
                this.container.show();
            }
            let nudgeX = 0;
            let nudgeZ = 0;
            if (dist(this.container.x, this.container.z, this.targetX, this.targetZ) <= .15) {
                this.targetX = random(-gridLength, gridLength);
                this.targetZ = random(-gridWidth, gridWidth);
                
            }
            this.container.rotateY(atan2(-(this.targetZ - this.container.z), this.targetX - this.container.x));
            //calc nudge X
            if (abs(this.container.x - this.targetX) <= .05) {
                nudgeX = 0;
            }
            else if (this.container.x > this.targetX) {
                nudgeX = -this.speed;
            } else if (this.container.x < this.targetX) {
                nudgeX = this.speed;
            }
            //calc nudge Z
            if (abs(this.container.z - this.targetZ) <= .05) {
                nudgeZ = 0;
            }
            else if (this.container.z > this.targetZ) {
                nudgeZ = -this.speed;
            } else if (this.container.z < this.targetZ) {
                nudgeZ = this.speed;
            }

            this.container.nudge(nudgeX, 0, nudgeZ);
        } else {
            
            //check if snail is off the garden (hiding from the rain)
            if(this.container.x > gridLength || this.container.x < -gridLength || 
                this.container.z > gridWidth || this.container.z < -gridWidth) {
                    this.container.hide();
                } else {
                    this.container.rotateY(90);
                    this.container.nudge(0, 0, -this.speed);
                }
        }
    }
}