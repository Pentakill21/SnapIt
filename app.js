let cameraStream = null;
let usingFrontCamera = true;


const friends = [
    "Emma",
    "Jake",
    "Sophie"
];


const people = [
    "Emma",
    "Jake",
    "Sophie",
    "Olivia",
    "Noah",
    "Ava",
    "Ethan",
    "Mia",
    "Lucas",
    "Chloe"
];





// START CAMERA WHEN APP OPENS

window.onload = function(){

    openCamera();

    loadFriends();

};






// CAMERA


async function openCamera(){

    hideScreens();

    document.getElementById("cameraScreen")
    .classList.remove("hidden");


    if(cameraStream){

        cameraStream.getTracks().forEach(track => track.stop());

    }


    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode: usingFrontCamera ? "user" : "environment"
            },

            audio:false

        });


        document.getElementById("cameraView")
        .srcObject = cameraStream;


    }

    catch(error){

        console.log(error);

    }

}

    hideScreens();

    document.getElementById("cameraScreen")
    .classList.remove("hidden");


    try {

        cameraStream =
        await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"user"
            },

            audio:false

        });


        document.getElementById("cameraView")
        .srcObject = cameraStream;


    }

    catch(error){

        console.log(error);

    }

}




function takePhoto(){

    // photo capture will be added later

}







// NAVIGATION


function hideScreens(){

    document.getElementById("cameraScreen")
    .classList.add("hidden");


    document.getElementById("chatScreen")
    .classList.add("hidden");


    document.getElementById("searchScreen")
    .classList.add("hidden");

}





function openChatList(){

    hideScreens();

    document.getElementById("chatScreen")
    .classList.remove("hidden");

    loadFriends();

}






function openSearch(){

    hideScreens();

    document.getElementById("searchScreen")
    .classList.remove("hidden");

}







// FRIEND LIST


function loadFriends(){

    const list =
    document.getElementById("friendList");


    list.innerHTML="";


    friends.forEach(friend=>{


        let item =
        document.createElement("div");


        item.className="friend";


        item.innerText=friend;


        list.appendChild(item);


    });

}








// SEARCH


function searchPeople(){


    const search =
    document.getElementById("searchBox")
    .value
    .toLowerCase();


    const results =
    document.getElementById("searchResults");


    results.innerHTML="";


    people.forEach(person=>{


        if(
            person.toLowerCase()
            .includes(search)
        ){


            let button =
            document.createElement("div");


            button.className="friend";


            button.innerText =
            person + "  +";


            button.onclick=function(){

                addFriend(person);

            };


            results.appendChild(button);

        }


    });


}







function addFriend(person){


    if(!friends.includes(person)){

        friends.push(person);

    }


    loadFriends();


    alert(
        person + " added!"
    );

}
