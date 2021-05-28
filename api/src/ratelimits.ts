import { Router, Request, Response } from 'express'
import rl from 'express-rate-limit';

const r = Router();

let windowMs = 1000 * 60
let message = {
    message: 'You are being rate limited.',
}

function handler (req: Request, res: Response) {
    res.status(429).send(message)
}

r.use('/auth/github/callback', rl({ windowMs, max: 3, handler }))
r.use('/auth/github', rl({ windowMs, max: 3, handler }))
r.use('/auth', rl({ windowMs, max: 25, handler }))

r.use('/', rl({ windowMs: 1000, max: 40, handler }))

export default r;