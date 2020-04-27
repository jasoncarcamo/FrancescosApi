const UserRouterService = {
    getUser(db, id){

        return db.select("*").from("users").where({id}).first();
    }
};

module.exports = UserRouterService;