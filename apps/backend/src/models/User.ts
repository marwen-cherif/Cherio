import pool from '../config/db';
import format from 'pg-format';

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'member';
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_sign_in_at?: Date;
}

export interface UserCredentials {
  id: string;
  role: string;
}

export class UserModel {
  // Check user credentials and return user id and role
  static async checkCredentials(email: string, password: string): Promise<UserCredentials | null> {
    try {
      const query = 'SELECT * FROM auth.check_password($1, $2)';
      const result = await pool.query(query, [email, password]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      // Update last sign in timestamp
      await pool.query(
        'UPDATE auth.users SET last_sign_in_at = NOW() WHERE id = $1',
        [result.rows[0].id]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error checking user credentials:', error);
      throw error;
    }
  }
  
  // Get user by ID
  static async findById(id: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, email, email_verified, first_name, last_name, role, 
        created_at, updated_at, last_sign_in_at
        FROM auth.users
        WHERE id = $1
      `;
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0] as User;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }
  
  // Get user by email
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const query = `
        SELECT id, email, email_verified, first_name, last_name, role, 
        created_at, updated_at, last_sign_in_at
        FROM auth.users
        WHERE email = $1
      `;
      const result = await pool.query(query, [email]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0] as User;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }
  
  // Create a new user
  static async create(
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string,
    role: 'admin' | 'member' = 'member'
  ): Promise<string> {
    try {
      const query = 'SELECT auth.create_user($1, $2, $3, $4, $5)';
      const result = await pool.query(query, [email, password, firstName, lastName, role]);
      
      return result.rows[0].create_user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  // Generate a refresh token for a user
  static async generateRefreshToken(userId: string): Promise<string> {
    try {
      const query = 'SELECT auth.generate_refresh_token($1)';
      const result = await pool.query(query, [userId]);
      
      return result.rows[0].generate_refresh_token;
    } catch (error) {
      console.error('Error generating refresh token:', error);
      throw error;
    }
  }
  
  // Verify a refresh token
  static async verifyRefreshToken(token: string): Promise<string | null> {
    try {
      const query = `
        SELECT user_id
        FROM auth.refresh_tokens
        WHERE token = $1 AND expires_at > NOW()
      `;
      const result = await pool.query(query, [token]);
      
      if (result.rows.length === 0) {
        return null;
      }
      
      return result.rows[0].user_id;
    } catch (error) {
      console.error('Error verifying refresh token:', error);
      throw error;
    }
  }
  
  // Delete a refresh token
  static async deleteRefreshToken(token: string): Promise<void> {
    try {
      const query = 'DELETE FROM auth.refresh_tokens WHERE token = $1';
      await pool.query(query, [token]);
    } catch (error) {
      console.error('Error deleting refresh token:', error);
      throw error;
    }
  }
  
  // Update user information
  static async update(
    id: string, 
    data: { first_name?: string; last_name?: string; email_verified?: boolean }
  ): Promise<void> {
    try {
      const setClause = Object.entries(data)
        .filter(([_, value]) => value !== undefined)
        .map(([key, _], index) => `${key} = $${index + 2}`)
        .join(', ');
      
      if (!setClause) {
        return; // Nothing to update
      }
      
      const query = format(
        'UPDATE auth.users SET %s, updated_at = NOW() WHERE id = $1',
        setClause
      );
      
      const values = [
        id,
        ...Object.entries(data)
          .filter(([_, value]) => value !== undefined)
          .map(([_, value]) => value)
      ];
      
      await pool.query(query, values);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}