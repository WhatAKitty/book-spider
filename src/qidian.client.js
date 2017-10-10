
import Rest from 'react-rest-kit';
import { config } from './config';

const rest = new Rest({
  contentType: 'application/json',
  dataType: 'json',
});

// 需要根据设备ID进行改造
// 之后计划将两者ID在设备中创建并传递给服务端进行转发请求
const machineid = '1bc908e0c5c890a263748aaaedd30a9a';
const machine__ = '4b841f8d-ad56-4bf8-ba6f-4fd47c502fb2';

const createHeader = ({
  size = '4.7.0',
  width = 750,
  height = 1334,
  type = 'AppStore',
  osversion = '10.30',
  device = 'iOS/iPhone/iPhone8,1',
  token = '1507347832421',
}) => {
  return new Buffer(`${machineid}|${size}|${width}|${height}|${type}|${osversion}|5|${device}|199|${type}|3|-999|${token}|0|${machine__}`).toString('base64');
}

let qdheader = createHeader({ token: Math.floor(Math.random() * 100000000000) });

const Qidian = {
  async recommends() {
    const { data, err } = await rest.GET(config.urls.recommend, {
      rCount: 4,
      rdm: 1507298003,
      sId: 0,
    });

    if (err) {
      // 返回错误
      return { err };
    }

    if (data.Result !== 0) {
      // 起点返回错误
      return { err: data.Message };
    }

    return {
      data: {
        CoverList: data.CoverList,
        Group: data.Group,
      }
    };
  },
  async searchBooks(params = {}) {
    const { channel = -1, firstEntry = 1, order = -1, pageIndex = 1, size = -1 } = params;
    const { data, err } = await rest.GET(config.urls.search, {
      action: -1,
      channel,
      firstEntry,
      order,
      p: 'all',
      pageIndex,
      size,
      type: 0,
      update: -1,
      vipBoutiqueSignstatus: '-1a-1a-1',
    });

    if (err) {
      // 返回错误
      return { err };
    }

    if (data.Result !== 0) {
      // 起点返回错误
      return { err: data.Message };
    }

    return { data: data.Data };
  },
  async bookInfo(params = {}) {
    const { bookId, iosDeviceType = 0 } = params;
    const { data, err } = await rest.GET(config.urls.info, {
      BookId: bookId,
      iosDeviceType,
      isOutBook: 0,
      preview: 0,
    }, {
        headers: {
          'qdheader': qdheader,
        },
      });

    if (err) {
      // 返回错误
      return { err };
    }

    if (data.Result !== 0) {
      // 起点返回错误
      return { err: data.Message };
    }

    return { data: data.Data };
  },
  async chapters(params = {}) {
    const { bookId, pageIndex = -1 } = params;
    const { data, err } = await rest.GET(config.urls.chapters, {
      bookId,
      pageIndex,
      requestSource: 0,
      timeStamp: 0,
    }, {
        headers: {
          'qdheader': qdheader,
        },
      });

    if (err) {
      // 返回错误
      return { err };
    }

    if (data.Result !== 0) {
      // 起点返回错误
      return { err: data.Message };
    }

    return { data: data.Data };
  },
  async comments(params = {}) {
    const { bookId, pageIndex = 1 } = params;
    const { data, err } = await rest.GET(config.urls.comments, {
      ReviewType: 112,
      bookId,
      pageIndex,
    }, {
        headers: {
          'qdheader': qdheader,
        },
      });

    if (err) {
      // 返回错误
      return { err };
    }

    if (data.Result !== 0) {
      // 起点返回错误
      return { err: data.Message };
    }

    return { data: data.Data };
  },
}

export default Qidian;
