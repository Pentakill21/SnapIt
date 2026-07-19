// SNAPIT SERVER

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");


const app = express();


app.use(cors());

app.use(express.json());



const client = new OpenAI({

    apiKey: process.env.OPENAI_API_KEY

});





app.post("/chat", async (req, res)=>{


    try{


        const message = req.body.message;



        const response = await client.responses.create({

            model:"gpt-4.1-mini",

            input:message

        });



        res.json({

            reply: response.output_text

        });


    }


    catch(error){


        console.log(error);


        res.status(500).json({

            error:"AI failed"

        });


    }


});





app.listen(3000, ()=>{

    console.log("SnapIt server running on port 3000");

});
