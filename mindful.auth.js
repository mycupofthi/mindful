const signIn = document.querySelector(".sign-in");
const welcome = document.querySelector(".welcome-sign");
const avatar = [...document.querySelectorAll(".avatar-container")];
let isClicked = true;

function googleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithRedirect(provider)
		.then(function(result) {
			const user = result.user;
			const newUser = result.additionalUserInfo.isNewUser;
			checkLoginState(user, newUser);
		})
	}
}

function checkLoginState(user, newUser) {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {

			// If new user, create an avatar
			if (newUser) {
				const newSignin = document.querySelector(".new-user");
				newSignin.classList.add("show");
				$(".landing-page").hide();		

				// Push user's first name into firebase
				const firstName = user.displayName.split(" ")[0];
				const userId = firebase.auth().currentUser.uid;
				const dbRef = firebase.database().ref(`/users/${userId}/name`);
				dbRef.set(firstName);

				welcome.innerHTML = `Welcome ${firstName}!`;
			
			// If returning user, direct to main page
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

// Pushing new avatar onto firebase for future reference
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

avatar.forEach(avatar => avatar.addEventListener("click", newAvatar))


