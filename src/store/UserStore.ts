import {flow} from 'mobx';
import {request} from '../utils/request';
import {save} from '../utils/Storage';

class UserStore {
  userInfo: any;

  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    callback?: (success: boolean) => void,
  ) {
    try {
      const params = {
        name: phone,
        pwd,
      };
      const {data} = yield request('login', params);
      if (data) {
        save('userInfo', JSON.stringify(data));
        this.userInfo = data;
        callback?.(true);
      } else {
        this.userInfo = null;
        callback?.(false);
      }
    } catch {
      this.userInfo = null;
      callback?.(false);
    }
  });
}

// ESModule 单例导出
export default new UserStore();
