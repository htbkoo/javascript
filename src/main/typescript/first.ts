/**
 * Created by Hey on 4 Feb 2016
 */

class Student {
    fullName:string;

    constructor(public firstName, public lastName) {
        this.fullName = firstName + " " + lastName;
    }
}

function FunctionPerson(firstName:string, lastName:string) {
    var size = firstName.length + lastName.length;
    this.fullName = firstName + " " + lastName;
    this.getSize = function () {
        return size;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person:Person) {
    return "Hello, " + person;
}

var user = new Student("f", "l");
var functionUser = new FunctionPerson("f2", "l2");

console.log(greeter(user));
console.log(functionUser.fullName + ", " + functionUser.getSize());