const checkTypes = {
    phone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    email: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
    chinese: /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g,
    allSpace: /^[ ]*$/ // 全是空格
};

export default class Func {
    /**
     * 保留两位小数
     * @param data
     * @returns {*|string}
     */
    static percent(data) {
        if (data != null) {
            return data.toFixed(2);
        }
        return 0;
    }

    /**
     * 邮箱
     * @param s
     * @returns {boolean}
     */
    static isEmail = (s) => {
        return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
    };

    /**
     * 获取cookie中制定的值
     * @param name
     * @returns {string}
     */
    static getCookie(name) {
        // 获取cookie字符串
        const strCookie = document.cookie;
        // 分割
        const arrCookie = strCookie.split('; ');
        // 遍历匹配
        for (let i = 0; i < arrCookie.length; i += 1) {
            const arr = arrCookie[i].split('=');
            if (arr[0] === name) {
                return arr[1];
            }
        }
        return '';
    }

    /**
     * 判断是否是obejct
     * @param object
     * @returns {boolean}
     */
    static isObject(object) {
        return Object.prototype.toString.call(object) === '[object Object]';
    }

    /**
     * 将web样式转换为小程序的样式
     * @param object
     * @returns { string }
     */
    static getStyles(styles) {
        const isObject = this.isObject(styles);
        if (isObject) {
            let list = [];
            Object.keys(styles).forEach((key) => {
                let value = styles[key];
                if (
                    Object.prototype.toString.call(value) === '[object String]' &&
                    value.indexOf('px') > -1
                ) {
                    value = value.replaceAll('px', 'rpx');
                }
                let style = `${key}: ${value}`;
                list.push(style);
            });
            return list.join(';');
        }
        return '';
    }

    /**
     * 防抖
     * @param {*} fn
     * @param {*} time
     * @returns
     */
    static debounce(fn, time) {
        let t = null;
        return function (e) {
            if (t) {
                clearTimeout(t);
            }
            t = setTimeout(function () {
                fn(e);
            }, time);
        };
    }

    /**
     * 正则校验
     * @param {*} type
     * @param {*} str
     * @returns
     */
    static checkRegStr(type, str) {
        return {
            isTelephone
        };
        return checkTypes[type].test(str);

    }
}
