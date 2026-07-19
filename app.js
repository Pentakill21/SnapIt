// SNAPIT AI APP.JS PART 1

let currentFriend = "";

let conversationMemory = {};

let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];



const personalities = {

    Alex:
    `
    You are Alex, the user's best friend.
    You are funny, casual, and talk like a real person texting.
    You joke around, but you care about the user.
    Remember details the user tells you.
    `,


    Sam:
    `
    You are Sam, a supportive close friend.
    You listen carefully, give advice, and remember important things.
    You text naturally.
    `,


    Jordan:
    `
    You are Jordan, an energetic gaming friend.
    You are competitive, funny, and excited.
    You talk casually.
    `,


    Taylor:
    `
    You are Taylor, a positive hype friend.
    You get excited, encourage the user, and keep conversations fun.
    `

};





function hideScreens(){

    document
    .querySelectorAll(".screen")
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


    if(!list) return;


    list.innerHTML="";


    friends.forEach(friend=>{


        let item =
        document.createElement("div");


        item.className="friend";


        item.innerText=friend;



        item.onclick=()=>{

            openChat(friend);

        };



        list.appendChild(item);


    });


}





function openChat(friend){

    currentFriend = friend;


    if(!conversationMemory[friend]){

        conversationMemory[friend]=[];

    }



    hideScreens();



    document
    .getElementById("messageScreen")
    .classList.remove("hidden");



    let name =
    document.getElementById("chatName");


    if(name){

        name.innerText=friend;

    }



    displayMessages();


}





function displayMessages(){


    let box =
    document.getElementById("messages");


    if(!box) return;


    box.innerHTML="";



    conversationMemory[currentFriend]
    .forEach(message=>{


        addMessage(
            message.text,
            message.type
        );


    });


}
// SNAPIT AI APP.JS PART 2



async function sendMessage(){


    let input =
    document.getElementById("messageInput");


    if(!input) return;



    let text =
    input.value.trim();



    if(text==="") return;



    addMessage(text,"sent");



    conversationMemory[currentFriend].push({

        text:text,

        type:"sent"

    });



    input.value="";



    showTyping();



    try{


        let response =
        await fetch(
            "https://api.openai.com/v1/responses",
            {

                method:"POST",


                headers:{

                    "Content-Type":"application/json",

                    "Authorization":
                    "Bearer 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

                },


                body:JSON.stringify({

                    model:"gpt-4.1-mini",


                    instructions:

                    personalities[currentFriend]
                    +
                    `
                    You are texting inside SnapIt.
                    Never say you are an AI.
                    Keep replies natural like a real friend.
                    Remember the conversation.
                    Use casual texting style.
                    `,


                    input:
                    conversationMemory[currentFriend]
                    .map(message=>({

                        role:
                        message.type==="sent"
                        ? "user"
                        : "assistant",


                        content:
                        message.text

                    }))


                })

            }

        );



        let data =
        await response.json();



        removeTyping();



        let reply =
        data.output_text;



        addMessage(
            reply,
            "received"
        );



        conversationMemory[currentFriend].push({

            text:reply,

            type:"received"

        });



    }


    catch(error){


        removeTyping();


        addMessage(
            "My brain glitched 😭 try again",
            "received"
        );


        console.log(error);


    }


}





function showTyping(){


    let box =
    document.getElementById("messages");


    if(!box) return;



    let typing =
    document.createElement("div");


    typing.id="typing";


    typing.className="bubble received";


    typing.innerText="typing...";



    box.appendChild(typing);


}





function removeTyping(){


    let typing =
    document.getElementById("typing");


    if(typing){

        typing.remove();

    }


}
// SNAPIT AI APP.JS PART 3


function addMessage(text,type){


    let box =
    document.getElementById("messages");


    if(!box) return;



    let bubble =
    document.createElement("div");


    bubble.className =
    "bubble " + type;


    bubble.innerText = text;



    box.appendChild(bubble);



    box.scrollTop =
    box.scrollHeight;

}





function saveMemory(){


    localStorage.setItem(

        "snapitMemory",

        JSON.stringify(conversationMemory)

    );


}





