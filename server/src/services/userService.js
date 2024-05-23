const User = require("../models/User")
const bcrypt = require("bcrypt")

exports.register = (userData) => User.create(userData);

exports.login = async (userData) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error("Invalid email or password")
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        throw new Error("Invalid email or password")
    }

    

}