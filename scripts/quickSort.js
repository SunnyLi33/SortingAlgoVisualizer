let comparisonCount2 = 0;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function quickSortAndDisplay() {
    let userInput = document.getElementById('user_nums_input').value;
    let numbers = userInput.split('\n').map(num => num.trim() === '' ? NaN : parseInt(num, 10)).filter(num => !isNaN(num));

    comparisonCount2 = 0;
    document.getElementById('sortingInfoArea').value = '';
    await quickSort(numbers, 0, numbers.length - 1);

    // Final update after sorting is complete
    updateUI(numbers, -1, -1, -1, true); 
    document.getElementById('sortingInfoArea').value += `Total Comparisons: ${comparisonCount2}`;

    document.getElementById('myDropDownExamples').disabled = false;
    document.getElementById('user_nums_input').readOnly = false;
}

async function quickSort(arr, left, right) {
    if (left < right) {
        updateSortingInfo(`starting quicksort first=${left} last=${right}\n`);
        let pivotIndex = await partition(arr, left, right);
        updateSortingInfo(`splitpoint=${pivotIndex}\n`);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    } else if (left === right) {
        updateSortingInfo(`starting quicksort first=${left} last=${right}\n`);
    }
}

async function partition(arr, left, right) {
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        comparisonCount2++;
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            updateUI(arr, right, i, j);
            await delay(500);
        }
    }

    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    updateUI(arr, right, i + 1, -1);
    await delay(500);

    return i + 1;
}

function updateUI(arr, pivotIndex, partitionIndex, comparingIndex, isComplete = false) {
    let numberDisplay = document.getElementById('numberDisplay');
    numberDisplay.innerHTML = '';

    arr.forEach((num, index) => {
        let box = document.createElement('div');
        box.className = 'number-box';

        if (isComplete) {
            box.classList.add('sorted');
        } else {
            box.classList.remove('pivot', 'partition', 'highlight');
            if (index === pivotIndex) {
                box.classList.add('pivot');
            } else if (index === partitionIndex) {
                box.classList.add('partition');
            } else if (index === comparingIndex) {
                box.classList.add('highlight');
            }
        }

        box.innerText = num;
        numberDisplay.appendChild(box);
    });
}

function updateSortingInfo(info) {
    let infoArea = document.getElementById('sortingInfoArea');
    infoArea.value += info;
    infoArea.scrollTop = infoArea.scrollHeight;
}

function init() {
    document.getElementById('sortbtn').addEventListener('click', function() {
        let selectedAlgorithm = document.getElementById('myDropDownAlgorithms').value;
        if (selectedAlgorithm === 'quicksort') {
            document.getElementById('sortbtn').disabled = true;
            quickSortAndDisplay().then(() => {
                document.getElementById('sortbtn').disabled = false;
            });
        }
    });
}

init();
