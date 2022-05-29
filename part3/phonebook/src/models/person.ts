import {connect, model, Schema} from 'mongoose';
// .env
import {MONGODB_URI} from "../utils/config";
// connect
console.log(`🪝 Connecting to MongoDB...${MONGODB_URI}`);
if (MONGODB_URI) {
    connect(MONGODB_URI)
        .then(() => console.log('📬 Successfully Connected to MongoDB'))
        .catch(err => console.log(err));
} else {
    throw 'MongoDB Uri undefined';
}

// Model
interface PhoneBookType {
    name: string,
    number: string,
    id?: string
}

interface PhoneBookTypeInMongoDB {
    name: string,
    number: string,
    _id?: string,
    __v?: string,
    id?: string
}

// 2. Create a Schema corresponding to the document interface.
const personSchema = new Schema<PhoneBookType>({
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
            validator: function(v:string) {
                return /(?=^.{8,}$)^\d{2,3}-\d{4,}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    }
}, {collection: 'people'});

personSchema.set('toJSON', {
    transform: (_, returnedObject: PhoneBookTypeInMongoDB) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
// 3. Create a Model.
const People = model<PhoneBookType>('People', personSchema);
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

export default People;
