import { readSotrageList } from './storageService'
import moment from 'moment'
import * as _ from "lodash";
import { Item } from '../models'
import { ChartData } from 'chart.js'

const key = "_xplist"
const inKey = '_inCatList'
const xpKey = '_xpCatList'

const monthName = (item: Item) => moment(item.timestamp).locale('es-mx').format("MMM")
const catName = (item: Item) => item.category

const lineExpenseData = () => {
  const list = readSotrageList(key)
  if (list.length === 0) {
    return
  }
  const result = _.groupBy(list, monthName)
  const labels = Object.keys(result).reverse()
  const data: number[] = []
  labels.map(item => {
    const xpenses = _.filter(result[item], ['sign', '-'])
    data.push(_.sumBy(xpenses, 'amount'))
  })

  const top5Labels = _.takeRight(labels, 5)
  const top5Data = _.takeRight(data, 5)

  const res: ChartData = {
    labels: top5Labels,
    datasets: [
      {
        label: 'Gastos',
        data: top5Data,
        fill: false,
        backgroundColor: 'rgb(36, 97, 15)',
        borderColor: 'rgba(36, 97, 15, 0.2)',
      },
    ],
  };

  return res
}

const getExpCatData = () => {
  const list = readSotrageList(key)
  if (list.length === 0) {
    return
  }
  const categories = readSotrageList(xpKey)
  if (categories.length === 0) {
    return
  }
  const xpenses = _.filter(list, ['sign', '-'])
  const xpCatList = _.groupBy(xpenses, catName)
  const orderedList = Object.fromEntries(Object.entries(xpCatList).sort(([,a],[,b])=> b.length-a.length))
  const xpCatLabels = Object.keys(orderedList)
  const data: number[] = []
  xpCatLabels.map((item) => {
    data.push(_.sumBy(orderedList[item], 'amount'))
  })

  const labelsTop3 = _.take(xpCatLabels, 3)
  const dataTop3 = _.take(data, 3)

  const res: ChartData = {
    labels: labelsTop3,
    datasets: [{
      label: 'Most used Expense Categories',
      data: dataTop3,
      backgroundColor: [
        'rgb(45, 113, 44)',
        'rgb(68, 116, 155)',
        'rgb(169, 49, 49)',
      ],
      hoverOffset: 4
    }]
  }

  return res
}

const getIncCatData = () => {
  const list = readSotrageList(key)
  if (list.length === 0) {
    return
  }
  const categories = readSotrageList(inKey)
  if (categories.length === 0) {
    return
  }
  const incomes = _.filter(list, ['sign', '+'])
  const inCatList = _.groupBy(incomes, catName)
  const orderedList = Object.fromEntries(Object.entries(inCatList).sort(([,a],[,b])=> b.length-a.length))
  const inCatLabels = Object.keys(orderedList)
  const data: number[] = []
  inCatLabels.map((item) => {
    data.push(_.sumBy(orderedList[item], 'amount'))
  })

  const labelsTop3 = _.take(inCatLabels, 3)
  const dataTop3 = _.take(data, 3)

  const res: ChartData = {
    labels: labelsTop3,
    datasets: [{
      label: 'Most used Income Categories',
      data: dataTop3,
      backgroundColor: [
        'rgb(45, 113, 44)',
        'rgb(68, 116, 155)',
        'rgb(169, 49, 49)',
      ],
      hoverOffset: 4
    }]
  }

  return res
}

export { lineExpenseData, getExpCatData, getIncCatData }