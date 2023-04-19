import { Request, Response, NextFunction, RequestHandler } from 'express';
import { Post, User, Comment } from './models.js';
import axios from 'axios';


// ERROR TYPE CAUSES ERROR WITH CREATE ERROR, SET TO ANY
