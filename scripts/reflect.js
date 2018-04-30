$(function() {
    
    const button = document.querySelector(".grab");
    let isClicked = true;

    // Notes are pushed onto flickity on click
    function grabNotes() {
        if (isClicked ) {
            const userId = firebase.auth().currentUser.uid;
            const dbRef = firebase.database().ref(`/users/${userId}/notes`);
            dbRef.on('value', (data) => {
                const info = data.val();
                const notes = [];
                
                for (let key in info) {
                    notes.push(info[key])
                }
                
                notes.map(note => {
                    let emotionDiv = $(`<div class="flickity-card"><h2 class="flickity-title">${note.title}</h2></div>`);
                    $(".main-carousel").flickity('append', emotionDiv);
                })
    
            });
            isClicked = false;
        }

    }

   button.addEventListener("click", grabNotes)

    //ADD STUFF UNDER HERE    
    
})

