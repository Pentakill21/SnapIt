// SNAPIT APP.JS FULL REBUILD
// PART 1 - FOUNDATION + NAVIGATION


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






function takePhoto(){

    console.log("Snap taken");

}






window.onload = function(){

    openCamera();

};
// PART 2 - CHAT SYSTEM



function loadFriends(){


    let list =
    document.getElementById("friendList");


    if(!list) return;


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







function showMessages(){


    let box =
    document.getElementById("messages");


    if(!box) return;



    box.innerHTML = "";



    chats[currentFriend].forEach(message=>{


        let bubble =
        document.createElement("div");



        bubble.className =
        "bubble " + message.type;



        let text =
        document.createElement("div");


        text.innerText =
        message.text;



        let time =
        document.createElement("div");


        time.className =
        "time";


        time.innerText =
        message.time || "";



        bubble.appendChild(text);


        bubble.appendChild(time);



        box.appendChild(bubble);



    });



}







async function sendMessage(){



    let input =
    document.getElementById("messageInput");



    let text =
    input.value.trim();



    if(text === "") return;




    chats[currentFriend].push({

        text:text,

        type:"sent",

        time:getTime()

    });



    input.value = "";



    showMessages();



    showTyping();



    let reply =
    await getAIReply(text);



    hideTyping();




    chats[currentFriend].push({

        text:reply,

        type:"received",

        time:getTime()

    });



    showMessages();



}







function getTime(){


    return new Date()
    .toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });


}







function showTyping(){


    let typing =
    document.getElementById("typingIndicator");



    if(typing){

        typing.classList.remove("hidden");

        typing.innerText =
        currentFriend + " is typing...";

    }


}







function hideTyping(){


    let typing =
    document.getElementById("typingIndicator");



    if(typing){

        typing.classList.add("hidden");

    }


}
// PART 3 - AI + SEARCH + PROFILES



async function getAIReply(message){


    try{


        let response =
        await fetch("/chat", {


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







function searchPeople(){


    let search =
    document
    .getElementById("searchBox")
    .value
    .trim();



    let results =
    document.getElementById("searchResults");



    if(!results) return;



    results.innerHTML="";



    if(search==="") return;




    let person =
    document.createElement("div");


    person.className="friend";


    person.innerText =
    "Add " + search;




    person.onclick=function(){



        if(!friends.includes(search)){


            friends.push(search);


            chats[search]=[];


        }



        openChatList();



    };



    results.appendChild(person);



}








function openProfile(){



    hideScreens();



    let profile =
    document.getElementById("profileScreen");



    if(profile){


        profile.classList.remove("hidden");


    }




    let name =
    document.getElementById("profileFriendName");



    if(name){


        name.innerText=currentFriend;


    }


}







function backToChat(){


    openChat(currentFriend);


}







function unaddFriend(){



    friends =
    friends.filter(friend=>friend !== currentFriend);



    delete chats[currentFriend];



    currentFriend="";



    openChatList();



}







function getPersonality(friend){



    let personalities = {


        Alex:
        "Funny best friend who jokes around.",


        Sam:
        "Supportive friend who gives advice.",


        Jordan:
        "Competitive gaming friend.",


        Taylor:
        "Positive friend who hypes you up."

    };



    return personalities[friend] ||
    personalities.Alex;


}
