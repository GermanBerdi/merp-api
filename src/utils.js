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

async function findNumAttackTable(num, table, endurance, model)
{
    return await model.findOne ({$and: [{table: table}, {endurance: endurance}, {min: {$lte: num}}, {max: {$gte: num}}] });
}

async function findRangeAttackTable(min, max, table, endurance, model)
{
    return await model.findOne({$and: [{table:table}, {endurance: endurance}, {min:{$gte:min}}, {max:{$lte:max}}] });
}

async function findNumCriticalTable(num, table, model)
{
    return await model.findOne ({$and: [{table: table}, {min: {$lte: num}}, {max: {$gte: num}}] });
}

async function findRangeCriticalTable(min, max, table, model)
{
    return await model.findOne({$and: [{table:table}, {min:{$gte:min}}, {max:{$lte:max}}] });
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