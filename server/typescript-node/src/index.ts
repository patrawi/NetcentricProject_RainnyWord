import express, { Application, Request, Response} from 'express';

const app = express();

const PORT = 8000;

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});