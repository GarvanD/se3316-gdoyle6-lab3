var previous_update;
function postToDB(name, loan, quantity, type)
{
    var data = "name="+name+"&loan_period="+loan+"&type="+type+"&quantity="+quantity;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        console.log(this.responseText);
    }
    });

    xhr.open("POST", "http://54.85.159.41:8080/products/create");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}

function addItemSubmit()
{
    //Get inputs
    let item_name = document.getElementById("name").value;
    let loan_period = document.getElementById("loan_period").value;
    let quantity = document.getElementById("quantity").value;
    let type = document.getElementById("type").value;

    //Declare responses
    let name_response ="";
    let loan_response ="";
    let quantity_response ="";
    let type_response ="";
    
    //Define regex
    let regex_alphanumeric = /^[a-zA-Z0-9 ]+$/;
    let regex_numeric = /^[0-9]+$/;

    //Regex results
    let name_test = true;
    let loan_test = regex_numeric.test(loan_period);
    let quantity_test = regex_numeric.test(quantity);
    let type_test = Boolean(type === "book" || type === "cd");

    //Input sanitization
    //Item Name
    if(!name_test)
    {
        name_response = "Item name must be alphanumeric";
        document.getElementById("name").value = "";
    }
    else
    {
        name_response = "Item Name: " + item_name;
    }
    //Loan Period
    if (!loan_test && loan_response !="")
    {
        loan_response = "Loan Period must be numeric";
        document.getElementById("loan_period").value = "";
    }
    else
    {
        if(parseInt(loan_period) > 0 && parseInt(loan_period) <= 365)
        {
            loan_response = "Loan Period: " + loan_period;
        }
        if(parseInt(loan_period) == 0)
        {
            loan_response = "Loan period cannot be 0 days";
        }
        if(parseInt(loan_period) > 365)
        {
            loan_response = "Loan period cannot be greater than 365 days";
        }
    }
    //Quantity
    if(!quantity_test)
    {
        quantity_response = "Quantity must be numeric";
        document.getElementById("quantity").value = "";
    }
    else
    {
        quantity_response = "Quantity: " + quantity;
    }
    //Type
    if(!type_test)
    {
        type_response = "Type must be either Book or CD";
        document.getElementById("type").value = "";
    }
    else
    {
        type_response = "Type: " + type;
    }
    
    //Confirm with user
    let response_msg;
    if(type_test && name_test && quantity_test)
    {
        response_msg = "Attempt to add new item.\n" + name_response + "\n" + loan_response + "\n"  + quantity_response + "\n"  + type_response + "\n";
        if(confirm(response_msg))
        {
            document.getElementById("name").value = "";
            document.getElementById("loan_period").value = "";
            document.getElementById("quantity").value = "";
            document.getElementById("type").value = "";
            postToDB(item_name,loan_period,quantity,type);
        }

    }
    else
    {
        response_msg = "Error with input.\n" + name_response + "\n" + loan_response + "\n"  + quantity_response + "\n"  + type_response + "\n";
        alert(response_msg);
    }
    

}

function fixHTML(e) {
    return e.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function update()
{
    while(true){
        updateAllItems();
        await sleep(2000);
    }
}

function updateAllItems()
{
    window.fetch("http://54.85.159.41:8080/products", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        if (!(JSON.stringify(data) == JSON.stringify(previous_update)))
        {
            document.getElementById("available-items").innerHTML = "";
            for (var i = 0; i < data.length; i++)
            {
                let msg = data[i].name + " | " + data[i].type + " | " + data[i].loan_period + " | " + data[i].quantity + " | " + data[i]._id;
                let item = document.createElement("li");
                item.appendChild(document.createTextNode(fixHTML(msg)));
                document.getElementById("available-items").appendChild(item);
                document.getElementById("available-items").appendChild(document.createElement("br"));
                previous_update = data;
            }
        }
        })
    
}

function getItemByID()
{
    document.getElementById("search-results").innerHTML = "";
    let id = document.getElementById("search").value;
    document.getElementById("search").value = "";
    window.fetch("http://54.85.159.41:8080/products/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
      let name = document.createTextNode("Item Name: " + data.name);
      let type = document.createTextNode("Type: " + data.type);
      let loan_period = document.createTextNode("Loan Period: " + data.loan_period);
      let quantity = document.createTextNode("Quantity: " + data.quantity);
      let id = document.createTextNode("ID: " + data._id);
      document.getElementById("search-results").appendChild(name);
      document.getElementById("search-results").appendChild(document.createElement("br"));
      document.getElementById("search-results").appendChild(type);
      document.getElementById("search-results").appendChild(document.createElement("br"));
      document.getElementById("search-results").appendChild(loan_period);
      document.getElementById("search-results").appendChild(document.createElement("br"));
      document.getElementById("search-results").appendChild(quantity);
      document.getElementById("search-results").appendChild(document.createElement("br"));
      document.getElementById("search-results").appendChild(id);
    }
    )
}

function getInfoByID()
{
    var name;
    var type;
    var loan;
    var quantity;
    let id = document.getElementById("id").value;
    window.fetch("http://54.85.159.41:8080/products/"+id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("name").disabled = false;
        document.getElementById("loan_period").disabled = false;
        document.getElementById("type").disabled = false;
        document.getElementById("quantity").disabled = false;
        name = data.name;
        type = data.type;
        loan = data.loan_period;
        quantity = data.quantity;
        document.getElementById("name").value = name;
        document.getElementById("loan_period").value = loan;
        document.getElementById("type").value = type;
        document.getElementById("quantity").value = quantity;
        
    })
    .catch(response => {
        alert("Could not find item!");
    })
        
    
}

function editInfo()
{
    var name = document.getElementById("name").value;
    var type = document.getElementById("type").value
    var loan = document.getElementById("loan_period").value;
    var quantity = document.getElementById("quantity").value;
    let id = document.getElementById("id").value;
    var data = "name="+name+"&type="+type+"&loan_period="+loan+"&quantity="+quantity;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        alert(this.responseText);
      }
    });
    
    xhr.open("PUT", "http://54.85.159.41:8080/products/"+id+"/update");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    
    xhr.send(data);
    document.getElementById("name").disabled = true;
    document.getElementById("loan_period").disabled = true;
    document.getElementById("type").disabled = true;
    document.getElementById("quantity").disabled = true;
    
    document.getElementById("name").value = "";
    document.getElementById("loan_period").value = "";
    document.getElementById("type").value = "";
    document.getElementById("quantity").value = "";
}

function deleteByID()
{
    let id = document.getElementById("id").value;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("DELETE", "http://54.85.159.41:8080/products/"+id+"/delete");
    xhr.setRequestHeader("Accept", "*/*");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("cache-control", "no-cache");
    document.getElementById("name").disabled = true;
    document.getElementById("loan_period").disabled = true;
    document.getElementById("type").disabled = true;
    document.getElementById("quantity").disabled = true;
    document.getElementById("name").value = "";
    document.getElementById("loan_period").value = "";
    document.getElementById("type").value = "";
    document.getElementById("quantity").value = "";
    
    xhr.send(null);
    alert("Deleted ID: " + id);
    
    
}


