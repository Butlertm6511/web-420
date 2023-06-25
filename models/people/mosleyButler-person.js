const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Creates the roleSchema */

let roleSchema = new Schema({
    text: {type: string}
});

let dependentSchema = new Schema({
    firstName: {type:String},
    LastName: {type: String}
});

let personSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    role: [roleSchema],
    dependents:[dependentSchema],
    birthDate: {string}
})

module.exports = mongoose.model('Person', StudentSchema);