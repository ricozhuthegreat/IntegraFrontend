
// Attach an onclick evetn listener arrow function for firebase signout (via logout button)
document.getElementById('logout').onclick = () => {

  //
  firebase.auth().signOut().then(function() {
    // Sign-out successful, redirect back to the main page (index.html)
    window.location = "index.html";
  }, function(error) {
    // Log any errors
    console.log("Error: " + error);
  });

}

// The global firebase database object
let db = firebase.database();

// Get the currently singed in user
let user = firebase.auth().currentUser;

let username = user.email;

// Database tester code
document.getElementById('ask').onclick = () => {

  let user_dbRef = db.ref().child("users").child(username).child("post");

  // Post/write/set the data to be a json object
  user_dbRef.set({

    message: "Response sent"

  });

}

// Attach a listner for the data stream on the python response realtime database feed
let user_read = firebase.database().ref('users/' + username + '/read');

user_read.on('value', function(snapshot) {
  console.log(snapshot.val());
});

// Update the document.html user display name info field
