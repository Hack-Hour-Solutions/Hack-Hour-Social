import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { postController } from './controllers/postController.js';
import { userController } from './controllers/userController.js';
import { leetcodeController } from './controllers/leetcodeController.js';

dotenv.config();

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.get(
  '/api/feed',
  postController.getSolutions,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.solutions);
  }
);

app.use(
  '/api/login',
  userController.authenticateToken,
  //userController.getUserID, // get GOOGLE user data: res.locals.user
  // getUserID: middleware
  // upsert using email: (if not present add to db)
  // attach id to res.locals.user.id
  // express-session -> makes SSID cookie on req.session
  (req: Request, res: Response) => res.status(200).json(res.locals.user)
);

app.get(
  '/api/problem',
  leetcodeController.getProblemOfTheDay,
  (req: Request, res: Response) => res.status(200).json(res.locals.dailyProblem)
)

// req.session.destroy to get rid of the session when they log out

app.post('/api/solution', 
postController.postSolution, 
(req: Request, res: Response) => {res.status(200).json(res.locals.post)
})

app.use('/api', (req: Request, res: Response) =>
  res.status(200).json('here at api')
);

// default route handler
app.use((req: Request, res: Response) => res.sendStatus(404));

interface defaultError {
  log: string;
  status: number;
  message: {
    err: string;
  };
}

// Express Global Error Handler
app.use(
  (err: defaultError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr = {
      log: 'Express error handler caught an unknown error',
      status: 500,
      message: { err: 'An Error has occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => console.log('Server listening at Port ' + PORT));
