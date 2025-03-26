import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { generateToken } from '../utils/authUtils';

// Login controller
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Check user credentials
    const user = await UserModel.checkCredentials(email, password);

    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate tokens
    const accessToken = generateToken({ id: user.id, role: user.role });
    const refreshToken = await UserModel.generateRefreshToken(user.id);

    // Get user profile
    const userProfile = await UserModel.findById(user.id);

    res.json({
      message: 'Login successful',
      user: {
        id: userProfile?.id,
        email: userProfile?.email,
        firstName: userProfile?.first_name,
        lastName: userProfile?.last_name,
        role: userProfile?.role,
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Register controller
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    // Check if user already exists
    const existingUser = await UserModel.findByEmail(email);

    console.log(existingUser)

    if (existingUser) {
      res.status(409).json({ message: 'Email already in use' });
      return;
    }

    // Create new user
    const userId = await UserModel.create(email, password, firstName, lastName);

    // Generate tokens
    const accessToken = generateToken({ id: userId, role: 'member' });
    const refreshToken = await UserModel.generateRefreshToken(userId);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userId,
        email,
        firstName,
        lastName,
        role: 'member',
      },
      tokens: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Refresh token controller
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    // Verify refresh token
    const userId = await UserModel.verifyRefreshToken(refreshToken);

    if (!userId) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    // Get user information
    const user = await UserModel.findById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Generate new access token
    const accessToken = generateToken({ id: user.id, role: user.role });

    // Generate new refresh token and delete old one
    await UserModel.deleteRefreshToken(refreshToken);
    const newRefreshToken = await UserModel.generateRefreshToken(user.id);

    res.json({
      message: 'Token refreshed successfully',
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Token refresh failed' });
  }
};

// Logout controller
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await UserModel.deleteRefreshToken(refreshToken);
    }

    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

// Get current user profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
        emailVerified: user.email_verified,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get user profile' });
  }
};
