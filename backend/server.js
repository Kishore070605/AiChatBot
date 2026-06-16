const express=require('express');
const Groq=require("groq-sdk");
const bodyparser=require('body-parser');
const dotenv=require('dotenv');
const cors=require('cors');
dotenv.config();
const app=express();
const connectDB=require('./db')
app.use(cors());
connectDB()
const Store=require('./models/store')


app.use(cors(
    {origin: 'https://aichatbot-wn12.onrender.com'},
));

const groq=new Groq({
    apiKey : process.env.api_key

});


app.use(express.json());
app.use(express.urlencoded());
app.use("/aichatbot",async (req, res, next) => {
    const message = req.body.message;
    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: message
            }
        ]
    });
    // console.log(response.choices[0].message.content);
    res.json({response:response.choices[0].message.content});
    // res.send("hello");
});


app.post('/store',async (req,res)=>{
    try{
        console.log(req.body.question)
        console.log("Hi")
        const data = new Store({
            question: req.body.question,
            answer: req.body.answer
        });
        await data.save();
        res.json({ message: 'Data saved successfully' });
    } catch (error) {
        res.json({ message: 'Error saving data',error: error.message }); 
    }

})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});