let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let currentFriend = "";


let conversationMemory = {};


let chatHistory = {};



let personalities = {


    Alex:{

        style:"funny",

        phrases:[

            "bro 😂",

            "no way 😭",

            "that's actually crazy"

        ]

    },



    Sam:{

        style:"supportive",

        phrases:[

            "I get you",

            "that makes sense",

            "I'm listening"

        ]

    },



    Jordan:{

        style:"gamer",

        phrases:[

            "that's a W 🔥",

            "no shot 😂",

            "big move"

        ]

    },



    Taylor:{

        style:"hype",

        phrases:[

            "LET'S GO 🔥",

            "that's awesome",

            "huge win"

        ]

    }


};








function hideScreens(){


    document.getElementById("cameraScreen")
    .classList.add("hidden");


    document.getElementById("chatScreen")
    .classList.add("hidden");


    document.getElementById("searchScreen")
    .classList.add("hidden");


    document.getElementById("messageScreen")
    .classList.add("hidden");


    document.getElementById("profileScreen")
    .classList.add("hidden");


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
    document.getElementById("searchBox")
    .value
    .trim();



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



                personalities[name]={


                    style:"friendly",


                    phrases:[

                        "that's cool",

                        "tell me more",

                        "interesting"

                    ]

                };


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



    if(!chatHistory[friend]){


        chatHistory[friend]=[];


    }



    if(!conversationMemory[friend]){


        conversationMemory[friend]=[];


    }



    document.getElementById("messages")
    .innerHTML="";



    chatHistory[friend].forEach(message=>{


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



    saveMessage(
        text,
        "sent"
    );



    learnMemory(
        currentFriend,
        text
    );



    input.value="";



    friendReply();


}









function saveMessage(text,type){


    if(!chatHistory[currentFriend]){


        chatHistory[currentFriend]=[];

    }



    chatHistory[currentFriend].push({

        text:text,

        type:type

    });



    addMessage(
        text,
        type
    );


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









function learnMemory(friend,text){


    let lower =
    text.toLowerCase();



    if(!conversationMemory[friend]){

        conversationMemory[friend]=[];

    }





    let facts = [

        "i like",

        "i love",

        "my favorite",

        "my name is",

        "i play",

        "i have"

    ];



    facts.forEach(fact=>{


        if(lower.includes(fact)){


            conversationMemory[friend]
            .push(text);


        }


    });


}









function friendReply(){


    let typing =
    document.createElement("div");



    typing.className =
    "bubble received";



    typing.innerText =
    "...";



    document.getElementById("messages")
    .appendChild(typing);





    let wait =
    Math.floor(Math.random()*3000)+2000;



    setTimeout(()=>{


        typing.remove();



        let response =
        generateReply(
            currentFriend,
            getLastUserMessage()
        );



        saveMessage(

            response,

            "received"

        );



    },wait);


}









function getLastUserMessage(){


    let history =
    chatHistory[currentFriend];



    if(!history){

        return "";

    }



    for(
        let i=history.length-1;
        i>=0;
        i--
    ){


        if(history[i].type==="sent"){


            return history[i].text;


        }


    }



    return "";


}









function getMemory(friend){


    if(
        !conversationMemory[friend] ||
        conversationMemory[friend].length===0
    ){

        return "";

    }



    return conversationMemory[friend][

        Math.floor(
            Math.random() *
            conversationMemory[friend].length
        )

    ];


}
function generateReply(friend,message){


    let text =
    message.toLowerCase();



    let person =
    personalities[friend];



    let memory =
    getMemory(friend);





    // remembers past things

    if(
        memory !== "" &&
        Math.random() > 0.45
    ){

        return (
            "I remember you said \"" +
            memory +
            "\" 👀"
        );

    }






    // emotions


    if(
        text.includes("sad") ||
        text.includes("upset") ||
        text.includes("angry") ||
        text.includes("stressed") ||
        text.includes("bad day")
    ){


        if(person.style==="funny"){

            return "Dang 😭 who messed up your day? What happened?";

        }


        return "I'm sorry 😕 I'm here. Wanna talk about it?";


    }








    // happy moments


    if(
        text.includes("won") ||
        text.includes("new") ||
        text.includes("awesome") ||
        text.includes("excited")
    ){


        if(person.style==="hype"){

            return "WAIT 🔥🔥 that's actually amazing!!";

        }


        return "That's awesome 😎 tell me what happened!";


    }








    // games


    if(
        text.includes("game") ||
        text.includes("gaming") ||
        text.includes("play")
    ){


        if(person.style==="gamer"){

            return "NO SHOT 🎮 what game are you playing?";

        }


        return "That sounds fun 😂";

    }








    // questions


    if(text.includes("?")){


        return "Hmm 🤔 I think that's interesting. What do you think?";


    }








    // personality responses


    if(person.style==="funny"){


        return (

            person.phrases[
                Math.floor(
                    Math.random() *
                    person.phrases.length
                )
            ]

            +

            " tell me more 😂"

        );


    }






    if(person.style==="supportive"){


        return (

            "I get you. " +

            "What happened next?"

        );


    }






    if(person.style==="gamer"){


        return (

            "That's actually interesting 🔥 " +

            "what happened?"

        );


    }






    if(person.style==="hype"){


        return (

            "🔥 That's awesome. " +

            "I need the full story!"

        );


    }






    return "Interesting 👀 keep going.";

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


    let confirmRemove =
    confirm(
        "Unadd " + currentFriend + "?"
    );



    if(confirmRemove){


        friends =
        friends.filter(
            person =>
            person !== currentFriend
        );



        delete chatHistory[currentFriend];

        delete conversationMemory[currentFriend];



        openChatList();


    }


}









function takePhoto(){


    console.log("SnapIt photo");


}









window.onload=function(){


    openCamera();


};
