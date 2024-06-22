/*
  ./backend/config/errorHandler.js
*/

module.exports = (err, req, res, next) => {
  console.error(err);
  return res.status(500).json({ error: "Une erreur est survenue" });
};
