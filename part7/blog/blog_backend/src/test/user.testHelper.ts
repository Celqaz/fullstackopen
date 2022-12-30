import UserModel from "../models/user.model";



const usersInDB= async () => {
    const users = await UserModel.find({})
    return users.map(user => user.toJSON())
}

export default {usersInDB}
