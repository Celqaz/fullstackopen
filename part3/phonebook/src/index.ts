import express, {Express, Request, Response} from 'express';
import {Person} from './types'

const app: Express = express();
app.use(express.json());

const PORT = 3001;


const data: Person[] = [
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

app.get('/api/persons', (_req: Request, res: Response) => {
    res.json(data);
});

app.get('/api/persons/:id', (_req: Request, res: Response) => {
    const id = _req.params.id
    const person: Person | undefined = data.find(person => person.id.toString() === id)
    if (person) {
        res.json(person);
    }else{
        res.status(404).end()
    }
});

app.get('/info', (_req: Request, res: Response) => {
    const count = data.length
    const date = new Date()
    res.send(`
        <div>Phonebook has info of ${count} people</div>
        <div>${date}</div>
    `)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
