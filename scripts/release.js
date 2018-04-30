$(function() {
    
    const submit = document.querySelector(".submit");
    const emotion = document.getElementById("emotion");
    const textarea = document.getElementById("notes");

    // Overlay
    const overlay = document.querySelector(".overlay");
    const modalConfirm = document.querySelector(".popup-modal.confirm");    
    const modalAdded = document.querySelector(".popup-modal.added");        

    // Buttons
    const release = document.getElementById("release");
    const reflect = document.querySelector(".reflect");

    let isClicked = true;
    
    // Submitting Note
    function submitIt(e) {
        e.preventDefault();
        if (emotion.value.trim() == '' || textarea.value.trim() == '') {
            isClicked = false;
        } else {
            // Add the confirm pop-up
        }
    }
    
    submit.addEventListener("click", submitIt)

    // Remove popup
    function removeModal() {      
        emotion.value = "";
        textarea.value = "";
    }


    // Reflect note
    reflect.addEventListener("click", function() {

        const currentDate = new Date();
        const note = {
            title: emotion.value,
            date: currentDate.toDateString(),
            note: textarea.value
        };

        // Check firebase to see if title exists
        const userId = firebase.auth().currentUser.uid;
        const dbRef = firebase.database().ref(`/users/${userId}/notes`);
        const titleArray = [];
        dbRef.on('value', (data) => {
            const info = data.val();
            for (let key in info) {
                const noteTitle = info[key].title;
                titleArray.push(noteTitle);
            }
            // Check to see if the emotion was added already
            if (!titleArray.some(title => title === emotion.value)) {
                dbRef.push(note)
            } else {
                // write in innerHTML that the title is already added in confirm pop-up
            }
        })        
    
    })

    // Navigate to reflection
    document.addEventListener("click", function (e) {
        if (e.target && e.target.id === "reflect") {
            window.location.href = "../dir/reflect.html"
        }
    })
    
    // Preloader
    const loader = document.querySelector(".loading-wrapper");
    setTimeout(function() {
        loader.classList.add("loaded")
    }, 3000);
})

// LEAVE THIS for ME
    // Release note (removes modal)
    // release.addEventListener("click", removeModal);
    // document.addEventListener("click", function (e) {
    //     if (e.target && e.target.id === "backRelease") {
    //         removeModal();
    //     }
    // })
