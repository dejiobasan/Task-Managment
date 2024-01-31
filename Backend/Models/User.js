const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema ({
    Username: {type: String, required: true, unique: true, trim: true, minlength: 5},
    Password: {type: String, required: true, unique: true}
},
{
    timestamps: true
});

const User = new mongoose.model("User", UsersSchema);

module.exports = User;