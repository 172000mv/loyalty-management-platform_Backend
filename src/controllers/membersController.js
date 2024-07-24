const supabase = require('../utils/supabaseClient');
const logger = require('../middlewares/logger');

exports.addMembers = async (req, res) => {
  logger(req, res, () => {}); 
  const { memberId,name, email, points , userId} = req.body;
  
  const { data, error } = await supabase
    .from('members')
    .insert([{ memberId,name, email, points , userId }]);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Member Added successfully' });
};


exports.getMembers = async (req, res) => {
  logger(req, res, () => {});

  try {
    const { userId } = req.query; // Get user ID from query parameters

    const { data, error } = await supabase
      .from('members')
      .select('*')
      .eq('userId', userId); // Filter by user ID

    if (error) {
      throw error;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching members:', error.message);
    res.status(400).json({ error: error.message });
  }
};
