'use strict'

export default class Todo {

    constructor(todo, completed = false) {
        this.todo = todo;
        this.completed = completed;
    }

    complete() {
        this.completed = true;
    }

    toString() {
        return `[${this.completed ? 'x' : ' '}] ${this.todo}`;
    }
}