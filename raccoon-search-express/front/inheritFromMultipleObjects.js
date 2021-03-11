// 객체 A - 1

function Person(say) {
  this.say = say;
}

Person.prototype.play = function () {
  return `${this.say} piano`;
};

// 객체 A - 2

function Animal(eat) {
  this.eat = eat;
}

Animal.prototype.hunting = function () {
  return `hunting for ${this.eat}`;
};

// 객체 B

function Raccoon(say, eat, doing) {
  Person.call(this, say);
  Animal.call(this, eat);

  this.doing = doing;
}

Raccoon.prototype = Object.create(Person.prototype);
Object.assign(Raccoon.prototype, Animal.prototype);
Raccoon.prototype.constructor = Raccoon;

Raccoon.prototype.do = function () {
  return `${this.say} ${this.eat} ${this.doing}`;
};

const raccoon = new Raccoon('yeah', 'cottonCandy', 'dive');
console.log(raccoon.play());
console.log(raccoon.hunting());
console.log(raccoon.do());

console.dir(Raccoon);
