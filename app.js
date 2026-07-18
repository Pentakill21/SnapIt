let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let currentFriend = "";



let responses = {

Alex:[
"lol 😂",
"what are you doing?",
"that's funny",
"nice"
],

Sam:[
"yo what's up",
"haha",
"that's cool",
"tell me more"
],

Jordan:[
"no way",
"that's awesome",
"interesting"
],

Taylor:[
"really?",
"cool",
"I agree"
]

};





function hideScreens(){

document.getElementById("cameraScreen").classList.add("hidden");
document.getElementById("chatScreen").classList.add("hidden");
document.getElementById("searchScreen").classList.add("hidden");
document.getElementById("messageScreen").classList.add("hidden");
document.getElementById("profileScreen").classList.add("hidden");

}







function openCamera(){

hideScreens();

document.getElementById("cameraScreen")
.classList.remove("hidden");

}





function openChatList(){

hideScreens();

document.getElementById("chatScreen")
.classList.remove("hidden");

loadFriends();

}







function loadFriends(){

let list =
document.getElementById("friendList");


list.innerHTML="";


friends.forEach(friend=>{


let item=document.createElement("div");


item.className="friend";


item.innerText=friend;


item.onclick=function(){

openChat(friend);

};


list.appendChild(item);


});


}







function openSearch(){

hideScreens();

document.getElementById("searchScreen")
.classList.remove("hidden");

}








function searchPeople(){


let name =
document.getElementById("searchBox").value;


let results =
document.getElementById("searchResults");


results.innerHTML="";



if(name.length>0){


let button=document.createElement("button");


button.innerText="Add "+name;



button.onclick=function(){

if(!friends.includes(name)){

friends.push(name);

}


loadFriends();


};



results.appendChild(button);


}


}








function openChat(friend){

hideScreens();


document.getElementById("messageScreen")
.classList.remove("hidden");


currentFriend=friend;


document.getElementById("chatName")
.innerText=friend;


document.getElementById("messages")
.innerHTML="";

}








function sendMessage(){


let input =
document.getElementById("messageInput");


let text =
input.value.trim();



if(text===""){
return;
}



addMessage(text,"sent");


input.value="";


friendReply();


}







function addMessage(text,type){


let messages =
document.getElementById("messages");


let bubble =
document.createElement("div");


bubble.className =
"bubble "+type;


bubble.innerText=text;


messages.appendChild(bubble);


messages.scrollTop =
messages.scrollHeight;


}








function friendReply(){


let messages =
document.getElementById("messages");



let typing =
document.createElement("div");


typing.className="bubble received";


typing.innerText="...";


messages.appendChild(typing);



let delay =
Math.random()*3000+2000;



setTimeout(()=>{


typing.remove();



let replies =
responses[currentFriend] || [

"cool",
"haha",
"okay"

];



let reply =
replies[
Math.floor(Math.random()*replies.length)
];



addMessage(reply,"received");


},delay);


}








function openProfile(){


hideScreens();


document.getElementById("profileScreen")
.classList.remove("hidden");



document.getElementById("profileName")
.innerText=currentFriend;



document.getElementById("profileFriendName")
.innerText=currentFriend;


}







function backToChat(){


openChat(currentFriend);


}








function unaddFriend(){


let answer =
confirm(
"Unadd "+currentFriend+"?"
);



if(answer){


friends =
friends.filter(
friend=>friend!==currentFriend
);



openChatList();


}



}








function takePhoto(){

console.log("photo taken");

}







window.onload=function(){

openCamera();

};
