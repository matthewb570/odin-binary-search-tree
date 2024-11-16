class ArrayUtils {
    static mergeSort(array) {
        if (array === undefined || array === null || array.length === 0) {
            return [];
        }
        
        if (array.length === 1) {
            return array;
        }
    
        let arrayMidPoint = Math.round(array.length / 2);
    
        let leftArraySorted = ArrayUtils.mergeSort(array.slice(0, arrayMidPoint));
        let rightArraySorted = ArrayUtils.mergeSort(array.slice(arrayMidPoint, array.length));
    
        let arraySorted = [];
        let leftArrayIndex = 0;
        let rightArrayIndex = 0;
        while (leftArrayIndex < leftArraySorted.length || rightArrayIndex < rightArraySorted.length) {
            let leftCandidate;
            let rightCandidate;
            if (leftArrayIndex < leftArraySorted.length) {
                leftCandidate = leftArraySorted[leftArrayIndex];
            }
            if (rightArrayIndex < rightArraySorted.length) {
                rightCandidate = rightArraySorted[rightArrayIndex];
            }
    
            if (rightCandidate == undefined || (leftCandidate != undefined && leftCandidate <= rightCandidate)) {
                arraySorted.push(leftCandidate);
                leftArrayIndex++;
            } else {
                arraySorted.push(rightCandidate);
                rightArrayIndex++;
            }
        }
        
        return arraySorted;
    }
}

export default ArrayUtils;