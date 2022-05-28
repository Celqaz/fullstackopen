import {connect, model, Schema,connection} from 'mongoose';

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

// 1. Create an interface representing a document in MongoDB.
interface PhoneBookType {
    name: string,
    number: string
}

// 2. Create a Schema corresponding to the document interface.
const personSchema = new Schema<PhoneBookType>({
    name: String,
    number: String
}, {collection: 'people'});

// 3. Create a Model.
const Person = model<PhoneBookType>('PhoneBook', personSchema);

async function connectMongo() {
    // 4. Connect to MongoDB
    const url =
        `mongodb://blog_admin:${password}@blog-shard-00-00.uucp7.mongodb.net:27017,blog-shard-00-01.uucp7.mongodb.net:27017,blog-shard-00-02.uucp7.mongodb.net:27017/PhoneBooks?&ssl=true&replicaSet=atlas-up1wck-shard-0&authSource=admin&retryWrites=true&w=majority`;
    await connect(url);
}

async function queryMongo() {
    if (process.argv[3]) {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4],
        });
        await person.save()
            .then(() =>
                console.log(person.name)
            );

    } else {
        await Person.find({})
            .then(res => {
                res.forEach( person =>{
                    console.log(person);
                });
            });
    }

}

connectMongo().then(async () => {
        await queryMongo();
        await connection.close();
    }
//     const user = new PhoneBook({
//         name: process.argv[3],
//         number: process.argv[4],
//     });
//     await user.save();
//     console.log(user.name);
).catch(err => console.log(err));
