-- Create the content table with the correct schema for FAQs
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  type TEXT NOT NULL,
  title_en TEXT NOT NULL,
  body_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  body_hi TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read FAQs
CREATE POLICY "Allow public read access on content" ON content
  FOR SELECT USING (type = 'faq');

-- Insert some sample FAQ data
INSERT INTO content (type, title_en, body_en, title_hi, body_hi) VALUES
('faq', 'What is Aadhaar Seeding?', 'Aadhaar seeding is the process of linking your Aadhaar number with your bank account for direct benefit transfers.', 'आधार सीडिंग क्या है?', 'आधार सीडिंग आपके बैंक खाते में आपके आधार नंबर को लिंक करने की प्रक्रिया है ताकि प्रत्यक्ष लाभ हस्तांतरण हो सके।'),
('faq', 'Why do I need to seed my Aadhaar?', 'Seeding enables direct transfer of government subsidies, scholarships, and benefits to your bank account without intermediaries.', 'मुझे अपने आधार को सीड क्यों करना चाहिए?', 'सीडिंग सरकारी सब्सिडी, छात्रवृत्ति और लाभों को बिचौलियों के बिना आपके बैंक खाते में सीधे स्थानांतरित करने में सक्षम बनाता है।'),
('faq', 'Is my Aadhaar data safe?', 'Yes, Aadhaar seeding follows RBI guidelines and your data is encrypted and secure throughout the process.', 'क्या मेरा आधार डेटा सुरक्षित है?', 'हाँ, आधार सीडिंग आरबीआई दिशानिर्देशों का पालन करता है और आपका डेटा पूरी प्रक्रिया में एन्क्रिप्टेड और सुरक्षित है।'),
('faq', 'How long does the process take?', 'The seeding process typically takes 1-2 business days after you submit the consent form to your bank.', 'प्रक्रिया में कितना समय लगता है?', 'आपके बैंक को सहमति पत्र जमा करने के बाद सीडिंग प्रक्रिया में आमतौर पर 1-2 कार्य दिवस लगते हैं।');