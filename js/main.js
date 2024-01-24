
var addBtn=document.getElementById("addBtn");
var searchInput=document.getElementById("searchInput");
var nameInput=document.getElementById("name");
var categoryInput=document.getElementById("category");
var priceInput=document.getElementById("price");
var descInput=document.getElementById("desc");
var inputs=document.getElementsByClassName("form-control");
var products=[];
var nameAlert=document.getElementById("nameAlert");
var categoryAlert=document.getElementById("categoryAlert");
var priceAlert=document.getElementById("priceAlert");
var descAlert=document.getElementById("descAlert");


if(JSON.parse(localStorage.getItem("productsList"))!=null) //false
{
   products=JSON.parse(localStorage.getItem("productsList"));
   displayProducts()
}
addBtn.onclick=function()
{

   addProduct();
   displayProducts();
   resetForm()
}
function addProduct(){
    var product=
    { 
        name:nameInput.value,
        category:categoryInput.value,
        price:priceInput.value,
        desc:descInput.value
    }
    products.push(product); 
    localStorage.setItem("productsList",JSON.stringify(products));
    
}
function displayProducts(){
    var trs="";
    for(var i=0;i<products.length;i++){
        trs+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].category}</td>
        <td>${products[i].price}</td>
        <td>${products[i].desc}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=trs
}
function resetForm()
{
   for(var i=0;i<inputs.length;i++)
   {
       inputs[i].value="";
       addBtn.disabled="true";
       nameInput.classList.remove("is-valid");
       categoryInput.classList.remove("is-valid");
       priceInput.classList.remove("is-valid");
       descInput.classList.remove("is-valid");
   }
}
function deleteProduct(index)
{
  products.splice(index,1);
  displayProducts();
  localStorage.setItem("productsList",JSON.stringify(products));
}
searchInput.onkeyup=function()
{
    var val=searchInput.value;
    var trs="";
    for(var i=0;i<products.length;i++){
        if(products[i].name.toLowerCase().includes(val.toLowerCase()))  
        {
            trs+=
            `
            <tr>
            <td>${i+1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].category}</td>
            <td>${products[i].price}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
            </tr>
            `
        }
       
    }
    document.getElementById("tableBody").innerHTML=trs
}

nameInput.onkeyup=function()
{
   var nameRejex=/(^[A-Z][a-z]{2,6}$)+/;
   if((!nameRejex.test(nameInput.value))) //false
   {
    //   addBtn.disabled="true";
      nameInput.classList.add("is-invalid");
      nameInput.classList.remove("is-valid");
      nameAlert.classList.remove("d-none")
   }
   else{
    //    addBtn.removeAttribute("disabled");
       nameInput.classList.add("is-valid");
       nameInput.classList.remove("is-invalid");
       nameAlert.classList.add("d-none")
   }
}
categoryInput.onkeyup=function(){
    var categoryRejex=/^[a-zA-Z]+/;
    if(!categoryRejex.test(categoryInput.value)){
        // addBtn.disabled="true";
        categoryInput.classList.add("is-invalid");
        categoryInput.classList.remove("is-valid");
        categoryAlert.classList.remove("d-none")
    }
    else{
        // addBtn.removeAttribute("disabled");
        categoryInput.classList.add("is-valid");
        categoryInput.classList.remove("is-invalid");
        categoryAlert.classList.add("d-none")
    }
}
priceInput.onkeyup=function(){
    var priceRejex=/(^(\d*([.,](?=\d{3}))?\d+)+((?!\2)[.,]\d\d)?$)+/;
    if(!priceRejex.test(priceInput.value)){
        // addBtn.disabled="true";
        priceInput.classList.add("is-invalid");
        priceInput.classList.remove("is-valid");
        priceAlert.classList.remove("d-none");
    }
    else{
        // addBtn.removeAttribute("disabled");
        priceInput.classList.remove("is-invalid");
        priceInput.classList.add("is-valid");
        priceAlert.classList.add("d-none");
    }
}
descInput.onkeyup=function(){
    var descRejex=/^[a-zA-Z]+/;
    if(!descRejex.test(descInput.value)){
        // addBtn.disabled="true";
        descInput.classList.add("is-invalid");
        descInput.classList.remove("is-valid");
        descAlert.classList.remove("d-none");
    }
    else{
        addBtn.removeAttribute("disabled");
        descInput.classList.remove("is-invalid");
        descInput.classList.add("is-valid");
        descAlert.classList.add("d-none");
    }
}

