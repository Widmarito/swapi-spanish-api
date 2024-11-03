// import { MongoId } from 'src/modules/common/interfaces/types';
import { RecordStatusEnum } from './record-status';

export interface BaseDocument extends Document {
  _id: string;
  recordStatus: RecordStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}
