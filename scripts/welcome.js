const signOut = document.querySelector(".sign-out");
const avatar = document.querySelector(".avatar");
const welcome = document.querySelector(".main-welcome")
signOut.addEventListener("click", logOut);

// User's avatar & name
function userInfo() {
    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref(`/users/${userId}`);
    dbRef.on('value', (data) => {
        const img = data.val().avatar
        const name = data.val().name
        avatar.innerHTML = `<img src="${img}">`
        if (!welcome) {
            return;
        } else {
            welcome.innerHTML = `Welcome ${name}`;
        }       
    }) 
}

// Makes sure that firebase is loaded first before user info is shown
let firebaseAppDefined = false

setInterval(() => {
    if (!firebaseAppDefined) {
        if (firebase.app()) {
            userInfo();
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


