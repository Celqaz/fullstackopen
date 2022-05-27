"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// middleware
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000']
}));
app.use(express_1.default.static('build'));
morgan_1.default.token('body', (req, _res) => JSON.stringify(req.body));
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
// original data
let persons = [
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
app.get('/api/persons', (_req, res) => {
    res.json(persons);
});
// GET a person by id
app.get('/api/persons/:id', (_req, res) => {
    const id = _req.params.id;
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    }
    else {
        res.status(404).end();
    }
});
// GET total number of persons
app.get('/info', (_req, res) => {
    const count = persons.length;
    const date = new Date();
    res.send(`
        <div>Phonebook has info of ${count} people</div>
        <div>${date}</div>
    `);
});
// POST a new person
app.post('/api/persons', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    const id = Math.round(Math.random() * 10000);
    /**
     * if body ===null or doesn't have name or number
     * return 400 stauts
     */
    if (!body || !body.name || !body.number) {
        return res.status(400).json({ error: 'content missing.' }).end();
    }
    /**
     * if body.name existed in dababase
     * retrun 400 status
     */
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique.' }).end();
    }
    const newPerson = {
        "id": id,
        "name": body.name,
        "number": body.number
    };
    persons = persons.concat(newPerson);
    return res.json(newPerson);
});
//PUT a Person
app.put('/api/persons/:id', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    const newPerson = {
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
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
