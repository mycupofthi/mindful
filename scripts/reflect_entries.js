const title = document.querySelector(".title");
const date = document.querySelector(".date");
const text = document.querySelector(".text");
const noteId = localStorage['id'];

// Clear local storage
localStorage.removeItem('id');

let isLoaded = true;

function loadNote() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
	    	if (isLoaded) {
	            const userId = firebase.auth().currentUser.uid;
	            const dbRef = firebase.database().ref(`/users/${userId}/notes/${noteId}`);
	            dbRef.on('value', (data) => {
	                const note = data.val();
	                const note_title = note.title;
	                const note_date = note.date;
	                const note_text = note.note;
	                
	                title.innerHTML = note_title;
	                date.innerHTML = note_date;
	                text.innerHTML = note_text;
	            });
	            isLoaded = false;    
	    	}
		} else {
			// user not signed in
		}
	})
}

window.onload = loadNote();
