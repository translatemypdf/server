const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);

module.exports = {
  hash(password) {
    return bcrypt.hashSync(password, salt);
  },
  compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}