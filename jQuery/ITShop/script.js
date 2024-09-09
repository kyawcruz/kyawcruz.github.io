$(document).ready(function(){
    count();
    $('.addToCart').click(function(){
        // alert ("Hello");
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        console.log(id,name,price);

        let items = {
            id : id,
            name : name,
            price : price,
            qty : 1
        }

        let itemsString = localStorage.getItem('shops');
        let itemsArray = [];

        if (itemsString == null) {
            itemsArray = [];
        }else {
            itemsArray = JSON.parse(itemsString);
        }
        
        let status = false;
        $.each(itemsArray, function(i,v){
            if (v.id == id) {
                v.qty++;
                status = true;
            }
        })

        if (status == false) {
            itemsArray.push(items);
        }
        

        let itemsData = JSON.stringify(itemsArray);
        localStorage.setItem('shops',itemsData);
        count(); // to work the count function as soon as you click the add to cart, to show live
        
    })
    

    // for checkout.html
    getData ();
    function getData(){

        let getItemString = localStorage.getItem('shops');

        if(getItemString) {
            showItemArray = JSON.parse(getItemString);
            console.log(showItemArray);

            let data = '';
            let j = 1;
            let total = 0;

            $.each(showItemArray,function(i,v){
                // console.log("This is key" +i);
                // console.log(v.name);    
                
                data += `<tr>
                            <td>${j++}</td>
                            <td>${v.name}</td>
                            <td>${v.price}</td>
                            <td><button class="min" data-key="${i}">-</button>${v.qty}<button class="max" data-key="${i}">+</button></td>
                            <td>${v.price * v.qty}</td>          
                        </tr>`

                total += v.price * v.qty;
            })

            data += `<tr>
                        <td colspan="4">Total</td>
                        <td>${total}</td>     
                    </tr>`

            $('#tbody').html(data); 
        }        
    }
    function count() {
        let itemsString = localStorage.getItem('shops');
        if(itemsString) {
            let itemsArray = JSON.parse(itemsString);
            if (itemsArray != null) {  // (itemsArray !== null is nothing in the local storage)(itemsArray != 0 left the curly bracket in localstorage)
                let count = itemsArray.length;
                $("#count_item").text(count);
            }
        }
    }

    $('#tbody').on('click','.min',function(){
        let key = $(this).data('key');
        // alert (key);
        let itemsString = localStorage.getItem('shops')
        if(itemsString) {
            let itemsArray = JSON.parse(itemsString);

            $.each(itemsArray,function(i,v){
                if(i==key) {
                    v.qty--;
                    if(v.qty == 0) {
                        itemsArray.splice(key,1) //splice(start,number) splice or delete
                    }
                }
            });
            let itemsData = JSON.stringify(itemsArray);
            localStorage.setItem('shops',itemsData);

            getData();
            count(); // to show the deleted item on add to cart icon
        }
    })

    $('#tbody').on('click','.max',function(){
        let key = $(this).data('key');
        // alert (key);
        let itemsString = localStorage.getItem('shops');
        if(itemsString) {
            let itemsArray = JSON.parse(itemsString);

            $.each(itemsArray,function(i,v){
                if(i==key) {
                    v.qty++;
                }
            });
            let itemsData = JSON.stringify(itemsArray);
            localStorage.setItem('shops',itemsData);

            getData();
        }
    })

    $('#order-now').click(function(){
        let ans = confirm('Are you sure to order?');
        // console.log(ans);
        if(ans) {
            localStorage.removeItem('shops');
            window.location.href = 'index.html';
        }
    })
})