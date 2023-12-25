const { QMainWindow, QWidget, FlexLayout, QLabel } = require("@nodegui/nodegui");

const rootView = new QWidget();
rootView.setLayout(new FlexLayout());
rootView.setObjectName("rootView");

// Create two widgets - one label and one view
const label = new QLabel();
label.setText("Hello");
label.setObjectName("label");

const view = new QWidget();
view.setObjectName("view");

// Now tell rootView layout that the label and the other view are its children
rootView.layout.addWidget(label);
rootView.layout.addWidget(view);

const win = new QMainWindow();
win.setStyleSheet("background:transparent;");
win.setWindowFlag(2048, true);
win.setAttribute(120,true);
win.setCentralWidget(rootView);
win.show();

global.win = win; // prevent's gc of win