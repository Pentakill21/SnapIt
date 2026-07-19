// SNAPIT APP.JS PART 1
// Core app + navigation


let currentFriend = "";


let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let chats = {};



friends.forEach(friend => {

    chats[friend] = [];

});





function hideScreens(){

    document
    .querySelectorAll("main")
    .forEach(screen => {

        screen.classList.add("hidden");

    });

}






function openCamera(){

    hideScreens();

    document
    .getElementById("cameraScreen")
    .classList.remove("hidden");

}






function openChatList(){

    hideScreens();

    document
    .getElementById("chatScreen")
    .classList.remove("hidden");


    loadFriends();

}







function loadFriends(){


    let list =
    document.getElementById("friendList");


    list.innerHTML = "";



    friends.forEach(friend => {


        let person =
        document.createElement("div");


        person.className = "friend";


        person.innerText = friend;



        person.onclick = function(){

            openChat(friend);

        };



        list.appendChild(person);


    });


}







function openChat(friend){


    currentFriend = friend;


    if(!chats[friend]){

        chats[friend] = [];

    }



    hideScreens();


    document
    .getElementById("messageScreen")
    .classList.remove("hidden");



    document
    .getElementById("chatName")
    .innerText = friend;



    showMessages();


}







function showMessages(){


    let box =
    document.getElementById("messages");


    box.innerHTML = "";



    chats[currentFriend].forEach(message => {


        let bubble =
        document.createElement("div");


        bubble.className =
        "bubble " + message.type;


        bubble.innerText =
        message.text;


        box.appendChild(bubble);


    });


}







function openSearch(){

    hideScreens();


    document
    .getElementById("searchScreen")
    .classList.remove("hidden");


}







function takePhoto(){

    console.log("Snap taken");

}





window.onload = function(){

    openCamera();

};
