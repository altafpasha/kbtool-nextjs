-- Drop existing objects if they exist
DROP TABLE IF EXISTS businesses CASCADE;
DROP TYPE IF EXISTS indian_state CASCADE;

-- Create an enum for Indian states
CREATE TYPE indian_state AS ENUM (
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
    'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa',
    'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh',
    'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
);

-- Create businesses table
CREATE TABLE businesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    trade_name VARCHAR(255) NOT NULL,
    nature_of_business TEXT NOT NULL,
    -- Address fields
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255) NOT NULL,
    pin_code CHAR(6) NOT NULL CHECK (pin_code ~ '^[0-9]{6}$'),
    city VARCHAR(100) NOT NULL,
    state indian_state NOT NULL,
    -- Registration details
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    registration_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    -- Constraints
    CONSTRAINT valid_dates CHECK (expiry_date > registration_date)
);

-- Create an index for faster searches
CREATE INDEX idx_businesses_trade_name ON businesses(trade_name);
CREATE INDEX idx_businesses_registration_number ON businesses(registration_number);

-- Enable Row Level Security (RLS)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable access to all users" ON businesses FOR ALL USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to update updated_at
CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add comment to the table
COMMENT ON TABLE businesses IS 'Stores business registration information with address and validity details';
