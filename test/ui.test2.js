const {Capabilities, By, Builder} = require('selenium-webdriver')
const { expect } = require("chai");
const { describe } = require("mocha");
const { until } = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
const { elementsLocated } = require('selenium-webdriver/lib/until');
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
            await deleteExistingBoard();
             })
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
        it ('Добавление карточки на доску', async function () {

            const nameCardToBe = 'Первая карточка'
            await openTrello();
            await createNewBoard();
            await addCard();        
            let nameCard  = await driver.findElement(By.css('.list-card-title.js-card-name')).getText();
            expect(nameCardToBe).equals(nameCard);
            await deleteExistingBoard();
            })                  
            
        it ('Редактирование карточки', async function () {
            
            const quantityOfComentsToBe = '1'
            await openTrello();
            await createNewBoard();
            await addCardWithColumns();
            await editCard();
            let quantityOfComents = await driver.findElement(By.css('.badge-text')).getText();
            expect(quantityOfComentsToBe).equals(quantityOfComents);
            await deleteExistingBoard();
            })           
            
        it ('Перемещение карточки в другую колонку', async function () {
            
            const nameOfNewColumnToBe = 'В процессе'
            await openTrello();
            await createNewBoard();
            await addCardWithColumns();
            await movingCard();
            await driver.findElement(By.xpath("//span[text()='Первая карточка']")).click();
            let nameOfNewColumn  = await driver.findElement(By.css('.js-open-move-from-header')).getText();
            expect(nameOfNewColumnToBe).equals(nameOfNewColumn);
            await driver.findElement(By.css('.icon-md.icon-close.dialog-close-button.js-close-window')).click();
            await deleteExistingBoard();
            })
            
        it ('Удаление карточки', async function () {
            
            const comentAboutDeletingToBe = 'pewanop335 удалил(а) карточку #1 из списка Нужно сделать'
            await openTrello();
            await createNewBoard();
            await addCardWithColumns();
            await deleteCard();
            await driver.findElement(By.xpath("//span[text()='Меню']")).click();
            let comentAboutDeleting = await driver.findElement(By.xpath("//div[text()=' удалил(а) карточку #1 из списка Нужно сделать']")).getText();
            expect(comentAboutDeletingToBe).equals(comentAboutDeleting);
            await driver.findElement(By.css('.board-menu-header-close-button.icon-lg.icon-close.js-hide-sidebar')).click();
            let x = await driver.findElement(By.css('.board-menu-header-close-button.icon-lg.icon-close.js-hide-sidebar'));
            await driver.wait(until.elementIsNotVisible(x),4000);
            await deleteExistingBoard();
            })
            
            })
async function openTrello () {
    driver = await new Builder().withCapabilities(browserName).build();
    await driver.manage().setTimeouts({implicit: 20000})
    await driver.manage().window().maximize()
    await driver.get(url);    
    await driver.findElement(By.css("a[href='/login']")).click();
    await driver.findElement(By.css('#user')).sendKeys('pewanop335@leafzie.com');
    await driver.findElement(By.css('#password')).sendKeys('qwerty2022!');
    await driver.findElement(By.css('.button.account-button.button-green.btn.btn-success')).click();
    await driver.wait(until.elementLocated(By.css('.css-pxzk9z')),40000);
    await driver.findElement(By.css('#password')).sendKeys('qwerty2022!');
    await driver.findElement(By.xpath('//span[text()="Войти"]')).click();     
}
async function createNewBoard () {         
    let board = await driver.findElement(By.css('.board-tile.mod-add'));//нашла элемент "создать доску"
    await driver.wait(until.elementIsEnabled(board),40000); //дождаться что этот элемент будет кликабельным
    await board.click(); //кликнуть на него
    await driver.findElement(By.css('.nch-textfield__input._2N2CjUFKhgeXLO._2N2CjUFKhgeXLO._3pXGTS3_pwahBt')).sendKeys('Тест');
    let btnCreate = await driver.findElement(By.css('._2NEPrwhDnsG_qO._3TTqkG5muwOzqZ._3Ik0JLsERwh6Ui._1Tu9wiuW4Te8Rx'));
    await driver.wait(until.elementIsEnabled(btnCreate),40000);
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
async function addCard () {
    await driver.findElement(By.css('.list-card-composer-textarea.js-card-title')).sendKeys('Первая карточка');
    await driver.findElement(By.css('.nch-button.nch-button--primary.confirm.mod-compact.js-add-card')).click();   

}
async function addCardWithColumns () {
    await driver.findElement(By.css('.list-name-input')).sendKeys('Нужно сделать');
    await driver.findElement(By.css('.nch-button.nch-button--primary.mod-list-add-button.js-save-edit')).click();
    await driver.findElement(By.css('.js-add-a-card')).click();
    await driver.findElement(By.css('.list-card-composer-textarea.js-card-title')).sendKeys('Первая карточка');
    await driver.findElement(By.css('.nch-button.nch-button--primary.confirm.mod-compact.js-add-card')).click();
    await driver.findElement(By.css('.list-name-input')).sendKeys('В процессе');
    await driver.findElement(By.css('.nch-button.nch-button--primary.mod-list-add-button.js-save-edit')).click();
}
async function editCard () {
    await driver.wait(until.elementLocated(By.xpath("//span[text()='Первая карточка']")),4000).click();
    await driver.findElement(By.css('.comment-box-input.js-new-comment-input')).sendKeys('Комментарий');
    await driver.findElement(By.css('.nch-button.nch-button--primary.confirm.mod-no-top-bottom-margin.js-add-comment')).click();
    await driver.findElement(By.css('.icon-md.icon-close.dialog-close-button.js-close-window')).click();    
}
    
async function movingCard () {
    await driver.findElement(By.xpath("//span[text()='Первая карточка']")).click();
    await driver.findElement(By.css('.u-inline-block.u-bottom')).click();
    await driver.findElement(By.css('.js-select-list')).click();
    await driver.findElement(By.xpath("//option[text()='В процессе']")).click();
    await driver.findElement(By.css('.nch-button.nch-button--primary.wide.js-submit')).click();
    await driver.findElement(By.css('.icon-md.icon-close.dialog-close-button.js-close-window')).click();
}

async function deleteCard () {
    await driver.findElement(By.xpath("//span[text()='Первая карточка']")).click();
    await driver.findElement(By.xpath("//span[text()='Архивация']")).click();
    await driver.findElement(By.css('.button-link.js-delete-card.negate')).click();
    await driver.findElement(By.css('.js-confirm.full.nch-button.nch-button--danger')).click();    
}







