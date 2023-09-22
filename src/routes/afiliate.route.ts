import { Router } from 'express';
import upload from '../middlewares/multer';
import { create } from '../controller/afiliate.controller';

const route = Router();

// Rutas
route.post('/create', upload.single('imageUrl'), create);

export default route;
