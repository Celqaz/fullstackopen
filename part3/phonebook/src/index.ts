import express, {Express, Request, Response} from 'express';
import cors from 'cors'
// middleware
import morgan from 'morgan'
// tpyes
import {Person} from './types'


const app: Express = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000']
}))

// @ts-ignore
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = 3001;

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
]

// GET all persons
app.get<Person[]>('/api/persons', (_req, res) => {
    res.json(persons);
});

// GET a person by id
app.get<Person>('/api/persons/:id', (_req, res) => {
    const id = _req.params.id
    const person: Person | undefined = persons.find(person => person.id === id)
    if (person) {
        res.json(person);
    } else {
        res.status(404).end()
    }
});

// GET total number of persons
app.get<Person>('/info', (_req, res) => {
    const count = persons.length
    const date = new Date()
    res.send(`
        <div>Phonebook has info of ${count} people</div>
        <div>${date}</div>
    `)
})

// POST a new person
app.post<Person>('/api/persons', (req, res) => {
    const {body} = req

    const id = Math.round(Math.random() * 10000)

    /**
     * if body ===null or doesn't have name or number
     * return 400 stauts
     */
    if (!body || !body.name || !body.number) {
        return res.status(400).json(
            {error: 'content missing.'}
        ).end()
    }

    /**
     * if body.name existed in dababase
     * retrun 400 status
     */
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json(
            {error: 'name must be unique.'}
        ).end()
    }

    const newPerson: Person = {
        "id": id,
        "name": body.name,
        "number": body.number
    }

    persons = persons.concat(newPerson)
    return res.json(newPerson)
})

// DELETE a person by id
app.delete('/api/persons/:id', (_req: Request, res: Response) => {
    const id = _req.params.id
    persons = persons.filter(person => person.id.toString() !== id)

    res.status(204).end()
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
