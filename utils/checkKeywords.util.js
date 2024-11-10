exports.checkKeyword = (dataSet) => {
    const target = ['Q1', 'Q2', 'Q3', 'Q4', 'Profit', 'Loss', 'Revenue', 'EBITDA', 'PAT', 'PBT', 'Tax', 'Rate', 'quarter earnings', 'earnings', 'deal', 'order', 'industry', 'shares'];
    let localDataSet = target.map(item => item.toUpperCase());
    let arrayCheck = false, titleCheck = false;
    if (Array.isArray(dataSet)) {
        arrayCheck = dataSet.some(item => localDataSet.includes(item.toUpperCase()));
    }
    if (typeof dataSet === 'string') {
        let arrayFromString = dataSet.split(' ');
        titleCheck = arrayFromString.some(item => localDataSet.includes(item.toUpperCase()));
    }
    return arrayCheck || titleCheck;
}