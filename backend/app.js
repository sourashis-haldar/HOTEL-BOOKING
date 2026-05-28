import express from 'express'
import 'dotenv/config'
import { clerkMiddleware } from '@clerk/express'
import cors from 'cors'
import ConectDB from './db/db.js';
import webhooksRouter from './routes/webhooks.routes.js';

const app=express();
await ConectDB();
app.use(cors());
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  },
}));


app.use(clerkMiddleware())



app.use('/api/webhooks',webhooksRouter);

app.get('/', (req, res) => {
  res.send('hiiii serverr.....')
})
const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
  
  console.log(`server start at http://localhost:${PORT}`);
})
