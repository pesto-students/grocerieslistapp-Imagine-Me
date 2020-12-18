import ComponentView from "./ComponentView.js";

export class NotFoundPageView extends ComponentView{
    constructor(){
        super()
    }

    getHtml(){
        return `
            <h1 class="text-center mt-5">Page not found</h1>
            <h1 class="text-center big-text">404</h1>
            <div class="text-center">
                <a class="btn btn-primary" href="/" data-link>Back to main page</a>
            </div>
        `
    }
}