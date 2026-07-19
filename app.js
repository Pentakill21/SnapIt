// SNAPIT APP.JS PART 1
// Core app + navigation


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







function loadFriends(){


    let list =
    document.getElementById("friendList");


    list.innerHTML = "";



    friends.forEach(friend => {


        let person =
        document.createElement("div");


        person.className = "friend";


        person.innerText = friend;



        person.onclick = function(){

            openChat(friend);

        };



        list.appendChild(person);


    });


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







function showMessages(){


    let box =
    document.getElementById("messages");


    box.innerHTML = "";



    chats[currentFriend].forEach(message => {


        let bubble =
        document.createElement("div");


        bubble.className =
        "bubble " + message.type;


        bubble.innerText =
        message.text;


        box.appendChild(bubble);


    });


}







function openSearch(){

    hideScreens();


    document
    .getElementById("searchScreen")
    .classList.remove("hidden");


}







function takePhoto(){

    console.log("Snap taken");

}





window.onload = function(){

    openCamera();

};
// SNAPIT APP.JS PART 2
// Messages + AI



async function sendMessage(){


    let input =
    document.getElementById("messageInput");


    let text =
    input.value.trim();



    if(text === "") return;



    chats[currentFriend].push({

        text:text,

        type:"sent"

    });



    input.value = "";


    showMessages();



    let aiReply =
    await getAIReply(text);



    chats[currentFriend].push({

        text:aiReply,

        type:"received"

    });



    showMessages();


}







async function getAIReply(message){


    try{


        let response =
        await fetch(
        "https://api.openai.com/v1/responses",
        {

            method:"POST",


            headers:{

                "Content-Type":"application/json",

                "Authorization":
                "Bearer YOUR_API_KEY"

            },


            body:JSON.stringify({

                model:"gpt-4.1-mini",

                input:message

            })


        });



        let data =
        await response.json();

alert(JSON.stringify(data));

        console.log(data);


if(data.output_text){

    return data.output_text;

}


if(data.output){

    return data.output
    .map(item =>
        item.content
        ?.map(part => part.text)
        .join("")
    )
    .join("");

}


return "I didn't understand 😭";



        return "I didn't understand 😭";


    }


    catch(error){


        console.log(error);


        return "My AI brain is sleeping 😴";


    }


}
// SNAPIT APP.JS PART 3
// Profiles + Search + AI Personalities



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
    friends.filter(friend=>friend !== currentFriend);



    delete chats[currentFriend];


    currentFriend="";


    openChatList();


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



    if(search==="") return;



    let result =
    document.createElement("div");



    result.className="friend";


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







function getPersonality(friend){


    let personalities = {


        Alex:
        `
        You are Alex.
        You are the user's funny best friend.
        Talk casually.
        Use jokes sometimes.
        Be natural and friendly.
        `,


        Sam:
        `
        You are Sam.
        You are supportive and helpful.
        Give thoughtful advice.
        Talk like a close friend.
        `,


        Jordan:
        `
        You are Jordan.
        You are energetic and competitive.
        Talk like a gaming friend.
        Keep things fun.
        `,


        Taylor:
        `
        You are Taylor.
        You are positive and encouraging.
        Hype the user up.
        `


    };


    return personalities[friend] || personalities.Alex;


}
