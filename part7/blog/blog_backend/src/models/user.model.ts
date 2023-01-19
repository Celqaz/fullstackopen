import {model, Schema, Types} from 'mongoose';
// unique in mongoose is NOT a validator
import uniqueValidator from 'mongoose-unique-validator'

// Model
export interface UserReturnedMongoType {
    id: string
    username: string,
    name: string,
    password: string,
    blogs: Types.ObjectId[],
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserReturnedMongoType>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
    },
    blogs: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogModel'
    }],
}, {collection: 'user'});

// use the plugin
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
// 3. Create a Model.
const UserModel = model<UserReturnedMongoType>('UserModel', userSchema);

export default UserModel;
