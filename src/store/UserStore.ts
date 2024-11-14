import {action, flow, observable} from 'mobx';
import {request} from '../utils/request';
import {save} from '../utils/Storage';
import Loading from '../components/widget/Loading';

class UserStore {
  @observable userInfo: any;

  @action
  setUserInfo = (info: any) => {
    this.userInfo = info;
  };

  requestLogin = flow(function* (
    this: UserStore,
    phone: string,
    pwd: string,
    callback?: (success: boolean) => void,
  ) {
    // 显示转圈 loading（Android 和 iOS 通用）
    Loading.show();
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
    } finally {
      Loading.hide();
    }
  });
}

// ESModule 单例导出
export default new UserStore();
