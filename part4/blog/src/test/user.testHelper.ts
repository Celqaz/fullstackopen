import UserModel, {UserReturnedMongoType} from "../models/user.model";



const usersInDB= async () => {
    const users : UserReturnedMongoType[]= await UserModel.find({})
    return users.map(user => user)
}

export default {usersInDB}
