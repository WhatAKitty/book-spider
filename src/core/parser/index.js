
import BQGParser from './bqg.parser';
import YBDUParser from './ybdu.parser';

const bqgParser = new BQGParser();
const ybduParser = new YBDUParser();

export default (key) => {
  if (!key || key === bqgParser.getKey()) return bqgParser;
  else if (key === ybduParser.getKey()) return ybduParser;
  else throw `不存在名为${key}的图书解析器`;
}
