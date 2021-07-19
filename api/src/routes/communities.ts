import { Router, Request, Response } from 'express';
import { generateID } from '../gateway/utils';
import Communities from '../schema/Community';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    let { name, icon } = req.params;

    let everyone = {
        id: generateID({ ids: 1 }),
        name: '@everyone',
        permissions: 0,
        color: 0,
        hoist: false,
        position: 0,
        mentionable: false
    }

    let community: any = { // types later lol
        name,
        icon,
        channels: [],
        afk_channel_id: null,
        banner: null,
        max_members: 10000,
        owner_id: (req.user as any).id,
        roles: [everyone]
    }

    process.gateway.emit('COMMUNITY_CREATE', community);

    return res.send(community)
})


router.get('/:id', async (req: Request, res: Response) => {
    let c = await Communities.findOne({ id: req.params.id });

    if (!c) return res.status(404).json({ message: 'Community not found', code: 0 })

    return res.send(c)
})


export default router;