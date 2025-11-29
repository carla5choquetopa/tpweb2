class juego {
  constructor(cantidadObjetos = 5) {
    this.cellSize = 32;
    this.map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    //MUSICA
    this.musicaFondo = musicaFondo;
    this.musicaFondo.setVolume(1.0);
    this.musicaFondo.loop();
    this.musicaActiva = true;


    this.cantidadObjetos = cantidadObjetos;
    this.espejo = [];
    this.espejosRecogidos = 0;
    this.estado = 0;
    this.crearPersonaje();
    this.crearEnemigo();
    this.crearObjeto();


    // BOTONES
    this.botonJugar = new Boton("JUGAR", width/2, height/2 - 60, 180, 50);
    this.botonInstrucciones = new Boton("INSTRUCCIONES", width/2, height/2 + 10, 180, 50);
    this.botonCreditos = new Boton("CRÉDITOS", width/2, height/2 + 80, 180, 50);
    this.botonMusicaOff = new Boton("Musica: OFF", 50, 410, 80, 30);
    this.botonMusicaOn = new Boton("Musica: ON", 50, 450, 80, 30);
    this.botonVolver = new Boton("VOLVER", 530, height/2+165, 130, 55);
    this.botonAInicio = new Boton("A INICIO", 50, 450, 80, 30);
  }


  // PANTALLAS =====================================================================================================

  // PANTALLA DE INICIO ========================
  dibujarPantallaInicio() {
    push();
    image(imagenFondo,0,0,width,height);
    
    // Titulo
    textAlign(CENTER, CENTER);
    textFont(fuenteTitulo);
    fill (52, 108, 121);
    textSize (70);
    text ("Ojos De Piedra", width/2, height/2-165);

    // Botones
    textSize(20);
    this.botonJugar.dibujar();
    this.botonInstrucciones.dibujar();
    this.botonCreditos.dibujar();

    textSize(15);
    this.botonMusicaOn.dibujar();
    this.botonMusicaOff.dibujar();
    pop();
  }

  // INSTRUCCIONES ============================
  dibujarPantallaInstrucciones() {
    push();
    image(imagenFondo,0,0,width,height);
    
    // Titulo
    textAlign(CENTER,CENTER);
    textFont(fuenteTitulo);
    fill (52, 108, 121);
    textSize (70);
    text("Instrucciones", width/2, height/2-165);
    
    // Texto
    fill(255);
    textFont(fuenteTexto);
    textSize(20);
    textAlign(LEFT);
    text("• Usa WASD para moverte", 50, 180);
    text("• Recoge todos los espejos para ganar", 50, 220);
    text("• Evita que el enemigo te atrape", 50, 260);
    
    // Botones
    textSize(20);
    this.botonVolver.dibujar();
    textSize(15);
    this.botonMusicaOn.dibujar();
    this.botonMusicaOff.dibujar();
    pop();
  }

  // DIBUJAR JUEGO ================================
  dibujar() {
    push();
    // MAPA
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (this.map[y][x] === 1) {
          fill (26, 55, 62);
        } else {
          fill (126, 160, 153);
        }
        noStroke();
        rect (x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      }
    }
    // PERSONAJE, ENEMIGO, OBJETO
    this.personaje.dibujar();
    this.enemigo.dibujar();
    for (let i = 0; i < this.cantidadObjetos; i++) {
      if (this.espejo[i].activo) {
        this.espejo[i].dibujar();
      }
    }

    // CONTADOR
    fill(178, 227, 229);
    textFont(fuenteTexto);
    textSize(24);
    textAlign(RIGHT);
    text("Espejos: " + this.espejosRecogidos + "/" + this.cantidadObjetos, width-20, 25);
    pop();

    // BOTONES
    textSize(15);
    this.botonAInicio.dibujar();
  }

  // VICTORIA ================================
  dibujarPantallaVictoria() {
    push();
    image(imagenFondo,0,0,width,height);
    
    // Titulo
    textFont(fuenteTitulo);
    fill (52, 108, 121);
    textSize (70);
    textAlign(CENTER, CENTER);
    text("Ganaste", width * 0.5, height * 0.3);
    
    // Texto
    textFont(fuenteTexto);
    fill(255);
    textSize(18);
    text("Recogiste todos los espejos y convertiste a Medusa en piedra", width * 0.5, height * 0.50);
    
    // Botones
    textSize(20);
    this.botonVolver.dibujar();
    textSize(15);
    this.botonMusicaOn.dibujar();
    this.botonMusicaOff.dibujar();
    pop();
  }

  // DERROTA ==================================
  dibujarPantallaDerrota() {
    push();
    image(imagenFondo,0,0,width,height);

    // Titulo
    textFont(fuenteTitulo);
    fill (178, 5, 5);
    textSize (70);
    textAlign(CENTER, CENTER);
    text("Perdiste", width * 0.5, height * 0.3);
    
    // Texto
    textFont(fuenteTexto);
    fill(255);
    textSize(18);
    text("Medusa te atrapó y te convirtió en piedra", width * 0.5, height * 0.52);
    pop();
    
    // Botones
    textSize(20);
    this.botonVolver.dibujar();
    textSize(15);
    this.botonMusicaOn.dibujar();
    this.botonMusicaOff.dibujar();
  }

  // CREDITOS ================================
  dibujarPantallaCreditos() {
    push();
    image(imagenFondo,0,0,width,height);
    this.botonMusicaOn.dibujar();
    this.botonMusicaOff.dibujar();
    this.botonVolver.dibujar();

    // Titulo
    textAlign(CENTER,CENTER);
    textFont(fuenteTitulo);
    fill (52, 108, 121);
    textSize (70);
    text("Creditos", width/2, height/2-165);
    
    // Texto
    fill(255);
    textFont(fuenteTexto);
    textSize(20);
    textAlign(LEFT);
    text("OBRA: Ojos de Piedra", 50, 170);
    text("ALUMNOS: Carancini Valentina, Choquetopa Carla", 50, 210);
    text("PMIW Comisión 3", 50, 250);
    
    // Botones
    textSize(20);
    this.botonVolver.dibujar();
    textSize(15);
    this.botonMusicaOn.dibujar();
    this.botonMusicaOff.dibujar();
    pop();
  }


  // INICIAR JUEGO =============================================================================================
  iniciarJuego() {
    this.estado = 1;
    this.espejosRecogidos = 0;

    // Reiniciar espejos
    for (let i = 0; i < this.cantidadObjetos; i++) {
      this.espejo[i].activo = true;
    }

    // Reiniciar personaje
    this.personaje.posX = this.cellSize;
    this.personaje.posY = this.cellSize;
    this.personaje.historialPosiciones = [];

    // Reiniciar enemigo
    this.enemigo.posX = 12 * this.cellSize;
    this.enemigo.posY = 6 * this.cellSize;
    this.enemigo.indicePosicion = 0;
    this.enemigo.contadorFrames = 0;
  }

  // PRESIONAR BOTONES ======================================================================================
  press() {

    // PASAR PANTALLAS
    if (this.estado == 0) {
      if (this.botonJugar.fueClickeado()) {
        this.iniciarJuego();
      } else if (this.botonInstrucciones.fueClickeado()) {
        this.estado = 4;
      } else if (this.botonCreditos.fueClickeado()) {
        this.estado = 5;
      }
    } else if (this.estado == 1) {
      // EN EL JUEGO
      if (this.botonAInicio.fueClickeado()) {
        this.estado = 0;
      }
    } else if (this.estado == 4 || this.estado == 5) {
      // INSTRUCCIONES / CREDITOS
      if (this.botonVolver.fueClickeado()) {
        this.estado = 0;
      }
    } else if (this.estado == 2 || this.estado == 3) {
      // VICTORIA / DERROTA
      if (this.botonVolver.fueClickeado()) {
        this.estado = 0;
      }
    }


    // Musica General
    if (this.botonMusicaOn.fueClickeado()) {
      this.activarMusica(); // ON
    }
    if (this.botonMusicaOff.fueClickeado()) {
      this.desactivarMusica(); // OFF
    }
    // Sonido Botón
    if (this.botonJugar.mouseEncima() ||
      this.botonInstrucciones.mouseEncima() ||
      this.botonCreditos.mouseEncima() ||
      this.botonMusicaOn.mouseEncima() ||
      this.botonMusicaOff.mouseEncima() ||
      this.botonVolver.mouseEncima() ||
      this.botonAInicio.mouseEncima()) {
        sonidoBoton.play();
      }
  }

  // ACTUALIZAR ESTADOS =====================================================
  actualizar() {
    this.dibujar();
    if (this.estado==0) {
      this.dibujarPantallaInicio();
    } else if (this.estado==1) {
      this.personaje.mover();
      this.enemigo.seguirPersonaje(this.personaje);
      this.evaluarColisiones();
      if (this.espejosRecogidos >= this.cantidadObjetos) {
        this.ganaste();
      }
    } else if (this.estado==2) {
      this.dibujarPantallaVictoria();
    } else if (this.estado==3) {
      this.dibujarPantallaDerrota();
    } else if (this.estado==4) {
      this.dibujarPantallaInstrucciones();
    } else if (this.estado==5) {
      this.dibujarPantallaCreditos();
    }
  }

  crearPersonaje() {
    this.personaje = new personaje(this);
  }

  crearEnemigo() {
    this.enemigo = new enemigo(12 * this.cellSize, 6 * this.cellSize, this);
  }

  crearObjeto() {
    // ARRAY PARA POSICIONAR OBJETOS EN EL MAPA
    let posicionesObjetos = [
      [4, 6], [5, 15], [8, 8], [11, 14], [13, 18]
    ];

    for (let i = 0; i < this.cantidadObjetos; i++) {
      if (i < posicionesObjetos.length) {
        let fila = posicionesObjetos[i][0];
        let columna = posicionesObjetos[i][1];

        let posX = columna * this.cellSize;
        let posY = fila * this.cellSize;

        this.espejo[i] = new espejo(this, posX, posY, i);
      }
    }
  }

  evaluarColisiones() {

    // COLISIÓN OBJETOS
    for (let i = 0; i < this.cantidadObjetos; i++) {
      let espejo = this.espejo[i];

      if (espejo.activo) {
        let distancia = dist(
          this.personaje.posX + this.personaje.ancho/2,
          this.personaje.posY + this.personaje.alto/2,
          espejo.posX + espejo.ancho/2,
          espejo.posY + espejo.alto/2
          );

        if (distancia < (this.personaje.ancho/2 + espejo.ancho/2)) {
          espejo.activo = false;
          this.espejosRecogidos++;
        }
      }
    }

    // COLISIÓN ENEMIGO
    let distanciaEnemigo = dist(
      this.personaje.posX + this.personaje.ancho/2,
      this.personaje.posY + this.personaje.alto/2,
      this.enemigo.posX + this.enemigo.ancho/2,
      this.enemigo.posY + this.enemigo.alto/2);

    if (distanciaEnemigo < (this.personaje.ancho/2 + this.enemigo.ancho/2)) {
      this.perdiste();
    }
  }

  ganaste() {
    this.estado=2;
  }
  perdiste() {
    this.estado=3;

   if (!sonidoDerrota.isPlaying()) {
    sonidoDerrota.setVolume(0.4);
    sonidoDerrota.play();
  }
}
  activarMusica() {
    if (!this.musicaActiva) {
      musicaFondo.loop();
      this.musicaActiva = true; 
    }
  }

  desactivarMusica() {
    if (this.musicaActiva) {
      musicaFondo.stop();
      this.musicaActiva = false;
    }
  }
}
