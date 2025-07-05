
-- Create enum types for status tracking
CREATE TYPE script_status AS ENUM ('pending', 'assigned', 'approved', 'declined');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE judge_status AS ENUM ('pending', 'approved', 'declined');

-- Create judges table
CREATE TABLE public.judges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    status judge_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create scripts table
CREATE TABLE public.scripts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    author_phone TEXT,
    file_url TEXT,
    file_name TEXT,
    status script_status DEFAULT 'pending',
    assigned_judge_id UUID REFERENCES public.judges(id),
    stripe_payment_intent_id TEXT,
    payment_status payment_status DEFAULT 'pending',
    amount INTEGER DEFAULT 5000, -- $50.00 in cents
    submitted_at TIMESTAMPTZ DEFAULT now(),
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create script reviews table
CREATE TABLE public.script_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    script_id UUID REFERENCES public.scripts(id) ON DELETE CASCADE,
    judge_id UUID REFERENCES public.judges(id),
    feedback TEXT,
    recommendation script_status,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table for sponsorship
CREATE TABLE public.sponsorship_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sponsor_name TEXT,
    sponsor_email TEXT,
    amount INTEGER NOT NULL,
    stripe_payment_intent_id TEXT UNIQUE,
    payment_status payment_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create contacts table for general inquiries
CREATE TABLE public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.judges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.script_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sponsorship_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for judges
CREATE POLICY "Judges can view their own data" ON public.judges
    FOR SELECT USING (auth.uid()::text = id::text OR EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin'));

CREATE POLICY "Admins can manage judges" ON public.judges
    FOR ALL USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin'));

-- Create policies for scripts
CREATE POLICY "Anyone can insert scripts" ON public.scripts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Judges can view assigned scripts" ON public.scripts
    FOR SELECT USING (
        assigned_judge_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin')
    );

CREATE POLICY "Admins can manage all scripts" ON public.scripts
    FOR ALL USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin'));

-- Create policies for script reviews
CREATE POLICY "Judges can manage their reviews" ON public.script_reviews
    FOR ALL USING (
        judge_id = auth.uid() OR 
        EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin')
    );

-- Create policies for sponsorship payments
CREATE POLICY "Anyone can insert sponsorship payments" ON public.sponsorship_payments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view sponsorship payments" ON public.sponsorship_payments
    FOR SELECT USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin'));

-- Create policies for contacts
CREATE POLICY "Anyone can insert contacts" ON public.contacts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view contacts" ON public.contacts
    FOR SELECT USING (EXISTS (SELECT 1 FROM auth.users WHERE auth.uid() = id AND raw_user_meta_data->>'role' = 'admin'));

-- Create storage bucket for script files
INSERT INTO storage.buckets (id, name, public) VALUES ('scripts', 'scripts', false);

-- Create storage policies
CREATE POLICY "Anyone can upload scripts" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'scripts');

CREATE POLICY "Authenticated users can view scripts" ON storage.objects
    FOR SELECT USING (bucket_id = 'scripts' AND auth.role() = 'authenticated');

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_judges_updated_at BEFORE UPDATE ON public.judges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scripts_updated_at BEFORE UPDATE ON public.scripts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_scripts_status ON public.scripts(status);
CREATE INDEX idx_scripts_assigned_judge ON public.scripts(assigned_judge_id);
CREATE INDEX idx_scripts_payment_status ON public.scripts(payment_status);
CREATE INDEX idx_judges_status ON public.judges(status);
CREATE INDEX idx_judges_email ON public.judges(email);
