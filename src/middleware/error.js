const error = async (err, req, res, next) => {
  if (!err) {
    res.status(500).send("From Exception handler: " + err.message);
  } else next();
};

module.exports = error;
