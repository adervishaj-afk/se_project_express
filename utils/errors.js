const NotFoundError = res.status(404).send({ message: err.message });
const NotValidError = res.status(400).send({ message: err.message });
const InternalServerError = res.status(500).send({ message: err.message });

module.exports = (NotFoundError, NotValidError, InternalServerError)