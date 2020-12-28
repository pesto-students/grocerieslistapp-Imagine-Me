import { deleteGroceryItem, siteData, logoutUser } from "../data/manageSiteState.js";
import ComponentView from "./ComponentView.js";

export default class DashboardView extends ComponentView {
    constructor() {
        super()
        this.userData = siteData.userData
        this.index = siteData.index
        this.isDeleted = 0
        this.setTitle('Dashboard')
    }

    getHtml() {
        const links = this.userData.groceries.map((v, i) => `
        <div class="card d-flex align-items-center mb-2">
            <div class="flex-grow pr-1">
                ${v}
            </div>
            <div class="d-flex align-items-center h-100">
                <a title="Edit" class="btn btn-round btn-primary edit-icon mr-1" href="/item/update/${i}" data-link></a>
                <button title="Delete" class="btn btn-round btn-danger item-delete" data-value="${i}">&#10005;</button>
            </div>
        </div>`).reverse().join('')
        return `
            <div class="d-flex justify-space-between flex-wrap mt-5 p-1">
                <div class="d-flex align-items-center">
                    <img class="mr-1" width="50" height="50" src="src/images/user-icon.png" alt="user" />
                    <h3 class="mr-1">${this.userData.name}</h3>
                </div>
                <div class="d-flex align-items-center">
                    <span class="mr-1">Remaining ${5 - this.userData.groceries.length}</span>
                    <button class="btn btn-primary add-grocery-item mr-1" ${(5 - this.userData.groceries.length) === 0 ? 'disabled' : ''}>&#x2b; Add Item</button>
                    <button class="btn btn-danger logout">Logout</button>
                </div>
            </div>
            <div class="p-1">
                <div id="item-delete"class="d-none alert" ></div>
                <h2>Grocery List</h2>
                ${links}
            </div>
        `
    }

    addListeners() {
        document.querySelector('button.add-grocery-item').addEventListener('click', this.addItemHandler)
        document.querySelector('button.logout').addEventListener('click', this.logoutHandler)
        const delete_link = document.querySelectorAll('button.item-delete')
        for (let i = 0; i < delete_link.length; i++) {
            delete_link[i].addEventListener('click', this.deleteItemHandler)
        }
        const alert = document.getElementById('item-delete')
        if (this.isDeleted === 1) {
            alert.innerHTML = "Item Deleted"
            alert.classList.add('alert-success')
            alert.classList.remove('alert-warning')
            alert.classList.remove('d-none')
            setTimeout(() => {
                alert.classList.add('d-none')
                this.isDeleted = 0
            }, 3000)
        } else if (this.isDeleted === 2) {
            alert.innerHTML = "Something Happened"
            alert.classList.add('alert-warning')
            alert.classList.remove('alert-success')
            alert.classList.remove('d-none')
            setTimeout(() => {
                alert.classList.add('d-none')
                this.isDeleted = 0
            }, 3000)
        }
    }

    removeListeners() {
        document.querySelector('button.add-grocery-item').removeEventListener('click', this.addItemHandler)
        document.querySelector('button.logout').removeEventListener('click', this.logoutHandler)
        const delete_link = document.querySelectorAll('button.item-delete')
        for (let i = 0; i < delete_link.length; i++) {
            delete_link[i].addEventListener('click', this.deleteItemHandler)
        }

    }

    addItemHandler = () => {
        if (5 - this.userData.groceries.length > 0) {
            this.navigateTo('/item/create')
        }
    }
    deleteItemHandler = (event) => {
        if (event.target.classList.contains('item-delete')) {
            let result = deleteGroceryItem(event.target.dataset.value)
            if (result.status)
                this.isDeleted = 1
            else
                this.isDeleted = 2
            this.update()

        }
    }

    logoutHandler = () => {
        logoutUser()
        this.navigateTo('/login')
    }
}