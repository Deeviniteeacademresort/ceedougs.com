/* ===============================
   MOBILE DROPDOWN
================================ */

const dropdowns =
    document.querySelectorAll(".dropdown");

dropdowns.forEach(function(dropdown) {

    const link =
        dropdown.querySelector(":scope > a");

    link.addEventListener("click", function(event) {

        event.preventDefault();

        dropdown.classList.toggle("open");

    });

});


/* =========================================================
   CEE-DOUG'S INTERNAL JAVASCRIPT
   NO EXTERNAL JS FILE
========================================================= */


/* =========================================================
   PRODUCT DATABASE
========================================================= */

const products = [

    {
        name:"Premium Rice",
        price:35000,
        icon:"🍚"
    },

    {
        name:"Clean Beans",
        price:28000,
        icon:"🫘"
    },

    {
        name:"Premium Garri",
        price:18000,
        icon:"🥣"
    },

    {
        name:"Dry Maize",
        price:20000,
        icon:"🌽"
    }

];


let cart = [];


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMenu(){

    document
        .getElementById("navLinks")
        .classList.toggle("open");

}


/* Close menu after navigation */

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click",()=>{

            document
                .getElementById("navLinks")
                .classList.remove("open");

        });

    });


/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener("scroll",()=>{

    const header =
        document.getElementById("mainHeader");

    if(window.scrollY > 40){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});


/* =========================================================
   SEARCH
========================================================= */

function openSearch(){

    document
        .getElementById("searchOverlay")
        .classList.add("active");

    document.body.classList.add("no-scroll");

    setTimeout(()=>{

        document
            .getElementById("searchInput")
            .focus();

    },200);

}


function closeSearch(){

    document
        .getElementById("searchOverlay")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


function searchProducts(){

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const results =
        document.getElementById("searchResults");


    if(!query){

        results.innerHTML="";

        return;

    }


    const matches =
        products.filter(product =>
            product.name
                .toLowerCase()
                .includes(query)
        );


    if(matches.length===0){

        results.innerHTML =
            "<p>No products found.</p>";

        return;

    }


    results.innerHTML =
        matches.map(product=>`

            <div
                class="search-result"
                onclick="quickView(
                    '${product.name}',
                    ${product.price},
                    '${product.icon}'
                )"
            >

                ${product.icon}

                ${product.name}

                —

                ₦${product.price.toLocaleString()}

            </div>

        `).join("");

}


/* =========================================================
   CART
========================================================= */

function addToCart(name,price,icon){

    const existing =
        cart.find(item =>
            item.name === name
        );


    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            name:name,
            price:price,
            icon:icon,
            quantity:1

        });

    }


    updateCart();

    showMessage(
        name + " added to cart ✓"
    );

}


function removeItem(index){

    cart.splice(index,1);

    updateCart();

}


function changeQuantity(index,amount){

    cart[index].quantity += amount;


    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }


    updateCart();

}


