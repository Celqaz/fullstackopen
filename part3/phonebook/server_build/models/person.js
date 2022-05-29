"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// .env
const config_1 = require("../utils/config");
// connect
console.log('🪝 Connecting to MongoDB...');
if (config_1.MONGODB_URI) {
    (0, mongoose_1.connect)(config_1.MONGODB_URI)
        .then(() => console.log('📬 Successfully Connected to MongoDB'))
        .catch(err => console.log(err));
}
else {
    throw 'MongoDB Uri undefined';
}
// 2. Create a Schema corresponding to the document interface.
const personSchema = new mongoose_1.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: {
            validator: function (v) {
                return /(?=^.{8,}$)^\d{2,3}-\d{4,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    }
}, { collection: 'people' });
personSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
// 3. Create a Model.
const People = (0, mongoose_1.model)('People', personSchema);
//
// People.schema.path('number').validate((value: string) => {
//     return /\d{3}-\d{3}-\d{4}/.test(value);
// }, 'Invalid number');
// const opts = {runValidators: true};
// let error;
//
// try {
//     await People.findByIdAndUpdate({}, {number: 'not a number'}, opts);
// } catch (err) {
//     error = err;
//     assert.equal(error.errors['number'].message, 'Invalid number');
// }
exports.default = People;
