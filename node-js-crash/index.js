const { generateRandomNumber, celsiusToFahrenheit } = require("./utils");

console.log(process.env.LANGUAGE);
console.log(`Random number: ${generateRandomNumber()}`);
const celsius = generateRandomNumber();
console.log(
  `Celsius to fahrenheit: ${celsius}C is ${celsiusToFahrenheit(celsius)}F`
);
