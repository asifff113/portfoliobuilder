-- Migration: Add remaining portfolio layout types
-- This migration adds all the remaining advanced portfolio layout types to the enum

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
