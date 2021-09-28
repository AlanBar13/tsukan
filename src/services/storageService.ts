const setStorageList = (items: any[], key: string) => {
    localStorage.setItem(key, JSON.stringify(items))
}

const readSotrageList = (key: string) => {
    const listFromStorage = localStorage.getItem(key)
    if(listFromStorage !== null){
        return JSON.parse(listFromStorage)
    }else{
        return []
    }
}

const removeStorageList = (key: string) => {
    localStorage.removeItem(key)
}

export { setStorageList, readSotrageList, removeStorageList }