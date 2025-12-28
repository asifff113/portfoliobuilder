-- =============================================================
-- RUN THIS SQL SCRIPT IN SUPABASE SQL EDITOR
-- =============================================================
-- This script adds all missing portfolio layout types to your database.
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new
-- Paste this entire script and click "Run"
-- =============================================================

-- From 00004_portfolio_layout_types.sql
DO $$
BEGIN
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

-- From 00006_add_remaining_layout_types.sql
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'brutalist' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'brutalist';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'retro_vaporwave' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'retro_vaporwave';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'aurora' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'aurora';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'holographic' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'holographic';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'tokyo_night' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'tokyo_night';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'gradient_wave' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'gradient_wave';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'isometric' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'isometric';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'noir_film' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'noir_film';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'cosmic_space' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'cosmic_space';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'newspaper' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'newspaper';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'origami' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'origami';
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'liquid_metal' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')) THEN
        ALTER TYPE portfolio_layout_type ADD VALUE 'liquid_metal';
    END IF;
END
$$;

-- Verify all enum values were added
SELECT enumlabel FROM pg_enum 
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'portfolio_layout_type')
ORDER BY enumsortorder;
