'use strict';

const GRID_SIZE = 61;
const TILE_PX = 10;
const BLIP_PX = 2;

let ships = [];
let ship;

function init() {
  ships = [
    new Ship('P28', 30, 30, 0),
    new Ship('A19', 18, 2, 18),
    new Ship('S93', 20, 8, 37),
  ];
  ship = ships[0];

  initInput();
  initMap();
  initNav();
  initThrust();
  
  requestAnimationFrame(frame);
}

function frame() {
  inputs();
  tick();
  draw();
  requestAnimationFrame(frame);
}

function tick() {
  for (var ship of ships) {
    ship.tick();
  }
}

function draw() {
  drawMap();
  drawNav();
  drawThrust();
}