import express, { Request, Response } from 'express';
import cors from 'cors';

export const app = express();
export const port = 5000;

app.use(cors());



app.get('/', (req: Request, res: Response) => {
    res.send("Hello leaders!");
})