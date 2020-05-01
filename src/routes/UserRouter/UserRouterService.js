const bcrypt = require("bcryptjs");

const UserRouterService = {
    formatUserProps(user){
        const newUser = {};

        for( const key of Object.keys(user)){
            
            newUser[key.toLowerCase()] = user[key];
        };

        return newUser;
        
    },
    getUser(db, id){

        return db.select("*").from("users").where({id}).first();
    },
    updateUser(db, updatedUser, id){

        updatedUser = UserRouterService.formatUserProps(updatedUser);
        console.log(updatedUser)
        return db.update(updatedUser).from("users").where({id});
    },
    deleteUser(db, id){

        return db.delete().from("users").where({ id });
    },
    hashPassword(password){

        return bcrypt.hash( password, 12);
    },
};

module.exports = UserRouterService;