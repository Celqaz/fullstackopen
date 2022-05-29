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
console.log('process.env.NODE_ENV ',process.env.NODE_ENV );
// API
morgan.token('body', (req, _res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// GET all persons
app.get<Person[]>('/api/persons', (_req, res) => {
    People
        .find({})
        .then(persons => {
            return res.json(persons);
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
                return res.json(person);
            } else {
                return res.status(404).send('nothing found').end();
            }
        })
        .catch(error => next(error));
});

// GET total number of persons
app.get<Person>('/info', (_req, res, next) => {
    const date = new Date();
    People.count()
        .then(result => {
            return res.send(`
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

    const person = new People({
        name: body.name,
        number: body.number
    });

    person
        .save()
        .then(savedPerson => {
            return res.json(savedPerson);
        })
        .catch(error => next(error));
});

//PUT a Person
app.put<Person>('/api/persons/:id', (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Person = req.body;

    const newPerson: Person = {
        name: body.name,
        number: body.number,
        id: body.id
    };
    People
        .findByIdAndUpdate(req.params.id, newPerson, {new: true,runValidators: true})
        .then(updatedPerson => {
            return res.json(updatedPerson);
        })
        .catch(error => next(error));
});

// DELETE a person by id
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    People
        .findByIdAndDelete(id)
        .then(() => {
            return res.status(204).end();
        })
        .catch(error => next(error));
});

// middleware
const unknownEndpoint = (_req: Request, res: Response) => {
    // console.error('es',error.stack);
    console.log('res', res);
    return res.status(404).send({error: 'unknown endpoint'});
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);


const errorHandler: ErrorRequestHandler = (error: Error, _req, res, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({error: 'malformatted id'});
    } else if (error.name === 'ValidationError') {
        console.log('v e');
        return res.status(400).json({error: error.message});
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
