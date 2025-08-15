
-- Fix RLS policies for admin_users table - allow super_admin to create new admin users
DROP POLICY IF EXISTS "Super admins can manage admin_users" ON public.admin_users;
CREATE POLICY "Super admins can manage admin_users" 
ON public.admin_users 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users existing_admin 
    WHERE existing_admin.email = (
      SELECT email FROM public.admin_users WHERE id = auth.uid()
    ) 
    AND existing_admin.role = 'super_admin' 
    AND existing_admin.is_active = true
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users existing_admin 
    WHERE existing_admin.email = (
      SELECT email FROM public.admin_users WHERE id = auth.uid()
    ) 
    AND existing_admin.role = 'super_admin' 
    AND existing_admin.is_active = true
  )
);

-- Allow admins to select admin_users for viewing
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;
CREATE POLICY "Admins can view admin_users" 
ON public.admin_users 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users existing_admin 
    WHERE existing_admin.email = (
      SELECT email FROM public.admin_users WHERE id = auth.uid()
    ) 
    AND existing_admin.role IN ('admin', 'super_admin') 
    AND existing_admin.is_active = true
  )
);

-- Update banner_slides table to support multiple buttons
ALTER TABLE public.banner_slides 
DROP COLUMN IF EXISTS button_text,
DROP COLUMN IF EXISTS button_link;

-- Add buttons as JSONB array to support multiple buttons
ALTER TABLE public.banner_slides 
ADD COLUMN buttons JSONB DEFAULT '[]'::jsonb;

-- Update the get_current_user_role function to work with our custom session
DROP FUNCTION IF EXISTS public.get_current_user_role();
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  user_role text;
BEGIN
  -- Try to get role from session context first
  SELECT current_setting('app.current_user_role', true) INTO user_role;
  
  -- If not found in session, return null (will be handled by application)
  IF user_role IS NULL OR user_role = '' THEN
    RETURN NULL;
  END IF;
  
  RETURN user_role;
END;
$function$;

-- Create a function to set user context for RLS
CREATE OR REPLACE FUNCTION public.set_user_context(user_email text, user_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
BEGIN
  PERFORM set_config('app.current_user_email', user_email, true);
  PERFORM set_config('app.current_user_role', user_role, true);
END;
$function$;

-- Simplify admin_users RLS policies to work with our custom auth system
DROP POLICY IF EXISTS "Super admins can manage admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Admins can view admin_users" ON public.admin_users;

-- Create simpler policies that work with our session system
CREATE POLICY "Allow admin operations" 
ON public.admin_users 
FOR ALL 
USING (
  CASE 
    WHEN get_current_user_role() = 'super_admin' THEN true
    WHEN get_current_user_role() = 'admin' AND TG_OP = 'SELECT' THEN true
    ELSE false
  END
);

-- Insert default super admin if not exists
INSERT INTO public.admin_users (email, password_hash, role, is_active)
VALUES ('admin@flightsnepal.com', 'admin123', 'super_admin', true)
ON CONFLICT (email) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash,
  role = 'super_admin',
  is_active = true;
