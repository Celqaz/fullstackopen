"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}
const password = process.argv[2];
// 2. Create a Schema corresponding to the document interface.
const personSchema = new mongoose_1.Schema({
    name: String,
    number: String
}, { collection: 'people' });
// 3. Create a Model.
const Person = (0, mongoose_1.model)('PhoneBook', personSchema);
function connectMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        // 4. Connect to MongoDB
        const url = `mongodb://blog_admin:${password}@blog-shard-00-00.uucp7.mongodb.net:27017,blog-shard-00-01.uucp7.mongodb.net:27017,blog-shard-00-02.uucp7.mongodb.net:27017/PhoneBooks?&ssl=true&replicaSet=atlas-up1wck-shard-0&authSource=admin&retryWrites=true&w=majority`;
        yield (0, mongoose_1.connect)(url);
    });
}
function queryMongo() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.argv[3]) {
            const person = new Person({
                name: process.argv[3],
                number: process.argv[4],
            });
            yield person.save()
                .then(() => console.log(person.name));
        }
        else {
            yield Person.find({})
                .then(res => {
                res.forEach(person => {
                    console.log(person);
                });
            });
        }
    });
}
connectMongo().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield queryMongo();
    yield mongoose_1.connection.close();
})).catch(err => console.log(err));
