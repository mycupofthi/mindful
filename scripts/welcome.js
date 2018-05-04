const signOut = document.querySelector(".sign-out");
const avatar = document.querySelector(".avatar");
const welcome = document.querySelector(".main-welcome")
signOut.addEventListener("click", logOut);

// User's avatar, name & updated reflections
function getUserData() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
		    const userId = firebase.auth().currentUser.uid;
		    const dbRefInfo = firebase.database().ref(`/users/${userId}`);
		    const dbRefReflect = firebase.database().ref(`/users/${userId}/notes`);
		    
		    // User's avatar & name
		    dbRefInfo.on('value', (data) => {
		        const img = data.val().avatar
		        const name = data.val().name
		        avatar.innerHTML = `<img src="${img}">`
		        if (!welcome) {
		            return;
		        } else {
		            welcome.innerHTML = `Welcome ${name}`;
		        }   
		    })
		    
		    // Clean up week-old reflections
		    const time = Date.now();
			const cutoff = time - 7 * 24 * 60 * 60 * 1000;
			var old = dbRefReflect.orderByChild('time').endAt(cutoff).limitToLast(1);
			var listener = old.on('child_added', function(snapshot) {
			    snapshot.dbRefReflect.remove();
			});
		} else {
			// user not signed in
		}
		
	})
}



// Makes sure that firebase is loaded first before user info is shown
let firebaseAppDefined = false

setInterval(() => {
    if (!firebaseAppDefined) {
        if (firebase.app()) {
            getUserData();
            firebaseAppDefined = true
        } else {
            return;
        }
    }
}, 100)

function logOut() {
    firebase.auth().signOut();
    window.location = "../index.html"
}

const loader = document.querySelector(".loading-wrapper");

// Loading screen
setTimeout(function() {
    loader.classList.add("loaded")
}, 3000);


