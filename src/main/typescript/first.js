/**
 * Created by Hey on 4 Feb 2016
 */
var Student = (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return Student;
})();
function FunctionPerson(firstName, lastName) {
    var size = firstName.length + lastName.length;
    this.fullName = firstName + " " + lastName;
    this.getSize = function () {
        return size;
    };
}
function greeter(person) {
    return "Hello, " + person;
}
var user = new Student("f", "l");
var functionUser = new FunctionPerson("f2", "l2");
console.log(greeter(user));
console.log(functionUser.fullName + ", " + functionUser.getSize());
//# sourceMappingURL=first.js.map