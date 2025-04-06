const my = require('../models/my');

module.exports.findMy = async (id) => {
    const myData = await my.findById(id);
    return myData;
}

// 新增
module.exports.createMy = async (data) => {
    const myData = await my.create(data);
    return myData;
}

module.exports.updateMy = async (id, data) => {
    const myData = await my.findByIdAndUpdate(id, data, { new: true });
    return myData;
}

module.exports.deleteMy = async (id) => {
    const myData = await my.findByIdAndDelete(id);
    return myData;
}