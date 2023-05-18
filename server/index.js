const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const { rawListeners } = require("process");

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;

app.use(cors());

//Student Schema
const StudentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  birhdate: Number,
  faculty: String,
  occupation: String,
  isMarriend: String,
  GPA: Number

});

//Artist Model
const StudentModel = mongoose.model('Students', StudentSchema);

//MONGO DATABASE CONNECTION
DB_CONNECTION = process.env.DB_CONNECTION
DB_PASSWORD = process.env.DB_PASSWORD
mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD))
  .then(() => console.log("Mongo DB Connected!"))


//data
// const STUDENTS = [
//   {
//     id: 1,
//     name: "Nurlana",
//     surname: "Hasanzada",
//     birthdate: "17.11.2001",
//     faculty: "Computer Science",
//     occupation: "Front-end developer",
//     isMarriend: false,
//     GPA: 80
//   },
//   {
//     id: 2,
//     name: "Laman",
//     surname: "Poladli",
//     birthdate: "04.11.2002",
//     faculty: "Computer Science",
//     occupation: "Interior design",
//     isMarriend: false,
//     GPA: 90
//   },
//   {
//     id: 3,
//     name: "Aysel",
//     surname: "Amrahovba",
//     birthdate: "06.01.2002",
//     faculty: "International relationship",
//     occupation: "Back-end developer",
//     isMarriend: false,
//     GPA: 85
//   },
//   {
//     id: 4,
//     name: "Ayshan",
//     surname: "Azizova",
//     birthdate: "31.12.2001",
//     faculty: "Computer Science",
//     occupation: "Game developer",
//     isMarriend: false,
//     GPA: 78
//   },
//   {
//     id: 5,
//     name: "Baba",
//     surname: "Kazimov",
//     birthdate: "25.02.2002",
//     faculty: "Computer Science",
//     occupation: "Front-end developer",
//     isMarriend: false,
//     GPA: 83
//   },
//   {
//     id: 6,
//     name: "Cavidan",
//     surname: "Shushayev",
//     birthdate: "12.05.2002",
//     faculty: "Computer Science",
//     occupation: "Front-end developer",
//     isMarriend: false,
//     GPA: 88
//   }
// ];



app.get("/api", (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const results = {}
  if (endIndex < students.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }
  results.results = students.slice(startIndex, endIndex)
  res.json(results)
  res.send("Welcome to Our API!");
});

//CRUD - CREATE READ UPDATE DELETE

//get All Artists
app.get("/api/students", async (req, res) => {
  const { name } = req.query;
  const students = await StudentModel.find();
  if (name === undefined) {
    res.status(200).send({
      data: students,
      message: "data get success!",
    });
  } else {
    res.status(200).send({
      data: students.filter((x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())),
      message: "data get success!",
    });
  }
})

//get Artists by ID
app.get("/api/students/:id", async (req, res) => {
  const id = req.params.id;
  const student = await StudentModel.findById(id);
  console.log('student found: ', student);
  if (!student) {
    res.status(204).send("student not found!");
  } else {
    res.status(200).send({
      data: student,
      message: "data get success!",
    });
  }
});;


//delete artist by ID
app.delete("/api/artists/:id", async (req, res) => {
  const id = req.params.id;
  const student = await StudentModel.findByIdAndDelete(id);
  if (student === undefined) {
    res.status(404).send("student not found");
  } else {
    res.status(203).send({
      data: student,
      message: "student deleted successfully",
    });
  }
});

//post
app.post("/api/students", async (req, res) => {
  const { name, surname, birthdate, occupation, isMarriend, GPA } = req.body;
  const newStudent = {
    id: crypto.randomUUID(),
    name: name,
    surname: surname,
    birthdate: birthdate,
    occupation: occupation,
    isMarriend: isMarriend,
    GPA: GPA,
  };
  await newStudent.save();
  res.status(201).send("created");
});


//put
app.put("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const { name, surname, birthdate, occupation, isMarriend, GPA } = req.body;
  const existedStudent = STUDENTS.find((x) => x.id == id);
  if (existedStudent == undefined) {
    res.status(404).send("Student not found!");
  } else {
    if (name) {
      existedStudent.name = name;
    }
    if (surname) {
      existedStudent.surname = surname;
    }
    if (birthdate) {
      existedStudent.birthdate = birthdate;
    }
    if (occupation) {
      existedStudent.occupation = occupation;
    }
    if (isMarriend) {
      existedStudent.isMarriend = isMarriend;
    }
    if (GPA) {
      existedStudent.GPA = GPA;
    }

    res.status(200).send(`student: ${existedStudent.name}`);
  }
});

app.listen(PORT, () => {
  console.log(`NODE APP listening on port ${PORT}`);
});