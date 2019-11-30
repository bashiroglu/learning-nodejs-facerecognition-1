const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '51ae3a0efa294131bd5f6f2ff4e89456'
});
const handleApiCall = (req, res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      // URL
      req.body.input
    )
    .then(data => {
      res
        .json(data)
        .catch(err => res.status(400).json('cound not work with API'));
    });
};

const handleImageRequest = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entires'));
};
module.exports = {
  handleImageRequest,
  handleApiCall
};
