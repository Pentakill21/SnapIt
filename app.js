let currentFriend = "";

const responses = {
    Emma: [
        "I was wondering how your day was 😊",
        "Tell me what happened today.",
        "I'm glad you're here.",
        "You always have interesting things to say."
    ],

    Jake: [
        "Yo, finally 😂",
        "What are we doing today?",
        "I have a random question for you.",
        "Bro, you disappeared."
    ],

    Sophie: [
        "That is actually really interesting.",
        "I think you should follow what feels right.",
        "Tell me more about that.",
        "I like hearing your thoughts."
    ]
};


function openChat(friend) {

    currentFriend = friend;

    document.getElementById("homeScreen").classList.add("hidden");
    document.getElementById("chatScreen").classList.remove("hidden");

    document.getElementById("chatName").innerText = friend;

    document.getElementById("messages").innerHTML = "";

    addMessage(
        "Hey! I'm " + friend + ". I'm happy to talk with you 😊",
        "ai"
    );
}


function goHome() {

    document.getElementById("homeScreen").classList.remove("hidden");
    document.getElementById("chatScreen").classList.add("hidden");

}


function sendMessage() {

    const input = document.getElementById("messageInput");

    let text = input.value.trim();

    if (text === "") return;


    addMessage(text, "user");

    input.value = "";


    setTimeout(() => {

        let friendReplies = responses[currentFriend];

        let reply = friendReplies[
            Math.floor(Math.random() * friendReplies.length)
        ];


        addMessage(reply, "ai");

    }, 900);

}



function addMessage(text, type) {

    const box = document.getElementById("messages");

    const message = document.createElement("div");

    message.className = "message " + type;

    message.innerText = text;

    box.appendChild(message);

    box.scrollTop = box.scrollHeight;

}
let cameraStream = null;


async function openCamera() {

    document.getElementById("homeScreen")
    .classList.add("hidden");


    document.getElementById("cameraScreen")
    .classList.remove("hidden");


    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: "user"
            },

            audio: false

        });


        const video = document.getElementById("cameraView");

        video.srcObject = cameraStream;


    } catch(error) {

        alert("Camera permission is needed for Snap It 📸");

        console.log(error);

    }

}



function closeCamera() {


    document.getElementById("cameraScreen")
    .classList.add("hidden");


    document.getElementById("homeScreen")
    .classList.remove("hidden");


    if(cameraStream) {

        cameraStream.getTracks()
        .forEach(track => track.stop());

        cameraStream = null;

    }

}



function takePhoto() {

    const video = document.getElementById("cameraView");


    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;


    const context = canvas.getContext("2d");


    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    alert("Photo captured! 📸");

}
