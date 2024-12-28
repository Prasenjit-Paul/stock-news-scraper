exports.checkKeyword = (keyword, title) => {
    const target = ['Q1', 'Q2', 'Q3', 'Q4', 'Profit', 'Loss', 'Revenue', 'EBITDA', 'PAT', 'PBT', 'Tax', 'Rate', 'quarter earnings', 'earnings', 'deal', 'order', 'industry', 'shares', "indian Stock market", "Dividend issue", " Result news"];
    const avoidedList = ['recommendation', 'recommend', 'recommends', 'advice', 'advices'];
    let localDataSet = target.map(item => item.toUpperCase());
    let localAvoidSet = avoidedList.map(item => item.toUpperCase());
    let arrayCheck = false, titleCheck = false;
    if (keyword && keyword?.length > 0 && Array.isArray(keyword)) {
        const avoidCheck = keyword.some(item => localAvoidSet.includes(item.toUpperCase()));
        if (avoidCheck) {
            arrayCheck = false;
            return arrayCheck;
        };
        arrayCheck = keyword.some(item => localDataSet.includes(item.toUpperCase()));
    }
    if (title && typeof title === 'string') {
        let arrayFromString = title.split(' ');
        const titleAvoidCheck = arrayFromString.some(item => localAvoidSet.includes(item.toUpperCase()));
        if (titleAvoidCheck) {
            titleCheck = false;
            return titleCheck;
        }
        titleCheck = arrayFromString.some(item => localDataSet.includes(item.toUpperCase()));
    }
    return arrayCheck || titleCheck;
}