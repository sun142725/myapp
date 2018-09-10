function resfn(code, body, describe, page={}) {
    return {
        'code': code || 0,
        'body': body || {},
        'describe': describe,
        'pageInfo': {
            'curPage': page.cur || 1,
            'TotalPage': page.total || 1,
            'pageSize': page.size || 15
        }
    }
}
module.exports = resfn