function loadMemory(){


    let saved =
    localStorage.getItem(
        "snapitMemory"
    );


    if(saved){

        conversationMemory =
        JSON.parse(saved);

    }



    friends.forEach(friend=>{


        if(!conversationMemory[friend]){

            conversationMemory[friend]=[];

        }


    });


}





function rememberFriend(friend){


    if(!conversationMemory[friend]){

        conversationMemory[friend]=[];

    }


}





function clearChat(){


    if(!currentFriend) return;



    conversationMemory[currentFriend]=[];


    saveMemory();


    displayMessages();

}





function openSearch(){


    hideScreens();


    let search =
    document.getElementById("searchScreen");


    if(search){

        search.classList.remove("hidden");

    }


}





window.onload=function(){


    loadMemory();


    openCamera();


};
// SNAPIT AI APP.JS PART 4


function addFriend(name){

    if(!name) return;


    if(!friends.includes(name)){

        friends.push(name);

        conversationMemory[name]=[];

        saveMemory();

    }


    loadFriends();

}





function removeFriend(name){


    let check =
    confirm(
        "Unadd " + name + "?"
    );


    if(!check) return;



    friends =
    friends.filter(friend=>friend!==name);



    delete conversationMemory[name];


    saveMemory();


    loadFriends();


    openChatList();

}





function searchPeople(){


    let input =
    document.getElementById("searchBox");


    let results =
    document.getElementById("searchResults");


    if(!input || !results) return;



    let name =
    input.value.trim();



    results.innerHTML="";



    if(name.length===0) return;



    let button =
    document.createElement("button");


    button.innerText =
    "Add " + name;



    button.onclick=function(){


        addFriend(name);


        results.innerHTML =
        "Added " + name;


    };



    results.appendChild(button);


}





function openProfile(friend){


    currentFriend = friend;



    hideScreens();



    let profile =
    document.getElementById("profileScreen");



    if(profile){

        profile.classList.remove("hidden");

    }



    let title =
    document.getElementById("profileName");


    if(title){

        title.innerText=friend;

    }


}





function backToChat(){


    if(currentFriend){

        openChat(currentFriend);

    }


}
// SNAPIT AI APP.JS PART 5
// HUMAN MEMORY SYSTEM



let friendProfiles = {


    Alex:{

        personality:
        "funny best friend, jokes around, uses casual texting",

        likes:
        [],

        facts:
        []

    },


    Sam:{

        personality:
        "supportive friend, listens and gives advice",

        likes:
        [],

        facts:
        []

    },


    Jordan:{

        personality:
        "competitive gamer friend, energetic and funny",

        likes:
        [],

        facts:
        []

    },


    Taylor:{

        personality:
        "positive hype friend, excited and encouraging",

        likes:
        [],

        facts:
        []

    }


};







function rememberFact(friend,message){


    if(!friendProfiles[friend]) return;



    let lower =
    message.toLowerCase();



    let triggers = [


        "my name is",

        "i like",

        "i love",

        "my favorite",

        "i hate",

        "my birthday",

        "my dog",

        "my cat"


    ];



    triggers.forEach(trigger=>{


        if(lower.includes(trigger)){


            friendProfiles[friend]
            .facts
            .push(message);


        }


    });



    localStorage.setItem(

        "snapitProfiles",

        JSON.stringify(friendProfiles)

    );


}







function loadProfiles(){


    let saved =
    localStorage.getItem(
        "snapitProfiles"
    );



    if(saved){

        friendProfiles =
        JSON.parse(saved);

    }


}







function getFriendContext(friend){


    let profile =
    friendProfiles[friend];



    if(!profile) return "";



    return `

You are ${friend}.

Your personality:
${profile.personality}

Things you remember about the user:
${profile.facts.join(", ")}

Talk naturally like a real texting friend.

`;

}





let oldSendMessage =
sendMessage;



sendMessage =
async function(){


    let input =
    document.getElementById("messageInput");


    if(input){

        rememberFact(
            currentFriend,
            input.value
        );

    }


    saveMemory();


    return oldSendMessage();


};





loadProfiles();
