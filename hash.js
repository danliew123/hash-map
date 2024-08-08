import LinkedList from "./linked-lists.js";
import { Node } from "./linked-lists.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.occupied = 0;
    this.bucketsArray = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashKey = 0;
    const prime = 11;
    for (let i = 0; i < key.length; i += 1) {
      hashKey += key.charCodeAt(i) * prime;
    }
    return hashKey % this.bucketsArray.length;
  }

  resize() {
    if (this.occupied >= this.capacity * this.loadFactor) {
      let arr = Object.keys(this);
      for (let i = 0; i < arr.length - 4; i++) {
        delete this[arr[i]];
      }
      let oldArr = this.entries();
      this.capacity *= 2;
      this.bucketsArray = new Array(this.capacity).fill(null);
      this.occupied = 0;
      oldArr.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
      console.log(this);
    }
  }

  set(key, value) {
    this.resize();
    let keyHash = this.hash(key);
    if (this[keyHash] === undefined && this.bucketsArray[keyHash] === null) {
      this[keyHash] = new LinkedList(new Node(value));
      this.bucketsArray[keyHash] = new LinkedList(new Node([key, value]));
    } else {
      this[keyHash].append(value);
      this.bucketsArray[keyHash].append([key, value]);
    }
    this.occupied += 1;
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    } else {
      return this[this.hash(key)];
    }
  }

  has(key) {
    let keyHash = this.hash(key);
    return this.hasOwnProperty(`${keyHash}`);
  }

  remove(key) {
    let keyHash = this.hash(key);
    if (!this.has(key)) {
      return false;
    } else {
      delete this[keyHash];
      this.bucketsArray[keyHash] = null;
      this.occupied -= 1;
      return true;
    }
  }

  length() {
    return this.occupied;
  }

  clear() {
    let arr = Object.keys(this);
    console.log(arr);
    for (let i = 0; i < arr.length - 4; i++) {
      delete this[arr[i]];
    }
    this.bucketsArray = new Array(16).fill(null);
    this.occupied = 0;
    console.log("cleared!");
  }

  keys() {
    return Object.keys(this);
  }

  values() {
    let values = [];
    let arr = Object.keys(this);
    for (let i = 0; i < arr.length - 4; i++) {
      values.push(this[arr[i]].head.value);
      let nextNode = this[arr[i]].head.next;
      while (nextNode !== null) {
        values.push(nextNode.value);
        nextNode = nextNode.next;
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    let arr = this.bucketsArray;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        entries.push(arr[i].head.value);
        let nextNode = arr[i].head.next;
        while (nextNode !== null) {
          entries.push(nextNode.value);
          nextNode = nextNode.next;
        }
      }
    }
    return entries;
  }
}

let test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("kite", "pink");
test.set("kite", "pink");

console.log(test.has("ice ceam"));

console.log(test.get("jacket"));

console.log(test.values());
console.log(test.entries());

test.set("ice cream", "bllllack");

console.log(test);

console.log(test.entries());
