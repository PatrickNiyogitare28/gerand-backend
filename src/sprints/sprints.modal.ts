import *  as mongoose from 'mongoose';
import {sprintStatus} from '../utils/enums/sprintStatus';

export const SprintSchema = new mongoose.Schema({
    sprintName: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: null
    },
    status: {
      type: sprintStatus,
      default: sprintStatus.incoming
    },
    createdBy: {
        type: String,
        required: true
    }
})

export interface Sprint  extends mongoose.Document {
   _id: string,
   sprintName: string,
   projectId: string,
   createdAt: Date,
   startDate: Date,
   endDate: Date,
   status: sprintStatus,
   createdBy: string

}