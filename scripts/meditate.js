$(function() {

    const text = document.querySelector(".loading-text");
    const words = ["Breathe in", "Breathe out", "Relax", "Accept yourself", "Release your judgement", "Accept your thoughts", "Accept your emotions", "Allow your thoughts to come & go", "Notice your senses", "Let it pass"];                   
    const next = document.querySelector(".next");
    const secondNext = document.querySelector(".next-2");  
    const finalNext = document.querySelector(".begin");      
    const start = document.querySelector(".start-btn");
    const radioGroup= [...document.querySelectorAll(".input-group-1, .input-group-2, .input-group-3")];
    let isClicked = true;
    let textInterval, hideInterval;
    const textLoop = [];
    let i = 0;
    const audio = document.getElementById("sound")    

    // Transition to step three or experience
    function stepTwoWantSound() {
        const soundOption = [...document.querySelectorAll(".input-group-2")];            
        const sound = soundOption.find(sound => sound.className.includes("active"));
        if (sound.getAttribute("data-value") === "yes") {
            $(".step-2").hide();
            $(".step-3").fadeIn(2000);
        } else if (sound.getAttribute("data-value") === "no") {
            $(".welcome").hide();
            $(".start-meditation").fadeIn(2000);
        } else {
            return false;
        }
    }
    
    // Last step - choose sound
    function stepThreeSound() {
        const soundChoice = [...document.querySelectorAll(".input-group-3")];  
        const sound = soundChoice.find(sound => sound.className.includes("active"));

        if (sound.getAttribute("data-value") === "rain") {
            audio.innerHTML = `<source src="../music/rain.mp3" type="audio/mpeg">`;
        } else if (sound.getAttribute("data-value") === "forest") {
            audio.innerHTML = `<source src="../music/forest.mp3" type="audio/mpeg">`;
        } else {
            return false;
        }

        $(".welcome").hide();
        $(".start-meditation").fadeIn(2000);
    }

    // Radio selections
    function radioSelected() {
        if (isClicked) {
            $(this).parent().find(".input-group-1, .input-group-2, .input-group-3").removeClass("active");
            this.classList.add("active");
            // Transitions to step two
            next.addEventListener("click", function() {
                $(".step-1").hide()
                $(".step-2").fadeIn(2000);
            })
            // Transitions to step three 
            secondNext.addEventListener("click", stepTwoWantSound)  
            finalNext.addEventListener("click", stepThreeSound)                      
        }
        start.addEventListener("click", startAnimation);
    }

    radioGroup.forEach(radio => radio.addEventListener("click", radioSelected))


    // Text animation loop
    function startAnimation() {
        // If start button is pressed, start words
        if (isClicked) {
            
            text.innerHTML = "Sit up straight & take a deep breath."
            text.style.animation = "disappear 10s ease"

                // Pushing new words every 10 seconds
                textLoop.push(
                    textInterval = 
                        setInterval(function() {
                            if (i >= words.length) {
                                i = 0;
                            } else {
                                text.style.animation = "textFloat 10s ease infinite";
                                text.innerHTML = words[i];
                                i++
                            }
                        }, 10000)
                )
                
            start.innerHTML = "Stop";
            isClicked = false;

            // Get timed choice
            const radio = radioGroup.find(radio => radio.className.includes("active"));
            const timeSelection = parseInt(radio.getAttribute("data-value"));
            let timeInSeconds = timeSelection * 60;

            let timer = function() {
                if (timeInSeconds < 0) {
                    $(".start-meditation").hide();
                    $(".end-meditation").fadeIn(2000);
                    return;
                } else {
                    timeInSeconds--
                }
            }
            timeInterval = setInterval(timer, 1000);
        
            // Play the music
            audio.play()

        // Else, stop the loop
        } else {

            // Stop the loop
            textLoop.forEach(function(timeInterval) {
                clearInterval(textInterval);
                clearInterval(timeInterval);                
                text.style.animation = "";
            })

            start.innerHTML = "Start Again";
            text.innerHTML = "Ready to start over?"            
            isClicked = true;
            audio.currentTime = 0;
            audio.pause();
        }
    }


    $(".start-again").on("click", function () {
        window.location.reload()})

    // Loading screen
    setTimeout(function() {
        $(".loading-wrapper").addClass("loaded")
    }, 3000);

    $(".step-2").hide()
    $(".step-3").hide()
    $(".start-meditation").hide();
    $(".end-meditation").hide();    
    
});