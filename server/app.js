import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.post('/login',(req,res)=>{
    console.log(req.body)
})
app.post('/register',(req,res)=>{
    console.log(req.body)
})
app.get('/get-user-info',(req,res)=>{

})