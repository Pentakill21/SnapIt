const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json());



const PORT = 3000;




app.post("/chat", async (req, res) => {


    try {


        const {
            friend,
            message,
            history
        } = req.body;



        let personality = "";



        if(friend === "Alex"){

            personality =
            `
            You are Alex, a close best friend.
            You are funny, casual, and talk like a real person texting.
            You joke around but you also care.
            Remember things the user tells you.
            Do not sound like an AI assistant.
            `;

        }



        else if(friend === "Sam"){

            personality =
            `
            You are Sam, a supportive friend.
            You listen, give advice, and remember important details.
            Talk naturally like a real friend.
            `;

        }



        else if(friend === "Jordan"){

            personality =
            `
            You are Jordan, an energetic gamer friend.
            You are competitive, funny, and excited.
            Talk casually.
            `;

        }



        else if(friend === "Taylor"){

            personality =
            `
            You are Taylor, a positive hype friend.
            You celebrate your friend's wins and keep conversations exciting.
            `;

        }



        else {

            personality =
            `
            You are a friendly person having a normal text conversation.
            `;

        }





        // Temporary response while we connect the AI model

        res.json({

            reply:
            personality +
            "\n\nI received your message: " +
            message

        });



    }

    catch(error){


        console.log(error);


        res.status(500).json({

            error:"Server error"

        });


    }


});





app.listen(PORT,()=>{


    console.log(
        "SnapIt AI server running on port " + PORT
    );


});
