import {Address, formatAddress, formatAddressByType} from '@dtop/dtop-web-common';

export default {
  address: Address.value,
  inOrderType: {
    0: {'title': '所有', state: null, num: 0},
    1: {'title': '待确认', state: '0', num: 0},
    2: {'title': '待审单', state: '1', num: 0},
    3: {'title': '待收货', state: '2', num: 0},
    4: {'title': '待验收', state: '3', num: 0},
    5: {'title': '订单挂起', state: '14', num: 0},
    6: {'title': '收货验收完成', state: '4', num: 0},
    7: {'title': '已取消', state: '7', num: 0},
    8: {'title': '拒收待复核', state: '11', num: 0},
    9: {'title': '拒收已复核', state: '12', num: 0},
    10: {'title': '已拒收', state: '8', num: 0},
    11: {'title': '异常', state: '6', num: 0}
  },
  inOrderLink: {
    1: {'title': '订单确认', state: '0', num: 0},
    2: {'title': '审单', state: '1', num: 0},
    3: {'title': '收货', state: '2', num: 0},
    4: {'title': '验收', state: '3', num: 0},
    5: {'title': '订单挂起', state: '14', num: 0},
    6: {'title': '已完成', state: '4', num: 0},
    7: {'title': '已取消', state: '7', num: 0},
    8: {'title': '拒收待复核', state: '11', num: 0},
    9: {'title': '拒收已复核', state: '12', num: 0},
    10: {'title': '已拒收', state: '8', num: 0},
    11: {'title': '异常', state: '6', num: 0}
  },
  outOrderType: {
    0: {'title': '所有', state: null},
    1: {'title': '待确认', state: '0'},
    2: {'title': '待下架', state: '1'},
    3: {'title': '待打包', state: '2'},
    4: {'title': '待打出库单', state: '3'},
    5: {'title': '待出库', state: '4'},
    6: {'title': '待运输', state: '5'},
    7: {'title': '待签收', state: '9'},
    8: {'title': '已完成', state: '6'},
    9: {'title': '已取消', state: '7'},
    10: {'title': '异常', state: '10'}
  },
  outOrderLink: {
    1: {'title': '订单确认', state: '0'},
    2: {'title': '货品下架', state: '1'},
    3: {'title': '货品打包', state: '2'},
    4: {'title': '生成出库单', state: '3'},
    5: {'title': '出库', state: '4'},
    6: {'title': '运输途中', state: '5'},
    7: {'title': '签收', state: '9'},
    8: {'title': '已完成', state: '6'},
    9: {'title': '已取消', state: '7'},
    10: {'title': '异常', state: '10'}
  },
  uploadStatus: {
    '0': {title: '正在解析中', type: 'success'},
    '2': {title: '异常', type: 'danger'},
    '3': {title: '批号不正确', type: 'danger'},
    '4': {title: '文件格式不匹配', type: 'danger'}
  },
  packageType: [
    '第一级包装', '第二级包装', '第三级包装', '第四级包装',
    '第五级包装', '第六级包装', '第七级包装', '第八级包装', '第九级包装', '第十级包装'
  ],
  /**
   * 格式化地址，已省/市/区显示
   * @param province
   * @param city
   * @param region
   * @returns {string}
   */
  formatAddress,
  formatAddressByType,
  formatLabelByAddress(type, province, city, region) {
    return formatAddressByType(province, city, region, 'label');
  },
  /**
   * 实时动态强制更改用户录入
   * @param th
   */
  format2DecimalPoint(val) {
    let th = val.toString();
    const regStrs = [
      ['^0(\\d+)$', '$1'], // 禁止录入整数部分两位以上，但首位为0
      ['[^\\d\\.]+$', ''], // 禁止录入任何非数字和点
      ['\\.(\\d?)\\.+', '.$1'], // 禁止录入两个以上的点
      ['^(\\d+\\.\\d{2}).+', '$1'] // 禁止录入小数点后两位以上
    ];
    for (let i = 0; i < regStrs.length; i++) {
      let reg = new RegExp(regStrs[i][0]);
      th = th.replace(reg, regStrs[i][1]);
    }
    th = parseFloat(th);
    if (isNaN(th)) {
      th = '';
    }
    return th;
  },
  /**
   * 录入完成后，输入模式失去焦点后对录入进行判断并强制更改，并对小数点进行0补全
   * @param th
   */
  autoCompleteDecimalPoint: function (val) {
    if (!val) {
      return 0;
    }
    let v = val.toString();
    v = v.replace(/[^0-9\.]*/g, '');
    if (v === '') {
      v = '0.00';
    } else if (v === '0') {
      v = '0.00';
    } else if (v === '0.') {
      v = '0.00';
    } else if (/^0+\d+\.?\d*.*$/.test(v)) {
      v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
    } else if (/^0\.\d$/.test(v)) {
      v = v + '0';
    } else if (!/^\d+\.\d{2}$/.test(v)) {
      if (/^\d+\.\d{2}.+/.test(v)) {
        v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
      } else if (/^\d+$/.test(v)) {
        v = v + '.00';
      } else if (/^\d+\.$/.test(v)) {
        v = v + '00';
      } else if (/^\d+\.\d$/.test(v)) {
        v = v + '0';
      } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {
        v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
      } else if (/\d+/.test(v)) {
        v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
      } else if (/^0+\d+\.?\d*$/.test(v)) {
        v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
      } else {
        v = '0.00';
      }
    }
    return parseFloat(v);
  },
  /**
   * 录入完成后，输入模式失去焦点后对录入进行判断并强制更改，并对小数点进行0补全
   * @param th
   */
  autoformatDecimalPoint: function (v) {
    v = v.replace(/[^0-9\.]*/g, '');
    if (v === '') {
      v = '0.00';
    } else if (v === '0') {
      v = '0.00';
    } else if (v === '0.') {
      v = '0.00';
    } else if (/^0+\d+\.?\d*.*$/.test(v)) {
      v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
    } else if (/^0\.\d$/.test(v)) {
      v = v + '0';
    } else if (!/^\d+\.\d{2}$/.test(v)) {
      if (/^\d+\.\d{2}.+/.test(v)) {
        v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
      } else if (/^\d+$/.test(v)) {
        v = v + '.00';
      } else if (/^\d+\.$/.test(v)) {
        v = v + '00';
      } else if (/^\d+\.\d$/.test(v)) {
        v = v + '0';
      } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {
        v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
      } else if (/\d+/.test(v)) {
        v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
      } else if (/^0+\d+\.?\d*$/.test(v)) {
        v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
      } else {
        v = '0.00';
      }
    }
    return v;
  },
  toDecimal2: function (x) {
    return Math.floor(x * 1000 + 1) / 1000;
  },
  hasClass: function (elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false;
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
  },
  addClass: function (elem, cls) {
    if (!this.hasClass(elem, cls)) {
      elem.className = elem.className === '' ? cls : elem.className + ' ' + cls;
    }
  },
  removeClass: function (elem, cls) {
    if (this.hasClass(elem, cls)) {
      let newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ');
      }
      elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
  },
  download(src, fileName) {
    let $a = document.createElement('a');
    $a.setAttribute('href', src);
    $a.setAttribute('download', fileName);
    let fileLink = document.createElement('span');
    fileLink.setAttribute('style', 'cursor: pointer; -webkit-tap-highlight-color: transparent');
    $a.appendChild(fileLink);
    let body = document.getElementsByTagName('body')[0];
    body.appendChild($a);
    fileLink.click();
    body.removeChild($a);
  },
  getPathId(path) {
    if (/id$/.test(path)) return '';
    let reg = /\/(\w+?)$/.exec(path);
    if (!reg) return '';
    return reg[1];
  },
  getPos(e) { // 这是一个 获取鼠标位置的函数
    let oEvent = e || event;
    return {
      x: oEvent.clientX + document.documentElement.scrollLeft || document.body.scrollLeft,
      y: oEvent.clientY + document.documentElement.scrollTop || document.body.scrollTop
    };
  },
  /**
   * 得到附件类型 1 图片 0 非图片
   * @returns {string}
   */
  getType(attachmentStoragePath) {
    let type = '';
    let url = attachmentStoragePath;
    let images = ['jpg', 'png', 'gif', 'jpeg'];
    let docs = ['txt', 'doc', 'docx', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx'];
    if (url) {
      type = url.substring(url.lastIndexOf('.'));
    }
    if (type) {
      type = type.substring(1).toLowerCase();
    }
    if (docs.indexOf(type) !== -1) {
      type = 0;
    } else if (images.indexOf(type) !== -1) {
      type = 1;
    }
    return type;
  },
  /**
   * 深拷贝
   * @param {*} obj
   * @return {obj}
   */
  deepClone: function (obj) {

    return JSON.parse(JSON.stringify(obj));
  },
  /**
   * 判断是否字符串
   * @param {*} val
   * @return {Boolean} */
  isString(val) {
    return typeof val === 'string';
  },
  /**
   * 合并对像并限定在前一个对像范围 浅拷贝覆盖
   * @param {Object} objA
   * @param {Object} objB
   * @return {Object}*/
  assign(objA, ...objB) {
    let tempObj = Object.assign({}, ...objB);
    let reTurnObj = {};
    let bKeys = Object.keys(tempObj);
    Object.keys(objA).forEach(item => {
      if (bKeys.indexOf(item) !== -1) {
        reTurnObj[item] = tempObj[item];
      } else {
        reTurnObj[item] = objA[item];
      }
    });
    return reTurnObj;
  }
};

// 深拷贝
export const deepCopy = function (source) {
  if (!source) {
    return source;
  }
  let sourceCopy = source instanceof Array ? [] : {};
  for (let item in source) {
    if (source.hasOwnProperty(item)) {
      sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item];
    }
  }
  return sourceCopy;
};
