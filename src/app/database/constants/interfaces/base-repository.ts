// import { ClientSession } from 'mongoose';
// import { MongoId } from 'src/modules/common/interfaces/types';
// import { GetOneQueryDto, GetQueryDto } from 'src/modules/common/dto';

// export interface BaseRepository<T> {
//   find(getQueryDto: GetQueryDto): Promise<Partial<T>[]>;
//   findOne(query: GetOneQueryDto): Promise<T>;
//   findById(id: MongoId): Promise<T>;
//   create(body: Partial<T>, session?: ClientSession): Promise<T>;
//   update(id: MongoId, body: Partial<T>, session?: ClientSession): Promise<T>;
//   createMany(body: Partial<T>[], session?: ClientSession): Promise<T[]>;
//   softDeleteById(id: MongoId): Promise<T>;
//   remove(id: MongoId, session?: ClientSession): Promise<T>;
// }
