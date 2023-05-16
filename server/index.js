const express = require("express");
const crypto = require("crypto");

const app = express();
const PORT = 8080;

//data
const ARTISTS = [
    {
      id: 1,
      name: "Tyler the Creator",
      imageURL:
        "https://i.scdn.co/image/ab676161000051748278b782cbb5a3963db88ada",
      age: 70,
    },
    {
      id: 2,
      name: "Kanye West",
      imageURL:
        "https://www.thenews.com.pk/assets/uploads/updates/2023-05-15/1070367_8385471_Untitled-1_updates.jpg",
      age: 45,
    },
  ];
  

app.get('/api', (req, res) => {
    res.send('Welcome to OUR API')
})

//CRUD - CREATE READ UPDATE DELETE

//get All Artists
app.get('/api/artists', (req,res) => {
    res.status(200).send({
        data: ARTISTS,
        message:'Data get success!'
    })
})

app.listen(PORT, () => {
    console.log(`Node App listening on port ${PORT}`)
})