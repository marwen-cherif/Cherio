// Contract model
import pool from '../config/db';
import { Contract } from 'shared';
import { v4 as uuidv4 } from 'uuid';

export const ContractModel = {
  async getAll(): Promise<Contract[]> {
    const query = 'SELECT * FROM contracts ORDER BY created_at DESC';
    const { rows } = await pool.query(query);
    return rows;
  },

  async getById(id: string): Promise<Contract | null> {
    const query = 'SELECT * FROM contracts WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  },

  async create(contract: Omit<Contract, 'id'>): Promise<Contract> {
    const id = uuidv4();
    const query = `
      INSERT INTO contracts (
        id, title, description, start_date, end_date, provider, category, file_path
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const values = [
      id,
      contract.title,
      contract.description,
      contract.startDate,
      contract.endDate,
      contract.provider,
      contract.category,
      contract.filePath || null
    ];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async update(id: string, contract: Partial<Contract>): Promise<Contract | null> {
    // Build the SET part of the query dynamically based on what fields are provided
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (contract.title !== undefined) {
      fields.push(`title = $${paramIndex++}`);
      values.push(contract.title);
    }
    if (contract.description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(contract.description);
    }
    if (contract.startDate !== undefined) {
      fields.push(`start_date = $${paramIndex++}`);
      values.push(contract.startDate);
    }
    if (contract.endDate !== undefined) {
      fields.push(`end_date = $${paramIndex++}`);
      values.push(contract.endDate);
    }
    if (contract.provider !== undefined) {
      fields.push(`provider = $${paramIndex++}`);
      values.push(contract.provider);
    }
    if (contract.category !== undefined) {
      fields.push(`category = $${paramIndex++}`);
      values.push(contract.category);
    }
    if (contract.filePath !== undefined) {
      fields.push(`file_path = $${paramIndex++}`);
      values.push(contract.filePath);
    }

    if (fields.length === 0) {
      return this.getById(id); // Nothing to update
    }

    // Add the ID as the last parameter
    values.push(id);

    const query = `
      UPDATE contracts 
      SET ${fields.join(', ')}, updated_at = NOW()
      WHERE id = $${paramIndex}
      RETURNING *
    `;

    const { rows } = await pool.query(query, values);
    return rows.length ? rows[0] : null;
  },

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM contracts WHERE id = $1 RETURNING id';
    const { rowCount } = await pool.query(query, [id]);
    return (rowCount ?? 0) > 0;
  },

  // Method specifically for file uploads
  async updateFile(id: string, filePath: string): Promise<Contract | null> {
    const query = `
      UPDATE contracts
      SET file_path = $1, updated_at = NOW()
      WHERE id = $2
      RETURNING *
    `;

    const { rows } = await pool.query(query, [filePath, id]);
    return rows.length ? rows[0] : null;
  }
};
