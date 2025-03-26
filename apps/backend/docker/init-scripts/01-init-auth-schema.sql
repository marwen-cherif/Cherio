-- Create extensions needed for Supabase Auth
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create auth schema
CREATE SCHEMA IF NOT EXISTS auth;

-- Create auth.users table
CREATE TABLE IF NOT EXISTS auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  encrypted_password TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT DEFAULT 'member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_sign_in_at TIMESTAMP WITH TIME ZONE,
  reset_password_token TEXT,
  reset_password_sent_at TIMESTAMP WITH TIME ZONE
);

-- Create refresh tokens table
CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Function to check password
CREATE OR REPLACE FUNCTION auth.check_password(email TEXT, password TEXT)
RETURNS TABLE (id UUID, role TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.role FROM auth.users u
  WHERE u.email = check_password.email
  AND u.encrypted_password = crypt(password, u.encrypted_password);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create a new user
CREATE OR REPLACE FUNCTION auth.create_user(
  email TEXT,
  password TEXT,
  first_name TEXT DEFAULT NULL,
  last_name TEXT DEFAULT NULL,
  role TEXT DEFAULT 'member'
) RETURNS UUID AS $$
DECLARE
  user_id UUID;
BEGIN
  INSERT INTO auth.users (email, encrypted_password, first_name, last_name, role)
  VALUES (
    email,
    crypt(password, gen_salt('bf')),
    first_name,
    last_name,
    role
  )
  RETURNING id INTO user_id;
  
  RETURN user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate a refresh token
CREATE OR REPLACE FUNCTION auth.generate_refresh_token(user_id UUID, expires_in INTERVAL DEFAULT '30 days'::INTERVAL)
RETURNS TEXT AS $$
DECLARE
  token TEXT;
BEGIN
  token := encode(gen_random_bytes(32), 'hex');
  
  INSERT INTO auth.refresh_tokens (user_id, token, expires_at)
  VALUES (user_id, token, now() + expires_in);
  
  RETURN token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create initial admin user (password: admin123)
SELECT auth.create_user('admin@syndiccheck.com', 'admin123', 'Admin', 'User', 'admin');