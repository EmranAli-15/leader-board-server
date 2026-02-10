import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.route';
import { scoreRoutes } from './modules/score/score.route';

export const app = express();
export const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", scoreRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello leaders!");
})