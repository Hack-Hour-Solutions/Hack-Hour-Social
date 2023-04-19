import mongoose from 'mongoose';

let db: string;
process.env.ENV === 'TEST' ? db = 'hack-hour-solutions-test' : 'hack-hour-solutions'

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
  createdAt: Date,
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
  createdAt: Date
})

const Comment = mongoose.model('comments', commentSchema);

export { Post, User, Comment }