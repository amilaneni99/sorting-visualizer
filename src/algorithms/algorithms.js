export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, start, end, auxArray, animations){
    if(start === end) return;

    const middle = Math.floor((start+end)/2);
    mergeSortHelper(auxArray, start, middle, mainArray, animations);
    mergeSortHelper(auxArray, middle+1, end, mainArray, animations);
    doMerge(mainArray, start, middle, end, auxArray, animations);
}

function doMerge(mainArray, start, middle, end, auxArray, animations){
    let k = start;
    let i = start;
    let j = middle + 1;
    while(i <= middle && j <= end){
        animations.push([i,j]);
        animations.push([i,j]);

        if(auxArray[i] <= auxArray[j]){
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        } else {
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    while(i <= middle){
        animations.push([i,i]);
        animations.push([i,i]);

        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);

        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}


export function getBubbleSortAnimations(array) {
    const animations = [];
    if(array.length <= 1) return array;
    bubbleSort(array, animations);
    return animations;
}

function bubbleSort(array, animations){
    console.log(array);
    const n = array.length;
    for(let i=0;i<n;i++){
        for(let j=0;j<n-i-1;j++){
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);
            if(array[j] >= array[j+1]){
                animations.push([j, j + 1, array[j], array[j + 1]]);
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }else{
                animations.push([j,j,array[j],array[j]]);
            }
        }
    }
}

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;   
}

function quickSortHelper(array, start, end, animations) {
    if(start < end){
        var pivot = partition(array, start, end, animations);
        quickSortHelper(array, start, pivot-1, animations);
        quickSortHelper(array,pivot+1,end, animations);
    }
}

function partition(array, start, end, animations) {
    var pivot = array[end];
    var i = start-1;

    for(let j=start;j<end;j++){
        animations.push([j,end]);
        animations.push([j,end]);
        if (array[j] < pivot){
            i++;
            animations.push([i,j,array[i],array[j]]);
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }else{
            animations.push([j,j,array[j],array[j]]);
        }
    }
    animations.push([i+1,end]);
    animations.push([i+1, end]);
    animations.push([i+1,end,array[i+1],array[end]]);
    var tempM = array[i+1];
    array[i+1] = array[end];
    array[end] = tempM;

    return i+1;
}


export function getHeapSortAnimations(stateArray) {
    let array = stateArray.slice(0),
        animations = [];
    buildMaxHeap(array, animations);
    let end = array.length - 1;
    while (end > 0) {
        animations.push([0, end]);
        animations.push([0, end]);
        animations.push([0, end, array[0], array[end]]);
        let temp = array[end];
        array[end] = array[0];
        array[0] = temp;
        siftDown(array, 0, end, animations);
        end--;
    }
    return animations;
}

function buildMaxHeap(array, animations) {
    let currentIndex = Math.floor(array.length / 2);
    while (currentIndex >= 0) {
        siftDown(array, currentIndex, array.length, animations);
        currentIndex--;
    }
}

function siftDown(array, start, end, animations) {
    if (start >= Math.floor(end / 2)) {
        return;
    }
    let left = start * 2 + 1,
        right = start * 2 + 2 < end ? start * 2 + 2 : null,
        swap;
    if (right) {
        swap = array[left] > array[right] ? left : right;
    } else {
        swap = left;
    }
    if (array[start] < array[swap]) {
        animations.push([start,swap]);
        animations.push([start, swap]);
        animations.push([start, swap, array[start], array[swap]]);
        let temp = array[swap];
        array[swap] = array[start];
        array[start] = temp;
        siftDown(array, swap, end, animations);
    }
}

