import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        
    },
    lastname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date(),
    },
    accountType: {
        type: String,
        required: true
    },
    accountStatus: {
        type: Number,
        default: 0
    }
})

export interface User extends mongoose.Document{
    id: string,
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    createdDate: Date,
    accountType: string,
    accountStatus: number,

}
