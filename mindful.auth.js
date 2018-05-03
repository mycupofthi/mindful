const signIn = document.querySelector(".sign-in");
const welcome = document.querySelector(".welcome-sign");
const avatar = [...document.querySelectorAll(".avatar-container")];
let isClicked = true;

function googleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithPopup(provider)
		.then(function(result) {
			const user = result.user;
			const newUser = result.additionalUserInfo.isNewUser;
			checkUserExists(user, newUser);
		})
	}
}

function checkUserExists(user, newUser) {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			// If new user, create an avatar
			if (newUser) {
				const newSignin = document.querySelector(".new-user");
				newSignin.classList.add("show");
				$(".landing-page").hide();		

				// Push user's name into firebase
				const firstName = user.displayName.split(" ")[0];
				const userId = firebase.auth().currentUser.uid;
				const dbRef = firebase.database().ref(`/users/${userId}/name`);
				dbRef.set(firstName);

				welcome.innerHTML = `Welcome ${firstName}!`;
			
			// If returning, direct to main page
			} else {
				window.location.href = "dir/main.html"
			}
		} else {
			firebase.auth().signOut();
		}
	})
}

function checkFbLoginState() {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
			console.log(response);
		});		
}

signIn.addEventListener("click", googleSignIn);

// New avatar
function newAvatar() {
	if (isClicked) {
		const userId = firebase.auth().currentUser.uid;     
		const dbRef = firebase.database().ref(`/users/${userId}/avatar`);
		const img = this.children[0].src;
		dbRef.set(img)
		.then(function() {
			window.location.href = "dir/main.html"
		})
	}
}

function checkLoginState() {
	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			console.log('logged in');
			window.location.href = 'dir/main.html';
		} else {
			console.log('not logged in');
		}
	})
}

avatar.forEach(avatar => avatar.addEventListener("click", newAvatar))
window.onload = function() {
	checkLoginState();
}