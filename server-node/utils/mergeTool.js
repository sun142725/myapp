let mergeTool = {
    merge: function (source, dest) {
        let merged = {};
        for (let p in dest) {
            merged[p] = dest[p];
        }
        for (let p in source) {
            merged[p] = source[p];
        }
        return merged;
    },
    ensureArray: function (arrayLike) {
        if (this.isArray(arrayLike)) {
            return arrayLike;
        } else {
            return [arrayLike];
        }
    },
    isArray: function (obj) {
        return '[object Array]' === Object.prototype.toString.call(obj);
    },
    isObject: function (obj) {
        return '[object Object]' === Object.prototype.toString.call(obj);
    },
    isFunction: function (obj) {
        return '[object Function]' === Object.prototype.toString.call(obj);
    }
};

module.exports = mergeTool;