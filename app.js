let cameraStream = null;
let usingFrontCamera = true;

let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];

let currentFriend = "";



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


    startCamera();

}



async function startCamera(){

    if(cameraStream){

        cameraStream.getTracks().forEach(track=>{
            track.stop();
        });

    }


    try{

        cameraStream =
        await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:
                usingFrontCamera ? "user" : "environment"
            },

            audio:false

        });


        document.getElementById("cameraView")
        .srcObject = cameraStream;


    }

    catch(error){

        console.log(error);

    }

}



function flipCamera(){

    usingFrontCamera = !usingFrontCamera;

    startCamera();

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


    list.innerHTML = "";


    friends.forEach(friend=>{


        let item =
        document.createElement("div");


        item.className = "friend";


        item.innerText = friend;


        item.onclick = function(){

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

    let box =
    document.getElementById("searchBox").value;


    let results =
    document.getElementById("searchResults");


    results.innerHTML="";


    if(box.length === 0){
        return;
    }


    let button =
    document.createElement("button");


    button.innerText =
    "Add " + box;


    button.onclick=function(){

        addFriend(box);

    };


    results.appendChild(button);

}



function addFriend(person){

    if(!friends.includes(person)){

        friends.push(person);

    }


    loadFriends();

}



function openChat(friend){

    hideScreens();


    document.getElementById("messageScreen")
    .classList.remove("hidden");


    currentFriend = friend;


    document.getElementById("chatName")
    .innerText = friend;


}



function takePhoto(){

    console.log("photo taken");

}



window.onload=function(){

    openCamera();

};
