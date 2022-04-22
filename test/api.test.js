const axios = require('axios').default;
const { describe } = require("mocha");
const { expect } = require("chai");
const token = '6259bdb52661a78003494f6b/1p3LdczbF8Q8FRiZ6jSyYe2Msrjv3Ux079P81c18DLD11l6hyFmtUxogwmJ34K9F';
const trelloUrl = 'https://trello.com/1'
let reqConfig = {headers: {"Cookie":`token =${token}` } }

describe ('API тесты',  function () {    
    it ('Все тесты', async function () {
    //Создание доски    
    let responseBoard = await axios.post(`${trelloUrl}/boards`, {name: "BOARD21", token: `${token}`}, reqConfig);
    let idBoard = responseBoard.data.id;
      
    //Проверка создания доски
    const nameBoardToBe = 'BOARD21';//имя которое должно быть          
    let infaAboutBoard = await axios.get(`${trelloUrl}/boards/${idBoard}`, reqConfig);//получаем объект Доска
    let nameBoard = await infaAboutBoard.data.name;//получаем имя доски
    expect(nameBoardToBe).equals(nameBoard);
    
    // Добавление карточки на доску
    // Сначала получаем айди списка, чтобы знать куда карточку добавить
    let infaAboutLists = await axios.get(`${trelloUrl}/boards/${idBoard}/lists`, reqConfig);
    let idListOfBoard =  infaAboutLists.data[0].id;//Получили айди списка "Нужно сделать" 
    let idListOfBoardAnother = infaAboutLists.data[1].id;//Получили айди списка "В процессе" 
        
    //Создаем карточку, используя айди списка
    let newCard = await axios.post(`${trelloUrl}/cards`, {name: "CARD21",
    idList: `${idListOfBoard}`, token: `${token}`}, reqConfig);
    let idCard = newCard.data.id;//получаем айди карточки 
    
    //Проверка добавления карточки на доску
    const nameCardToBe = 'CARD21';
    let infaAboutCard = await axios.get(`${trelloUrl}/cards/${idCard}`, reqConfig);//получили инфу о карточке
    let nameCard = await infaAboutCard.data.name;
    expect(nameCardToBe).equals(nameCard);
    
    //Перемещаем в другой список
    await axios.put(`${trelloUrl}/cards/${idCard}`,{idList: `${idListOfBoardAnother}`, token: `${token}`}, reqConfig);
    //Проверка перемещения карточки
    let infaAboutMovingCard = await axios.get(`${trelloUrl}/cards/${idCard}`, reqConfig);
    let idSecondList = infaAboutMovingCard.data.idList
    expect(idListOfBoardAnother).equals(idSecondList)
        
    //Редактируем карточку(меняем поле Название)
    await axios.put(`${trelloUrl}/cards/${idCard}`,{name: `CARD22`,
    idList: `${idListOfBoardAnother}`, token: `${token}`}, reqConfig);
    //Проверяем редактирование карточки
    let newNameToBe = 'CARD22'
    let infaAboutRenamingCard = await axios.get(`${trelloUrl}/cards/${idCard}`, reqConfig);
    let newName = infaAboutRenamingCard.data.name
    expect(newNameToBe).equals(newName);
      
    //Удаление карточки
    reqConfig.data =  {token: `${token}`} ,     
    await axios.delete(`${trelloUrl}/cards/${idCard}`, reqConfig);
    //Проверка удаления карточки
    let infaAboutSecondList = await axios.get(`${trelloUrl}/lists/${idSecondList}/cards`, reqConfig);
    let statusSecondList = infaAboutSecondList.data
    expect(statusSecondList).to.be.empty;
    console.log(statusSecondList)   
    
    //Удаление доски
    reqConfig.data =  {token: `${token}`};
    let responseDeletingBoard = await axios.delete(`${trelloUrl}/boards/${idBoard}`, reqConfig);
    //Проверка удаления доски
    let status = responseDeletingBoard.data._value
    expect(status).to.be.null
    
           
  
})  
 })



    

   
    