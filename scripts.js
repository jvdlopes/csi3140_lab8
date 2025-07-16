var table = document.getElementById("tableID");
var tableLength = 1;
var orders = [];

    

function renderList(){
    window.alert(orders.length);
    table.innerHTML = "";
    tableLength = 1;
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    cell1.innerHTML = "<th><b>Order ID</b></th>";
    cell2.innerHTML = "<th><b>Customer</b></th>";
    cell3.innerHTML = "<th><b>Dish</b></th>";
    cell4.innerHTML = "<th><b>Qty</b></th>";
    cell5.innerHTML = "<th><b>Price</b></th>";
    cell6.innerHTML = "<th><b>Total</b></th>";
    cell7.innerHTML = "<th><b>Time</b></th>";

    for(var x = 0; x< orders.length;x++){
        var currOrder = orders[x];
        var row = table.insertRow(tableLength);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        cell1.innerHTML = currOrder.id;
        cell2.innerHTML = currOrder.customer;
        cell3.innerHTML = currOrder.dish;
        cell4.innerHTML = currOrder.qty;
        cell5.innerHTML = currOrder.price;
        cell6.innerHTML = currOrder.total;
        cell7.innerHTML = currOrder.time;
        tableLength++;
    }


}


document.addEventListener("DOMContentLoaded", function(e) {
    const importXML = document.getElementById('importXML');
    importXML.addEventListener("click", function(e){
        exportXML();
    });
});
function placeOrder(){
    var name = document.getElementById("customerName");
    //window.alert(name.value);
    var dish = document.getElementById("selectedDish");
    
    //window.alert(dish.value);
    var quantity = document.getElementById("quantityID");
    var qtyNum = Number(quantity.value);
    //window.alert(quantity.value);

    if(dish.value == 1){
        var price = 3.00;
    }
    else if(dish.value == 2){
        var price = 21.00;
    }
    else if(dish.value == 3){
        var price = 3.50;
    }
    else if(dish.value == 4){
        var price = 2.50;
    }
    else if(dish.value == 5){
        var price = 4.50;
    }
    else if(dish.value == 6){
        var price = 10.00;
    }

    var total = price * qtyNum;

    var d = new Date();

    var temp = {id: orders.length, 
        customer: name.value,
        dish: dish.value,
        qty: qtyNum, 
        price: price, 
        total: total,
        time: d.getTime()};
    window.alert("made it here");
    orders.push(temp);
    
    renderList();
}

async function exportXML(){

    fetch('orders.xml')
    .then((response)=> {
        if (!response.ok) {
            alert(error)            
        }
        return response.text();
    })
.then(function (XMLtext) {

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(XMLtext,'text/xml');
        let ordersFromDoc = xmlDoc.getElementsByTagName('Order');
    for (let i = 0; i < ordersFromDoc.length; i++) {
        
        var temp = {id: ordersFromDoc[i].children[0].innerHTML, 
            customer: ordersFromDoc[i].children[1].innerHTML,
            dish: ordersFromDoc[i].children[2].innerHTML,
            qty: ordersFromDoc[i].children[3].innerHTML, 
            price: ordersFromDoc[i].children[4].innerHTML, 
            total: ordersFromDoc[i].children[5].innerHTML,
            time: ordersFromDoc[i].children[6].innerHTML};

            orders.push(temp);
            
        }
        renderList();
    })


    .catch(error => {
        window.alert('There was a problem with converting xmltext to xml document');
        alert(error)
    })

    
}