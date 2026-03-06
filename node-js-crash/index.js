import posts, {
  generateRandomNumber,
  celsiusToFahrenheit,
  getPostsLenght,
} from "./utils.js";

// Can access freely the process global object
console.log(process.env.LANGUAGE);

// Can use multiple named exports
console.log(`Random number: ${generateRandomNumber()}`);
const celsius = generateRandomNumber();
console.log(
  `Celsius to fahrenheit: ${celsius}C is ${celsiusToFahrenheit(celsius)}F`
);

// Can use a default export
console.log(posts);
console.log(`Posts length: ${getPostsLenght()}`);
