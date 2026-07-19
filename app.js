// SNAPIT APP.JS FOUNDATION


let currentFriend = "";

let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let messages = {};



friends.forEach(friend=>{

    messages[friend]=[];

});





function hideScreens(){

    document
    .querySelectorAll("main")
    .forEach(screen=>{

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


    list.innerHTML="";


    friends.forEach(friend=>{


        let div =
        document.createElement("div");


        div.className="friend";


        div.innerText=friend;


        div.onclick=function(){

            openChat(friend);

        };


        list.appendChild(div);


    });


}






function openChat(friend){

    currentFriend=friend;


    hideScreens();


    document
    .getElementById("messageScreen")
    .classList.remove("hidden");



    document
    .getElementById("chatName")
    .innerText=friend;


    showMessages();

}







function showMessages(){

    let box =
    document.getElementById("messages");


    box.innerHTML="";


    messages[currentFriend]
    .forEach(message=>{


        let bubble =
        document.createElement("div");


        bubble.className =
        "bubble " + message.type;


        bubble.innerText =
        message.text;


        box.appendChild(bubble);


    });


}






function sendMessage(){


    let input =
    document.getElementById("messageInput");


    let text =
    input.value.trim();



    if(text==="") return;



    messages[currentFriend].push({

        text:text,

        type:"sent"

    });



    input.value="";


    showMessages();


}







function openSearch(){

    hideScreens();


    document
    .getElementById("searchScreen")
    .classList.remove("hidden");

}





function searchPeople(){


    let box =
    document.getElementById("searchResults");


    let search =
    document
    .getElementById("searchBox")
    .value;


    box.innerHTML="";


    if(search==="") return;



    let result =
    document.createElement("div");


    result.innerText =
    "Add " + search;



    result.onclick=function(){

        friends.push(search);

        messages[search]=[];

        loadFriends();

    };


    box.appendChild(result);


}






function takePhoto(){

    console.log("Snap taken");

}





function openProfile(){


    hideScreens();


    document
    .getElementById("profileScreen")
    .classList.remove("hidden");


    document
    .getElementById("profileName")
    .innerText=currentFriend;


    document
    .getElementById("profileFriendName")
    .innerText=currentFriend;


}





function backToChat(){

    openChat(currentFriend);

}






function unaddFriend(){


    friends =
    friends.filter(
        friend=>friend!==currentFriend
    );


    delete messages[currentFriend];


    openChatList();


}
