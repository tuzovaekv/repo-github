const axios = require('axios').default;
const { describe } = require("mocha");
const { expect } = require("chai");


let id;
let reqConfig;

describe ('API тесты', function () {    
    it ('Создание новой доски', async function () {
        const nameBoardToBe = 'BOARD21';
        
        await createBoard();
        
        let objectBoard = await axios.get(`https://trello.com/1/boards/${id}`, reqConfig);
        let nameBoard = await objectBoard.data.name;
        expect(nameBoardToBe).equals(nameBoard);  
 
    })


//     it ('Удаление существующей доски', async function () {
   
//     })

//     it ('Добавление карточки на доску', async function () {
   
       
//          })



//     it ('Редактирование карточки', async function () {
   
     
//          })
       

//     it ('Перемещение карточки в другую колонку', async function () {
   
       
//         })

//     it ('Удаление карточки', async function () {
   
        
//         })

  })

async function createBoard() {
    reqConfig = {
        headers: {
            "Cookie":"token = 6259bdb52661a78003494f6b/1p3LdczbF8Q8FRiZ6jSyYe2Msrjv3Ux079P81c18DLD11l6hyFmtUxogwmJ34K9F"
        }
    }
    let response = await axios.post('https://trello.com/1/boards', {name: "BOARD21", token: "6259bdb52661a78003494f6b/1p3LdczbF8Q8FRiZ6jSyYe2Msrjv3Ux079P81c18DLD11l6hyFmtUxogwmJ34K9F"}, reqConfig);
    id = response.data.id;
    }
    