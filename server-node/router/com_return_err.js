const ERROR_CODE = require('../public/error-code')
/**
 * return7000
 * @param {*} res 用于回应
 * @param {*} err 报错信息
 */
function return7000(res, err){
    console.log('sql语句出错', err)
    return res.status(500).json({
        code: '700000',
        body: null,
        describe: ERROR_CODE['700000'],
    })
}
/**
 * 
 * @param {*} res 
 * @param {*} code 错误码
 */
function returnError(res, code){
    return res.status(200).json({
        code: code,
        body: null,
        describe: ERROR_CODE[code],
    })
}
function returnNull(data, res, key, rule = null){
    console.log('sql语句出错', err)
    if(!data[key]){
        return res.status(200).json({
            code: '',
            body: null,
            describe: key + '不能为空',
        })
    }
    if(rule != null){
        if(rule.test(data[key])){
            return res.status(200).json({
                code: code,
                body: null,
                describe: key + '不符合规则',
            })
        }
    }
}
module.exports = {
    return7000,
    returnError,
    returnNull
}