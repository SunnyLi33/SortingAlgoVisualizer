let comparisonCount1 = 0;

function finalizeSorting(delay) {
    setTimeout(() => {
        document.getElementById('sortbtn').disabled = false;
        document.getElementById('myDropDownExamples').disabled = false; 
        document.getElementById('sortingInfoArea').value = 'Total Comparisons: ' + comparisonCount1;
    }, delay);
}

function selectionSortAndDisplay() {
    let userInput = document.getElementById('user_nums_input').value;
    let numbers = userInput.split('\n').map(num => num.trim() === '' ? NaN : parseInt(num, 10)).filter(num => !isNaN(num));
    let numberDisplay = document.getElementById('numberDisplay');
    numberDisplay.innerHTML = '';

    let boxes = numbers.map((num, index) => {
        let box = document.createElement('div');
        box.className = 'number-box';
        box.innerText = num;
        box.id = 'box' + index;
        numberDisplay.appendChild(box);
        return box;
    });

    selectionSort(numbers, boxes);
}

function selectionSort(numbers, boxes) {
    comparisonCount1 = 0;
    document.getElementById('sortingInfoArea').value = '';


    let n = numbers.length;
    let delay = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        updateVisual(boxes, minIdx, 'red', delay); 
        delay += 200;

        for (let j = i; j < n; j++) {
            comparisonCount1++; 
            if (j !== minIdx) { 
                updateVisual(boxes, j, 'cyan', delay); 
                delay += 200;
            }

            if (numbers[j] < numbers[minIdx]) {
                if (minIdx !== i) {
                    updateVisual(boxes, minIdx, 'white', delay); 
                }
                minIdx = j;
                updateVisual(boxes, minIdx, 'red', delay); 
            }

            if (j !== minIdx) {
                updateVisual(boxes, j, 'white', delay); 
            }
        }

        if (minIdx !== i) {
            let temp = numbers[i];
            numbers[i] = numbers[minIdx];
            numbers[minIdx] = temp;

            swapBoxes(boxes, i, minIdx, delay);
            delay += 200;
        }

        updateVisual(boxes, i, 'lightgreen', delay); 
        if (minIdx !== i) {
            updateVisual(boxes, minIdx, 'white', delay); 
        }
        delay += 200;
    }

    updateVisual(boxes, n - 1, 'lightgreen', delay); 
    finalizeSorting(delay + 200);
}



function swapBoxes(boxes, i, j, delay) {
    setTimeout(() => {
        let tempText = boxes[i].innerText;
        boxes[i].innerText = boxes[j].innerText;
        boxes[j].innerText = tempText;
    }, delay);
}

function updateVisual(boxes, index, color, delay) {
    setTimeout(() => {
        boxes[index].style.backgroundColor = color;
    }, delay);
}

function init() {
    document.getElementById('sortbtn').addEventListener('click', function() {
        let selectedAlgorithm = document.getElementById('myDropDownAlgorithms').value;
        if (selectedAlgorithm === 'selectionsort') {
            document.getElementById('sortbtn').disabled = true;
            selectionSortAndDisplay();
        }
    });
}

init();