import express from 'express'
import { executePython } from '../controllers/executeController.js'

const router = express.Router()

router.post('/', executePython)

export default router