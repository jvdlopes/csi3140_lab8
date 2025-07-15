var table = document.getElementById("tableID");
var tableLength = 1;
var orders = [];

//test creation
var row = table.insertRow(tableLength + 1);
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);
var cell7 = row.insertCell(6);
cell1.innerHTML = "1";
cell2.innerHTML = "2";
cell3.innerHTML = "3";
cell4.innerHTML = "4";
cell5.innerHTML = "5";
cell6.innerHTML = "6";
cell7.innerHTML = "7";

function renderList(){
    for(var x = 0; x< orders.length;x++){
        
    }

    var row = table.insertRow(tableLength);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.innerHTML = "1";
    cell2.innerHTML = "2";
    cell3.innerHTML = "3";
    cell4.innerHTML = "4";
    cell5.innerHTML = "5";
    cell6.innerHTML = "6";
    cell7.innerHTML = "7";

}

function createOrder(){

}

function placeOrder(){
    
}