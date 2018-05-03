$(function() {
    
    const title = document.querySelector(".flickity-title");

    let isLoaded = true;

    // Notes are pushed onto flickity on load
    function grabNotes() {
    	firebase.auth().onAuthStateChanged(function(user) {
    		if (user) {
    	    	if (isLoaded) {
    	            const userId = firebase.auth().currentUser.uid;
    	            const dbRef = firebase.database().ref(`/users/${userId}/notes`);
    	            dbRef.on('value', (data) => {
    	                const info = data.val();
    	                const notes = [];
    	                const id = Object.keys(info)[0];
    	                for (let key in info) {
    	                    notes.push(info[key])
    	                }
    	                
    	                notes.map(note => {
    	                    let emotionDiv = $(`<div class="flickity-card"><button class="flickity-title" id="${id}" onclick="redirectReflect(this.id);">${note.title}</button></div>`);
    	                    $(".main-carousel").flickity('append', emotionDiv);
    	                    
    	                    //const time = note.time;
    	                    //const cutoff =  new Date(time + 7 * 24 * 60 * 60 * 1000); // 1 week
    	                    
    	                })
    	            });
    	            isLoaded = false;    
    	    	}
    		} else {
    			// user not signed in
    		}
    	})
    }


    window.onload = grabNotes();
    
})

