class renderHangmanDrawing(numberOfGuesses) {
    const BODY_PARTS = [
        { type: "div", style: { width: "30px", height: "30px", borderRadius: "100%", border: "5px solid #7760fa", position: "absolute", top: "30px", right: "-20px" } }, // HEAD
        { type: "div", style: { width: "5px", height: "100px", background: "#7760fa", position: "absolute", top: "65px", right: "-3px" } }, // BODY
        { type: "div", style: { width: "50px", height: "3px", background: "#7760fa", position: "absolute", top: "110px", right: "-50px", transform: "rotate(-30deg)", transformOrigin: "left bottom" } }, // RIGHT_ARM
        { type: "div", style: { width: "50px", height: "3px", background: "#7760fa", position: "absolute", top: "110px", right: "0px", transform: "rotate(30deg)", transformOrigin: "right bottom" } }, // LEFT_ARM
        { type: "div", style: { width: "50px", height: "3px", background: "#7760fa", position: "absolute", top: "120px", right: "-50px", transform: "rotate(40deg)", transformOrigin: "left bottom" } }, // RIGHT_LEG
        { type: "div", style: { width: "50px", height: "3px", background: "#7760fa", position: "absolute", top: "120px", right: "0px", transform: "rotate(-40deg)", transformOrigin: "right bottom" } }, // LEFT_LEG
      ];
    const hangmanContainer = document.getElementById("hangmanContainer");
    hangmanContainer.innerHTML = ""; // Clear previous hangman parts
  
    // Draw each body part based on the number of wrong guesses
    BODY_PARTS.slice(0, numberOfGuesses).forEach((part) => {
      const element = document.createElement(part.type);
      Object.assign(element.style, part.style); // Apply styles
      hangmanContainer.appendChild(element);
    });
  
    // Add the hangman support structure
    const structures = [
      { width: "5px", height: "30px", background: "#7760fa", position: "absolute", top: "0", right: "0" }, // Top vertical bar
      { width: "150px", height: "5px", background: "#7760fa", marginLeft: "90px" }, // Top horizontal bar
      { width: "5px", height: "155px", background: "#7760fa", marginLeft: "90px" }, // Side vertical bar
      { width: "120px", height: "5px", background: "#7760fa" }, // Base bar
    ];
  
    structures.forEach((style) => {
      const structure = document.createElement("div");
      Object.assign(structure.style, style);
      hangmanContainer.appendChild(structure);
    });
  }
  
 new renderHangmanDrawing;  