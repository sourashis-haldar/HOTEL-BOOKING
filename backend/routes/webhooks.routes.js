import express from 'express'

import handleClerkWebhook from '../controllers/clerkWebhooks.js';

const webhooksRouter=express.Router();

webhooksRouter.post('/clerk',handleClerkWebhook);

export default webhooksRouter;