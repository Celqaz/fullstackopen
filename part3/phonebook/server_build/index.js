"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// middleware
const morgan_1 = __importDefault(require("morgan"));
// .env
const config_1 = require("./utils/config");
// mongoose
// import {connect, model, Schema} from 'mongoose';
const person_1 = __importDefault(require("./models/person"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://fso3-phonebook.herokuapp.com']
}));
app.use(express_1.default.static('build'));
// API
morgan_1.default.token('body', (req, _res) => JSON.stringify(req.body));
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms :body'));
// original data
// const persons: Person[] = [
//     {
//         "id": "1",
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": "2",
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": "3",
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": "4",
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ];
// GET all persons
app.get('/api/persons', (_req, res) => {
    person_1.default
        .find({})
        .then(persons => {
        return res.json(persons);
    })
        .catch(e => console.log(e));
    // res.json(persons);
});
// GET a person by id
app.get('/api/persons/:id', (req, res, next) => {
    person_1.default
        .findById(req.params.id)
        .then(person => {
        if (person) {
            return res.json(person);
        }
        else {
            return res.status(404).send('nothing found').end();
        }
    })
        .catch(error => next(error));
});
// GET total number of persons
app.get('/info', (_req, res, next) => {
    const date = new Date();
    person_1.default.count()
        .then(result => {
        return res.send(`
                    <div>Phonebook has info of ${result} people</div>
                    <div>${date}</div>
            `);
    })
        .catch(error => next(error));
});
// POST a new person
app.post('/api/persons', (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    const person = new person_1.default({
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
app.put('/api/persons/:id', (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body = req.body;
    const newPerson = {
        name: body.name,
        number: body.number,
        id: body.id
    };
    person_1.default
        .findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true })
        .then(updatedPerson => {
        return res.json(updatedPerson);
    })
        .catch(error => next(error));
});
// DELETE a person by id
app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    person_1.default
        .findByIdAndDelete(id)
        .then(() => {
        return res.status(204).end();
    })
        .catch(error => next(error));
});
// middleware
const unknownEndpoint = (_req, res) => {
    // console.error('es',error.stack);
    console.log('res', res);
    return res.status(404).send({ error: 'unknown endpoint' });
};
// handler of requests with unknown endpoint
app.use(unknownEndpoint);
const errorHandler = (error, _req, res, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' });
    }
    else if (error.name === 'ValidationError') {
        console.log('v e');
        return res.status(400).json({ error: error.message });
    }
    // 中间件将未定义的错误转发给缺省的 Express 错误处理程序。
    next(error);
};
// 这是最后加载的中间件
app.use(errorHandler);
// const PORT = process.env.PORT || 3001;
app.listen(config_1.PORT, () => {
    console.log(`Server running on port ${config_1.PORT}`);
});
