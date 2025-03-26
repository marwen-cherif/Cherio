import express from 'express';
import { contractController, upload } from '../controllers/contractController';
import { authenticate } from '../middlewares/auth';
import { Request, Response } from 'express';

const router = express.Router();

// All routes are protected with authentication
router.use(authenticate);

// Get all contracts
router.get('/', contractController.getAll);

// Get contract by ID
router.get('/:id', function(req: Request, res: Response): void {
  contractController.getById(req, res);
});

// Create a new contract
router.post('/', contractController.create);

// Update contract
router.put('/:id', function(req: Request, res: Response): void {
  contractController.update(req, res);
});

// Delete contract
router.delete('/:id', function(req: Request, res: Response): void {
  contractController.delete(req, res);
});

// Upload contract file
router.post('/:id/upload', upload.single('file'), function(req: Request, res: Response): void {
  contractController.uploadFile(req, res);
});

// Download contract file
router.get('/:id/download', function(req: Request, res: Response): void {
  contractController.downloadFile(req, res);
});

export default router;
