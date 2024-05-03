const express  =  require('express');
const mongoose = require('mongoose');
const notes = require('./notes');
const users = require("./users");
const { v4 } = require("uuid");



//mongodb connection
mongoose
    .connect("mongodb+srv://sotonye28:sotonyejoe23456@cluster0.ud0iuxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0note_taking_app")
    .then((value) => console.log("DB Connected"))
    .catch((reason) => console.log("DB Error", reason))

    // mongodb+srv://sotonye28:sotonyejoe23456@cluster0.ud0iuxa.mongodb.net/
 // new mongodb connection 




const app = express();

app.use(express.json());

// Creating a user
app.post("/create_user", async(req, res) => {
    const {username, password} = req.body;

    if(username && password){
        await users.create({username, password});

        res
        .status(200)
        .json({status: "success", message: "user created successfully"});
    }else {
        res
        .status(400)
        .json({status: "error", message: "failed to create a user"})
    }
});

let sessions = {};

//login 
app.post("/login", async (req, res) =>{
  const { username, password} = req.body;
  

  if(username && password){
    const user = await users.findOne({ username, password});
    if(user){
      const token = v4();
      sessions[token] = username;

      return res
      .status(200)
      .json({status: "success", message: "logged in successully", token});
    }
  }else{
    res
    .status(401)
    .json({status: "error", message: "invalid user information"})
  }
});

//middleware
app.use((req, res, next) => {
  let token = req.headers["authorization"];
 

  if(token){
    token = token.split("Bearer ")[1];
    const username = sessions[token];

    if(username){
      req.username = username;
      next();
    }else{
      res
       .status(401)
       .json({status: "invalid-token", message: "login first"});

    }
  } else{
    res
    .status(401)
    .json({status: "no-token", message: "login first"})
  }
});


 



// create a note
app.post("/notes", async(req, res) => {
    const {title, content} = req.body;

    if(title && content){
        await notes.create({title, content});

        res
        .status(200)
        .json({status: "success", message: "note created successfully"});
    }else {
        res
        .status(400)
        .json({status: "error", message: "failed to create note"})
    }
});



  // Get all notes
  app.get("/notes", async(req, res) => {
    const notes_db = await notes.find({username: req.username});

    const note_s = [];

    notes_db.forEach((note) => {
        note_s.push({
            id: note.id,
            title: note.title,
            content: note.content,
            timestamp: note.timestamp
        });
    });

    res.status(200).json({
        status: "success",
        message: "All notes have successfully return",
        notes: note_s,
    });
    console.log(note_s)

  });

  // get note by id
  app.get("/:id", async(req, res) => {
    const { id } = req.params

    if(mongoose.isValidObjectId(id)){
      const note = await notes.findOne({
        _id: new mongoose.Types.ObjectId(id),
        username: req.username
      });
      
      if(note){
        res.status(200).json({
            status: "success",
            message: "Note has successfully returned",
            note:{
                id: note.id,
                title: note.title,
                content: note.content,
                timestamp: note.timestamp
            }
        });
      }
       else{
        res.status(400).json({
            status: "Not found",
            message: "invalid note ID"
        })
       }
    }
  });
  
  //update a note
  app.patch("/:id", async(req, res) => {
    const { id } = req.params;
    const { title, content} = req.body;

    if(mongoose.isValidObjectId(id)){
      let note = await notes.findOne({
        _id: new mongoose.Types.ObjectId(id),
        username: req.username
      });

      if(note){
        console.log("noter");
        await notes.findOneAndUpdate({title, content});

        note = await notes.findOne({
            _id:new mongoose.Types.ObjectId(id),
            username: req.username
        });

        res.status(200).json({
            status: "success",
            message: "Note has successfully returned",
            note:{
                id: note.id,
                title: note.title,
                content: note.content,
                timestamp: note.timestamp
            }
        });
      } else{
        res.status(400).json({
            status: "not-found",
            message: "Note does not exist"
        });
      }
    }
    else{
        res.status(400).json({
            status: "Not found",
            message: "invalid note ID"
        })
       }
  });

  // delete a note
  app.delete("/:id", async(req, res) => {
    const { id } = req.params;
    

    if(mongoose.isValidObjectId(id)){
      const filter = {
        _id : new mongoose.Types.ObjectId(id),
        username : req.username,
      };
      const note_count = await notes.countDocuments(filter);

      if(note_count == 1){
        await notes.findOneAndDelete(filter);

        res.status(200).json({
          status: "success",
          message: "Note deleted successfully",
      });
      }  else{
        res.status(400).json({
            status: "not-found",
            message: "Note does not exist"
        });
       }
    }else{
        res.status(400).json({
            status: "Not found",
            message: "invalid note ID"
        });
       }
  });


  




  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
  