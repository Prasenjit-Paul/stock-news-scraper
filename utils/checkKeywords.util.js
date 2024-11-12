exports.checkKeyword = (keyword, title) => {
    const target = ['Q1', 'Q2', 'Q3', 'Q4', 'Profit', 'Loss', 'Revenue', 'EBITDA', 'PAT', 'PBT', 'Tax', 'Rate', 'quarter earnings', 'earnings', 'deal', 'order', 'industry', 'shares', "indian Stock market", "Dividend issue", " Result news"];
    let localDataSet = target.map(item => item.toUpperCase());
    let arrayCheck = false, titleCheck = false;
    if (keyword.length > 0 && Array.isArray(keyword)) {
        arrayCheck = keyword.some(item => localDataSet.includes(item.toUpperCase()));
    }
    if (title && typeof title === 'string') {
        let arrayFromString = title.split(' ');
        titleCheck = arrayFromString.some(item => localDataSet.includes(item.toUpperCase()));
    }
    return arrayCheck || titleCheck;
}