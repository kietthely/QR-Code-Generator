/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";

import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
      name: "url",
      message: "Enter a URL",
    },
  ])
  .then((answers) => {
    var qr_code = qr.image(answers.url, { type: "png" });
    qr_code.pipe(fs.createWriteStream("qr-code.png"));
    console.log("QR code saved as qr-code.png");
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong", error);
    }
  });
