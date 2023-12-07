// Function checking user input
function userInputArea() {
    let userInput = document.getElementById('user_nums_input').value;
    let lines = userInput.split('\n');
    let isValid = true;
    let showMessage = false;

    // Check for empty input
    if (userInput.trim() === '') {
        isValid = false;
        // Don't show the message if there is no input
        showMessage = false; 
    } else {
        for (let line of lines) {
            if (isNaN(parseFloat(line)) && line.trim() !== '') {
                isValid = false;
                showMessage = true; 
                break;
            }
        }
    }

    let sortButton = document.getElementById('sortbtn');
    let infoArea = document.getElementById('sortingInfoArea');
    if (!isValid && showMessage) {
        infoArea.value = 'Invalid input. Please enter only numbers.';
        sortButton.disabled = true; 
    } else {
        infoArea.value = '';
        sortButton.disabled = !isValid; 
    }
}



// Function that generates random 15 numbers
function generateAndDisplayRandomNumbers() {
    let randomNumbers = '';
    for (let i = 0; i < 15; i++) {
        randomNumbers += Math.floor(Math.random() * 100);
        if (i < 14) { 
            randomNumbers += '\n';
        }
    }
    document.getElementById('user_nums_input').value = randomNumbers;
}

// Function that generates 15 random but increasing numbers
function generateOrderedNumbers() {
    let orderedNumbers = '';
    let currentNumber = Math.floor(Math.random() * 10); 

    for (let i = 0; i < 15; i++) {
        orderedNumbers += currentNumber;
        if (i < 14) {
            orderedNumbers += '\n';
        }
        currentNumber += Math.floor(Math.random() * 10) + 1; 
    }

    document.getElementById('user_nums_input').value = orderedNumbers;
}

// Function that generates 15 random but decreasing numbers
function generateDescendingNumbers() {
    let descendingNumbers = '';
    let currentNumber = Math.floor(Math.random() * 20) + 80; 

    for (let i = 0; i < 15; i++) {
        descendingNumbers += currentNumber;
        if (i < 14) {
            descendingNumbers += '\n';
        }
        currentNumber -= Math.floor(Math.random() * 10) + 1; 
    }

    document.getElementById('user_nums_input').value = descendingNumbers;
}


function init() {
    document.getElementById('myDropDownExamples').addEventListener('change', function() {
        if (this.value === 'option1') {
            generateAndDisplayRandomNumbers();
        } else if (this.value === 'option2') { 
            generateOrderedNumbers();
        } else if (this.value === 'option3') {
            generateDescendingNumbers();
        }
        userInputArea(); 
    });

    // Event listener for continuous input validation
    document.getElementById('user_nums_input').addEventListener('input', userInputArea);

    // Initial validation check
    userInputArea(); 
}

init();