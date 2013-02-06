
var client_id = "115245771971417";
var redir_url = "http://www.facebook.com/connect/login_success.html";
var friendsMap = {};

function onBodyLoad() {
   document.addEventListener("deviceready", onDeviceReady, false);
}

/* When this function is called, PhoneGap has been initialized and is ready to roll */
function onDeviceReady() {
   // do your thing!
   alert("prima");
   
   var fb = FBConnect.install(client_id, redir_url, "touch");
   fb.connect('email, read_stream, read_friendlists');
   fb.onConnect = onFBConnected;
   
   alert("dopo");
}

function onFBConnected() {
   document.getElementById("loading").innerHTML = "Connected! Getting your friends ...";
   var req = window.plugins.fbConnect.getFriends();
   req.onload = onGotFriends;
}

function onGotFriends(evt) {
   document.getElementById("loading").style.visibility = "hidden";

   var json = JSON.parse(evt.target.responseText);


   var listItems = [];
   var template = "<li id='FBID' onclick='showUser(\"FBID\")'><img src='https://graph.facebook.com/FBID/picture'/><span>NAME</span></li>";
   for (var n = 0, len = json.data.length; n < len; n++) {
       var friend = json.data[n];
       friendsMap[friend.id] = friend;
       listItems.push(template.replace(/FBID/g, friend.id).replace(/NAME/g, friend.name));
   }
   document.getElementById("fbFriends").innerHTML = listItems.join("");
}

function showUser(id) {
   // TODO: Do something with user id ...
   alert(friendsMap[id].name);
}

