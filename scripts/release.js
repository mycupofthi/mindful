$(function() {
    
    const submit = document.querySelector(".submit");
    const textarea = document.getElementById("notes");
    const emotion = document.getElementById("emotion");
    const confirm = document.querySelector(".overlay");
    const modal = document.querySelector(".popup-modal");    
    const release = document.querySelector(".release");
    const reflect = document.querySelector(".reflect");
//    const cancel = document.querySelector("#cancel");
    let isClicked = true;
    
    // Submitting Note
    function submitIt(e) {
        e.preventDefault();
        if (emotion.value.trim() == '' || textarea.value.trim() == '') {
            isClicked = false;
        } else {
            confirm.classList.add("show");
        }
    }
    
    submit.addEventListener("click", submitIt)

    // Remove popup and erase
    function removeModal() {
        confirm.classList.remove("show");
        emotion.value = "";
        textarea.value = "";
    }
    
    // Remove popup without erasing
    function removeModalWithData() {
        confirm.classList.remove("show");
    }
    
    cancel.addEventListener("click", removeModalWithData);
    // Release note
    release.addEventListener("click", removeModal);
    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "release") {
            removeModal();
        }
    })
    
    
    
    // Reflect note
    reflect.addEventListener("click", function() {
        const confirmReflect = 
            `<h3>Your note is added for reflection</h3><button id="release">Back to Release</button><button id="reflect">To Reflection</button>`
        modal.innerHTML = confirmReflect
        modal.style.transform = "uppercase"
        
        const currentDate = new Date();

        const note = {
            title: emotion.value,
            date: currentDate.toDateString(),
            note: textarea.value,
            time: Date.now()
        };
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`/users/${userId}/notes`);
        dbRef.push(note);
    })

    // Navigate to reflection
    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "reflect") {
            window.location.href = "../dir/reflect.html"
        }
    })
    
    const loader = document.querySelector(".loading-wrapper");
    // Loading screen
    setTimeout(function() {
        loader.classList.add("loaded")
    }, 3000);
})
