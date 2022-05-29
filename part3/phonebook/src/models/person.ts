import {connect, model, Schema} from 'mongoose';
// .env
import {MONGODB_URI} from "../utils/config";
// connect
console.log('🪝 Connecting to MongoDB...');
if (MONGODB_URI) {
    connect(MONGODB_URI)
        .then(() => console.log('📬 Successfully Connected to MongoDB'))
        .catch(err => console.log(err));
}else {
    throw 'MongoDB Uri undefined';
}

// Model
interface PhoneBookType {
    name: string,
    number: string,
    id?:string
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
    name: String,
    number: String
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
export default People;
