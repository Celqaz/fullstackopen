import express, {Express, Request, Response} from 'express';

const app: Express = express();
app.use(express.json());

const PORT = 3001;


const data = [
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
app.get('/persons', (_req: Request, res: Response) => {
    res.json(data);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
