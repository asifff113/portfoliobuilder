-- Migration: Add new portfolio layout types
-- This migration adds the new advanced portfolio layout types to the enum

-- Note: PostgreSQL doesn't allow adding values to an enum in a transaction by default.
-- We need to commit after each ADD VALUE or use a workaround.

-- Add new layout types to the portfolio_layout_type enum
DO $$
BEGIN
    -- Check if the enum value exists before adding
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'neon_cyber' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'neon_cyber';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'minimal_luxe' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'minimal_luxe';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'interactive_grid' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'interactive_grid';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'glassmorphism' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'glassmorphism';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'magazine_editorial' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'magazine_editorial';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'terminal_dev' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'terminal_dev';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'particle_network' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'particle_network';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = '3d_cards' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE '3d_cards';
    END IF;
END
$$;

-- Update the database types check constraint if using text instead of enum
-- (This is a fallback in case the column uses text with a check constraint)
-- ALTER TABLE portfolios DROP CONSTRAINT IF EXISTS portfolios_layout_type_check;
-- ALTER TABLE portfolios ADD CONSTRAINT portfolios_layout_type_check 
--   CHECK (layout_type IN ('hero_timeline', 'project_grid', 'minimal', 'creative', 'developer', 
--                          'neon_cyber', 'minimal_luxe', 'interactive_grid', 'glassmorphism', 
--                          'magazine_editorial', 'terminal_dev', 'particle_network', '3d_cards'));
