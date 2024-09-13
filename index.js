import { products } from "./db/product.js";
import { createProducrCard } from "./createProductCard.js";

let cart = [];

const findProductInCart = (cart,prodId)=>{
        const isProductInCart = cart && cart.length>0 && cart.some(({_id})=> _id === prodId);

        return isProductInCart;
}

const productContainer = document.querySelector("#products");

for(let product of products){
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card","card-vertical","d-flex","direction-column","relative","shadow");
    cardContainer.innerText = "product card";

    /** Image Container */
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("card-image-container");

    const image = document.createElement("img");
    image.setAttribute("src",product.img);
    image.setAttribute("alt",product.name);

    imageContainer.appendChild(image);
    
/** Card Details Container */
    const cardDetailsContainer = document.createElement("div");
    cardDetailsContainer.classList.add("card-details");

    const brandContainer = document.createElement("div");
    brandContainer.classList.add("card-title");
    brandContainer.innerText = product.brand;
    cardDetailsContainer.appendChild(brandContainer);

/** Card Description Container */
const descriptionContainer = document.createElement("div");
descriptionContainer.classList.add("card-description");

const name = document.createElement("p");
name.classList.add("card-des");
name.innerText = product.name;
descriptionContainer.appendChild(name);

const newPrice = document.createElement("p");
newPrice.classList.add("card-price");
newPrice.innerText = `RS.${product.newPrice}`;
const oldPrice = document.createElement("span");
oldPrice.classList.add("price-strike-through");
oldPrice.innerText = `RS.${product.oldPrice}`;
newPrice.appendChild(oldPrice);
const discount = document.createElement("span");
discount.classList.add("discount");
discount.innerText = `${product.discount}% OFF`;
newPrice.appendChild(discount);
descriptionContainer.appendChild(newPrice);

const ratingContainer = document.createElement("p");
ratingContainer.classList.add("d-flex","align-center");
const rating = document.createElement("span");
rating.innerText = product.rating;
ratingContainer.appendChild(rating);
const star = document.createElement("span");
star.classList.add("material-icons-outlined","star")
star.innerText ="star";
ratingContainer.appendChild(star);
descriptionContainer.appendChild(ratingContainer);
cardDetailsContainer.appendChild(descriptionContainer);

 /** CTA Button Container*/

 const ctaButton = document.createElement("div");
 ctaButton.classList.add("cta-btn");

 const cartButton = document.createElement("button");
 cartButton.setAttribute("data-id",product._id);
 cartButton.classList.add("button","btn-primary","btn-icon","cart-btn,d-flex","align-center","justify-center","gap","cursor","btn-margin");
 const cart = document.createElement("span");
 cart.classList.add("material-icons-outlined")
 cart.innerText ="shopping_cart";
 cartButton.appendChild(cart);

 const buttonText = document.createElement("span");
 buttonText.innerText =  "Add to Cart";
 cartButton.appendChild(buttonText);
 ctaButton.appendChild(cartButton);
 cardDetailsContainer.appendChild(ctaButton);
cardContainer.appendChild(imageContainer);


cardContainer.appendChild(cardDetailsContainer);
cardContainer.appendChild(ctaButton);

productContainer.appendChild(cardContainer);
}

productContainer.addEventListener("click",(event) =>{

    const isProductInCart = findProductInCart(cart,event.target.dataset.id);
    
    if(!isProductInCart){
     const productToAddToCart = products.filter(({ _id }) => _id === event.target.dataset.id);
    cart = [...cart, ...productToAddToCart];
    localStorage.setItem("cart",JSON.stringify(cart));
    const cartButton = event.target;
    cartButton.innerHTML = "Go to cart <span class = 'material-icons-outlined'>shopping_cart</span>";
    }else{
        location.href = "cart.html";
    }
});

createProducrCard(products,productContainer);
