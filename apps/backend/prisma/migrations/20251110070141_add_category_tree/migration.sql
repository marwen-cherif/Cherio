-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" JSONB NOT NULL,
    "slug" JSONB NOT NULL,
    "description" JSONB,
    "image" TEXT,
    "parent_id" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "categories_parent_id_idx" ON "categories"("parent_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add category_id column to products table
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category_id" TEXT;

-- CreateIndex for category_id
CREATE INDEX IF NOT EXISTS "products_category_id_idx" ON "products"("category_id");

-- AddForeignKey for products.category_id
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Migrate existing category data (if any)
-- This will try to create categories from existing product.category values
-- Note: This is a best-effort migration. You may need to manually review and adjust.
DO $$
DECLARE
    category_record RECORD;
    category_id_val TEXT;
    category_name_val TEXT;
BEGIN
    -- For each unique category string in products, create a category
    FOR category_record IN 
        SELECT DISTINCT "category" 
        FROM "products" 
        WHERE "category" IS NOT NULL AND "category" != ''
    LOOP
        category_name_val := category_record.category;
        
        -- Generate a UUID for the new category
        category_id_val := gen_random_uuid()::TEXT;
        
        -- Create category with multilingual name and slug
        INSERT INTO "categories" ("id", "name", "slug", "is_active", "created_at", "updated_at")
        VALUES (
            category_id_val,
            jsonb_build_object('fr', category_name_val, 'en', category_name_val, 'ar', category_name_val),
            jsonb_build_object('fr', lower(regexp_replace(category_name_val, '[^a-zA-Z0-9]+', '-', 'g')), 
                              'en', lower(regexp_replace(category_name_val, '[^a-zA-Z0-9]+', '-', 'g')), 
                              'ar', lower(regexp_replace(category_name_val, '[^a-zA-Z0-9]+', '-', 'g'))),
            true,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        )
        ON CONFLICT DO NOTHING;
        
        -- Update products to use the new category_id
        UPDATE "products"
        SET "category_id" = category_id_val
        WHERE "category" = category_name_val;
    END LOOP;
END $$;

-- Drop the old category column after migration
-- Note: Uncomment this line after verifying the migration worked correctly
-- ALTER TABLE "products" DROP COLUMN IF EXISTS "category";

