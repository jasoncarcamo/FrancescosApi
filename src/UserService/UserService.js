const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../../config");

const UserService = {
    getUser( db, email){

        return db.select("*").from("users").where({ email }).first();
    },
    createUser( db, user){

        return db.insert(user).into("users").returning("*").then( ([user]) => user);
    },
    updateUser( db, updatedUser, id){

        return db.update(updatedUser).from("users").where({ id });
    },
    deleteUser( db, id){

        return db.delete().from("users").where({ id });
    },
    hashPassword(password){

        return bcrypt.hash( password, 12);
    },
    comparePassword(password, dbPassword){

        return bcrypt.compare( password, dbPassword);
    },
    createToken( subject, payload){

        return jwt.sign( payload, JWT_SECRET, {
            subject,
            algorithm: "HS256"
        });
    }
};

module.exports = UserService;