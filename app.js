let cameraStream = null;
let usingFrontCamera = true;

let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];

let currentFriend = "";



let responses = {

    Alex:[
        "lol that's funny",
        "what are you doing?",
        "nice 😂",
        "I didn't know that"
    ],

    Sam:[
        "yo what's up",
        "that's cool",
        "haha",
        "tell me more"
    ],

    Jordan:[
        "interesting",
        "no way",
        "that's awesome",
        "😂😂"
    ],

    Taylor:[
        "I agree",
        "really?",
        "that's crazy",
        "cool"
    ]

};





function hideScreens(){

    document.getElementById("cameraScreen").classList.add("hidden");
    document.getElementById("chatScreen").classList.add("hidden");
    document.getElementById("searchScreen").classList.add("hidden");
    document.getElementById("messageScreen").classList.add("hidden");

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


    let text=input.value.trim();


    if(text===""){
        return;
    }


    addMessage(text,"sent");


    input.value="";


    friendReply();

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
    Math.floor(Math.random()*3000)+2000;



    setTimeout(()=>{


        typing.remove();



        let list =
        responses[currentFriend];


        let reply =
        list[Math.floor(Math.random()*list.length)];



        addMessage(reply,"received");


    },delay);


}





function addMessage(text,type){


    let messages =
    document.getElementById("messages");


    let bubble =
    document.createElement("div");


    bubble.className=
    "bubble "+type;


    bubble.innerText=text;


    messages.appendChild(bubble);


    messages.scrollTop=
    messages.scrollHeight;

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

            friends.push(name);

            loadFriends();

        };


        results.appendChild(button);

    }

}





function takePhoto(){

    console.log("photo");

}



window.onload=function(){

    openCamera();

};
