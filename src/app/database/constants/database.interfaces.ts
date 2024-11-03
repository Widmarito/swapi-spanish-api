// import { Document, Schema } from 'mongoose';
// import { RecordStatusEnum } from './interfaces/record-status';

// export interface BaseDocument extends Document {
//   _id: Schema.Types.ObjectId | string;
//   recordStatus: 'ACTIVE' | 'INACTIVE' | 'DELETED';
//   createdAt: Date;
//   updatedAt: Date;
// }

// export const baseSchema = {
//   company: {
//     type: String,
//     required: false,
//     default: 'Peru Mer',
//   },
//   recordStatus: {
//     type: String,
//     enum: RecordStatusEnum,
//     required: true,
//     default: RecordStatusEnum.ACTIVE,
//   },
// };
