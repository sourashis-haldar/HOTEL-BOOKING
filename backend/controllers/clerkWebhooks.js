import express from 'express'
import User from '../models/User.model.js'
import { Webhook } from 'svix'

const router = express.Router()

const handleClerkWebhook = async (req, res) => {
  try {
    const wbhooks = new Webhook(process.env.CLERK_WEBHOOKS_SECRET)
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    }

    const rawBody = req.rawBody || JSON.stringify(req.body)
    const event = await wbhooks.verify(rawBody, headers)
    const { data, type } = event
    const firstName = data.first_name || "";
    const lastName = data.last_name || "";

    // create username
    const username = `${firstName} ${lastName}`
    

    const userData = {
      _id: data.id,
      username:username,
      email: data.email_addresses?.[0]?.email_address ?? '',
      image: data.image_url || data.profile_image_url || '',
    }

    switch (type) {
      case 'user.created':
        await User.create(userData)
        break

      case 'user.updated':
        await User.findByIdAndUpdate(data.id, userData, {
          new: true,
          upsert: true,
          runValidators: true,
        })
        break

      case 'user.deleted':
        await User.findByIdAndDelete(data.id)
        break

      default:
        console.log(`Unhandled Clerk webhook type: ${type}`)
    }

    return res.status(200).json({ success: true, message: 'Webhook received' })
  } catch (error) {
    console.error('Clerk webhook error:', error)
    return res.status(400).json({
      success: false,
      message: error?.message || 'Invalid webhook payload',
    })
  }
}

export default handleClerkWebhook;
