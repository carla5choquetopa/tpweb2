class Boton {
  constructor(texto, x, y, ancho, alto) {
    this.texto = texto;
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    rectMode(CENTER);

    // CONDICIONAL DEL COLOR
    if (this.mouseEncima()) {
      fill(130, 177, 203);
    } else {
      fill(87, 153, 180);
    }

    // DIBUJAR BOTON
    noStroke();
    rect(0, 0, this.ancho, this.alto);
    fill(0);
    textFont(fuenteTexto);
    textAlign(CENTER, CENTER);
    text(this.texto, 0, 0);
    pop();
  }

  mouseEncima() {
    return mouseX > this.x - this.ancho/2 &&
      mouseX < this.x + this.ancho/2 &&
      mouseY > this.y - this.alto/2 &&
      mouseY < this.y + this.alto/2;
  }

  fueClickeado() {
    return this.mouseEncima();
  }
}
