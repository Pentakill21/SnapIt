// SNAPIT APP.JS COMPLETE VERSION


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




// SCREEN CONTROL

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



function openSearch(){

    hideScreens();

    document
    .getElementById("searchScreen")
    .classList.remove("hidden");

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




// FRIENDS

function loadFriends(){

    let list =
    document.getElementById("friendList");


    list.innerHTML = "";


    friends.forEach(friend=>{


        let button =
        document.createElement("div");


        button.className="friend";


        button.innerText=friend;


        button.onclick=function(){

            openChat(friend);

        };


        list.appendChild(button);


    });

}





// MESSAGES


function showMessages(){

    let box =
    document.getElementById("messages");


    box.innerHTML="";


    if(!chats[currentFriend]) return;



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





async function sendMessage(){


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



    let reply =
    await getAIReply(text);



    chats[currentFriend].push({

        text:reply,

        type:"received"

    });



    showMessages();


}







// AI CONNECTION TO SERVER


async function getAIReply(message){


    try{


        let response =
        await fetch(
        "http://localhost:3000/chat",
        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },


            body:JSON.stringify({

                message:message,

                friend:currentFriend

            })

        });



        let data =
        await response.json();



        return data.reply ||
        "No AI response";


    }


    catch(error){


        console.log(error);


        return "AI is offline right now 😴";


    }


}






// SEARCH


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


    person.className="friend";


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







// PROFILE


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
