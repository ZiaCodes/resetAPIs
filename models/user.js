const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


// user Schema 
const userSchema = mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required: true
    },
    email:{
        type : String,
        trim: true,
        unique: true,
        required: true
    },
    password:{
        type : String,
        required: true
    },
    isVerified:{
        type : Boolean,
        required: true,
        default: false
    }
})

// hashing password if modified
userSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password, 10);
    }

    next();
})

const User =new mongoose.model("User",userSchema);
module.exports = User