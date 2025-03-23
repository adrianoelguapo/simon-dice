$(document).ready(function() {
    // Arrays para almacenar la secuencia de la máquina y del usuario
    let machineSequence = [];
    let userSequence = [];
    let round = 1;
    let colors = ["blue", "pink", "violet", "white"];
    let $roundIndicator = $("#round-number");
    
    // Variable para almacenar la rotación actual del contenedor (inicialmente 45° como en el CSS)
    let currentRotation = 45;
  
    // Cache de los elementos de cada segmento
    let $segmentBlue = $(".segment-blue");
    let $segmentPink = $(".segment-pink");
    let $segmentViolet = $(".segment-violet");
    let $segmentWhite = $(".segment-white");
  
    // Asignar eventos de clic a cada segmento
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
  
    // Asignar funcionalidad al botón Reset (solo el botón, no el enlace Home)
    $("button.reset-btn").on("click", function() {
      resetGame();
    });
  
    // Función para manejar el clic del usuario
    function handleUserClick(color) {
      userSequence.push(color);
      let currentIndex = userSequence.length - 1;
      // Comparar el color seleccionado con la secuencia de la máquina
      if (userSequence[currentIndex] !== machineSequence[currentIndex]) {
        alert("Game Over! You reached round " + round);
        resetGame();
        return;
      }
      // Si la secuencia del usuario es completa y correcta
      if (userSequence.length === machineSequence.length) {
        round++;
        $roundIndicator.text(round);
        userSequence = [];
        setTimeout(nextRound, 1000);
      }
    }
  
    // Función para iniciar la siguiente ronda (modo difícil)
    function nextRound() {
      // Genera un color aleatorio y lo añade a la secuencia de la máquina
      let randomColor = colors[Math.floor(Math.random() * colors.length)];
      machineSequence.push(randomColor);
      
      // ROTACIÓN: Se elige aleatoriamente un número de posiciones (1 a 3) y una dirección (izquierda o derecha).
      // Cada "posición" equivale a 90°.
      let positions = Math.floor(Math.random() * 3) + 1;  // 1, 2 o 3
      let direction = Math.random() < 0.5 ? -1 : 1;         // -1 para izquierda, 1 para derecha
      let rotationIncrement = direction * positions * 90;
      currentRotation += rotationIncrement;
      $(".simon-container").css("transform", "rotate(" + currentRotation + "deg)");
      
      playSequence();
    }
  
    // Función para reproducir la secuencia de la máquina
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
  
    // Función para simular el "flash" (parpadeo) del segmento
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
  
    // Función para reiniciar el juego
    function resetGame() {
      machineSequence = [];
      userSequence = [];
      round = 1;
      currentRotation = 45;  // Reinicia la rotación a 45° (valor inicial)
      $roundIndicator.text(round);
      $(".simon-container").css("transform", "rotate(" + currentRotation + "deg)");
      setTimeout(nextRound, 1000);
    }
  
    // Iniciar el juego
    nextRound();
});
