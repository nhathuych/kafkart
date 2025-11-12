import { Router } from 'express';
import { create, destroy, getAll, getOne, update } from '../controllers/category.controller';

const router: Router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

export default router;
