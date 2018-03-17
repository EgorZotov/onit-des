// var inquirer = require('inquirer');

// var questions = [
//   {
//     type: 'input',
//     name: 'text',
//     message: "Введите текст, который вы хотите зашифровать"
//   },
//   {
//     type: 'input',
//     name: 'last_name',
//     message: "What's your last name",
//     default: function() {
//       return 'Doe';
//     }
//   },
//   {
//     type: 'input',
//     name: 'phone',
//     message: "What's your phone number",
//     validate: function(value) {
//       var pass = value.match(
//         /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
//       );
//       if (pass) {
//         return true;
//       }

//       return 'Please enter a valid phone number';
//     }
//   }
// ];

// inquirer.prompt(questions).then(answers => {

// });

// inquirer.prompt(questions).then(answers => {

// });

const fs = require('fs');
var stdin = process.openStdin();
console.log('Введите команды :');
console.log("encrypt <text> - зашифровать текст;");
console.log("decrypt - расшифровать файл;");
var assert = require('assert');
var crypto = require('crypto');
var Buffer = require('buffer').Buffer;
var SECRET_KEY = "b3ec2e43a62a3fa9ccdf";
var ENCODING = 'hex';

stdin.addListener("data", function(d) {
    let input_value = d.toString().trim();
    let command = input_value.split(' ')[0];
    let value = input_value.replace(command+' ','');
    switch (command) {
        case "encrypt":
            var cipher = crypto.createCipher('des-ede3-cbc', SECRET_KEY);
            var cryptedText = cipher.update(value, 'utf8', ENCODING);
            cryptedText += cipher.final(ENCODING);
            fs.writeFile("onit_des.txt", cryptedText, function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Текст записан в файл onit_des.txt");
            });
            break;
        case "decrypt":
            fs.readFile('onit_des.txt', 'utf8', function(err, contents) {
                console.log(`Содержимое файла ${contents}`);
                var decipher = crypto.createDecipher('des-ede3-cbc', SECRET_KEY);
                var decryptedText = decipher.update(contents, ENCODING, 'utf8');
                decryptedText += decipher.final('utf8');
                console.log(`Расшифрованное Содержимое ${decryptedText}`);
            });
            break;
        default:
            console.log("Нераспознанная команда");
            break;
    }
});