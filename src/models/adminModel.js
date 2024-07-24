const supabase = require('../utils/supabaseClient');

async function createAdmin(admin) {
    const { data, error } = await supabase.from('admins').insert([admin]);
    return { data, error };
}

async function getAdminByEmail(email) {
    const { data, error } = await supabase.from('admins').select('*').eq('email', email).single();
    return { data, error };
}

module.exports = { createAdmin, getAdminByEmail };
