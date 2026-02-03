function getReceipt() {
    // This initializes our string so it can get passed from
    // function to function, growing line by line into a full receipt
    var text1 = "<h3>You Ordered:</h3>";
    var runningTotal = 0;
    var sizeTotal = 0;
    var sizeArray = document.getElementsByName("size");
    var selectedSize = "";
    
    for (var i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            selectedSize = sizeArray[i].value;
            text1 = text1 + selectedSize + "<br>";
            break;
        }
    }
    
    if (selectedSize === "Personal") {
        sizeTotal = 6;
    } else if (selectedSize === "Small") {
        sizeTotal = 8;
    } else if (selectedSize === "Medium") {
        sizeTotal = 10;
    } else if (selectedSize === "Large") {
        sizeTotal = 14;
    } else if (selectedSize === "Extra Large") {
        sizeTotal = 16;
    }
    
    runningTotal = sizeTotal;
    console.log(selectedSize + " = $" + sizeTotal + ".00");
    console.log("Size Text1: " + text1);
    console.log("Subtotal: $" + runningTotal + ".00");
    // These variables will get passed on to each function
    getMeat(runningTotal, text1);
}

function getMeat(runningTotal, text1) {
    var toppingTotal = 0;
    var selectedTopping = [];
    var toppingArray = document.querySelectorAll('input[type="checkbox"][name="meat"]');

    for (var j = 0; j < toppingArray.length; j++) {
        if (toppingArray[j].checked) {
            selectedTopping.push(toppingArray[j].value);
            console.log("Selected topping item: (" + toppingArray[j].value + ")");
            text1 = text1 + toppingArray[j].value + "<br>";

            var price = 0;
            var dataPrice = toppingArray[j].getAttribute("data-price");
            if (dataPrice !== null) {
                price = parseFloat(dataPrice);
            } else {
                var onclickAttr = toppingArray[j].getAttribute("onclick");
                var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
                if (match) {
                    price = parseFloat(match[1]);
                }
            }

            if (!isNaN(price)) {
                toppingTotal += price;
            }
        }
    }

    runningTotal = runningTotal + toppingTotal;

    console.log("Total selected meat items: " + selectedTopping.length);
    console.log("Meats cost = $" + toppingTotal.toFixed(2));
    console.log("Meat Text1: " + text1);
    console.log("Running Total: $" + runningTotal.toFixed(2));
    
    // Pass to next function
    getVeggies(runningTotal, text1);
}

function getVeggies(runningTotal, text1) {
    var veggieTotal = 0;
    var selectedVeggies = [];
    var veggieArray = document.querySelectorAll('input[type="checkbox"][name="veggies"]');

    for (var k = 0; k < veggieArray.length; k++) {
        if (veggieArray[k].checked) {
            selectedVeggies.push(veggieArray[k].value);
            console.log("Selected veggie item: (" + veggieArray[k].value + ")");
            text1 = text1 + veggieArray[k].value + "<br>";

            var price = 0;
            var dataPrice = veggieArray[k].getAttribute("data-price");
            if (dataPrice !== null) {
                price = parseFloat(dataPrice);
            } else {
                var onclickAttr = veggieArray[k].getAttribute("onclick");
                var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
                if (match) {
                    price = parseFloat(match[1]);
                }
            }

            if (!isNaN(price)) {
                veggieTotal += price;
            }
        }
    }

    runningTotal = runningTotal + veggieTotal;

    console.log("Total selected veggie items: " + selectedVeggies.length);
    console.log("Veggies cost = $" + veggieTotal.toFixed(2));
    console.log("Veggie Text1: " + text1);
    console.log("Running Total: $" + runningTotal.toFixed(2));
    
    // Pass to next function
    getSauces(runningTotal, text1);
}

function getSauces(runningTotal, text1) {
    var sauceTotal = 0;
    var selectedSauces = [];
    var sauceArray = document.querySelectorAll('input[type="checkbox"][name="sauces"]');

    for (var m = 0; m < sauceArray.length; m++) {
        if (sauceArray[m].checked) {
            selectedSauces.push(sauceArray[m].value);
            console.log("Selected sauce item: (" + sauceArray[m].value + ")");
            text1 = text1 + sauceArray[m].value + "<br>";

            var price = 0;
            var dataPrice = sauceArray[m].getAttribute("data-price");
            if (dataPrice !== null) {
                price = parseFloat(dataPrice);
            } else {
                var onclickAttr = sauceArray[m].getAttribute("onclick");
                var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
                if (match) {
                    price = parseFloat(match[1]);
                }
            }

            if (!isNaN(price)) {
                sauceTotal += price;
            }
        }
    }

    runningTotal = runningTotal + sauceTotal;

    console.log("Total selected sauce items: " + selectedSauces.length);
    console.log("Sauces cost = $" + sauceTotal.toFixed(2));
    console.log("Sauce Text1: " + text1);
    console.log("Purchase Total: $" + runningTotal.toFixed(2));

    var orderSummaryEl = document.getElementById("orderSummary");
    var totalPriceEl = document.getElementById("totalPrice");
    var totalTextEl = document.getElementById("totalText");
    
    if (orderSummaryEl) {
        orderSummaryEl.innerHTML = text1;
    }
    if (totalPriceEl) {
        totalPriceEl.textContent = runningTotal.toFixed(2);
    }
    // Change "Subtotal:" to "Total:" when order is placed
    if (totalTextEl) {
        totalTextEl.innerHTML = 'Total: $<span id="totalPrice">' + runningTotal.toFixed(2) + '</span>';
    }
}

function updatePrice() {
    // Calculate and update the running total dynamically
    var runningTotal = 0;
    
    // Get size price
    var sizeArray = document.getElementsByName("size");
    for (var i = 0; i < sizeArray.length; i++) {
        if (sizeArray[i].checked) {
            var onclickAttr = sizeArray[i].getAttribute("onclick");
            var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
            if (match) {
                runningTotal += parseFloat(match[1]);
            }
            break;
        }
    }
    
    // Get meat toppings price
    var meatArray = document.querySelectorAll('input[type="checkbox"][name="meat"]');
    for (var j = 0; j < meatArray.length; j++) {
        if (meatArray[j].checked) {
            var onclickAttr = meatArray[j].getAttribute("onclick");
            var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
            if (match) {
                runningTotal += parseFloat(match[1]);
            }
        }
    }
    
    // Get veggie toppings price
    var veggieArray = document.querySelectorAll('input[type="checkbox"][name="veggies"]');
    for (var k = 0; k < veggieArray.length; k++) {
        if (veggieArray[k].checked) {
            var onclickAttr = veggieArray[k].getAttribute("onclick");
            var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
            if (match) {
                runningTotal += parseFloat(match[1]);
            }
        }
    }
    
    // Get sauce toppings price
    var sauceArray = document.querySelectorAll('input[type="checkbox"][name="sauces"]');
    for (var m = 0; m < sauceArray.length; m++) {
        if (sauceArray[m].checked) {
            var onclickAttr = sauceArray[m].getAttribute("onclick");
            var match = onclickAttr ? onclickAttr.match(/updatePrice\(([-\d.]+)\)/) : null;
            if (match) {
                runningTotal += parseFloat(match[1]);
            }
        }
    }
    
    // Update the display
    var totalPriceEl = document.getElementById("totalPrice");
    if (totalPriceEl) {
        totalPriceEl.textContent = runningTotal.toFixed(2);
    }
}