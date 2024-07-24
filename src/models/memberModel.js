const supabase = require('../utils/supabaseClient');

async function addNewMembers(member) {
    const { data, error } = await supabase.from('members').insert([member]);
    return { data, error };
}


module.exports = { addNewMembers };