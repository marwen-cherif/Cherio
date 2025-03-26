import express from 'express';
import { billController, upload } from '../controllers/billController';
import { authenticate } from '../middlewares/auth';
import { Request, Response } from 'express';

const router = express.Router();

// All routes are protected with authentication
router.use(authenticate);

// Get all bills
router.get('/', billController.getAll);

// Get bill by ID
router.get('/:id', function(req: Request, res: Response): void {
  billController.getById(req, res);
});

// Create a new bill
router.post('/', billController.create);

// Update bill
router.put('/:id', function(req: Request, res: Response): void {
  billController.update(req, res);
});

// Delete bill
router.delete('/:id', function(req: Request, res: Response): void {
  billController.delete(req, res);
});

// Upload bill file
router.post('/:id/upload', upload.single('file'), function(req: Request, res: Response): void {
  billController.uploadFile(req, res);
});

// Download bill file
router.get('/:id/download', function(req: Request, res: Response): void {
  billController.downloadFile(req, res);
});

export default router;