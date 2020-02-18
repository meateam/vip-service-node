import * as mongoose from 'mongoose';
import { IVIP } from './vip.interface';

export interface IVIPModel extends mongoose.Document, IVIP { }

export const vipSchema: mongoose.Schema = new mongoose.Schema(
    {
        vipID: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const vipModel: mongoose.Model<IVIP> = mongoose.model<IVIPModel>('VIP', vipSchema);
