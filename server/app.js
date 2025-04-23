const express = require('express')
const {default:mongoose} = require('mongoose');
const DB_path = "mongodb+srv://root:root@pratham.bxzwh2p.mongodb.net/todo-list?retryWrites=true&w=majority&appName=pratham"
const cors = require('cors')

// local imports
const itemsRouter = require('./routes/itemsRouter');



// using core
const app = express();
app.use(express.urlencoded())
app.use(express.static("public"));
app.use(express.json())
app.use(cors())


// using routes
app.use('/api/todo',itemsRouter)
 

// error
app.use((req,res,next)=>{
    res.status(404).json({message:'page not found'});
}) 



// running server
const PORT = 3000;
mongoose.connect(DB_path).then(()=>{
console.log('connected to mongoose')
    app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`)
    })
}).catch((err)=>{
    console.log('erroe in connect',err)
})
