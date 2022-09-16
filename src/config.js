const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const SECRET = process.env.SECRET;
const port = process.env.PORT;
const URI = process.env.MONGODB_URI;

module.exports = {
    SECRET,
    port,
    URI
}
