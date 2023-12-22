var arr=[];
var saveArr=[];
getProducts();
getsaveforlater();


async function getProducts(){
    let response = await fetch('http://localhost:3000/products');
    let responseText = await response.text();
    arr= await JSON.parse(responseText);
    console.log(arr);
    DisplayProducts(arr);
}

async function getsaveforlater(){
    let response = await fetch('http://localhost:3000/saveforLater');
    let responseText = await response.text();
    saveArr= await JSON.parse(responseText);
    DisplaySaveForLater(saveArr);    
}

function DisplayProducts(arr){
    for(let i=0;i<arr.length;i++){
        document.getElementById("products").innerHTML+=`
        <div class="card m-3 border-info bg-info-subtle" style="width: 18rem;">
            <img class="card-img-top" src="${arr[i].thumbnail}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${arr[i].title}</h5>
                <ul>
                    <li>price : ${arr[i].price}</li>
                    <li>description : ${arr[i].description}</li>
                    <li>Discount Percentage : ${arr[i].discountPercentage}</li>
                    <li>rating : ${arr[i].rating}</li>
                    <li>stock : ${arr[i].stock}</li>
                    <li>brand : ${arr[i].brand}</li>
                    <li>category : ${arr[i].category}</li>
                <ul>
                <button id="${arr[i].id}" class="btn btn-primary" onClick="addsaveforlater(this.id)">Add to save later</button>
            </div>
        </div>
    `
    }
    
}

function DisplaySaveForLater(saveArr){
    for(let i=0;i<saveArr.length;i++){
        document.getElementById("saveforlater").innerHTML+=`
        <div class="card m-3 border-info bg-info-subtle" style="width: 18rem;">
        <img class="card-img-top" src="${saveArr[i].thumbnail}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${saveArr[i].title}</h5>
            <ul>
                <li>price : ${saveArr[i].price}</li>
                <li>description : ${saveArr[i].description}</li>
                <li>discountPercentage : ${saveArr[i].discountPercentage}</li>
                <li>rating : ${saveArr[i].rating}</li>
                <li>stock : ${saveArr[i].stock}</li>
                <li>brand : ${saveArr[i].brand}</li>
                <li>category : ${saveArr[i].category}</li>
            <ul>
        </div>
        </div>
    `
    }
    
}

async function addsaveforlater(id){
    //var item1 = arr.find(temp1 => temp1.id == id);
    
    const res = await fetch('http://localhost:3000/products/'+id);
    const item = await res.json();
    if(saveArr.find(temp => temp.title === item.title)!=null){
    alert("Already exists");
    }else{
    let config = {
        method: 'POST',
         body: JSON.stringify({
            title:item.title,
            description:item.description,
            discountPercentage:item.discountPercentage,
            rating:item.rating,
            stock:item.stock,
            brand:item.brand,
            category:item.category,
            thumbnail:item.thumbnail,
         }
         ),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }
    let response = await fetch('http://localhost:3000/saveforLater',config);
    let responseText = await response.text();
    console.log(responseText);
    saveArr.push(item);
    getsaveforlater();
}
}

