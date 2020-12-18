import * as mongoose from 'mongoose';

export const ListSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true,
        unique: true
    },
    projectId: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

export interface List extends mongoose.Document{
    id: string,
    listName: string,
    projectId: string,
    createdBy: string,
    createdOn: Date
}