// let colorElement;
// console.log(colorElement);

// colorElement = "asd";

// console.log(colorElement);

// x = "1";
// y = "5";

// console.log(x - y);
// console.log(x / y);
// console.log(x * y);
// console.log(x + y);
// console.log(+x + +y);
// console.log(parseInt(x) + parseInt(y));
// console.log(y ** 2);
// console.log(y ** 2.85);
// console.log(y ** 4.81);

// let isAlive = true;
// if ([]) {
//   console.log("Yes he is alive");
//   console.log(`hmmmm. yes     ${isAlive}, you are dead!`);
// } else {
//   console.log("You died");
// }

// isAlive ? console.log("Yes he is alive") : console.log("You died");

// let answer = prompt("Please provide your answer.");
// if (answer === "Blue") {
//   console.log(
//     "wtf bro you based. What are you an NPC? Everyone likes blue don't be a basic bitch. TEAM RED YOU FUCKER!"
//   );
// } else if (answer === "Red") {
//   console.log("LETS FUCKING GOOO TEAM RED");
// } else if (answer === "Yellow") {
//   console.log("Odd choice... That's my fav too good job bro.");
// } else {
//   console.log("Dumb fuck try again.");
// }

const fizzbuzz = () => {
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else {
      console.log(i);
    }
  }
};

// fizzbuzz();

//% modulo

const rollerCoaster = (age, height) => {
  if (age >= 12) {
    if (height >= 120) {
      console.log("You may enter!");
    } else {
      console.log("Sorry fam you too short.");
    }
    // height >= 120
    //   ? console.log("You may enter!")
    //   : console.log("Sorry fam you too short.");
  } else {
    console.log("Fuck off gnome.");
  }
};

// rollerCoaster(12, 100);
// rollerCoaster(18, 165);
// rollerCoaster(23, 140);
// rollerCoaster(45, 175);
// rollerCoaster(8, 90);

const loopThroughArray = () => {
  const cars = ["volvo", "ford", "renault", "opel"];
  console.log("Total Manufacturers: ", cars.length);

  for (let i = 0; i < cars.length; i++) {
    console.log(cars[i]);
  }
};

loopThroughArray();

const number = [1, 3, 5, 8, 3, 98, 34];
// let bigNumber;
