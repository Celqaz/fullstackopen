import {connect, model, Schema} from 'mongoose';

// connect
async function connectMongo() {
    // 4. Connect to MongoDB
    console.log('🪝 Connecting to MongoDB...');
    const url =
        `mongodb://blog_admin:b.YR1202@blog-shard-00-00.uucp7.mongodb.net:27017,blog-shard-00-01.uucp7.mongodb.net:27017,blog-shard-00-02.uucp7.mongodb.net:27017/PhoneBooks?&ssl=true&replicaSet=atlas-up1wck-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await connect(url)
        .then(() => console.log('📬 Successfully Connected to MongoDB'))
        .catch(err => console.log(err));
}

connectMongo().catch(err => console.log(err));

interface PhoneBookType {
    name: string,
    number: string
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
