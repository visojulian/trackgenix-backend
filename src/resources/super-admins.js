const superAdmin = require('../data/super-admins.json');

const superAdminAlls = (req, res) => {
  res.status(200).json({ data: superAdmin });
};

export default superAdminAlls;
