'use strict'

import fs from 'fs';

export default class TodoList {
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

    write(filename, data) {
        try {
            fs.writeFileSync(filename, data);
        }
        catch (err) {
            throw new Error('Sikertelen fájlbevitel.');
        }
    }

    getTodosFileName() {
        const filePath = "data/listOfTodos.json"
        return filePath;
    }

    printDescription() {
        console.log(this.read("data/userGuide.txt"));
    }

    getList() {
        return JSON.parse(this.read(this.getTodosFileName()));
    }

    printTodoList() {
        let todoContent = this.getList();
        if (todoContent.length === 0) {
            console.log("Nincs mára tennivalód! :)");
        } else {
            for (let index = 0; index < todoContent.length; index++) {
                console.log(`${index + 1} - ${todoContent[index]}`);
            }
        }
    }

    addTodo(text) {
        let todoList = this.getList();
        todoList.push(text);
        const myJSON = JSON.stringify(todoList);
        this.write(this.getTodosFileName(), myJSON);
    }

    runArgument() {
        switch (this.args[0]) {
            case ("-l" || "--list"):
                this.printTodoList();
                break;
            case ("-a"):
                this.addTodo(this.args[1])
                break;
            default:
                this.printDescription();
                break;
        }
    }

    print(string) {
        console.log(string);
    }

    run() {
        return this.runArgument();
    }
}