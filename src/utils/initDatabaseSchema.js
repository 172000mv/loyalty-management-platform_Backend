const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const initDb = async () => {
  try {
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    const schema = fs.readFileSync(schemaPath).toString();
    const statements = schema.split(';').filter(statement => statement.trim() !== '');

    for (const statement of statements) {
      const { error } = await supabase.from('*').rpc('pg_exec', { sql: statement.trim() });
      if (error) throw error;
    }
    
    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
};

initDb();
