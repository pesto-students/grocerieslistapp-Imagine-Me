import { navigateTo } from "../app.js"
import { update } from "../service/renderComponent.js"

export default class {
    constructor() {
        this.error = {}
        this.update = update
        this.navigateTo = navigateTo
    }

    setTitle(title) {
        document.title = title
    }

    getHtml() {
        return ""
    }

    addListeners() {

    }
    removeListeners() {

    }
}