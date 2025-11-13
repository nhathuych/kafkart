import { Router } from 'express';
import { create, destroy, getAll, getOne, update } from '../controllers/product.controller';
import { shouldBeAdmin } from '../middleware/auth.middleware';

const router: Router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', shouldBeAdmin, create);
router.put('/:id', shouldBeAdmin, update);
router.delete('/:id', shouldBeAdmin, destroy);

export default router;
