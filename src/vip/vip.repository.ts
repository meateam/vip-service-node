import { IVIP } from './vip.interface';
import * as express from 'express';
import { vipModel } from './vip.model';

export class VIPRepository {

    public static async create(req: any, res: express.Response): Promise<void> {
        let result;
        try {
            const myVIP: Partial<IVIP> = { vipID: req.body.vipID };
            const newVip: IVIP = await vipModel.create(myVIP);
            result = { code: 200, vip: newVip };
            res.send(result);
        } catch (err) {
            console.log('error while create!');
            console.log(err);
            result = { code: 500, error: err.message };
            res.send(result);
        }
    }

    public static async getByVipID(req: any, res: express.Response): Promise<void> {
        let result;
        try {
            const myVip = await vipModel.findOne({ vipID: req.params.vipID }).exec();
            result = { code: 200, vip: myVip ? true : false };
            res.send(result);
        } catch (err) {
            console.log('error while getByVipID!');
            console.log(err);
            result = { code: 500, error: err.message };
            res.send(result);
        }
    }

    public static async removeVip(req: any, res: express.Response): Promise<void> {
        let result;
        try {
            const deletedRes = await vipModel.deleteMany({ vipID: req.params.vipID });
            result = { code: 200, result: deletedRes };
            res.send(result);
        } catch (err) {
            console.log('error while removeVip!');
            console.log(err);
            result = { code: 500, error: err.message };
            res.send(result);
        }
    }
}
