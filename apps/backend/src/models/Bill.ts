// Bill model
import pool from '../config/db';
import { Bill } from 'shared';
import { v4 as uuidv4 } from 'uuid';

export const BillModel = {
  async getAll(): Promise<Bill[]> {
    const query = 'SELECT * FROM bills ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  },

  async getById(id: string): Promise<Bill | null> {
    const query = 'SELECT * FROM bills WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  },

  async create(bill: Omit<Bill, 'id'>): Promise<Bill> {
    const id = uuidv4();
    const query = `
      INSERT INTO bills (
        id, title, amount, date, category, contract_id, status, file_path
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      id,
      bill.title,
      bill.amount,
      bill.date,
      bill.category,
      bill.contractId,
      bill.status,
      bill.filePath || null
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(id: string, bill: Partial<Bill>): Promise<Bill | null> {
    // Build the SET part of the query dynamically based on what fields are provided
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (bill.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(bill.title);
    }
    if (bill.amount !== undefined) {
      fields.push(`amount = $${paramIndex++}`);
      values.push(bill.amount);
    }
    if (bill.date !== undefined) {
      fields.push(`date = $${paramIndex++}`);
      values.push(bill.date);
    }
    if (bill.category !== undefined) {
      fields.push(`category = $${paramIndex++}`);
      values.push(bill.category);
    }
    if (bill.contractId !== undefined) {
      fields.push(`contract_id = $${paramIndex++}`);
      values.push(bill.contractId);
    }
    if (bill.status !== undefined) {
      fields.push(`status = $${paramIndex++}`);
      values.push(bill.status);
    }
    if (bill.filePath !== undefined) {
      fields.push(`file_path = $${paramIndex++}`);
      values.push(bill.filePath);
    }

    if (fields.length === 0) {
      return this.getById(id); // Nothing to update
    }

    // Add the ID as the last parameter
    values.push(id);

    const query = `
      UPDATE bills 
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows.length ? rows[0] : null;
  },

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM bills WHERE id = $1 RETURNING id';
    const { rowCount } = await pool.query(query, [id]);
    return (rowCount ?? 0) > 0;
  },

  // Method specifically for file uploads
  async updateFile(id: string, filePath: string): Promise<Bill | null> {
    const query = `
      UPDATE bills
      SET file_path = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(query, [filePath, id]);
    return rows.length ? rows[0] : null;
  }
};
