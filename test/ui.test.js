const {Capabilities, By, Builder} = require('selenium-webdriver')
const { expect } = require("chai");
const { describe } = require("mocha");
const { until } = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
const url = 'https://trello.com';
const browserName = Capabilities.chrome();
let driver;



describe ('UI тесты', function () {
    it ('Создание новой доски', async function () {
   
   const nameBoardToBe = 'Тест'
   await openTrello();
   await createNewBoard();
   let nameBoard  = await driver.findElement(By.css('.js-board-editing-target.board-header-btn-text')).getText();
   expect(nameBoardToBe).equals(nameBoard);
    })
}
)
describe ('UI тесты', function () {
    it ('Удаление существующей доски', async function () {
   
   const statusBoardToBe = 'Создать доску'
   await openTrello();
   await createNewBoard();
   await deleteExistingBoard();
      let board = await driver.findElement(By.css('.board-tile.mod-add'));
      await driver.wait(until.elementIsEnabled(board),6000);
      let statusBoard = await board.getText();
   expect(statusBoardToBe).equals(statusBoard);
    })
}
)
//trello();
// async function trello() {
//     await openTrello();
//     await createNewBoard();
//     await deleteExistingBoard();
    
// }

async function openTrello () {
    driver = await new Builder().withCapabilities(browserName).build();
    await driver.manage().setTimeouts({implicit: 6000})
    await driver.manage().window().maximize()
    await driver.get(url);    
         await driver.findElement(By.css("a[href='/login']")).click();
         await driver.findElement(By.css('#user')).sendKeys('pewanop335@leafzie.com');
         await driver.findElement(By.css('#password')).sendKeys('qwerty2022!');
         await driver.findElement(By.css('.button.account-button.button-green.btn.btn-success')).click();
         await driver.wait(until.elementLocated(By.css('.css-pxzk9z')),10000);
         await driver.findElement(By.css('#password')).sendKeys('qwerty2022!');
         await driver.findElement(By.xpath('//span[text()="Войти"]')).click();     
}
    async function createNewBoard () {         
        let board = await driver.findElement(By.css('.board-tile.mod-add'));//нашла элемент "создать доску"
        await driver.wait(until.elementIsEnabled(board),5000); //дождаться что этот элемент будет кликабельным
        await board.click(); //кликнуть на него
        await driver.findElement(By.css('.nch-textfield__input._2N2CjUFKhgeXLO._2N2CjUFKhgeXLO._3pXGTS3_pwahBt')).sendKeys('Тест');
        let btnCreate = await driver.findElement(By.css('._2NEPrwhDnsG_qO._3TTqkG5muwOzqZ._3Ik0JLsERwh6Ui._1Tu9wiuW4Te8Rx'));
        await driver.wait(until.elementIsEnabled(btnCreate),5000);
        await driver.findElement(By.css('._2NEPrwhDnsG_qO._3TTqkG5muwOzqZ._3Ik0JLsERwh6Ui._1Tu9wiuW4Te8Rx')).click();
        await driver.wait(until.elementLocated(By.css('.icon-sm.icon-star.board-header-btn-icon')));        
}

async function deleteExistingBoard () { 
    
    await driver.findElement(By.xpath("//span[text()='Меню']")).click();
    await driver.findElement(By.css('.board-menu-navigation-item-link.js-open-more')).click();
    await driver.findElement(By.css('.board-menu-navigation-item-link.js-close-board')).click();
    await driver.findElement(By.css('.js-confirm.full.nch-button.nch-button--danger')).click();
    await driver.findElement(By.xpath("//button[text()='Удалить доску навсегда']")).click();
    await driver.findElement(By.xpath("//button[text() = 'Удалить']")).click();          
         
}
    







