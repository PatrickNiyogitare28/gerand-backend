import * as mongoose  from 'mongoose';

export const labelSchema = new mongoose.Schema({
    labelName: {
        type: String,
        required: true
    },
    projectId: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: String,
        required: true
    }
});

export interface Label extends mongoose.Document {
  id: string,
  labelName: string,
  createdOn: Date,
  createdBy: string
}