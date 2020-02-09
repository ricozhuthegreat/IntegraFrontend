
// The global firebase database object
let db = firebase.database();

// Get the currently singed in user and the username
let cUser;
let username;

// Dom tags for reference
let suggestions = document.getElementById("suggestions");

// Attach an onclick evetn listener arrow function for firebase signout (via logout button)
document.getElementById('logout').onclick = () => {

  // Wipe the database before logging out
  firebase.database().ref('users/' + username + '/read').remove();

  firebase.auth().signOut().then(function() {
    // Sign-out successful, redirect back to the main page (index.html)
    window.location = "index.html";
  }, function(error) {
    // Log any errors
    console.log("Error: " + error);
  });

}

// Event Listener for DOM user update. Update intro text and update user related variables
firebase.auth().onAuthStateChanged(function(user) {

  // Update the user-related variables
  cUser = user;
  username = cUser.email;

  // Concatenate the username string from the email
  username = username.substring(0, username.indexOf("@"));

  // Update the user display info
  updateUserDisplay();

  // Attach a listner for the data stream on the python response realtime database feed
  let user_read = firebase.database().ref('users/' + username + '/read');

  user_read.on('value', function(snapshot) {

    // Get the ML generated question
    let question = snapshot.val();

    if (question === null) {
    } else {
      // Stringify the json snapshot value and parse it to get the message
      let q_string = question.message;

      console.log(question);

      // Append the question to the suggestions div
      suggestions.innerText = q_string;
      suggestions.style.visibility = "visible";
    }

  });

});

// Database tester code
document.getElementById('ask').onclick = () => {

  // Retreive the current user reference in the realtime database
  let user_dbRef = db.ref().child("users").child(username).child("post");

  // Get the title of the document contenteditable div
  let title = document.getElementById("doc-title").innerText;
  // Get the body (main text body) contenteditable div of the document
  let body = document.getElementById("doc-body").innerText;

  // Post/write/set the data to be a json object
  user_dbRef.set({

    title: title,
    body: body

  });

}

// Update the document.html user display name info field
function updateUserDisplay () {
  document.getElementById("user-info").innerText = username;
}
