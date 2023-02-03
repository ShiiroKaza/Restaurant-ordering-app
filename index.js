
import { menuArray } from './data.js'

const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const confirmBtn = document.getElementById('confirm-btn')
const paymentForm = document.getElementById('payment-form')
const orderConfirmation = document.getElementById('order-confirmation')
const orderDetails = document.getElementById('order-details')


let itemsAdded = ``
let totalPrice = 0
let myOrderArray = []

document.body.addEventListener('click', function(e){
    if(e.target.dataset.item){
        createOrderArray(e.target.dataset.item)
    } else if(e.target.dataset.remove){
        removeOrderItem(e.target.dataset.remove)
    } 
})

//render the menu
function getMenu(){
    let menuHtml = ``
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="menu-item">
            <img src="${item.pic}" class="pic">
            <div class="descriptions">
            <p class="item-name">${item.name}</p>
            <p class="item-ingredients">${item.ingredients}</p>
            <p class="item-price">$${item.price}</p>
            </div>
            <button class="add-btn" id="add-btn" data-item="${item.id}">+</button>
    </div>  
    `
    })
    return menuHtml
}

// creates the initial array when clicking button
function createOrderArray(itemId){
    const targetmenuObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    myOrderArray.push(targetmenuObj)
    totalPrice = 0
    myOrderArray.forEach(function(item){
        totalPrice += item.price
    })
    createOrder(myOrderArray)
}

//removes element from the orderArray

function removeOrderItem(itemId){
    const targetmenuObj = menuArray.filter(function(item){
        return item.id.toString() === itemId
    })[0]
    myOrderArray.splice(myOrderArray.indexOf(targetmenuObj), 1)
        totalPrice = 0
        myOrderArray.forEach(function(item){
            totalPrice += item.price
    })
    createOrder(myOrderArray)
    if(myOrderArray <= 0){
        confirmBtn.style.display = "none"  
    }
}

// renders the order-details html
function createOrder(orderArray){
    let orderHtml = ``
    orderArray.forEach(function(item){
        itemsAdded += `
        <div class="items-added">
            <div class="name-and-remove-item">
                <p class="item-name">${item.name}</p>
                <button class="remove-btn" data-remove="${item.id}">remove</button>
            </div>
            <p class="item-price">$${item.price}</p>
        </div>
        `
        orderHtml = `
        <div class="container">
            <h3 class="order-title">Your order:</h3>
            <div class="items-list">
                ${itemsAdded}
            </div>
            <div class="total-price">
                <p class="total-price-title">Total price</p>
                <p class="item-price">$${totalPrice}</p>
            </div>
        </div>
        `
        return orderHtml
    })
    itemsAdded = ``
    document.getElementById("order-details").innerHTML = orderHtml 
        confirmBtn.style.display = "block"  
    
}

function render(){
    document.getElementById("menu").innerHTML = getMenu()
}

render()

//displays modal after clicking confirm-btn
confirmBtn.addEventListener('click', function(){
    modal.style.display = 'block'
})

// close button
modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})

paymentForm.addEventListener('submit', function(event){
    event.preventDefault(event)
    const paymentFormdata = new FormData(paymentForm)

    const fullName = paymentFormdata.get('fullName')
    

    setTimeout(function(){
        modal.style.display = 'none'
        orderDetails.style.display = 'none'
        confirmBtn.style.display = 'none'
        orderConfirmation.innerHTML = `
        <div class="order-message">
            <p class="message-paragraph">Thanks, ${fullName}! Your order is on your way!</p>
        </div>
        `
        //disables buttons after placing order
        document.querySelectorAll(".add-btn").forEach(e => e.disabled = true)
        document.querySelectorAll(".add-btn").forEach(e => e.classList.add('disabled'))

    }) 
    }, 2000)
