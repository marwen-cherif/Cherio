-- Step 1: Update existing 'member' values to 'client' (temporarily as text)
-- First, we need to change the column type temporarily to text
ALTER TABLE "users" ALTER COLUMN "role" TYPE TEXT USING "role"::TEXT;

-- Step 2: Update the values
UPDATE "users" SET "role" = 'client' WHERE "role" = 'member';

-- Step 3: Drop the old enum
DROP TYPE "UserRole" CASCADE;

-- Step 4: Create the new enum with updated values
CREATE TYPE "UserRole" AS ENUM ('client', 'admin');

-- Step 5: Change the column back to use the new enum
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole" USING "role"::"UserRole";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'client';

