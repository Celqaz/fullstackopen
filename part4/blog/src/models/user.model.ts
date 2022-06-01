import {model, Schema,Types} from 'mongoose';

// Model
interface userType {
    id: string
    username: string,
    name: string,
    password: string,
    blogs: Types.ObjectId,
}

interface userTypeInMongoDB {
    username: string,
    name: string,
    passwordHash: string,
    _id?: string,
    __v?: string,
    id?: string
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<userType>({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    blogs:{
        type:Schema.Types.ObjectId,
        ref:'blogs'
    }

}, {collection: 'user'});

userSchema.set('toJSON', {
    transform: (_, returnedObject: userTypeInMongoDB) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
// 3. Create a Model.
const UserModel = model<userType>('UserModel', userSchema);

export default UserModel;
