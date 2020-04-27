const express = require("express");
const MenuItemsRouter = express.Router();
const MenuItemsService = require("./MenuItemsService");

MenuItemsRouter
    .route("/menuitems")
    .get((req, res)=> {
        MenuItemsService.getItems(req.app.get("db"))
            .then( menuItems => {
                
                return res.status(200).json(MenuItemsService.formatItems(menuItems));
            });
    })
    .post((req, res)=>{
        const {
            category,
            title,
            description,
            specialRequests,
            sizeReg,
            sizeSmall,
            priceReg,
            priceSmall,
            ingredients
        } = req.body;

        const newMenuItem = {
            category,
            title,
            description,
            specialrequests: specialRequests,
            sizereg: sizeReg,
            sizesmall: sizeSmall,
            pricereg: priceReg,
            pricesmall: priceSmall,
            ingredients 
        };

        for( const [key, value] of Object.entries(newMenuItem)){
            if(value === undefined){

                return res.status(400).json({
                    error: `Missing ${key} from body request`
                });
            };
        };

        MenuItemsService.createItem( req.app.get("db"), newMenuItem)
            .then( createdMenuItem => {

                return res.status(200).json({
                    createdMenuItem: {
                        category: createdMenuItem.category,
                        title: createdMenuItem.title,
                        description: createdMenuItem.description,
                        sizeReg: createdMenuItem.sizereg,
                        sizeSmall: createdMenuItem.sizesmall,
                        priceReg: createdMenuItem.pricereg,
                        priceSmall: createdMenuItem.pricesmall,
                        ingredients: createdMenuItem.ingredients
                    }
                });
            })
    })

module.exports = MenuItemsRouter;