import * as mongoose  from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: new Date(),
    },
    projectType: {
        type: String,
        required: true,
        default: 'PUBLIC'
    },
    users: {
        type: Array,
    }
});

export interface Project extends mongoose.Document{
    id: string,
    projectName: string,
    owner: string,
    createdDate: Date,
    projectType: string,
    users: []
}