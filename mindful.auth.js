function googleSignIn() {
	if (!firebase.auth().currentUser) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithRedirect(provider);
	} else {
		firebase.auth().signOut();
	}
}

function checkFbLoginState() {
	function facebookSignIn() {
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithRedirect(provider);
		firebase.auth().getRedirectResult().then(function(result) {
			if (result.credential) {
		    // This gives you a Facebook Access Token. You can use it to access
			// the Facebook API.
			var token = result.credential.accessToken;
		    // ...
		}
		  // The signed-in user info.
		  var user = result.user;
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	}
}