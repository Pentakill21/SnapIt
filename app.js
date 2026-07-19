// SNAPIT APP.JS CLEAN FOUNDATION


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

    document.querySelectorAll("main").forEach(screen=>{

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


        let item =
        document.createElement("div");


        item.className="friend";


        item.innerText=friend;


        item.onclick=function(){

            openChat(friend);

        };


        list.appendChild(item);


    });


}






function openChat(friend){


    currentFriend = friend;


    if(!chats[friend]){

        chats[friend]=[];

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


    box.innerHTML="";


    chats[currentFriend].forEach(message=>{


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



    chats[currentFriend].push({

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


    let text =
    document
    .getElementById("searchBox")
    .value
    .trim();


    let results =
    document.getElementById("searchResults");


    results.innerHTML="";


    if(text==="") return;



    let person =
    document.createElement("div");


    person.innerText =
    "Add " + text;



    person.onclick=function(){


        if(!friends.includes(text)){

            friends.push(text);

            chats[text]=[];

        }


        openChatList();


    };


    results.appendChild(person);


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
    friends.filter(friend=>friend!==currentFriend);


    delete chats[currentFriend];


    currentFriend="";


    openChatList();


}







function takePhoto(){

    console.log("Snap!");

}





window.onload=function(){

    openCamera();

};
