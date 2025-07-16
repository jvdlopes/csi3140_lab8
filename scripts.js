var table = document.getElementById("tableID");
var tableLength = 1;
var orders = [];
var fries = 3.00;
var grilled = 21.00;
var ice = 3.50;
var lemonade = 2.50;
var tomato = 4.50;
var vegetable = 6.00;
    

function renderList(){
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
        window.alert("");
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
        cell6.innerHTML = (currOrder.price * currOrder.qty).toFixed(2);
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
    var dish = document.getElementById("selectedDish");
    var quantity = document.getElementById("quantityID");
    var qtyNum = Number(quantity.value);

    if(dish.value == 1){
        var price = fries;
    }
    else if(dish.value == 2){
        var price = grilled;
    }
    else if(dish.value == 3){
        var price = ice;
    }
    else if(dish.value == 4){
        var price = lemonade;
    }
    else if(dish.value == 5){
        var price = tomato;
    }
    else if(dish.value == 6){
        var price = vegetable;
    }

    var total = price * qtyNum;

    var d = getLocalISODateTime();

    var temp = {id: orders.length +1, 
        customer: name.value,
        dish: dish.value,
        qty: qtyNum, 
        price: price, 
        total: total,
        time: d};
    orders.push(temp);
    
    renderList();
}

function getLocalISODateTime() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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
        var tempprice = ordersFromDoc[i].children[3].innerHTML;
        var tempqty = ordersFromDoc[i].children[2].innerHTML;
        var temp = {id: orders.length+1, 
            customer: ordersFromDoc[i].children[0].innerHTML,
            dish: ordersFromDoc[i].children[1].innerHTML,
            qty: ordersFromDoc[i].children[2].innerHTML, 
            price: ordersFromDoc[i].children[3].innerHTML, 
            total: (tempprice*tempqty).toFixed(2),
            time: ordersFromDoc[i].children[4].innerHTML};

            orders.push(temp);
            
        }
        renderList();
    })


    .catch(error => {
        window.alert('There was a problem with converting xmltext to xml document');
        alert(error)
    })

    
}

function editList(){
    var currdish = document.getElementById("dishID");
    var newPrice = document.getElementById("priceID");
    if(currdish.value == 1){
        fries = newPrice.value;
    }
    else if(currdish.value == 2){
        grilled = newPrice.value;
    }
    else if(currdish.value == 3){
        ice = newPrice.value;
    }
    else if(currdish.value == 4){
        lemonade = newPrice.value;
    }
    else if(currdish.value == 5){
        tomato = newPrice.value;
    }
    else if(currdish.value == 6){
        vegetable = newPrice.value;
    }

    for(var x = 0; x<orders.length;x++){
        if(orders[x].dish ==currdish.value){
            orders[x].price = newPrice.value;
        }
    }

    renderList();
}