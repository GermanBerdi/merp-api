// Utils library

// constant API uses to verify certain states than can result from receive a critical
// TODO:
//      use this constant to verify the state of a character
const condition = {
    "none"        : "none",
    "muted"       : "muted",
    "immobilized" : "immobilized",
    "knockedDown" : "knocked down",
    "sleep"       : "sleep",
    "suffocated"  : "suffocated",
    "unconscious" : "unconscious",
    "dead"        : "dead"
}

async function checkExist(attribute, value, model)
{
    const query = {
        [attribute]: value
    };
    count = await model.countDocuments(query);
    return (count > 0)
}

async function checkId(id, model)
{
    return await model.findById(id);
}

async function findNumAttackTable(num, tableId, enduranceId, model)
{
    return await model.findOne ({$and: [{tableId: tableId}, {enduranceId: enduranceId}, {min: {$lte: num}}, {max: {$gte: num}}] });
}

async function findRangeAttackTable(min, max, enduranceId, tableId, model)
{
    return await model.findOne({$and: [{tableId:tableId}, {enduranceId: enduranceId}, {min:{$gte:min}}, {max:{$lte:max}}] });
}

async function findNumCriticalTable(num, tableId, model)
{
    return await model.findOne ({$and: [{tableId: tableId}, {min: {$lte: num}}, {max: {$gte: num}}] });
}

async function findRangeCriticalTable(min, max, tableId, model)
{
    return await model.findOne({$and: [{tableId:tableId}, {min:{$gte:min}}, {max:{$lte:max}}] });
}

// export constant
module.exports.condition = condition;

// export functions
module.exports.checkExist             = checkExist;
module.exports.checkId                = checkId;
module.exports.findNumAttackTable     = findNumAttackTable;
module.exports.findRangeAttackTable   = findRangeAttackTable;
module.exports.findNumCriticalTable   = findNumCriticalTable;
module.exports.findRangeCriticalTable = findRangeCriticalTable;