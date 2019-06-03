/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');
var contact = [];
function loadFile(){
    var contentFile = fs.readFileSync('./data.json','utf8');
    var contentFileObject = JSON.parse(contentFile);
    contact = contentFileObject;
}

function showContact(){
    console.log("1. Add a person to the Contact");
    console.log("2. Edit a person in the Contact");
    console.log("3. Remove a person in the Contact");
    console.log("4. Filter a person in the Contact");
    console.log("5. Show all Contact");
    console.log("6. Exit program");
    var choice = readlineSync.question("Choice your is: ");
    switch(choice){
        case '1':
            createAPerson();
            showContact();
            break;
        case '2':
            editAPerson();
            showContact();
            break;
        case '3':
            removeAPerson();
            showContact();
            break;
        case '4':
            filterAPerson();
            showContact();
            break;
        case '5':
            showContacts();
            showContact();
            break;
        case '6':
            exitProgram();
            break;
        default:
            console.log("You choice Wrong! ");
    }
}
//FUNCTIONS SUPORT MAIN

//That is function save file
function saveFile(){
    var changeDataContactToSting = JSON.stringify(contact);
    fs.writeFileSync('./data.json',changeDataContactToSting);
}
//That is function show contact
function showContacts(){
    console.log("STT \t Name \t Phone");
    var index = 0;
   for(var person of contact){
       index++;
       console.log(index+"\t"+person.name+"\t"+person.phone);
   }
}



//FUNCTIONS MAIN
//Function tạo 1 người trong danh bạ
function createAPerson(){
    var name = readlineSync.question("Name: ");
    var phone = readlineSync.question("Phone: ");
    var contentPhone = {
        name: name,
        phone: phone
    }
    contact.push(contentPhone);
    saveFile();
}
// Function sửa 1 người trong danh bạ
function editAPerson(){
    showContacts();
    console.log("---Program edit a person in the contact---");
    var index = 0;
    var choiceEditPhoneNumber = readlineSync.question("Choice STT Phone Number your wanna edit: ");
    for (var person of contact){
        index++;
        console.log(person.name);
        if(choiceEditPhoneNumber == index){
            var nameEdit = readlineSync.question("Name your wanna edit: ");
            var phoneEdit = readlineSync.question("Phonenumber your wanna edit: ");
            var contentPhoneNumberEdit = {
                name: nameEdit,
                phone: phoneEdit
            }
            person.name = contentPhoneNumberEdit.name;
            person.phone = contentPhoneNumberEdit.phone;
            saveFile();
            break;
        }
    }
    showContacts();
}

function removeAPerson(){
    showContacts();
    console.log("---Program remove a person in the contact---");
    var choiceRemovePhoneNumber = readlineSync.question("Choice STT Phone Number your wanna remove: ");
    var index = 0;
    for(var person of contact){
        index++;
        if(choiceRemovePhoneNumber == index){
            delete person.name;
            delete person.phone;
            index--;
            break;
        }
    }
    
    showContacts();
}
function main(){
    loadFile();
    console.log("-------REMOVE CONTACT---------");
    removeAPerson();
    console.log("------------CONTACT-----------");
    console.log(contact);
    console.log(typeof contact);
    // editAPerson();
    // showContacts();
    // console.log(contact[0]);
    // console.log(typeof contact);
    // createAPerson();
    
}
main();