// SNAPIT APP.JS FOUNDATION V2


let currentFriend = "";



let friends = [
    "Alex",
    "Sam",
    "Jordan",
    "Taylor"
];



let chats = {};



friends.forEach(friend=>{

    chats[friend]=[];

});





function hideScreens(){

    document
    .querySelectorAll("main")
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







function openChat(friend){


    currentFriend=friend;


    if(!chats[friend]){

        chats[friend]=[];

    }


    hideScreens();



    document
    .getElementById("messageScreen")
    .classList.remove("hidden");



    document
    .getElementById("chatName")
    .innerText=friend;



    showMessages();


}







function showMessages(){


    let box =
    document.getElementById("messages");


    box.innerHTML="";



    chats[currentFriend]
    .forEach(message=>{


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



    if(!text) return;



    chats[currentFriend].push({

        text:text,

        type:"sent"

    });



    input.value="";


    showMessages();



    let replyBubble =
    {

        text:"typing...",

        type:"received"

    };


    chats[currentFriend].push(replyBubble);


    showMessages();



    try{


        let response =
        await fetch(
        "https://api.openai.com/v1/responses",
        {

            method:"POST",


            headers:{

                "Content-Type":"application/json",

                "Authorization":
                "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"

            },


            body:JSON.stringify({


                model:"gpt-4.1-mini",


                instructions:
                getPersonality(currentFriend),



                input:
                chats[currentFriend]
                .map(message=>({

                    role:
                    message.type==="sent"
                    ? "user"
                    : "assistant",


                    content:
                    message.text

                }))


            })


        });



        let data =
        await response.json();



        chats[currentFriend]
        .pop();



        chats[currentFriend].push({

            text:data.output_text,

            type:"received"

        });



        showMessages();



    }

    catch(error){


        chats[currentFriend]
        .pop();


        chats[currentFriend].push({

            text:"My brain lagged 😭",

            type:"received"

        });


        showMessages();


        console.log(error);


    }


}







function openSearch(){


    hideScreens();



    document
    .getElementById("searchScreen")
    .classList.remove("hidden");


}







function searchPeople(){


    let search =
    document
    .getElementById("searchBox")
    .value
    .trim();



    let results =
    document.getElementById("searchResults");


    results.innerHTML="";



    if(!search) return;



    let result =
    document.createElement("div");



    result.innerText =
    "Add " + search;



    result.onclick=function(){


        if(!friends.includes(search)){


            friends.push(search);


            chats[search]=[];


        }


        openChatList();


    };



    results.appendChild(result);


}







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
    friends.filter(
        friend=>friend!==currentFriend
    );



    delete chats[currentFriend];



    currentFriend="";



    openChatList();


}







function takePhoto(){


    console.log("Snap taken");


}





window.onload=function(){


    openCamera();


};
function getPersonality(friend){


    let personalities={


        Alex:
        `
        You are Alex.
        You are the user's funny best friend.
        Text casually.
        Joke around.
        Remember details from the conversation.
        Never say you are an AI.
        `,


        Sam:
        `
        You are Sam.
        You are supportive and caring.
        Give advice like a close friend.
        Text naturally.
        Never say you are an AI.
        `,


        Jordan:
        `
        You are Jordan.
        You are energetic and competitive.
        Talk like a gaming friend.
        Be funny.
        Never say you are an AI.
        `,


        Taylor:
        `
        You are Taylor.
        You are positive and encouraging.
        Hype the user up.
        Talk naturally.
        Never say you are an AI.
        `


    };


    return personalities[friend] || personalities.Alex;


}
