'use strict'

import fs from 'fs';

export default class TodoList {
    args;

    constructor(args) {
        this.args = args;
    }


    read(filename) {
        let fileContent;
        try {
            fileContent = fs.readFileSync(filename, "utf-8");
        }
        catch (err) {
            return '';
        }
        return fileContent;
    }

    list() {
        console.log(this.read("data/userGuide.txt"));
    }

    readTodoList() {
        let todoContent = this.read("data/listOfTodos.json");
        const todoArr = JSON.parse(todoContent);
        for (let index = 0; index < todoArr.length; index++) {
            console.log(`${index + 1} - ${todoArr[index]}`);
        }
    }

    print(string) {
        console.log(string);
    }


    run() {
        if (this.args.length === 0) {
            return this.list();
        } else if (this.args.includes("-l") || this.args.includes("--list")) {
            return this.readTodoList();
        }
    }
}
