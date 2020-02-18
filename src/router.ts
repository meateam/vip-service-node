import * as express from 'express';
import { VIPRepository } from './vip/vip.repository';
export let myRouter: express.Router = express.Router();

myRouter.get('/:vipID', VIPRepository.getByVipID);
myRouter.delete('/:vipID', VIPRepository.removeVip);
myRouter.post('/', VIPRepository.create);
