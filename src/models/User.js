const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        // required: true,
        // trim: true,
        // unique: true
    },
    email: {
        type: String,
        // required: true,
        // trim: true,
        // unique: true
    },
    password: {
        type: String,
        // required: true,
        // trim: true
    }
});

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};


module.exports = model('User', UserSchema);
