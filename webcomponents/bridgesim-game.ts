///<reference path="../bower_components/polymer-ts/polymer-ts.d.ts" />
///<reference path="../engine/ship.ts" />
///<reference path="const.ts" />
///<reference path="bridgesim-map.ts" />
///<reference path="bridgesim-nav.ts" />
///<reference path="bridgesim-thrust.ts" />
///<reference path="bridgesim-power.ts" />

namespace Bridgesim.Client {

  @component('bridgesim-game')
  class Game extends polymer.Base {
    @property({type: Number, value: 60}) size: number;

    private ship: Core.Ship;
    private ships: Core.Ship[];
    private shipIdx: number = 0;

    private prevTs: number = 0;
    private lag: number = 0;

    private map: Map;
    private nav: Nav;
    private thrust: Thrust;
    private power: Power;

    ready(): void {
      this.map = this.$.map;
      this.nav = this.$.nav;
      this.thrust = this.$.thrust;
      this.power = this.$.power;
      this.ships = [
        new Core.Ship('P28', 30, 30, 0),
        new Core.Ship('A19', 18, 2, 18),
        new Core.Ship('S93', 20, 8, 37),
      ];
      this.ship = this.ships[0];
      this.frame(0);
    }

    nextShip(): void {
      if (this.shipIdx == this.ships.length - 1) {
        this.shipIdx = 0;
      } else {
        this.shipIdx++;
      }
      this.ship = this.ships[this.shipIdx];
    }

    prevShip(): void {
      if (this.shipIdx == 0) {
        this.shipIdx = this.ships.length - 1;
      } else {
        this.shipIdx--;
      }
      this.ship = this.ships[this.shipIdx]
    }

    frame(ts: number): void {
      requestAnimationFrame(this.frame.bind(this));
      this.$.input.process();
      this.lag += ts - this.prevTs;
      while (this.lag >= MPF) {
        for (var i = 0; i < this.ships.length; i++) {
          this.ships[i].tick();
        }
        this.lag -= MPF;
      }
      this.map.draw();
      this.nav.draw();
      this.thrust.draw();
      this.power.draw();
    }
  }
  Game.register();
}
