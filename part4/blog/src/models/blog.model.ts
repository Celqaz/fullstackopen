import {model, Schema, Types} from 'mongoose';

// Model
export interface BlogType {
    id?: string
    title: string,
    author: string,
    url: string,
    likes: number,
    user: Types.ObjectId,
}

interface BlogTypeInMongoDB {
    title: string,
    author: string,
    url: string,
    likes: number
    _id?: string,
    __v?: string,
    id?: string
}

// 2. Create a Schema corresponding to the document interface.
const blogSchema = new Schema<BlogType>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    id: {
        type: String,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserModel'
    }

    // author: {
    //     type: String,
    //     minLength: 8,
    //     required: true,
    //     validate: {
    //         validator: function(v:string) {
    //             return /(?=^.{8,}$)^\d{2,3}-\d{4,}/.test(v);
    //         },
    //         message: props => `${props.value} is not a valid phone number!`
    //     },
    // }
}, {collection: 'blog'});

blogSchema.set('toJSON', {
    transform: (_, returnedObject: BlogTypeInMongoDB) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
// 3. Create a Model.
const BlogModel = model<BlogType>('BlogModel', blogSchema);

export default BlogModel;
