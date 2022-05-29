import express, {ErrorRequestHandler, Express, Request, Response} from 'express';
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
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
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
        .catch(e => console.log(e));
    // res.json(persons);
});

// GET a person by id
app.get<Person>('/api/persons/:id', (req, res, next) => {
    People
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => next(error));
});

// GET total number of persons
app.get<Person>('/info', (_req, res, next) => {
    const date = new Date();
    People.count()
        .then(result => {
            res.send(`
                    <div>Phonebook has info of ${result} people</div>
                    <div>${date}</div>
            `);
        })
        .catch(error => next(error));
});

// POST a new person
app.post<Person>('/api/persons', (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Person = req.body;

    /**
     * if body ===null or doesn't have name or number
     * return 400 stauts
     */
    if (!body || !body.name || !body.number) {
        res.status(400).json(
            {error: 'content missing.'}
        ).end();
    }

    /**
     * if body.name existed in dababase
     * retrun 400 status
     */
    if (persons.find(person => person.name === body.name)) {
        res.status(400).json(
            {error: 'name must be unique.'}
        ).end();
    }

    const person = new People({
        name: body.name,
        number: body.number
    });

    person
        .save()
        .then(savedPerson => {
            persons = persons.concat(savedPerson);
            res.json(savedPerson);
        })
        .catch(error => next(error));
});

//PUT a Person
app.put<Person>('/api/persons/:id', (req, res,next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Person = req.body;

    const newPerson: Person = {
        name: body.name,
        number: body.number,
        id: body.id
    };
    People
        .findByIdAndUpdate(req.params.id, newPerson, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(error => next(error));
});

// DELETE a person by id
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    People
        .findByIdAndDelete(id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => next(error));
});

// middleware
const unknownEndpoint = (_req: Request, res: Response) => {
    // console.error('es',error.stack);
    console.log('res', res);
    res.status(404).send({error: 'unknown endpoint'});
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
    console.error(error.message);

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        res.status(400).send({error: 'malformatted id'});
    }
    // 中间件将未定义的错误转发给缺省的 Express 错误处理程序。
    next(error);
};

// 这是最后加载的中间件
app.use(errorHandler);

// const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
