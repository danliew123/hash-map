export class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    if (!this.head) return null;
    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    return tail;
  }

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    }
    let tail = this.getTail();
    tail.next = new Node(value);
    return tail;
  }

  prepend(value) {
    if (!this.head) {
      this.head = new Node(value);
      return this;
    }
    const prevHead = this.head;
    this.head = new Node(value, prevHead);
  }

  size() {
    let counter = 0;
    let nextNode = this.head;
    while (nextNode !== null) {
      nextNode = nextNode.next;
      counter++;
    }
    return counter;
  }

  at(index) {
    if (!this.head) return null;

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  pop() {
    if (!this.head) return this;

    if (!this.head.next) {
      this.head = null;
      return this;
    }

    let pointerBeforeTail = this.at(this.size() - 2);
    console.log(pointerBeforeTail);
    pointerBeforeTail.next = null;
    return this;
  }

  contains(value) {
    if (!this.head) return this;

    let currentNode = this.head;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return true;
      }
      currentNode = currentNode.next;
    }
    return false;
  }

  find(value) {
    if (!this.head) return this;

    let index = 0;
    let currentNode = this.head;
    while (currentNode !== null) {
      if (value === currentNode.value) {
        return index;
      }
      index++;
      currentNode = currentNode.next;
    }
  }

  toString() {
    if (!this.head) return this;

    let output = "";
    let currentNode = this.head;
    while (currentNode.next !== null) {
      output = `${output} ( ${currentNode.value} ) ->`;
      currentNode = currentNode.next;
    }
    return `${output} ( ${currentNode.value} ) -> null`;
  }
}

// let list = new LinkedList(new Node("hi"));
// list.append("im");
// list.append("dig");
// list.prepend("hey");

// console.log(list.toString());
