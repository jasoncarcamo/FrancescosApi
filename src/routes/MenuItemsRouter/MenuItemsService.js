function lowerCaseKeys(obj){
    let newObj = {};

    for(const [key, value] of Object.entries(obj)){
        newObj[key.toLowerCase()] = obj[key];
    };

    return newObj;
}

const MenuItemsService = {
    formatItems(items){
        let newItems = [];
        for( let i = 0; i < items.length; i++){
            newItems[i] = {};
            
            newItems[i].id = items[i].id;
            newItems[i].category = items[i].category;
            newItems[i].title = items[i].title;
            newItems[i].description = items[i].description;
            newItems[i].sizeReg = items[i].sizereg
            newItems[i].sizeSmall = items[i].sizesmall;
            newItems[i].priceReg = items[i].pricereg;
            newItems[i].priceSmall = items[i].pricesmall;
            newItems[i].ingredients = items[i].ingredients;
        };

        return newItems;
    },
    getItems(db){

        return db.select("*").from("menuitems");
    },
    getItem(db, id){

        return db.select("*").from("menuitems").where({ id }).first();
    },
    createItem(db, newItem){

        return db.insert(newItem).into("menuitems").returning("*").then( ([item]) => item);
    },
    updateItem(db, updatedItem, id){

        return db.update(updatedItem).from("menuitems").where({ id });
    },
    deleteItem(db, id){

        return db.delete().from("menuitems").where({ id });
    }
};

module.exports = MenuItemsService;