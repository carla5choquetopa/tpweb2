// CARANCINI VALENTINA, CHOQUETOPA CARLA, COMISIÓN 3
// VIDEO: https://youtu.be/sPwM5dMWXRI

let objJuego;
let spritePersonaje, spriteEnemigo;
let spriteEspejos = [];
let fuenteTitulo;
let fuenteTexto;
let imagenFondo;
let musicaFondo;
let sonidoBoton;
let sonidoDerrota;

function preload() {
  // Imagenes
  spriteEnemigo = loadImage ('data/imagenes/medusa.png');
  spritePersonaje = loadImage ('data/imagenes/personaje.png');
  spriteEspejos [0] = loadImage ('data/imagenes/espejo_01.png');
  spriteEspejos [1] = loadImage ('data/imagenes/espejo_02.png');
  spriteEspejos [2] = loadImage ('data/imagenes/espejo_03.png');
  spriteEspejos [3] = loadImage ('data/imagenes/espejo_04.png');
  spriteEspejos [4] = loadImage ('data/imagenes/espejo_05.png');
  imagenFondo = loadImage('data/imagenes/imagenFondo.jpg');

  // Fuentes
  fuenteTitulo = loadFont('data/fuentes/Beardsons-normal.ttf');
  fuenteTexto = loadFont('data/fuentes/Credit_valley_bold.otf'); 

  //Sonido
  musicaFondo = loadSound('data/sonido/dark-horror-atmosphere-for-scary-scenes-179446.mp3');
  sonidoBoton = loadSound('data/sonido/button-press.mp3');
  sonidoDerrota = loadSound('data/sonido/horror-orchestra-warning-338415.mp3');
}

function setup() {
  createCanvas(640, 480);
  objJuego = new juego();
}

function draw() {
  objJuego.actualizar();
}

function mousePressed() {
  objJuego.press();
}
