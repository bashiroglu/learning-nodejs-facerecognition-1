const handleProfileRequest = (req, res, db) => {
  const { id } = req.params;
  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json('could not found');
      }
    })
    // .catch(err => res.status(400))
    // .json('error getting user');
    .catch(err => res.status(400).json('error getting user'));
};
module.exports = {
  handleProfileRequest: handleProfileRequest
};
