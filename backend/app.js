import express from 'express'

const app=express();
express.json();
app.get('/',(req,res,next)=>[
  res.send("hiiii serverr.....")
])


app.listen(3001,()=>{
  console.log(`server start at http://localhost:3001`);
})
