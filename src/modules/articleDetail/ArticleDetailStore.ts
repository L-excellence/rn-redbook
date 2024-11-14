import {observable} from 'mobx';
import {request} from '../../utils/request';
import Loading from '../../components/widget/Loading';

export default class ArticleDetailStore {
  @observable detail: Article = {} as Article;

  requestArticleDetail = async (id: string) => {
    // 显示转圈 loading（Android 和 iOS 通用）
    Loading.show();
    try {
      const params = {
        id,
      };
      const {data} = await request('articleDetail', params);
      console.log('detail: ', data);
      this.detail = data || {};
    } catch (error) {
      console.log(error);
    } finally {
      Loading.hide();
    }
  };
}
