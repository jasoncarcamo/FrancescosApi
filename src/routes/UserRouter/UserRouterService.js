const UserRouterService = {
    getUser(db, id){

        return db.select("*").from("users").where({id}).first();
    },
    updateUser(db, updatedUser, id){
        
        return db.update(updatedUser).from("users").where({id});
    },
    deleteUser(db, id){

        return db.delete().from("users").where({ id });
    }
};

module.exports = UserRouterService;