import { addGroceryItem, deleteGroceryItem, signUpUser, siteData, updateGroceryItem } from './manageSiteState.js'

describe('manageSiteData', () => {
    const initialData = {
        isLogin: false,
        data: [],
        userData: {},
        index: 0
    }
    const siteDataAtFirst = { ...siteData }
    test('Site data should be an object', () => {
        expect(siteDataAtFirst).toMatchObject(initialData)
    })

    const resultSignUp = signUpUser('user 1', 'password')
    const first_user_data = { ...siteData }
    test('Signup result should match', () => {
        expect(resultSignUp).toMatchObject({
            status: true
        })
    })

    test('Login should be true', () => {
        expect(siteData).toMatchObject({
            isLogin: true
        })
    })
    test('userData should match', () => {
        expect(first_user_data.userData).toMatchObject({
            name: 'user 1',
            password: 'password'
        })
    })

    test('local storage should match', () => {
        expect(localStorage.getItem('pesto-grocery-list')).toBe(JSON.stringify(siteData.data))
    })

    signUpUser('user 2', 'password')
    signUpUser('user 3', 'password')
    signUpUser('user 4', 'password')

    test('data length should be less than or equal to 3', () => {
        expect(siteData.data.length).toBeLessThanOrEqual(3);
    })

    signUpUser('user 3', 'password')
    test('existing user data should when login', () => {
        expect(siteData).toMatchObject({
            isLogin: true,
            index: 1
        })
    })
    const resultGroceryAdd = addGroceryItem('Item 1')
    test('should return status true', () => {
        expect(resultGroceryAdd).toMatchObject({ status: true })
    })

    test('should groceries contains Item 1', () => {
        expect(siteData.userData.groceries).toEqual(expect.arrayContaining(['Item 1']))
    })
    addGroceryItem('Item 2')
    addGroceryItem('Item 3')
    addGroceryItem('Item 4')
    addGroceryItem('Item 5')
    const resultGroceryAdd2 = addGroceryItem('Item 6')

    test('should return status false', () => {
        expect(resultGroceryAdd2.status).toBe(false)
    })
    
    const resultUpdateGrocery = updateGroceryItem('Item 2 Updated',1) 

    test('should grocery contains "Item 2 Updated"', () => {
        expect(siteData.userData.groceries).toEqual(expect.arrayContaining(['Item 2 Updated']))
    })
    
    const resultDeleteGrocery = deleteGroceryItem(3)

    test('should return status "true"', () => {
        expect(resultDeleteGrocery).toMatchObject({
            status: true
        })
    })

    test('groceries should not contain "Item 4"', () => {
        expect(siteData.userData.groceries.indexOf('Item 4')).toBe(-1)
    })
    
    
})