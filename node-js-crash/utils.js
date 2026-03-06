function generateRandomNumber() {
  return Math.floor(Math.random() * 100 + 1);
}

function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

export { generateRandomNumber, celsiusToFahrenheit };

const posts = [
  { id: 1, title: "Number One" },
  { id: 2, title: "Number Two" },
];

const getPostsLenght = () => posts.length;

export { getPostsLenght };

export default posts;
