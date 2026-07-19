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



        console.log(data);



        if(data.output && data.output[0]){


            return data.output[0]
            .content[0]
            .text;


        }



        return "I didn't understand 😭";


    }


    catch(error){


        console.log(error);


        return "My AI brain is sleeping 😴";


    }


}
