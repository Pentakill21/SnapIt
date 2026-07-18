let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let currentFriend = "";

let lastMessage = "";


let chatMemory = {};



let personalities = {

    Alex:{
        vibe:"funny",
        style:"casual"
    },

    Sam:{
        vibe:"supportive",
        style:"calm"
    },

    Jordan:{
        vibe:"gamer",
        style:"energetic"
    },

    Taylor:{
        vibe:"excited",
        style:"positive"
    }

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








function openSearch(){


    hideScreens();


    document.getElementById("searchScreen")
    .classList.remove("hidden");


}








function searchPeople(){


    let name =
    document.getElementById("searchBox").value.trim();



    let results =
    document.getElementById("searchResults");



    results.innerHTML="";



    if(name.length > 0){


        let button =
        document.createElement("button");



        button.innerText =
        "Add " + name;



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



    if(!chatMemory[friend]){

        chatMemory[friend]=[];

    }



    document.getElementById("messages")
    .innerHTML="";


    chatMemory[friend].forEach(message=>{


        addMessage(
            message.text,
            message.type
        );


    });


}
function sendMessage(){


    let input =
    document.getElementById("messageInput");



    let text =
    input.value.trim();



    if(text===""){

        return;

    }



    lastMessage=text;



    saveMessage(text,"sent");



    input.value="";



    friendReply();


}









function saveMessage(text,type){


    if(!chatMemory[currentFriend]){

        chatMemory[currentFriend]=[];

    }



    chatMemory[currentFriend].push({

        text:text,

        type:type

    });



    addMessage(text,type);


}









function addMessage(text,type){


    let box =
    document.getElementById("messages");



    let bubble =
    document.createElement("div");



    bubble.className =
    "bubble " + type;



    bubble.innerText=text;



    box.appendChild(bubble);



    box.scrollTop =
    box.scrollHeight;


}









function friendReply(){


    let typing =
    document.createElement("div");



    typing.className =
    "bubble received";



    typing.innerText="...";



    document.getElementById("messages")
    .appendChild(typing);




    let delay =
    Math.floor(Math.random()*3000)+1500;



    setTimeout(()=>{


        typing.remove();



        let reply =
        createAIReply(
            currentFriend,
            lastMessage
        );



        saveMessage(
            reply,
            "received"
        );



    },delay);


}









function createAIReply(friend,message){



    let text =
    message.toLowerCase();



    let personality =
    personalities[friend];




    if(text.includes("sad") ||
       text.includes("upset") ||
       text.includes("bad day") ||
       text.includes("terrible") ||
       text.includes("awful")){


        if(personality.vibe==="funny"){

            return "Dang 😭 what happened? Wanna talk about it?";

        }


        return "I'm sorry 😕 I'm here. What happened?";


    }







    if(text.includes("happy") ||
       text.includes("excited") ||
       text.includes("awesome") ||
       text.includes("amazing")){


        return "Let's gooo 🔥 that's awesome! Tell me more.";

    }








    if(text.includes("game") ||
       text.includes("gaming") ||
       text.includes("play")){


        if(personality.vibe==="gamer"){

            return "YES 🎮 what game?";

        }


        return "Nice 😂 sounds fun.";

    }








    if(text.includes("school") ||
       text.includes("class") ||
       text.includes("homework")){


        return "School can be stressful sometimes 😭 how was your day?";

    }








    if(text.includes("friend") ||
       text.includes("friends")){


        return "Friends can be complicated sometimes. What happened?";

    }








    if(text.includes("?")){


        return "Hmm 🤔 good question. What do you think?";

    }








    if(personality.vibe==="funny"){


        return "LOL 😂 tell me more";

    }





    if(personality.vibe==="supportive"){


        return "I get you. I'm listening.";

    }





    if(personality.vibe==="gamer"){


        return "Interesting 👀";

    }





    if(personality.vibe==="excited"){


        return "No way 🔥 that's cool!";

    }





    return "I hear you. Keep going.";

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
        "Unadd " + currentFriend + "?"
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


    console.log("Snap!");

}









window.onload=function(){


    openCamera();


};
