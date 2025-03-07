const express=require('express');
const cors=require('cors');
require('dotenv').config();
const app=express();
app.use(express.json());
app.use(cors());
const {connectDB}=require('./db/db.connect')
const port=process.env.PORT;
const {Movie}=require('./models/movie.models')
connectDB().then(()=>console.log("Database connectes.")).then(()=>{
    app.listen(port,()=>{
        console.log('Express running port',port)
    })
})

app.get("/movies",async(req,resp)=>{
    try{
        const movie=await Movie.find();
        resp.json(movie);
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})

app.get("/movies/:id",async(req,resp)=>{
    try{
        const movie=await Movie.findById(req.params.id);
        resp.json(movie);
    }
    catch(error){
        resp.status(500).jaon({error:"Movie not found"})
    }
})

app.post("/movies",async(req,resp)=>{
    try{
        const movie=new Movie(req.body);
        movie.save();
        resp.json(movie);
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})

app.post("/movies/:id",async(req,resp)=>{
    try{
        const movie=await Movie.findByIdAndUpdate(req.params.id,req.body,{new:true});
        resp.json({movie});
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})

app.delete("/movies/:id",async(req,resp)=>{
    try{
       const movie=await Movie.findByIdAndDelete(req.params.id);
       resp.json(movie); 
    }
    catch(error){
        resp.status(500).json({error:"Error occur"})
    }
})