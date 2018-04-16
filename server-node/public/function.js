function resfn(code, data, msg, page={}) {
    return {
        'code': code || 0,
        'data': data || {},
        'msg': msg,
        'pageInfo': {
            'curPage': page.cur || 1,
            'TotalPage': page.total || 1,
            'pageSize': page.size || 15
        }
    }
}
module.exports = resfn