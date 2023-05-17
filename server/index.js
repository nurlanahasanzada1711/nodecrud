const express = require("express");
const app = express();
const crypto = require("crypto");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 8080;

app.use(cors());


//data
const STUDENTS = [
  {
    id: 1,
    name: "Nurlana",
    surname: "Hasanzada",
    birthdate: "17.11.2001",
    faculty:"Computer Science",
    occupation: "Front-end developer",
    isMarriend: false,
    GPA: 80
  },
  {
    id: 2,
    name: "Laman",
    surname: "Poladli",
    birthdate: "04.11.2002",
    faculty:"Computer Science",
    occupation: "Interior design",
    isMarriend: false,
    GPA: 90
  },
  {
    id: 3,
    name: "Aysel",
    surname: "Amrahovba",
    birthdate: "06.01.2002",
    faculty:"International relationship",
    occupation: "Back-end developer",
    isMarriend: false,
    GPA: 85
  },
  {
    id: 4,
    name: "Ayshan",
    surname: "Azizova",
    birthdate: "31.12.2001",
    faculty:"Computer Science",
    occupation: "Game developer",
    isMarriend: false,
    GPA: 78
  },
  {
    id: 5,
    name: "Baba",
    surname: "Kazimov",
    birthdate: "25.02.2002",
    faculty:"Computer Science",
    occupation: "Front-end developer",
    isMarriend: false,
    GPA: 83
  },
  {
    id: 6,
    name: "Cavidan",
    surname: "Shushayev",
    birthdate: "12.05.2002",
    faculty:"Computer Science",
    occupation: "Front-end developer",
    isMarriend: false,
    GPA: 88
  }
];



app.get("/api", (req, res) => {
  res.send("Welcome to Our API!");
});

//CRUD - CREATE READ UPDATE DELETE

//get All Artists
app.get("/api/students", (req, res) => {
  const { name } = req.query;
  if (name === undefined) {
    res.status(200).send({
      data: STUDENTS,
      message: "data get success!",
    });
  } else {
    res.status(200).send({
      data: STUDENTS.filter(
        (x) => x.name.toLowerCase().trim().includes(name.toLowerCase().trim())
      ),
      message: "data get success!",
    });
  }
});

//get Artists by ID
app.get("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const students = STUDENTS.find((x) => x.id === parseInt(id));
  if (!students) {
    console.log("test");
    res.status(204).send("Student not found!");
  } else {
    res.status(200).send({
      data: students,
      message: "data get success!",
    });
  }
});


//delete artist by ID
app.delete("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const students = STUDENTS.find((x) => x.id == id);
  if (  students === undefined) {
    res.status(404).send("Student not found");
  } else {
    const idx = STUDENTS.indexOf(students);
    STUDENTS.splice(idx, 1);
    res.status(203).send({
      data: students,
      message: "Student deleted successfully",
    });
  }
});

//post
app.post("/api/students",(req, res) => {
  const { name, surname, birthdate, occupation,isMarriend, GPA } = req.body;
  const newStudent = {
    id: crypto.randomUUID(),
    name: name,
    surname:surname,
    birthdate:birthdate,
    occupation:occupation,
    isMarriend:isMarriend,
    GPA:GPA,
  };
  STUDENTS.push(newStudent);
  res.status(201).send("created");
});


//put
app.put("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const { name, surname, birthdate, occupation,isMarriend, GPA  } = req.body;
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