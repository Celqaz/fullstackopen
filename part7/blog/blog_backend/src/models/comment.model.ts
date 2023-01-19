import {model, Schema, Types} from 'mongoose'
import uniqueValidator from "mongoose-unique-validator";
export interface CommentType {
    id: string,
    content: string,
    blog: Types.ObjectId | string,
    user: Types.ObjectId | string,
}

const commentSchema = new Schema<CommentType>({
    id: String,
    content: {
        type: String,
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'BlogModel'
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    },
},{collection:'comments'})

// use the plugin
commentSchema.plugin(uniqueValidator)

commentSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const CommentModel = model<CommentType>('CommentModel', commentSchema);

export default CommentModel;
