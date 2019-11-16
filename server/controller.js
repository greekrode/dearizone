const { MenuItem } = require('./models/menuItems');

// It reads all the items present in database
const fetchItems = async (req, reply) => {
    try {
        return await MenuItem.find()
    }
    catch (err) { console.log(err) }
}

// It adds an item to database
const addItem = async (req, reply) => {
    try {
        const NewItem = new MenuItem({ ...req.body });
        return NewItem.save()
    }
    catch (err) { console.log(err) }
}

// It updates the item present in database
const updateItem = async (req, reply) => {
    try {
        const { id } = req.params;
        const { item } = req.body;
        return await MenuItem.findOneAndUpdate({id}, item, {new: true});
    }
    catch (err) { console.log(err) }
}

// It removes item from database
const deleteItem = async (req, reply) => {
    try {
        return await MenuItem.findOneAndDelete(req.params.id);
    }
    catch (err) { console.log(err) }
}

module.exports = { fetchItems, addItem, updateItem, deleteItem };