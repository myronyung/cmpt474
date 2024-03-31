const handleError = (error, res, defaultMessage) => {
    console.error(error);
    if (error.errorCode == 404) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(defaultMessage);
    }
};
  
module.exports = handleError;