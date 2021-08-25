const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const FriendModel = require('./models/Friends')
const { findById } = require('./models/Friends')

require('dotenv').config()

app.use(cors())
app.use(express.json())

//database connection
mongoose.connect("mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
    { useNewUrlParser: true });

app.post('/add', async (req, res) => {

    const name = req.body.name
    const age = req.body.age

    const friend = new FriendModel({ name: name, age: age });
    await friend.save();
    res.send(friend)

})

app.get('/read', async (req, res) => {
    FriendModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.put('/update', async (req, res) => {
    const newAge = req.body.age
    const id = req.body.id

    console.log(newAge, id)

    try {
        await FriendModel.findById(id, (error, friendToUpdate) => {
            friendToUpdate.age = Number(newAge)
            friendToUpdate.save()
        })
    } catch (error) {
        console.log(error)
    }

    res.send('Updated !')
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id
    await FriendModel.findByIdAndRemove(id).exec()

    res.send("Item Deleted !")
})

app.listen(process.env.PORT || 3001, () => {
    console.log("You are connected !")
})