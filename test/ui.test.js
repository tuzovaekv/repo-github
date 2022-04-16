const {Capabilities, By, Builder} = require('selenium-webdriver')
const { expect } = require("chai");
const { describe } = require("mocha");
const { until } = require('selenium-webdriver');
const url = 'https://trello.com';
const browserName = Capabilities.chrome();
let driver;
trello();


// describe ('UI тесты', function () {
//     it ('Создание карточки', async function () {
   
//    const nameBoardToBe = 'Тест'
//    openTrello();
//    let nameBoard  = await driver.findElement(By.css('.js-board-editing-target.board-header-btn-text')).getText();
//    expect(nameBoardToBe).equals(nameBoard);
//     })
// }
// )
async function trello (){
await openTrello()
await addBoard();
}
async function openTrello () {
    driver = await new Builder().withCapabilities(browserName).build();
    await driver.manage().setTimeouts({implicit: 4000})
    await driver.manage().window().maximize()
    await driver.get(url);
    setTimeout(async () => {
         await driver.findElement(By.css("a[href='/login']")).click();
         await driver.findElement(By.css('#user')).sendKeys('pewanop335@leafzie.com');
         await driver.findElement(By.css('#password')).sendKeys('qwerty2022!');
         await driver.findElement(By.css('.button.account-button.button-green.btn.btn-success')).click();
         setTimeout(async () => {
         await driver.findElement(By.css('#password')).sendKeys('qwerty2022!');
         await driver.findElement(By.xpath('//span[text()="Войти"]')).click();      
       
         },2000)
           
     }, 2000) 
    
}
    async function addBoard () { 
        let board = await driver.findElement(By.css('.board-tile.mod-add'));//нашла элемент "создать доску"
        await driver.wait(until.elementIsEnabled(board),5000); //дождаться что этот элемент будет кликабельным
        await board.click(); //кликнуть на него
        setTimeout(async () => {
        await driver.findElement(By.css('.nch-textfield__input._2N2CjUFKhgeXLO._2N2CjUFKhgeXLO._3pXGTS3_pwahBt')).sendKeys('Тест');
        let btnCreate = await driver.findElement(By.css('._2NEPrwhDnsG_qO._3TTqkG5muwOzqZ._3Ik0JLsERwh6Ui._1Tu9wiuW4Te8Rx'));
        await driver.wait(until.elementIsEnabled(btnCreate),3000);
        await driver.findElement(By.css('._2NEPrwhDnsG_qO._3TTqkG5muwOzqZ._3Ik0JLsERwh6Ui._1Tu9wiuW4Te8Rx')).click();
     
        },4000)     

}
    







