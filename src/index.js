const { QMainWindow, QWidget, FlexLayout, QLabel,WindowType, QPushButton, QCheckBox, QMouseEvent,WidgetEventTypes,QPlainTextEdit, WidgetAttribute, QLineEdit } = require("@nodegui/nodegui");
//const sound = require("sound-play");
const path = require('path');
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

const checkbox = new QCheckBox();

const dragIcon = new QLabel();
dragIcon.setText("🚀");
dragIcon.setObjectName('dragIcon');

dragIcon.addEventListener(WidgetEventTypes.MouseMove, (e) => {
    let ev = new QMouseEvent(e);
    win.move(ev.globalX() -180, ev.globalY() - dragIcon.y())
});

// Create two widgets - one label and one view
const closeButton = new QPushButton();
closeButton.setObjectName("closeButton");
closeButton.setText("x");
closeButton.addEventListener('clicked', () => {
    global.win.close();
});

// const messageLabel = new QLabel();
// messageLabel.setText("Message");

const timerLabel = new QLabel();
timerLabel.setText("Timer");

const startTimerLineEdit = new QLineEdit();
startTimerLineEdit.setText("-50");
startTimerLineEdit.addEventListener("returnPressed",startTimer);

const logPanel = new QLabel();
logPanel.setObjectName('logPanel');

// Container for labels
const labelsContainer = new QWidget();
const labelsLayout = new FlexLayout();
labelsContainer.setLayout(labelsLayout);
labelsContainer.setObjectName("labelsContainer");

// Now tell labelsContainer layout that the labels are its children
//labelsLayout.addWidget(label);
//labelsLayout.addWidget(messageLabel);
labelsLayout.addWidget(timerLabel);
labelsLayout.addWidget(logPanel);

// Container for buttons
const buttonsContainer = new QWidget();
const buttonsLayout = new FlexLayout();
buttonsContainer.setLayout(buttonsLayout);
buttonsContainer.setObjectName("buttonsContainer");

// Now tell buttonsContainer layout that the closeButton is its child
buttonsLayout.addWidget(dragIcon);
buttonsLayout.addWidget(closeButton);
buttonsLayout.addWidget(checkbox);
buttonsLayout.addWidget(startTimerLineEdit);

// Now tell mainContainer layout that the labelsContainer, view, and buttonsContainer are its children
mainLayout.addWidget(buttonsContainer);
mainLayout.addWidget(labelsContainer);

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
        width: 150px;
    }

    #buttonsContainer {
        align-items: 'flex-end';
        padding: 5px;
        width: 30px;
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
        height: 40px;
    }
`);
win.setWindowFlag(WindowType.FramelessWindowHint, true);
win.setWindowFlag(WindowType.Widget, true);
win.setWindowFlag(WindowType.WindowStaysOnTopHint, true);
win.setAttribute(120,true);
win.setCentralWidget(rootView);

win.show();

global.win = win; // prevent's gc of win

playAlert("0", "sqqozan", path.join(__dirname, 'assets/stack_alarm.mp3'));

function playAlert(formattedTime, message, file = "", volume =  0.3) {
    if (file && checkbox.isChecked())
    {
        const buf = fs.readFileSync(file); // Gets a Buffer
        symphonia.playFromBuf(buf, { speed: 1.0, volume: volume, isBlocking: false });
    }

    //messageLabel.setText(message);
    logMessage(`Timer: ${formattedTime} - ` + message);
}

let timerIntervalId;

function startTimer() {

    let secondsPassed = startTimerLineEdit.text();
    // Clear any existing interval
    clearInterval(timerIntervalId);

    // Timer to update the timerLabel and play alert every second
    timerIntervalId = setInterval(() => {
        secondsPassed++;

        // Format seconds into HH:MM:SS
        let formattedTime = formatTime(secondsPassed);
        
        // Update the timerLabel with the formatted time
        timerLabel.setText(`${formattedTime}`);

        // Play an alert every 45th second of a minute
        if (secondsPassed % 60 === 40) {
            playAlert(formattedTime, "Stack zamanı!", path.join(__dirname, 'assets/stack_alarm.mp3'));
        }

        if (secondsPassed % 180 === 165) {
            playAlert(formattedTime, "Lotus, Bounty çıkıyo!", path.join(__dirname, 'assets/lotus_alarm.mp3'));
        }

        if (secondsPassed === 420) {
            playAlert(formattedTime, "NC itemi lvl 1 çıktı!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed === 900) {
            playAlert(formattedTime, "NC itemi lvl 2 çıktı!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed === 1620) {
            playAlert(formattedTime, "NC itemi lvl 3 çıktı!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed === 2220) {
            playAlert(formattedTime, "NC itemi lvl 4 çıktı!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed === 3600) {
            playAlert(formattedTime, "NC itemi lvl 5 çıktı!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed === 1170) {
            playAlert(formattedTime, "Tormentor çıkıyo!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed >= 300 && secondsPassed % 120 == 105) {
            playAlert(formattedTime, "Power rune çıkıyo!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed % 600 === 295) {
            playAlert(formattedTime, "Gece oluyo! Roshan aşağı iniyo!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }

        if (secondsPassed % 600 === 595) {
            playAlert(formattedTime, "Gündüz oluyo! Roshan yukarı çıkıyo!", path.join(__dirname, 'assets/nc1_alarm.mp3'));
        }
    }, 1000);
}

// Function to log a message in the log panel
function logMessage(message) {
    const currentText = logPanel.text();
    const newText = `${message}\n${currentText}`;

    // Display only the last three lines
    const lines = newText.split('\n').slice(0, 3);
    const truncatedText = lines.join('\n');

    logPanel.setText(truncatedText);
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
