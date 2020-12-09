function manageSiteState() {

    const LOCAL_STORAGE_KEY = "pesto-grocery-list"
    const MAX_USERS = 3;

    let local_storage_data = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!local_storage_data) {
        local_storage_data = Array(0)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(local_storage_data))
    } else
        local_storage_data = JSON.parse(local_storage_data)

    const siteData = {
        isLogin: false,
        data: local_storage_data,
        userData: {},
        index: 0
    }

    const updateLocalStorage = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(siteData.data))
    }

    const signUpUser = (name, password) => {
        if (name.trim() === "" || password.trim() === "")
            return {
                status: false,
                error: {
                    name: name.trim() === "",
                    password: password.trim() === ""
                }
            }


        const data = [...siteData.data]
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== undefined && data[i].name === name && data[i].password === password) {
                siteData.userData = data[i]
                siteData.index = i
                siteData.isLogin = true
                return {
                    status: true,
                    error: {}
                }
            }
        }

        for (let i = data.length - 1; i >= 0; i--) {
            if (i < MAX_USERS - 1) {
                data[i + 1] = data[i]
            }
        }

        data[0] = {
            name,
            password,
            groceries: Array(0)
        }

        siteData.data = data
        siteData.userData = data[0]
        siteData.isLogin = true

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
        return {
            status: true,
            error: {}
        }
    }

    const addGroceryItem = (grocery) => {
        if (grocery === "")
            return {
                status: false,
                error: {
                    grocery: true,
                    message: "Grocery required"
                }
            }
        if (siteData.userData.groceries.length < 5) {
            if (siteData.userData.groceries.includes(grocery))
                return {
                    status: false,
                    error: {
                        grocery: true,
                        message: "Item already saved"
                    }
                }
            siteData.userData.groceries.push(grocery)
            siteData.data[siteData.index] = siteData.userData
            updateLocalStorage()
            return {
                status: true,
                error: {}
            }
        } else {
            return {
                status: false,
                error: {
                    grocery: false,
                    message: "Grocery is full"
                }
            }
        }
    }
    const updateGroceryItem = (grocery, index) => {
        if (grocery === "")
            return {
                status: false,
                error: {
                    grocery: true,
                    message: "Grocery required"
                }
            }
        if (siteData.userData.groceries.includes(grocery) && siteData.userData.groceries[index] !== grocery)
            return {
                status: false,
                error: {
                    grocery: true,
                    message: "Item already saved"
                }
            }
        siteData.userData.groceries[index] = grocery
        siteData.data[siteData.index] = siteData.userData
        updateLocalStorage()
        return {
            status: true,
            error: {}
        }
    }

    const deleteGroceryItem = (index) => {
        siteData.userData.groceries.splice(index, 1)
        siteData.data[siteData.index] = siteData.userData
        updateLocalStorage()
        return {
            status: true,
            message: "Item deleted"
        }
    }

    const logoutUser = () => {
        siteData.isLogin = false
        return {
            status: true
        }
    }
    return { siteData, signUpUser, addGroceryItem, deleteGroceryItem, updateGroceryItem, logoutUser }
}

const { siteData, signUpUser, addGroceryItem, deleteGroceryItem, updateGroceryItem, logoutUser } = manageSiteState()

export { siteData, signUpUser, addGroceryItem, deleteGroceryItem, updateGroceryItem, logoutUser };