import { Item } from "../models"
const key = "_xplist"

const setStorageList = (items: Item[]) => {
    console.log(items)
    localStorage.setItem(key, JSON.stringify(items))
}

const readSotrageList = () => {
    const listFromStorage = localStorage.getItem(key)
    if(listFromStorage !== null){
        return JSON.parse(listFromStorage)
    }else{
        return []
    }
}

const removeStorageList = () => {
    localStorage.removeItem(key)
}

export { setStorageList, readSotrageList, removeStorageList }