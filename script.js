(function() {
  $(function() {
    var $document, death, enterDuelMode, enterOutro, noHonor, reset, resetMessages, restart, showDuelInfo, startButtonOS, win;
    $document = $(document);
    this.$body = $document.find("body");
    
    // APERTURA -----------------------------
    this.$openingScreen = $document.find(".js-opening");
    this.$playScreen = $document.find(".js-play");
    this.$startButtonOS = this.$openingScreen.find(".js-start");
    this.$messageOS = this.$openingScreen.find(".js-message");
    startButtonOS = () => {
      this.$startButtonOS.addClass("is-hidden");
      this.$messageOS.removeClass("is-hidden");
      return this.$openingScreen.addClass("has-message");
    };
    this.$startButtonOS.on("click", () => {
      return startButtonOS();
    });
    this.$continueButtonOS = this.$openingScreen.find(".js-continue");
    this.$continueButtonOS.on("click", () => {
      this.$openingScreen.addClass("is-hidden");
      this.$playScreen.removeClass("is-hidden");
      this.$openingScreen.removeClass("has-message");
      return showDuelInfo();
    });
    
    // REPRODUCCIÓN -----------------------------  
    this.$messagePS = this.$playScreen.find(".js-message");
    this.$duelButton = $document.find(".js-duel");
    this.$drawButton = $document.find(".js-draw");
    this.$sheriff = $document.find(".js-sheriff");
    this.$opponent = $document.find(".js-opponent");
    this.$resultPS = $document.find(".js-result");
    this.result;
    this.$timer;
    this.dueling = false;
    this.level = 1;
    this.gameOver = false;
    this.noHonor = 1;
    this.totalTime = 0;
    restart = () => {
      // REINICIO DEL JUEGO
      this.level = 1;
      this.noHonor = 0;
      this.dueling = false;
      this.gameOver = false;
      this.totalTime = 0;
      resetMessages();
      this.$outroScreen.addClass("is-hidden");
      this.$playScreen.addClass("is-hidden");
      this.$openingScreen.removeClass("is-hidden");
      this.$startButtonOS.removeClass("is-hidden");
      this.$messageOS.addClass("is-hidden");
      this.$body.removeClass("Te rindes??");
      this.$body.removeClass("Felicidades Novato");
      this.$sheriff.removeClass("is-dead");
      return this.$sheriff.removeClass("is-gone");
    };
    death = () => {
      this.totalTime = 0;
      this.$opponent.addClass("is-shooting");
      this.$sheriff.addClass("is-dead");
      return setTimeout((() => {
        this.$sheriff.addClass("is-gone");
        this.$opponent.removeClass("is-shooting");
        this.$resultPS.html("Perdiste, Intenta una ves mas Novato");
        this.$duelButton.removeClass("is-hidden");
        this.level = 1;
        this.gameOver = true;
        this.$body.addClass("Perdiste, No eres un Sheriff");
      }), 200);
    };
    win = () => {
      this.totalTime = this.totalTime + this.result;
      this.$sheriff.addClass("is-shooting");
      this.$opponent.addClass("is-dead");
      this.$resultPS.html("Eres velozzz como la luz, lo has hecho en " + this.result.toFixed(3) + " segundos");
      this.level++;
      this.$resultContinue.removeClass("is-hidden");
      setTimeout((() => {
        this.$sheriff.removeClass("is-shooting");
        this.$sheriff.addClass("is-armed");
      }), 200);
      return setTimeout((() => {
        this.$sheriff.removeClass("is-armed");
      }), 1000);
    };
    this.$resultContinue = $document.find(".js-result-continue");
    this.$resultContinue.on("click", () => {
      this.$resultContinue.addClass("is-hidden");
      resetMessages();
      // SI GANO EL JUEGO
      if (this.level === 4) {
        return enterOutro();
      } else {
        // CONTINUAR NORMALMENTE
        return showDuelInfo();
      }
    });
    reset = () => {
      // DETENIE EL JUEGO SI NO HAY REACCIÓN
      death();
      clearInterval(this.$timer);
      this.$duelButton.removeClass("is-hidden");
      return this.$drawButton.addClass("is-hidden");
    };
    showDuelInfo = () => {
      this.$opponent.removeClass("is-armed");
      this.$opponent.removeClass("is-dead");
      this.$opponent.removeClass("opponent--1");
      this.$opponent.removeClass("opponent--2");
      this.$opponent.removeClass("opponent--3");
      this.$opponent.addClass("opponent--" + this.level);
      switch (this.level) {
        case 3:
          this.$messagePS.html("Martin Kosaco anhela el trabajo de azotarte en la programación¡Es un artista hábil en el Linux!Cuidado, No falles con los mates..");
          break;
        case 2:
          this.$messagePS.html("Mi nombre es Alicia. Ella dirige el salón incluso si tiene que enviarte al cementerio de huesos con las botas puestas..Aprueba las materias..");
          break;
        default:
          this.$messagePS.html("German no es un hombre con quien jugar. Ten cuidado, este gran tipo te pone 'de puntitas..Protege tu cabello.");
      }
      return this.$duelButton.removeClass("is-hidden");
    };
    resetMessages = () => {
      this.$messagePS.html("");
      return this.$resultPS.html("");
    };
    enterDuelMode = () => {
      this.$duelButton.addClass("is-hidden");
      this.$drawButton.removeClass("is-hidden");
      resetMessages();
      this.delay = (Math.floor(Math.random() * (6 - 1) + 1)) * 1000;
      // COMIENZO DEL DUELO
      return this.$duel = setTimeout((() => {
        var startTime;
        this.dueling = true;
        // INICIO DEL ESTILO
        this.$opponent.addClass("is-armed");
        // INICIAR EL CRONÓMETRO
        startTime = Date.now();
        return this.$timer = setInterval((() => {
          var elapsedTime;
          elapsedTime = Date.now() - startTime;
          // RESULTADO EN SEGUNDOS
          this.result = elapsedTime / 1000;
          if (this.result > 2) {
            reset();
          }
        }), 10);
      }), this.delay);
    };
    noHonor = () => {
      var noHonorMessage, random;
      // AL CLIQUEAR RAPIDO
      clearInterval(this.$duel);
      this.$duelButton.removeClass("is-hidden");
      this.$drawButton.addClass("is-hidden");
      switch (this.noHonor) {
        case 1:
          noHonorMessage = "No querrás apresurarte a disparar, Presta atención a su movimiento...";
          this.noHonor++;
          break;
        case 2:
          noHonorMessage = "El apresurarce no sirve, mira sus ojos...y abre fuego....";
          this.noHonor++;
          break;
        default:
          random = Math.floor(Math.random() * (4 - 1)) + 1;
          switch (random) {
            case 1:
              noHonorMessage = "¡No te apresures! Pero tampoco te duermas..";
              break;
            case 2:
              noHonorMessage = "Te has asustado no??...Prueba una ves mas..";
              break;
            default:
              noHonorMessage = "AAAH!!¿Qué clase de programador se apura como tu?? Ten Paciencia...";
          }
      }
      return this.$resultPS.html(noHonorMessage);
    };
    
    // BOTON DUELO
    this.$duelButton.on("click", () => {
      if (this.gameOver) {
        return restart();
      } else {
        return enterDuelMode();
      }
    });
    // BOTON DIBUJAR
    this.$drawButton.on("click", () => {
      if (this.dueling) {
        // BUENA PARTIDA
        clearInterval(this.$timer);
        this.$opponent.removeClass("is-armed");
        this.$drawButton.addClass("is-hidden");
        switch (this.level) {
          case 3:
            if (this.result < 0.33) {
              win();
            } else {
              death();
            }
            break;
          case 2:
            if (this.result < 0.4) {
              win();
            } else {
              death();
            }
            break;
          default:
            if (this.result < 2) {
              win();
            } else {
              death();
            }
        }
      } else {
        // PARTIDA FALLIDA
        noHonor();
      }
      return this.dueling = false;
    });
    
    // OTRO NIVEL -----------------------------  
    this.$outroScreen = $document.find(".js-outro");
    this.$saveAndQuitButton = this.$outroScreen.find(".js-save-and-quit");
    this.$totalTime = this.$outroScreen.find(".js-total-time");
    enterOutro = () => {
      this.$totalTime.html("Tiempo total en solo: " + this.totalTime.toFixed(3) + "segundos");
      this.$playScreen.addClass("is-hidden");
      this.$outroScreen.removeClass("is-hidden");
      this.$body.addClass("Fin del Juego Novato");
      return this.$totalTime = 0;
    };
    return this.$saveAndQuitButton.on("click", () => {
      return restart();
    });
  });

}).call(this);


//# sourceURL=coffeescript