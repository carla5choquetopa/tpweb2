class espejo {
    constructor(juego, posX, posY,indice){
        this.juego = juego;
        this.posX = posX;
        this.posY = posY;
        this.alto = juego.cellSize * 0.60;
        this.ancho = juego.cellSize * 0.60;
        this.miColor = color (0,255,0);
        this.activo = true;
        this.indice = indice;
    }
    
    dibujar(){
        push();
        imageMode(CORNER);
        image(spriteEspejos[this.indice], this.posX, this.posY, this.ancho, this.alto);
        pop();
    }
}