var arr=[];

var SaveArr=[{}];
async function fetchProducts(){
    let response = await fetch('http://localhost:3000/Products/');
    let responseText = await response.text();
    arr= await JSON.parse(responseText);
    // console.log(responseText);
    //  console.log(arr);
    displayProducts(arr);    
}

async function fetchSaveforlater(){
    debugger;
    let response = await fetch('http://localhost:3000/saveforLater/');
//    const responseText = await response.json();

    let responseText = await response.text();
    SaveArr= await JSON.parse(responseText);
    // console.log(responseText);
    // console.log(arr);
    displaySaveforlater(SaveArr);    
}


function displayProducts(arr){
    for(let i=0;i<arr.length;i++){
        console.log(arr[i].title);
        document.getElementById("Products").innerHTML+= `
        <div class="card m-3 border-info bg-info-subtle" style="width: 18rem;">
            <img class="card-img-top" src="${arr[i].thumbnail}" alt="Card image cap">  
            <div class="card-body">
                <h5 class="card-title">${arr[i].title}</h5>
                <h6 class="card-title">${arr[i].description}</h6>
                <p class="card-text">rating : ${arr[i].rating}</p>
                <p class="card-text">price : ${arr[i].price}</p>
                <button id="${arr[i].id}" class="btn btn-primary" onClick="addSave(id)">Add Saveforlater</button>
        </div>
      </div>
      `
    }
}

function displaySaveforlater(SaveArr){
    debugger;
    for(let i=0;i<SaveArr.length;i++){
        // console.log(arr[i].title);
        document.getElementById("Saveforlater").innerHTML+= `
        <div class="card m-3 border-info bg-info-subtle" style="width: 18rem;">
            <img class="card-img-top" src="${SaveArr[i].thumbnail}" alt="Card image cap">  
            <div class="card-body">
                <h5 class="card-title">${SaveArr[i].title}</h5>
                <h6 class="card-title">${SaveArr[i].description}</h6>
                <p class="card-text">rating : ${SaveArr[i].rating}</p>
                <p class="card-text">price : ${SaveArr[i].price}</p>
               
        </div>
      </div>
      `
    }
}


    async function addSave(id){
        debugger;
       // var item = arr.find(item => item.id === id);
       const res = await fetch('http://localhost:3000/products/' +id);
       const item = await res.json();
        if(SaveArr.find(temp => temp.title === item.title)!=null){
            alert("Product already exists.");
        }

        else

        {
           
            let config = {
                method: 'POST',
                 body: JSON.stringify({
                    id:item.id,
                    title:item.title,
                    rating:item.rating,
                    thumbnail:item.thumbnail
                  }),
                  
                  
                 headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            
            let response = await fetch('http://localhost:3000/Saveforlater',config);
            // let responseText = await response.text();
            //  console.log(responseText);
            // SaveArr.push(id);
            //displaySaveforlater(responseText);
            fetchSaveforlater();
        }
       
    }

fetchProducts();
fetchSaveforlater();


