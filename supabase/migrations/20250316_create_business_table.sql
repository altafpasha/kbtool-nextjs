-- Create businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    trade_name TEXT NOT NULL,
    nature_of_business TEXT NOT NULL,
    line1 TEXT NOT NULL,
    line2 TEXT,
    pin_code VARCHAR(6) NOT NULL CHECK (length(pin_code) = 6),
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    reg_no TEXT NOT NULL,
    reg_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(reg_no, trade_name)
);

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS businesses_trade_name_idx ON businesses(trade_name);
CREATE INDEX IF NOT EXISTS businesses_pin_code_idx ON businesses(pin_code);
CREATE INDEX IF NOT EXISTS businesses_reg_no_idx ON businesses(reg_no);

-- Add state validation
ALTER TABLE businesses ADD CONSTRAINT valid_indian_state 
CHECK (state IN (
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 
    'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
));

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_businesses_updated_at
    BEFORE UPDATE ON businesses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
