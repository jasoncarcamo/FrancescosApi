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
                        id: user.id,
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

UserRouter
    .route("/users/:id")
    .patch((req, res)=> {
        UserRouterService.getUser( req.app.get("db"), req.params.id)
            .then( dbUser => {

                if(!dbUser){

                    return res.status(404).json({
                        error: `User: ${req.params.id}  does not exist.`
                    });
                };

                if(req.body.password != ""){
                    console.log(true)
                    return UserRouterService.hashPassword(req.body.password)
                        .then( hashedPassword => {
                            req.body.password = hashedPassword;

                            UserRouterService.updateUser( req.app.get("db"), req.body, req.params.id)
                                .then( updatedUser => {

                                    return res.status(200).json({
                                        success: `User: ${req.params.id} has been updated.`
                                    });
                                });
                        })
                } else {
                    UserRouterService.updateUser( req.app.get("db"), req.body, req.params.id)
                        .then( updatedUser => {

                            return res.status(200).json({
                                success: `User: ${req.params.id} has been updated.`
                            });
                        });
                }

                
            });
    });

module.exports = UserRouter;