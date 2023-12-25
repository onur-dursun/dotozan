const { QMainWindow, QWidget, FlexLayout, QLabel } = require("@nodegui/nodegui");
const sound = require("sound-play");
const path = require('path');
const url = require('url');

const rootView = new QWidget();
const rootLayout = new FlexLayout();
rootView.setLayout(rootLayout);
rootView.setObjectName("rootView");

// Create two widgets - one label and one view
const label = new QLabel();
label.setText("Hello");
label.setObjectName("label");

const view = new QWidget();
view.setObjectName("view");

// Now tell rootView layout that the label and the other view are its children
rootLayout.addWidget(label);
rootLayout.addWidget(view);

const win = new QMainWindow();
win.setStyleSheet("background:transparent;");
win.setWindowFlag(2048, true);
win.setAttribute(120,true);
win.setCentralWidget(rootView);
win.show();

global.win = win; // prevent's gc of win

const filePath = path.join(__dirname, "assets\\stack_alarm.mp3");
console.log(filePath);
sound.play(filePath);