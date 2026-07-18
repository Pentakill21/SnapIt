let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let currentFriend = "";

let lastMessage = "";



let personalities = {

    Alex:{
        style:"funny"
    },

    Sam:{
        style:"chill"
    },

    Jordan:{
        style:"gamer"
    },

    Taylor:{
        style:"energetic"
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
    document.getElementById("searchBox").value;


    let results =
    document.getElementById("searchResults");


    results.innerHTML="";


    if(name.length>0){


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


    lastMessage=text;


    addMessage(text,"sent");


    input.value="";


    friendReply();

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


    typing.className="bubble received";


    typing.innerText="...";


    document.getElementById("messages")
    .appendChild(typing);




    let delay =
    Math.random()*2500+1500;



    setTimeout(()=>{


        typing.remove();


        let reply =
        generateReply(
            currentFriend,
            lastMessage
        );


        addMessage(reply,"received");


    },delay);



}









function generateReply(friend,message){


    let text =
    message.toLowerCase();



    let style =
    personalities[friend]?.style;



    if(text.includes("sad") ||
       text.includes("bad day") ||
       text.includes("upset")){


        if(style==="funny")
            return "Dang 😭 rough day? Want me to distract you?";


        return "I'm sorry 😕 wanna talk about what happened?";

    }




    if(text.includes("happy") ||
       text.includes("awesome") ||
       text.includes("amazing")){


        return "Let's gooo 🔥 that's actually awesome!";

    }





    if(text.includes("game") ||
       text.includes("gaming")){


        if(style==="gamer")
            return "YES 🎮 what game are you playing?";


        return "Nice 😂 what are you playing?";

    }





    if(text.includes("school") ||
       text.includes("class")){


        return "School can be crazy sometimes 😭 how was it?";

    }





    if(text.includes("food") ||
       text.includes("eat")){


        return "Now I'm hungry 😂 what did you eat?";

    }





    if(text.includes("?")){


        return "Hmm 🤔 good question. What do you think?";

    }





    if(style==="funny"){

        return "LOL 😂 tell me more";

    }


    if(style==="chill"){

        return "I get you. That makes sense.";

    }


    if(style==="gamer"){

        return "Interesting 👀";

    }


    return "No way 😂 keep going";

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


    let confirmDelete =
    confirm(
        "Unadd " + currentFriend + "?"
    );


    if(confirmDelete){


        friends =
        friends.filter(
            friend=>friend!==currentFriend
        );


        openChatList();

    }

}







function takePhoto(){

    console.log("snap!");

}







window.onload=function(){

    openCamera();

};
