  // get the array of all the elements with the class hole 
  var arrHoles = document.querySelectorAll(".hole");

  // track where the mole last appeared
  var lastHole;

  // track if the time is up
  var timeUp = false;

  // add a pointer to the scorecard
  var spanScore = document.getElementById("spanScore");

  // variable to keep of track of the score
  var score = 0;

  // function to start the game
  function startGame(){
      // reset the timeup flag to false 
      timeUp = false;
      // reset the score
      score = 0;

      // start the fun 
      popUp();

      // after 30 seconds or 25,000 miliseconds of time up to true so teh game stops
      setTimeout(() => timeUp = true, 25000);
  }


  // function to make the cool "pop up"
  function popUp(){
      // set the random time in the range of number 200 and 2000
      var time = randomTime(185, 2000);
      // get a random hole 
      var hole = randomHole(arrHoles);

      ///console.log("random time= " + time);

      // add a class to change the hole to red
      hole.classList.add("up");

      // set time out will run code repeating every so often
      // there are two parameters - what code should repeat; and how often it should repeat
      setTimeout(() => {
          hole.classList.remove("up");
          // if the time is not up yet, call the popUP function again
          if (!timeUp) {
              popUp();
          }
      }, time);

  }

  // create a function to generate a random time between the number provided
  function randomTime(min, max){
      // Math.random returns a "random" between 0 and 1
      // do some math to make it a number in our range
      return Math.round(Math.random() * (max-min) + min);
  }

  // pick one of the hole randomly
  function randomHole(holes){
      var counter = Math.floor(Math.random() * holes.length);
      // get the particualr hole from the array as determined by the random number generator
      var hole = holes[counter];

      //console.log("counter (hole)= " + counter);

      // if the same hole is generated get a different hole
      if (counter == lastHole){
          return randomHole(holes);
      }

      // track the new hole number
      lastHole = counter;

      // return the new hole, so we can add the class up to it
      return hole;
  }

  // function to handle the whack event on the hole
  function whack(event){
      // check if the click is a trusted event; if not, leave the function
      if (!event.isTrusted) return;

      // if they clicked the red circle they whacked the mole
      if (this.classList.contains("up")){
          // increase the score counter 
          score++;

          // remove the red from the circle 
          this.classList.remove("up");
          // update the score board
          spanScore.innerHTML = score;
      }

  }

  // use the shortcut for the syntax to add every event listeners to each hole
  arrHoles.forEach(hole => hole.addEventListener("click", whack));

  // other event handlers

  // change the image that is shown when the mouse hovers
  function swapImage(){
      // pointer to the image in the HTML
      var theImage = document.getElementById("img1");

      // change the image
      theImage.src = "images/catimage.jpg";
  }

  // handle when the mouse is no longer hovering over the image
  function annoyUser(){
      var theImage = document.getElementById("img1");

      // change the image
      theImage.src = "images/whackamole.jpg";

      // annoy the user 
      alert("Hello.");
      alert("How are you?");
      alert("how can I help?");
      alert("Am I annoying you?");
      alert("sorry!");
      alert("have a nice day!!");
  }