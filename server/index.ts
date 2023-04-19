import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbController } from "./controllers.js";

dotenv.config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/feed', dbController.getSolutions, (req: Request, res: Response) => {
  res.status(200).json(res.locals.solutions)
})

app.use("/api", (req: Request, res: Response) =>
  res.status(200).json("here at api")
);

// default route handler
app.use((req: Request, res: Response) => res.sendStatus(404));


interface defaultError {
  log: string;
  status: number;
  message: {
    err: string;
  }
} 

// Express Global Error Handler
app.use((err: defaultError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown error',
    status: 500,
    message: { err: 'An Error has occurred' }
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log('Server listening at Port ' + PORT))
