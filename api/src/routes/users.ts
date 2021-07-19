import { Router, Request, Response } from 'express';
import { generateID } from '../gateway/utils';
import Users from '../schema/User';

const router = Router();


router.get('/:id', async (req: Request, res: Response) => {
    console.log(req.user)
    let { id } = req.params;
    if(id === 'me') id = (req.user as any).id;
    let c = await Users.findById(id);

    console.log(c)

    if (!c) return res.status(404).json({ message: 'User not found', code: 0 })

    return res.send(c)
})


export default router;