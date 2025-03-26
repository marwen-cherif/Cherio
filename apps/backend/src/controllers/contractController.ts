import { Request, Response } from 'express';
import { ContractModel } from '../models/Contract';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/contracts');

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const fileExt = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    cb(null, fileName);
  }
});

// File filter to accept only certain file types
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, JPEG, PNG, DOC, and DOCX files are allowed.'));
  }
};

// Create multer upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

export const contractController = {
  async getAll(req: Request, res: Response) {
    try {
      const contracts = await ContractModel.getAll();
      res.json({ contracts });
    } catch (error) {
      console.error('Error fetching contracts:', error);
      res.status(500).json({ error: 'Failed to retrieve contracts' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await ContractModel.getById(id);

      if (!contract) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      res.json({ contract });
    } catch (error) {
      console.error('Error fetching contract:', error);
      res.status(500).json({ error: 'Failed to retrieve contract' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const contract = await ContractModel.create(req.body);
      res.status(201).json({ contract });
    } catch (error) {
      console.error('Error creating contract:', error);
      res.status(500).json({ error: 'Failed to create contract' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const contract = await ContractModel.update(id, req.body);

      if (!contract) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      res.json({ contract });
    } catch (error) {
      console.error('Error updating contract:', error);
      res.status(500).json({ error: 'Failed to update contract' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await ContractModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: 'Contract not found' });
      }

      res.json({ message: 'Contract deleted successfully' });
    } catch (error) {
      console.error('Error deleting contract:', error);
      res.status(500).json({ error: 'Failed to delete contract' });
    }
  },

  async uploadFile(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if contract exists
      const contract = await ContractModel.getById(id);
      if (!contract) {
        // Remove uploaded file if contract doesn't exist
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({ error: 'Contract not found' });
      }

      // If the contract already has a file, remove the old one
      if (contract.filePath && fs.existsSync(contract.filePath)) {
        fs.unlinkSync(contract.filePath);
      }

      // Check if req.file exists
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      // Update the contract with the new file path
      const updatedContract = await ContractModel.updateFile(
        id,
        req.file.path
      );

      res.json({
        message: 'File uploaded successfully',
        contract: updatedContract
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  },

  async downloadFile(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Get contract to find file path
      const contract = await ContractModel.getById(id);

      if (!contract || !contract.filePath) {
        return res.status(404).json({ error: 'File not found' });
      }

      // Send the file
      res.download(contract.filePath);
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).json({ error: 'Failed to download file' });
    }
  }
};
