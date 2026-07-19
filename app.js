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
                    "Bearer YOUR_API_KEY_HERE"

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
