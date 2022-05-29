import express, {Express} from 'express';
import cors from 'cors';
// middleware
import morgan from 'morgan';
// .env
import {PORT} from './utils/config';
// types
import {Person} from './types';
// mongoose
// import {connect, model, Schema} from 'mongoose';
import People from "./models/person";


const app: Express = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://fso3-phonebook.herokuapp.com']
}));
app.use(express.static('build'));

// API
morgan.token('body', (req, _res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// original data
let persons: Person[] = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

// GET all persons
app.get<Person[]>('/api/persons', (_req, res) => {
    People
        .find({})
        .then(persons => {
            res.json(persons);
        })
        .catch(e=>console.log(e));
    // res.json(persons);
});

// GET a person by id
app.get<Person>('/api/persons/:id', (_req, res) => {
    const id = _req.params.id;
    const person: Person | undefined = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

// GET total number of persons
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get<Person>('/info',async (_req, res) => {
    const date = new Date();
    const peopleCount = await People.count()
        .then(res => res)
        .catch(e=>console.log(e));
    res.send(`
        <div>Phonebook has info of ${peopleCount} people</div>
        <div>${date}</div>
    `);
});

// POST a new person
app.post<Person>('/api/persons', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Person = req.body;

    const id = Math.round(Math.random() * 10000);

    /**
     * if body ===null or doesn't have name or number
     * return 400 stauts
     */
    if (!body || !body.name || !body.number) {
        return res.status(400).json(
            {error: 'content missing.'}
        ).end();
    }

    /**
     * if body.name existed in dababase
     * retrun 400 status
     */
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json(
            {error: 'name must be unique.'}
        ).end();
    }

    const newPerson: Person = {
        "id": id,
        "name": body.name,
        "number": body.number
    };

    persons = persons.concat(newPerson);
    return res.json(newPerson);
});

//PUT a Person
app.put<Person>('/api/persons/:id', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Person = req.body;

    const newPerson: Person = {
        name: body.name,
        number: body.number,
        id: body.id
    };
    persons.map(person => person.id === body.id ? person : newPerson);
    return res.json(newPerson);
});

// DELETE a person by id
app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id.toString() !== id);

    res.status(204).end();
});

// const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
