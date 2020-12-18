
import { addGroceryItem, siteData, updateGroceryItem } from "../data/manageSiteState.js";
import ComponentView from "./ComponentView.js";

export default class ItemView extends ComponentView {
    constructor() {
        super()
        const splitted_item_edit_path = location.pathname.split('/item/update/')
        if (splitted_item_edit_path.length == 2) {
            this.isUpdate = true
            this.updateIndex = splitted_item_edit_path[1]
            this.grocery = siteData.userData.groceries[splitted_item_edit_path[1]]
        } else {
            this.isUpdate = false
            this.grocery = ''
        }
    }
    getHtml() {
        return `
            <div class="p-1 mt-5">
                <h3>${this.isUpdate ? 'Update Item' : 'Create Item'}</h3>
                <form class="item-form">
                ${this.error.message ? `<span class="error">${this.error.message}</span>` : ''}
                    <textarea placeholder="Enter Grocery" name="grocery">${this.grocery}</textarea>
                    <input class="btn btn-primary mr-1" type="submit" value="${this.isUpdate ? 'Update' : 'Create'}" />
                    <a class="btn btn-cancel" href="/" data-link>Cancel</a>
                </form>
            </div>
        `
    }
    addListeners() {
        document.querySelector('form.item-form').addEventListener('submit', this.formSubmitHandler)
    }

    removeListeners() {
        document.querySelector('form.item-form').removeEventListener('submit', this.formSubmitHandler)
    }

    formSubmitHandler = (event) => {
        event.preventDefault()
        const form_data = new FormData(event.target)
        let result = null;
        if (this.isUpdate){
            this.grocery = form_data.get('grocery')
            result = updateGroceryItem(form_data.get('grocery'), this.updateIndex)
        }
        else
            result = addGroceryItem(form_data.get('grocery'))
        if (result.status) {
            this.navigateTo('/')
        } else {
            this.error = result.error
            this.update()
        }
    }

}