import {readSotrageList, setStorageList} from './storageService'

let xpCategories: string[] = ["Cuidado Personal", "Deuda", "Entretenmiento", "Hogar", "Mascotas", "Otro", "Salud", "Seguros", "Servicios", "Telefonia", "Transporte", "Inversiones"]
let inCategories: string[] = ["Salario", "Pago Deuda", "Ganancias", "Otro"]
const inKey = '_inCatList'
const xpKey = '_xpCatList'

const readArray = (type: string) => {
    const inArr = readSotrageList(inKey)
    const xpArr = readSotrageList(xpKey)
    if(inArr.length !== 0){
        inCategories = inArr
    }

    if(xpArr.length !== 0){
        xpCategories = xpArr
    }

    if(type === '+'){
        return inCategories
    }else{
        return xpCategories
    }
}

const addToArray = (cat: string, type: string) => {
    if(type === '+'){
        inCategories.unshift(cat)
        setStorageList(inCategories, inKey)
        return inCategories
    }else{
        xpCategories.unshift(cat)
        setStorageList(xpCategories, xpKey)
        return xpCategories
    }
}

const delFromArray = (cat: string, type: string) => {
    if(type === '+'){
        const newArr = inCategories.filter((x) => x !== cat)
        inCategories = newArr
        setStorageList(inCategories, inKey)
        return inCategories
    }else{
        const newArr = xpCategories.filter((x) => x !== cat)
        xpCategories = newArr
        setStorageList(xpCategories, xpKey)
        return xpCategories
    }
}

export { addToArray, readArray, delFromArray }