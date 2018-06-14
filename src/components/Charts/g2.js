// 全局 G2 设置
import { track, setTheme } from 'bizcharts';

track(false);
//test
const config = {
  defaultColor: '#1089ff',
  shape: {
    interval: {
      fillOpacity: 0.5,
    },
  },
};

setTheme(config);
