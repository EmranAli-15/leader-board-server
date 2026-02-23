import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.route';
import { scoreRoutes } from './modules/score/score.route';
import { submissionRoutes } from './modules/submission/submission.route';

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", scoreRoutes);
app.use("/api", submissionRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello leaders!");
});


app.use((req, res, next) => {
    res.status(400).json({
        message: "No route found!"
    })
});