const express = require("express");
const UserRouter = express.Router();
const UserRouterService = require("./UserRouterService");

UserRouter
    .route("/users")
    .get((req, res)=>{
        UserRouterService.getUser(req.app.get("db"), req.user.id)
            .then( user => {

                if(!user){

                    return res.status(404).json({
                        error: `User: ${req.user.id} does not exist`
                    });
                };

                return res.status(200).json({
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zipCode: user.zipCode,
                        mobileNumber: user.mobileNumber,
                        email: user.email,
                        password: user.password,
                        points: user.points
                    }
                });
            });
    });

module.exports = UserRouter;