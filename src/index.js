const { QMainWindow, QWidget, FlexLayout, QLabel,WindowType, QPushButton, QDragMoveEvent, QMouseEvent,WidgetEventTypes,QPlainTextEdit } = require("@nodegui/nodegui");
//const sound = require("sound-play");
const path = require('path');
const url = require('url');

const fs = require('fs')
const symphonia = require('@tropicbliss/symphonia')

const rootView = new QWidget();
rootView.setObjectName("rootView");

// Container for rootView
const mainContainer = new QWidget();
const mainLayout = new FlexLayout();
mainContainer.setLayout(mainLayout);
mainContainer.setObjectName("mainContainer");

rootView.setLayout(mainLayout);

// Create two widgets - one label and one view
const label = new QLabel();
label.setText("Hello");
label.setObjectName("label");

const messageLabel = new QLabel();
label.setText("Message");

const timerLabel = new QLabel();
label.setText("Timer");

const closeButton = new QPushButton();
closeButton.setObjectName("closeButton");
closeButton.setText("x");
closeButton.addEventListener('clicked', () => {
    global.win.close();
});

const startTimerButton = new QPushButton();
startTimerButton.setText("s");
startTimerButton.setObjectName("startTimerButton");
startTimerButton.addEventListener('clicked', startTimer);

const logPanel = new QPlainTextEdit();
logPanel.setObjectName('logPanel');
logPanel.setReadOnly(true);
logPanel.setFixedHeight(100); // Set the height as needed
logPanel.setAutoFillBackground(false);

const dragIcon = new QLabel();
dragIcon.setText("🚀");
dragIcon.setObjectName('dragIcon');

dragIcon.addEventListener(WidgetEventTypes.MouseMove, (e) => {
    let ev = new QMouseEvent(e);
    win.move(ev.globalX() -180, ev.globalY() - dragIcon.y())
});

// Container for labels
const labelsContainer = new QWidget();
const labelsLayout = new FlexLayout();
labelsContainer.setLayout(labelsLayout);
labelsContainer.setObjectName("labelsContainer");

// Now tell labelsContainer layout that the labels are its children
//labelsLayout.addWidget(label);
labelsLayout.addWidget(messageLabel);
labelsLayout.addWidget(timerLabel);

// Container for buttons
const buttonsContainer = new QWidget();
const buttonsLayout = new FlexLayout();
buttonsContainer.setLayout(buttonsLayout);
buttonsContainer.setObjectName("buttonsContainer");

// Now tell buttonsContainer layout that the closeButton is its child
buttonsLayout.addWidget(dragIcon);
buttonsLayout.addWidget(closeButton);
buttonsLayout.addWidget(startTimerButton);

// Now tell mainContainer layout that the labelsContainer, view, and buttonsContainer are its children
mainLayout.addWidget(buttonsContainer);
mainLayout.addWidget(labelsContainer);
mainLayout.addWidget(logPanel);

const win = new QMainWindow();
win.setStyleSheet(`

    * {
        color: white;
        background: transparent;
    }

    #rootView {
        background: transparent;
        align-items: 'flex-end';
    }

    #labelsContainer {
        align-items: 'flex-end';
        flex: 1;
        width: 100px;
    }

    #buttonsContainer {
        align-items: 'flex-end';
        padding: 5px;
    }

    #closeButton {
        background:red;
        width: 15px;
        height: 15px;
    }

    #startTimerButton {
        background:green;
        width: 15px;
        height: 15px;
    }

    #logPanel {
        background: transparent;
    }
`);
win.setWindowFlag(WindowType.FramelessWindowHint, true);
win.setWindowFlag(WindowType.Widget, true);
win.setWindowFlag(WindowType.WindowStaysOnTopHint, true);
win.setAttribute(120,true);
win.setCentralWidget(rootView);

win.show();

global.win = win; // prevent's gc of win

playAlert("0", "Stack zamanı!", path.join(__dirname, 'assets/stack_alarm.mp3'));

function playAlert(formattedTime, message, file = "", volume =  0.5) {
    if (file)
    {
        const buf = fs.readFileSync(file); // Gets a Buffer
        symphonia.playFromBuf(buf, { speed: 1.0, volume: volume, isBlocking: false });
    }

    messageLabel.setText(message);
    logMessage(`Timer: ${formattedTime} - ` + message);
}

// Set up the timer
let secondsPassed = 35;
let formattedTime = formatTime(secondsPassed);
timerLabel.setText(`Timer: ${formattedTime}`);

let timerIntervalId;

function startTimer() {

    // Clear any existing interval
    clearInterval(timerIntervalId);

    // Timer to update the timerLabel and play alert every second
    const intervalId = setInterval(() => {
        secondsPassed++;

        // Format seconds into HH:MM:SS
        let formattedTime = formatTime(secondsPassed);
        
        // Update the timerLabel with the formatted time
        timerLabel.setText(`Timer: ${formattedTime}`);
        let message = "Stack zamanı!";
        playAlert(formattedTime, message);
        // Play an alert every 45th second of a minute
        if (secondsPassed % 60 === 40) {
            playAlert(formattedTime, message, path.join(__dirname, 'assets/stack_alarm.mp3'));
        }
    }, 1000);
}

// Function to log a message in the log panel
function logMessage(message) {
    const currentText = logPanel.toPlainText();
    const newText = `${message}\n${currentText}`;

    // Display only the last three lines
    const lines = newText.split('\n').slice(0, 3);
    const truncatedText = lines.join('\n');

    logPanel.setPlainText(truncatedText);
}

// Event: Close window
win.closeEvent = function (event) {
    clearInterval(intervalId); // Clear the interval when the window is closed
};

// Function to format seconds into HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
