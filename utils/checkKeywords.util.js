exports.checkKeyword = (dataSet) => {
    const target = ['Q1', 'Q2', 'Q3', 'Q4', 'Profit', 'Loss', 'Revenue', 'EBITDA', 'PAT', 'PBT', 'Tax', 'Rate', 'quarter earnings', 'earnings', 'deal', 'order', 'industry', 'shares'];
    let localDataSet = target.map(item => item.toUpperCase());
    if (Array.isArray(dataSet)) {
        return dataSet.some(item => localDataSet.includes(item.toUpperCase()));
    }
    if (typeof dataSet === 'string') {
        let arrayFromString = dataSet.split(' ');
        return arrayFromString.some(item => localDataSet.includes(item.toUpperCase()));
    }
}