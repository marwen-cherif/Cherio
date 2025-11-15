-- Step 1: Add new columns with defaults
ALTER TABLE "products" 
  ADD COLUMN IF NOT EXISTS "short_description" JSONB,
  ADD COLUMN IF NOT EXISTS "currency" TEXT NOT NULL DEFAULT 'EUR',
  ADD COLUMN IF NOT EXISTS "image" TEXT,
  ADD COLUMN IF NOT EXISTS "images" JSONB,
  ADD COLUMN IF NOT EXISTS "video" TEXT,
  ADD COLUMN IF NOT EXISTS "links" JSONB NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS "featured" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "category" TEXT;

-- Step 2: Migrate existing data
-- Convert old name (String) to new name (JSONB) if it exists
DO $$
DECLARE
  col_exists BOOLEAN;
BEGIN
  -- Check if old name column exists and is TEXT/VARCHAR
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'name' 
    AND data_type IN ('text', 'character varying')
  ) INTO col_exists;
  
  IF col_exists THEN
    -- Migrate name from string to JSONB
    ALTER TABLE "products" 
      ALTER COLUMN "name" TYPE JSONB USING jsonb_build_object('fr', "name", 'en', "name", 'ar', "name");
  ELSE
    -- If name is already JSONB, ensure it has the right structure
    UPDATE "products" 
    SET "name" = jsonb_build_object(
      'fr', COALESCE("name"->>'fr', ''),
      'en', COALESCE("name"->>'en', ''),
      'ar', COALESCE("name"->>'ar', '')
    )
    WHERE "name" IS NULL OR NOT ("name" ? 'fr' AND "name" ? 'en' AND "name" ? 'ar');
  END IF;
END $$;

-- Step 3: Migrate description
DO $$
DECLARE
  col_exists BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'description' 
    AND data_type IN ('text', 'character varying')
  ) INTO col_exists;
  
  IF col_exists THEN
    ALTER TABLE "products" 
      ALTER COLUMN "description" TYPE JSONB USING jsonb_build_object('fr', COALESCE("description", ''), 'en', COALESCE("description", ''), 'ar', COALESCE("description", ''));
  ELSE
    UPDATE "products" 
    SET "description" = jsonb_build_object(
      'fr', COALESCE("description"->>'fr', ''),
      'en', COALESCE("description"->>'en', ''),
      'ar', COALESCE("description"->>'ar', '')
    )
    WHERE "description" IS NULL OR NOT ("description" ? 'fr' AND "description" ? 'en' AND "description" ? 'ar');
  END IF;
END $$;

-- Step 4: Migrate image_url to image
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'products' 
    AND column_name = 'image_url'
  ) THEN
    UPDATE "products" 
    SET "image" = COALESCE("image_url", '')
    WHERE "image" IS NULL;
    
    ALTER TABLE "products" DROP COLUMN IF EXISTS "image_url";
  END IF;
END $$;

-- Step 5: Set NOT NULL constraints after data migration
ALTER TABLE "products" 
  ALTER COLUMN "name" SET NOT NULL,
  ALTER COLUMN "description" SET NOT NULL,
  ALTER COLUMN "image" SET NOT NULL,
  ALTER COLUMN "links" SET NOT NULL;

-- Step 6: Remove defaults
ALTER TABLE "products" 
  ALTER COLUMN "currency" DROP DEFAULT,
  ALTER COLUMN "links" DROP DEFAULT,
  ALTER COLUMN "featured" DROP DEFAULT;

