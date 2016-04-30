
namespace Bridgesim.Core {

  export class Projectile implements Tickable {
    body: Body;
    dead: boolean = false;
    private velocity: number = .2;
    private range: number = 5;
    private travel: number = 0;

    constructor(public id: number, x: number, y: number, yaw: number) {
      this.body = new Body(x, y, yaw, 0);
    }

    tick() {
      let rads = radians(this.body.yaw - 90);
      this.body.setX(this.body.x + (this.velocity * Math.cos(rads)));
      this.body.setY(this.body.y + (this.velocity * Math.sin(rads)));
      this.travel += this.velocity;
      if (this.travel > this.range) {
        this.dead = true;
      }
    }
  }
}
