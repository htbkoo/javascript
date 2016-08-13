/**
 * Created by Hey on 13 Aug 2016
 */
/*

 https://www.codewars.com/kata/multiplication-tables/train/javascript

 Create a function that accepts dimensions, of Rows x Columns, as parameters in order to create a multiplication table sized according to the given dimensions. **The return value of the function must be an array, and the numbers must be Fixnums, NOT strings.

 Example:

 multiplication_table(3,3)

 1 2 3
 2 4 6
 3 6 9

 -->[[1,2,3],[2,4,6],[3,6,9]]

 Each value on the table should be equal to the value of multiplying the number in its first row times the number in its first column.

 * */

module.exports =
    function multiplicationTable(row, col) {
        "use strict";
        //your code here
        var i, j;
        var table = [], r = [];
        for (i = 1; i <= row; ++i) {
            r = [];
            for (j = 1; j <= col; ++j) {
                r.push(i*j);
            }
            table.push(r);
        }
        return table;
    };
