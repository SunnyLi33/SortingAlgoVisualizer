let comparisonCount = 0;

function bubbleSortAndDisplay() {
    let userInput = document.getElementById('user_nums_input').value;
    let numbers = userInput.split('\n').map(num => num.trim() === '' ? NaN : parseInt(num, 10)).filter(num => !isNaN(num));
    let numberDisplay = document.getElementById('numberDisplay');
    document.getElementById('sortingInfoArea').value = '';
    numberDisplay.innerHTML = '';

    // Create and display boxes
    let boxes = numbers.map((num, index) => {
        let box = document.createElement('div');
        box.className = 'number-box'; 
        box.innerText = num;
        box.id = 'box' + index;
        numberDisplay.appendChild(box);
        return box;
    });

    // Reset counter each time sorting starts
    comparisonCount = 0;

    // Start Bubble Sort with visualization
    fullBubbleSort(numbers.length, numbers, boxes);
}

// Recursive function to perform full bubble sort
function fullBubbleSort(endIndex, numbers, boxes) {
    if (endIndex <= 0) {
        document.getElementById('sortbtn').disabled = false;
        document.getElementById('myDropDownExamples').disabled = false;
        document.getElementById('sortingInfoArea').value = 'Total Comparisons: ' + comparisonCount;
        return;
    }

    bubbleSortPass(0, endIndex - 1, function() {
        fullBubbleSort(endIndex - 1, numbers, boxes);
    }, numbers, boxes);
}

// Function to perform a single pass of bubble sort
function bubbleSortPass(startIndex, endIndex, callback, numbers, boxes) {
    if (startIndex >= endIndex) {

        // When one pass is complete, mark the last element as sorted
        boxes[endIndex].style.backgroundColor = 'lightgreen';

        if (typeof callback === 'function') {
            callback();
        }
        return;
    }

    // Apply cyan background to the boxes being compared
    boxes[startIndex].style.backgroundColor = 'cyan';
    boxes[startIndex + 1].style.backgroundColor = 'cyan';

    setTimeout(function() {
        // Increment counter each comparison
        comparisonCount++;

        if (numbers[startIndex] > numbers[startIndex + 1]) {
            // If not in order, change to red
            boxes[startIndex].style.backgroundColor = 'red';
            boxes[startIndex + 1].style.backgroundColor = 'red';

            // Swap numbers
            let temp = numbers[startIndex];
            numbers[startIndex] = numbers[startIndex + 1];
            numbers[startIndex + 1] = temp;

            // Swap boxes
            let tempBox = boxes[startIndex].innerText;
            boxes[startIndex].innerText = boxes[startIndex + 1].innerText;
            boxes[startIndex + 1].innerText = tempBox;
        }

        // Remove color after comparison (and swap if it occurred)
        setTimeout(() => {
            if (boxes[startIndex].style.backgroundColor !== 'lightgreen') {
                boxes[startIndex].style.backgroundColor = '';
            }
            if (boxes[startIndex + 1].style.backgroundColor !== 'lightgreen') {
                boxes[startIndex + 1].style.backgroundColor = '';
            }

            // Continue with the next comparison
            bubbleSortPass(startIndex + 1, endIndex, callback, numbers, boxes);
        }, 200);
    }, 200);
}

function updateVisual(boxes, index, color, delay) {
    setTimeout(() => {
        boxes[index].style.backgroundColor = color;
    }, delay);
}

function init() {
    document.getElementById('sortbtn').addEventListener('click', function() {
        let selectedAlgorithm = document.getElementById('myDropDownAlgorithms').value;
        document.getElementById('sortbtn').disabled = true;
        document.getElementById('myDropDownExamples').disabled = true;
        if (selectedAlgorithm === 'bubblesort') {
            bubbleSortAndDisplay();
    }});
}

init();