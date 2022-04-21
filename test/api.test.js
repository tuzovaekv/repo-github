const axios = require('axios').default;
const { describe } = require("mocha");
const { expect } = require("chai");
const token = '6259bdb52661a78003494f6b/1p3LdczbF8Q8FRiZ6jSyYe2Msrjv3Ux079P81c18DLD11l6hyFmtUxogwmJ34K9F';

let id;
let reqConfig;
let idlist;

all();
// //describe ('API тесты', function () {    
    async function all () {
    // //Создание доски    
    // reqConfig = {headers: {"Cookie":`token =${token}` } }
    // let responseBoard = await axios.post('https://trello.com/1/boards', {name: "BOARD21", token: `${token}`}, reqConfig);
    // let idBoard = responseBoard.data.id;
    // console.log(`Это айди доски ${idBoard}`) //айди доски 
    
    // //Проверка создания доски
    // const nameBoardToBe = 'BOARD21';//имя которое должно быть          
    // let infaAboutBoard = await axios.get(`https://trello.com/1/boards/${idBoard}`, reqConfig);//получаем объект Доска
    // let nameBoard = await infaAboutBoard.data.name;//получаем имя доски
    // expect(nameBoardToBe).equals(nameBoard);
    // console.log(`Это имя доски BOARD21 ${nameBoard}`);

    // // Добавление карточки на доску
    // // Сначала получаем айди списка, чтобы знать куда карточку добавить
    // reqConfig = {headers: {"Cookie":`token =${token}` } }
    // let infaAboutLists = await axios.get(`https://trello.com/1/boards/${idBoard}/lists`, reqConfig);
    // let idListOfBoard =  infaAboutLists.data[0].id;//Получили айди списка "Нужно сделать" 
    // let idListOfBoardAnother = infaAboutLists.data[1].id;//Получили айди списка "В процессе" 
    // console.log(`Это айди списка Нужно сделать ${idListOfBoard}`);
    // console.log(`Это айди списка В процессе ${idListOfBoardAnother}`);
    
    // // Создаем карточку, используя айди списка
    // reqConfig = {headers: {"Cookie":`token =${token}` } }
    // let newCard = await axios.post('https://trello.com/1/cards', {name: "CARD21",
    // idList: `${idListOfBoard}`, token: `${token}`}, reqConfig);
    // let idCard = newCard.data.id;//получаем айди карточки 
    // console.log(`Это айди карточки CARD21 ${idCard}`);
    // //Проверка добавления карточки на доску
    // const nameCardToBe = 'CARD21';
    // let infaAboutCard = await axios.get(`https://trello.com/1/cards/${idCard}`, reqConfig);//получили инфу о карточке
    // let nameCard = await infaAboutCard.data.name;
    // expect(nameCardToBe).equals(nameCard);
    
    // //Перемещаем в другой список
    // reqConfig = {headers: {"Cookie":`token =${token}` } }
    // await axios.put(`https://trello.com/1/cards/${idCard}`,{idList: `${idListOfBoardAnother}`, token: `${token}`}, reqConfig);
    // //Проверка перемещения карточки
    // let infaAboutMovingCard = await axios.get(`https://trello.com/1/cards/${idCard}`, reqConfig);
    // let idSecondList = infaAboutMovingCard.data.idList
    // expect(idListOfBoardAnother).equals(idSecondList)
    // console.log(`Это айди списка в который переместили карточку ${idSecondList}`);
    
    // //Редактируем карточку(меняем поле Название)
    //  reqConfig = {headers: {"Cookie":`token =${token}` } }
    //  await axios.put(`https://trello.com/1/cards/${idCard}`,{name: `CARD22`,
    //  idList: `${idListOfBoardAnother}`, token: `${token}`}, reqConfig);
    // //Проверяем редактирование карточки
    // let newNameToBe = 'CARD22'
    // let infaAboutRenamingCard = await axios.get(`https://trello.com/1/cards/${idCard}`, reqConfig);
    // let newName = infaAboutRenamingCard.data.name
    // expect(newNameToBe).equals(newName);
    // console.log(`Это проверка нового имени ${newName}`);
    


     //Удаление карточки
    //  reqConfig = {headers: {"Cookie":`token =${token}`} }
    //  await axios.delete(`https://trello.com/1/cards/6261c6917951947bfd82ab0a`, {token: `${token}`}, reqConfig);
     //Проверка удаления карточки
    //  let statusDeletingCardTobe = 'true'
    //  let infaAboutDeletingCard = await axios.get(`https://trello.com/1/cards/${idCard}`, reqConfig);
    //  let statusDeletingCard = infaAboutDeletingCard.data.closed
    //  expect(statusDeletingCardTobe).equals(statusDeletingCard)

    
    // //Удаление доски
    reqConfig = {headers: {"Cookie":`token =${token}` } }
    await axios.delete(`https://trello.com/1/boards/6261ca87d17df80609290483`, {token: `${token}`}, reqConfig);
    //Проверка удаления доски
    //  let statusDeletingBoardTobe = 'true'
    //  let infaAboutDeletingBoard = await axios.get(`https://trello.com/1/boards/${idBoard}`, reqConfig);
    //  let statusDeletingBoard = infaAboutDeletingBoard.data.closed
    //  expect(statusDeletingBoardTobe).equals(statusDeletingBoard)
          
     }
     
// })



    

   
    