import ComponentView from "./ComponentView.js";

import { signUpUser } from '../data/manageSiteState.js'

export default class LoginView extends ComponentView {
    constructor() {
        super()
        if (/login/.test(location.pathname)) {
            this.setTitle("Login")
            this.isLoginPage = true
        }else{
            this.setTitle("Register")
            this.isLoginPage = false
        }
        this.name = ''
        this.password = ''
    }
    getHtml() {
        let error_in_name = '';
        let error_in_password = '';
        if (this.error.name)
            error_in_name = `<span class="error">Name is required</span>`
        if (this.error.password)
            error_in_password = `<span class="error">Password is required</span>`
        return `
            <form class="login-form card mt-5">
                <h1 class="text-center">${this.isLoginPage ? 'Login':'Register'}</h1>
                ${error_in_name}
                <input class="${this.error.name ? 'form-error' : ''}" type="text" name="name" value="${this.name}" placeholder="Enter Name" />
                ${error_in_password}
                <input class="${this.error.password ? 'form-error' : ''}" type="password" name="password" value="${this.password}" placeholder="Enter password" />
                <div class="text-center">
                    <input class="btn btn-primary" type="submit" value="${this.isLoginPage ? 'Login':'Sign Up'}" />
                </div>
                <p class="text-center">${this.isLoginPage ? 'Not a member yet? Sign up <a href="/register" data-link>here</a>':'Already a member? Login <a href="/login" data-link>here</a>'}</p>
            </form>
        `
    }

    addListeners() {
        document.querySelector('form.login-form').addEventListener('submit', this.formSubmitHandler)
    }

    removeListeners() {
        document.querySelector('form.login-form').removeEventListener('submit', this.formSubmitHandler)
    }

    formSubmitHandler = event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        this.name = formData.get('name')
        this.password = formData.get('password')
        const result = signUpUser(formData.get('name'), formData.get('password'))
        if (result.status) {
            this.navigateTo('/')
        } else {
            this.error = result.error
            this.update()
        }
    }
}