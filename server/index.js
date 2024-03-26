const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    ()=>{
        console.log("database connected!");
    }
);

app.listen(process.env.PORT || 4000,()=>{
    console.log("server is running");
})