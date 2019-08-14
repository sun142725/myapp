function return7000(res, err){
    console.log('sql语句出错', err)
    return res.status(500).json({
        code: '700000',
        body: null,
        describe: ERROR_CODE['700000'],
    })
}
module.exports = {
    return7000
}