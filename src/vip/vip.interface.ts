import { Document } from 'mongoose';

export interface IVIP extends Document {
    vipID: string;
    createdAt?: Date;
    updatedAt?: Date;
}
