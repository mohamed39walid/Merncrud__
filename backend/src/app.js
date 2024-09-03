const express = require("express");
const connectDB = require("./connection/dbConfig");
const User = require("./models/user");
const bodyParser = require("body-parser");
const cors = require("cors")

const app = express();
app.use(cors())

app.use(bodyParser.json());

connectDB();


app.get("/users",async(req,res)=>{
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.send("error in fetching users",error.message)
    }
})

app.post("/adduser", async (req, res) => {
    try {
        const { name, email } = req.body;
        const existinguser = await User.findOne({email})
        if(existinguser){
            res.send("email is already in use")
        }else{

            const user = new User({
                name,
                email,
            });
            
            await user.save();
            
            res.status(201).json({ message: "User added successfully!", user });
        }
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Error adding user", error: error.message });
    }
});


app.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;


        const user = await User.findById(id);


        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error in getting the single user:", error.message);
        res.status(500).json({ message: "Error in getting the single user", error: error.message });
    }
});


app.put('/updateuser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = req.body;

        // Find and update the user by ID
        const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: result });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});


app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    User.findByIdAndDelete(id);
})
app.listen(5000, () => {
    console.log("App is running on port 5000");
});
