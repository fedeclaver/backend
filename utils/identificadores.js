
const generarId = (info) => {
//module.exports = function generarId(info) {
    let extraInfo = 'no-info'
    if (info) {
        extraInfo = info
    }
    return `${Date.now()}-${extraInfo}`
}

module.exports = {generarId}