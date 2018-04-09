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
	  FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	    console.log(response);
	  });
	  
}