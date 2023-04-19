import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

let db: string = process.env.ENV === 'TEST' ? 
  'hack-hour-solutions-test' : 
  'hack-hour-solutions';

if (!process.env.MONGO_URI) throw new Error('mongoURI not defined');

mongoose.connect(process.env.MONGO_URI, {
  dbName: db
})
  .then(() => console.log('Connected to DB'))
  .catch(err => console.log(err))

const postSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  solution: String,
  date: Date,
  comments: [
    {type: mongoose.Schema.Types.ObjectId, ref: 'comments'}
  ]
})

const Post = mongoose.model('posts', postSchema);

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  jwt: String
})

const User = mongoose.model('users', postSchema);

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  text: String,
  date: Date
})

const Comment = mongoose.model('comments', commentSchema);

export { Post, User, Comment }