function updateCart(){

    const count =
        document.getElementById("cartCount");

    const items =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    let countTotal = 0;
    let total = 0;


    cart.forEach(item=>{

        countTotal += item.quantity;

        total +=
            item.price *
            item.quantity;

    });


    count.textContent =
        countTotal;


    totalElement.textContent =
        "₦" + total.toLocaleString();


    if(cart.length===0){

        items.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something from our collection.
                </p>

            </div>

        `;

        return;

    }


    items.innerHTML =
        cart.map((item,index)=>`

            <div class="cart-item">

                <div>

                    <h4>
                        ${item.icon}
                        ${item.name}
                    </h4>

                    <p>
                        ₦${item.price.toLocaleString()}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${index},-1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index},1)"
                        >
                            +
                        </button>

                    </div>

                </div>


                <button
                    class="remove"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `).join("");

}


function openCart(){

    document
        .getElementById("cartDrawer")
        .classList.add("active");

    document
        .getElementById("cartOverlay")
        .classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeCart(){

    document
        .getElementById("cartDrawer")
        .classList.remove("active");

    document
        .getElementById("cartOverlay")
        .classList.remove("active");

    document.body.classList.remove("no-scroll");

}


/* =========================================================
   CHECKOUT
========================================================= */

function checkout(){

    if(cart.length===0){

        showMessage(
            "Your cart is currently empty."
        );

        return;

    }


    showMessage(
        "Checkout is ready for backend integration."
    );

}


/* =========================================================
   QUICK VIEW
========================================================= */

function quickView(name,price,icon){

    document
        .getElementById("modalName")
        .textContent=name;


    document
        .getElementById("modalPrice")
        .textContent =
        "₦" + price.toLocaleString();


    document
        .getElementById("modalIcon")
        .textContent=icon;


    document
        .getElementById("modalAdd")
        .onclick=()=>{

            addToCart(name,price,icon);

            closeQuickView();

        };


    document
        .getElementById("quickModal")
        .classList.add("active");

}


function closeQuickView(){

    document
        .getElementById("quickModal")
        .classList.remove("active");

}


/* =========================================================
   AI ASSISTANT
========================================================= */

function toggleChat(){

    document
        .getElementById("chatWindow")
        .classList.toggle("active");

}


function chatKey(event){

    if(event.key==="Enter"){

        sendChat();

    }

}


function sendChat(){

    const input =
        document.getElementById("chatInput");

    const message =
        input.value.trim();


    if(!message) return;


    const body =
        document.getElementById("chatBody");


    body.innerHTML += `

        <div class="message user">
            ${escapeHTML(message)}
        </div>

    `;


    input.value="";


    setTimeout(()=>{

        body.innerHTML += `

            <div class="message bot">

                ${getAIResponse(message)}

            </div>

        `;


        body.scrollTop =
            body.scrollHeight;

    },450);


    body.scrollTop =
        body.scrollHeight;

}


function getAIResponse(message){

    const text =
        message.toLowerCase();


    if(
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ){

        return `
            Hello 👋 Welcome to Cee-Doug's.
            How can I help you today?
        `;

    }


    if(text.includes("rice")){

        return `
            Premium Rice is currently
            ₦35,000.
        `;

    }


    if(text.includes("beans")){

        return `
            Clean Beans is currently
            ₦28,000.
        `;

    }


    if(text.includes("garri")){

        return `
            Premium Garri is currently
            ₦18,000.
        `;

    }


    if(text.includes("maize")){

        return `
            Dry Maize is currently
            ₦20,000.
        `;

    }


    if(
        text.includes("delivery") ||
        text.includes("deliver")
    ){

        return `
            Cee-Doug's delivery process is
            designed around four stages:
            confirmation, processing,
            dispatch and delivery.
        `;

    }


    if(
        text.includes("price") ||
        text.includes("cost")
    ){

        return `
            Current featured products range
            from ₦18,000 to ₦35,000.
        `;

    }


    if(
        text.includes("order")
    ){

        return `
            Add your products to the cart,
            then proceed to checkout.
        `;

    }


    return `
        I can help you with products,
        prices, orders and delivery.
    `;

}


/* =========================================================
   ESCAPE CHAT TEXT
========================================================= */

function escapeHTML(text){

    const div =
        document.createElement("div");

    div.textContent=text;

    return div.innerHTML;

}


/* =========================================================
   NEWSLETTER
========================================================= */

function subscribe(event){

    event.preventDefault();


    const email =
        document.getElementById("email").value;


    showMessage(
        "Thank you! " +
        email +
        " has been added to our updates."
    );


    document
        .getElementById("email")
        .value="";

}


/* =========================================================
   GENERAL MESSAGE
========================================================= */

function showMessage(message){

    const toast =
        document.getElementById("toast");


    toast.textContent=message;

    toast.classList.add("show");


    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        closeSearch();

        closeCart();

        closeQuickView();

    }

});


/* =========================================================
   INITIALIZE
========================================================= */

updateCart();