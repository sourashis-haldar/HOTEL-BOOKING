import express from 'express'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import ConectDB from './db/db.js';
import clerkWebhooks from './controllers/clerkWebhooks.js';
const app = express();
app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  },
}));
app.use(clerkMiddleware());

app.use('/api/clerk', clerkWebhooks);



app.get('/', (req, res, next) => [
  res.send("hiiii serverr.....")
])
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  ConectDB();
  console.log(`server start at http://localhost:${PORT}`);
})
