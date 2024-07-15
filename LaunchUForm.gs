function Uform() { 
  const htmlForSidebar = HtmlService.createTemplateFromFile('Uform');
  const htmlOutput = htmlForSidebar.evaluate();
  
  const ui = SpreadsheetApp.getUi();
  ui.showSidebar(htmlOutput); 
}

function createMenu() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('My Forms');
  menu.addItem('Show UserForm', 'Uform');
  menu.addToUi();
}

function onOpen() {
  createMenu();
}
