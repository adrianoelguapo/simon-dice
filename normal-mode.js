$(document).ready(function() {
    let machineSequence = [];
    let userSequence = [];
    let round = 1;
    let colors = ["blue", "pink", "violet", "white"];
    let $roundIndicator = $("#round-number");
  
    /* Cache de los elementos de cada segmento */
    let $segmentBlue = $(".segment-blue");
    let $segmentPink = $(".segment-pink");
    let $segmentViolet = $(".segment-violet");
    let $segmentWhite = $(".segment-white");
  
    /* Asignar eventos de clic a cada segmento */
    $segmentBlue.on("click", function() {
      handleUserClick("blue");
    });

    $segmentPink.on("click", function() {
      handleUserClick("pink");
    });

    $segmentViolet.on("click", function() {
      handleUserClick("violet");
    });

    $segmentWhite.on("click", function() {
      handleUserClick("white");
    });
  
    /* Función para manejar el clic del usuario */
    function handleUserClick(color) {
      userSequence.push(color);
      let currentIndex = userSequence.length - 1;

      if (userSequence[currentIndex] !== machineSequence[currentIndex]) {
        showModal("Game Over! You reached round " + round);
        return;
      }

      if (userSequence.length === machineSequence.length) {
        round++;
        $roundIndicator.text(round);
        userSequence = [];
        setTimeout(nextRound, 1000);
      }
    }
  
    /* Función para iniciar la siguiente ronda */
    function nextRound() {
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      machineSequence.push(randomColor);
      playSequence();
    }
  
    /* Función para reproducir la secuencia de la máquina */
    function playSequence() {
      let index = 0;

      let interval = setInterval(function() {
        if (index >= machineSequence.length) {
          clearInterval(interval);
          return;
        }

        flashColor(machineSequence[index]);
        index++;
      }, 800);
    }
  
    /* Función para simular el parpadeo del segmento */
    function flashColor(color) {
      let $segment;

      if (color === "blue") {
        $segment = $segmentBlue;
      } else if (color === "pink") {
        $segment = $segmentPink;
      } else if (color === "violet") {
        $segment = $segmentViolet;
      } else if (color === "white") {
        $segment = $segmentWhite;
      }

      if ($segment) {
        $segment.addClass("active");
        setTimeout(function() {
          $segment.removeClass("active");
        }, 400);
      }
    }
  
    /* Función para reiniciar el juego */
    function resetGame() {
      machineSequence = [];
      userSequence = [];
      round = 1;
      $roundIndicator.text(round);
      setTimeout(nextRound, 1000);
    }
  
    /* Función para mostrar el modal de Bootstrap con un mensaje */
    function showModal(message) {
      $("#notificationModal .modal-body").text(message);

      let modalElement = document.getElementById("notificationModal");
      let modal = new bootstrap.Modal(modalElement);
      modal.show();

      $(modalElement).one('hidden.bs.modal', function () {
        resetGame();
      });
    }
  
    /* Botón de reset */
    $("button.reset-btn").on("click", function() {
      resetGame();
    });
  
    /* Iniciar el juego */
    nextRound();
});
