import mongoose, {Schema} from "mongoose";

export interface IUser extends mongoose.Document {
    clerkId: string;
    email: string;
    userName: string;
    photo?: string;
    firstName?: string;
    lastName?: string;
    planId: string;
    creditBalance: number;
}

const userSchema = new Schema({
    clerkId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    userName: {type: String, required: true, unique: true},
    photo: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    planId: {type: String, default: 1},
    creditBalance: {type: Number, default: 10},
});

const user = mongoose.model("User", userSchema);

export default user;