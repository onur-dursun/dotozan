import { QMainWindow, QWidget, QLabel, FlexLayout, QPushButton, QIcon } from '@nodegui/nodegui';
import logo from '../assets/logox200.png';

const win = new QMainWindow();
win.setWindowTitle("Hello World");

const centralWidget = new QWidget();
centralWidget.setObjectName('transparentWindow');
centralWidget.setLayout(new FlexLayout());
win.setCentralWidget(centralWidget);


// Make the window transparent
centralWidget.setAttribute(3, true); // 3 corresponds to Qt.WA_TranslucentBackground

// Set the window as frameless
win.setWindowFlag(2, true); // 2 corresponds to Qt.WindowFlag.FramelessWindowHint

const label = new QLabel();
label.setObjectName("mylabel");
label.setText("Hello");

const button = new QPushButton();
button.setIcon(new QIcon(logo));

const label2 = new QLabel();
label2.setText("World");
label2.setInlineStyle(`
  color: red;
`);

// Set a background color for better visibility (optional)
centralWidget.setStyleSheet(`
  #transparentWindow {
    background-color: rgba(255, 255, 255, 50);
  }
`);

win.setCentralWidget(centralWidget);
win.setStyleSheet(
  `
    #myroot {
      background-color: #00968800;
      height: '100%';
      align-items: 'center';
      justify-content: 'center';
    }
    #mylabel {
      font-size: 16px;
      font-weight: bold;
      padding: 1;
    }
  `
);
win.show();

(global as any).win = win;

