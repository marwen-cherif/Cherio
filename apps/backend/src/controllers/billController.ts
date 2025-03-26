import { Request, Response } from 'express';
import { BillModel } from '../models/Bill';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../../uploads/bills');
    
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

export const billController = {
  async getAll(req: Request, res: Response) {
    try {
      const bills = await BillModel.getAll();
      res.json({ bills });
    } catch (error) {
      console.error('Error fetching bills:', error);
      res.status(500).json({ error: 'Failed to retrieve bills' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bill = await BillModel.getById(id);
      
      if (!bill) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      
      res.json({ bill });
    } catch (error) {
      console.error('Error fetching bill:', error);
      res.status(500).json({ error: 'Failed to retrieve bill' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const bill = await BillModel.create(req.body);
      res.status(201).json({ bill });
    } catch (error) {
      console.error('Error creating bill:', error);
      res.status(500).json({ error: 'Failed to create bill' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const bill = await BillModel.update(id, req.body);
      
      if (!bill) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      
      res.json({ bill });
    } catch (error) {
      console.error('Error updating bill:', error);
      res.status(500).json({ error: 'Failed to update bill' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await BillModel.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Bill not found' });
      }
      
      res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
      console.error('Error deleting bill:', error);
      res.status(500).json({ error: 'Failed to delete bill' });
    }
  },

  async uploadFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Check if bill exists
      const bill = await BillModel.getById(id);
      if (!bill) {
        // Remove uploaded file if bill doesn't exist
        if (req.file) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(404).json({ error: 'Bill not found' });
      }
      
      // If the bill already has a file, remove the old one
      if (bill.filePath && fs.existsSync(bill.filePath)) {
        fs.unlinkSync(bill.filePath);
      }
      
      // Check if req.file exists
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      
      // Update the bill with the new file path
      const updatedBill = await BillModel.updateFile(
        id, 
        req.file.path
      );
      
      res.json({ 
        message: 'File uploaded successfully',
        bill: updatedBill
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  },

  async downloadFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Get bill to find file path
      const bill = await BillModel.getById(id);
      
      if (!bill || !bill.filePath) {
        return res.status(404).json({ error: 'File not found' });
      }
      
      // Send the file
      res.download(bill.filePath);
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).json({ error: 'Failed to download file' });
    }
  }
};