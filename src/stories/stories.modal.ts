import * as mongoose from 'mongoose';
import {storyType} from '../utils/enums/storyType';

export const StorySchema = new mongoose.Schema({
   displayedId: {
       type: String,
       required: true,
       unique: true
    },
    projectId: {
        type: String,
        require: true
    },
    labelId: {
        type: String,
    },
    listId: {
        type: String
    },
    owner: {
        type: String
    },
    requester: {
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        default: new Date
    },
    dueDate: {
        type: Date,
        default: new Date
    },
    storyType: {
        type: storyType
    },
    pullRequestURL: {
        type: String
    },
    tasks: [],
    blockers: []
})

export interface Story extends mongoose.Model{
    _id: string,
    displayedId: string,
    projectId: string,
    labelId: string,
    listId: string,
    owner: string,
    requester: string,
    createdDate: Date,
    dueDate: Date,
    storyType: storyType,
    pullRequestURL: string,
    tesks: [],
    blocker: []

}