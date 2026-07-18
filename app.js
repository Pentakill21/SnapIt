let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];


let currentFriend = "";

let lastMessage = "";



let memories = {};



let personalities = {


    Alex:{

        type:"funny",

        catchphrases:[
            "bro 😂",
            "no way 😭",
            "that's wild"
        ]

    },


    Sam:{

        type:"supportive",

        catchphrases:[
            "I get you",
            "that makes sense",
            "I'm listening"
        ]

    },


    Jordan:{

        type:"gamer",

        catchphrases:[
            "🔥",
            "that's a W",
            "no shot 😂"
        ]

    },


    Taylor:{

        type:"hype",

        catchphrases:[
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



    if(name.length>0){


        let button =
        document.createElement("button");



        button.innerText =
        "Add " + name;



        button.onclick=function(){


            if(!friends.includes(name)){


                friends.push(name);


                personalities[name]={

                    type:"friendly",

                    catchphrases:[
                        "cool!",
                        "nice!",
                        "tell me more"
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



    if(!memories[friend]){


        memories[friend]=[];


    }



    document.getElementById("messages")
    .innerHTML="";



    memories[friend].forEach(msg=>{


        displayMessage(
            msg.text,
            msg.type
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



    rememberThings(text);



    saveMessage(
        text,
        "sent"
    );



    input.value="";



    friendReply();


}









function saveMessage(text,type){


    if(!memories[currentFriend]){


        memories[currentFriend]=[];


    }



    memories[currentFriend].push({

        text:text,

        type:type

    });



    displayMessage(
        text,
        type
    );


}








function displayMessage(text,type){


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









function rememberThings(message){


    let text =
    message.toLowerCase();



    if(!memories[currentFriend]){


        memories[currentFriend]=[];

    }




    if(
        text.includes("my name is") ||
        text.includes("i am ")
    ){


        memories[currentFriend].push({

            text:"User shared personal information: "+message,

            type:"memory"

        });


    }




    if(
        text.includes("love") ||
        text.includes("like")
    ){


        memories[currentFriend].push({

            text:"User likes something: "+message,

            type:"memory"

        });


    }




    if(
        text.includes("favorite")
    ){


        memories[currentFriend].push({

            text:"User favorite: "+message,

            type:"memory"

        });


    }


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
        createHumanReply(
            currentFriend,
            lastMessage
        );



        saveMessage(
            reply,
            "received"
        );



    },delay);


}









function findMemory(friend){


    if(!memories[friend]){

        return "";

    }



    let saved =
    memories[friend]
    .filter(
        item=>item.type==="memory"
    );



    if(saved.length===0){

        return "";

    }



    let random =
    saved[
        Math.floor(
            Math.random()*saved.length
        )
    ];



    return random.text;


}
function createHumanReply(friend,message){


    let text =
    message.toLowerCase();



    let person =
    personalities[friend];



    let memory =
    findMemory(friend);






    // remembers things

    if(memory !== ""){


        if(Math.random() > .5){


            return (
                "I remember you mentioned that before 👀 " +
                "tell me more about it."
            );


        }


    }








    // emotions


    if(
        text.includes("sad") ||
        text.includes("hurt") ||
        text.includes("bad") ||
        text.includes("terrible") ||
        text.includes("awful") ||
        text.includes("stressed")
    ){


        if(person.type==="funny"){


            return "Dang 😭 who ruined your day? I'm listening.";


        }


        return "I'm sorry 😕 want to talk about what happened?";

    }








    if(
        text.includes("happy") ||
        text.includes("excited") ||
        text.includes("awesome") ||
        text.includes("won")
    ){


        if(person.type==="hype"){


            return "LET'S GOOOO 🔥 that's actually awesome!";


        }


        return "That's great 😎 what happened?";

    }








    // games


    if(
        text.includes("game") ||
        text.includes("gaming") ||
        text.includes("play")
    ){


        if(person.type==="gamer"){


            return "NO WAY 🎮 what game? Is it actually good?";


        }


        return "That sounds fun 😂";

    }








    // school


    if(
        text.includes("school") ||
        text.includes("class") ||
        text.includes("test")
    ){


        return "School can be a lot 😭 how did it go?";

    }








    // questions


    if(
        text.includes("?")
    ){


        return "Hmm 🤔 that's a good question. What do you think?";

    }








    // personality endings


    if(person.type==="funny"){


        return (
            person.catchphrases[
                Math.floor(
                    Math.random() *
                    person.catchphrases.length
                )
            ]
            +
            " 😂 tell me more"
        );


    }




    if(person.type==="supportive"){


        return (
            "I get you. " +
            "I'm here if you want to talk."
        );


    }





    if(person.type==="gamer"){


        return (
            "Interesting 👀 " +
            "that's a W honestly."
        );


    }





    if(person.type==="hype"){


        return (
            "🔥 That's actually cool. " +
            "Tell me everything."
        );


    }




    return "Tell me more 👀";

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
            person =>
            person !== currentFriend
        );



        delete memories[currentFriend];



        openChatList();


    }

}








function takePhoto(){


    console.log("Snap!");

}








window.onload=function(){


    openCamera();


};
