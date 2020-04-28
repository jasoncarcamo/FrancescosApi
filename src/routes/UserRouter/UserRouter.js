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
                        firstName: user.firstname,
                        lastName: user.lastname,
                        address: user.address,
                        city: user.city,
                        state: user.state,
                        zipCode: user.zipcode,
                        mobileNumber: user.mobilenumber,
                        email: user.email,
                        password: user.password,
                        points: user.points
                    }
                });
            });
    });

module.exports = UserRouter;