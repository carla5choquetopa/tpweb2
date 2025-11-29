class personaje {
    constructor(juego){
        this.juego = juego;
        this.posX = juego.cellSize;
        this.posY = juego.cellSize;
        this.alto = juego.cellSize * 0.93;
        this.ancho = juego.cellSize * 0.93;
        this.vel = 3;
        this.miColor = color (0,0,255);
        this.vida = 1;
        
        // ARRAY HISTORIAL DE POSICIONES
        this.historialPosiciones = [];
    }
    
    dibujar(){
        push();
        imageMode(CORNER);
        image(spritePersonaje,this.posX, this.posY, this.ancho, this.alto);
        pop();
    }
    
    mover() {
        // CALCULAR NUEVA POSICIÓN =====================================================
        let newX = this.posX;
        let newY = this.posY;
        
        // TECLAS PARA MOVER EL PERSONAJE =====================================================
        if (keyIsDown('A'.charCodeAt(0))) newX -= this.vel;
        if (keyIsDown('D'.charCodeAt(0))) newX += this.vel;
        if (keyIsDown('W'.charCodeAt(0))) newY -= this.vel;
        if (keyIsDown('S'.charCodeAt(0))) newY += this.vel;
        
        // DETECTAR CHOQUES =================================================================
        // COLISIÓN EN X
        let chocarX = false; // Me puedo mover
        for (let y = 0; y < this.juego.map.length; y++) { // Recorrido por los casilleros hasta que [1] (chocar)
            for (let x = 0; x < this.juego.map[y].length; x++) {
                if (this.juego.map[y][x] === 1) {
                    let paredX = x * this.juego.cellSize;
                    let paredY = y * this.juego.cellSize;
                    if (newX < paredX + this.juego.cellSize &&
                        newX + this.ancho > paredX &&
                        this.posY < paredY + this.juego.cellSize &&
                        this.posY + this.alto > paredY) {
                        chocarX = true; // No me puedo mover
                    }
                }
            }
        }
        
        // COLISIÓN EN Y
        let chocarY = false; // Me puedo mover
        for (let y = 0; y < this.juego.map.length; y++) { // Recorrido por los casilleros hasta que [1]
            for (let x = 0; x < this.juego.map[y].length; x++) {
                if (this.juego.map[y][x] === 1) {
                    let paredX = x * this.juego.cellSize;
                    let paredY = y * this.juego.cellSize;
                    if (this.posX < paredX + this.juego.cellSize &&
                        this.posX + this.ancho > paredX &&
                        newY < paredY + this.juego.cellSize &&
                        newY + this.alto > paredY) {
                        chocarY = true; // No me puedo mover
                    }
                }
            }
        }
        
        // MOVER EN X, Y AL MISMO TIEMPO (SI NO HAY CHOQUE)
        if (!chocarX) this.posX = newX;
        if (!chocarY) this.posY = newY;
        
        // GUARDAR POSICIÓN EN EL HISTORIAL
        this.historialPosiciones.push({x: this.posX, y: this.posY});
        
        // LIMITAR EL HISTORIAL DE POSICIÓN
        if (this.historialPosiciones.length > 7000) {
            this.historialPosiciones.shift(); // Elimina la posición si llega a alcanzar el limite
        }
    }
}