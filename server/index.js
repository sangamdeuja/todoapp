import express from 'express';
import cors from 'cors';
import pool from './db.js';



const app=express();

// middleware
app.use(cors());
app.use(express.json());
//console.log(process.env.RDS_PORT)
// routes
// create a todo
app.post("/api/todos",async(req,res)=>{
    try {
        const {description}=req.body;
        const newTodo= await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",[description])
        
        res.json(newTodo.rows[0]);
        
    } catch (error) {
        console.log(error.message)
        
    }
})
// get all todo
app.get("/api/todos",async(req,res)=>{
    try {
        const allTodos= await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
        
    } catch (error) {
        console.log(error.message)
        
    }
})
// get specific todo
app.get("/api/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const todo_id= await pool.query("SELECT * FROM todo WHERE todo_id=$1",[id])
        res.json(todo_id.rows[0])
        
    } catch (error) {
        console.log(error.message)
        
    }
})

// update a todo
app.put("/api/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;
        const updateTodo= await pool.query("UPDATE todo SET description = $1 WHERE todo_id=$2",[description,id])
        res.json("Todo updated")
    } catch (error) {
        console.log(error.message)
    }
})
// delete a todo
app.delete("/api/todos/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteTodo= await pool.query(" DELETE FROM todo WHERE todo_id=$1",[id])
        res.json("Todo Deleted")

    } catch (error) {
        console.log(error.message)
    }
})


app.listen(3001,()=>{
    console.log("server started in port 3001")
});