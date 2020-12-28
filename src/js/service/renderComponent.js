
function renderComponent() {
    let component = null
    const render = (view) => {
        component = new view
        document.querySelector("#app").innerHTML = component.getHtml();
    }
    const update = () => {
        removeListeners()
        document.querySelector("#app").innerHTML = component.getHtml();
        addListeners()
    }
    const addListeners = () => {
        if (component !== null)
            component.addListeners()
    }
    const removeListeners = () => {
        if (component !== null)
            component.removeListeners()
    }

    return { render, update, addListeners, removeListeners }
}

const { render, update, addListeners, removeListeners } = renderComponent()

export { render, update, addListeners, removeListeners };