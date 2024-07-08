import {selector} from 'recoil'

import {cartListState} from './atom'
import {calculateSaleCost} from 'utils/cost'

export const updateCountSelector = selector({
  key: 'updateCountSelector',
  get: ({get}) => get(cartListState),
  set: ({get, set}, v) => {
    const {productId, count} = v
    const currentCartList = get(cartListState)
    const indexToUpdate = currentCartList.findIndex((item) => item.product._id === productId)
    const updatedCartList = [...currentCartList]
    if (indexToUpdate === -1) {
      updatedCartList.push({product: {_id: productId}, count: 1})
    } else {
      updatedCartList[indexToUpdate] = {
        ...updatedCartList[indexToUpdate],
        count: updatedCartList[indexToUpdate].count + count,
      }
    }
    set(cartListState, updatedCartList)
  },
})

export const updateAllSelectSelector = selector({
  key: 'updateAllSelect',
  get: ({get}) => get(cartListState),
  set: ({get, set}, isSelected) => {
    const currentCartList = get(cartListState)
    const updatedCartList = currentCartList.map((item) => ({...item, isSelected: isSelected}))

    set(cartListState, updatedCartList)
  },
})

export const updateSelectSelector = selector({
  key: 'updateSelect',
  get: ({get}) => get(cartListState),
  set: ({get, set}, v) => {
    const {productId, isSelected} = v
    const currentCartList = get(cartListState)
    const indexToUpdate = currentCartList.findIndex((item) => item.product._id === productId)
    const updatedCartList = [...currentCartList]
    updatedCartList[indexToUpdate] = {
      ...updatedCartList[indexToUpdate],
      isSelected: isSelected,
    }
    set(cartListState, updatedCartList)
  },
})

export const deleteMultipleSelector = selector({
  key: 'deleteMultiple',
  get: ({get}) => get(cartListState),
  set: ({get, set}) => {
    const currentCartList = get(cartListState)
    const updatedCartList = currentCartList.filter((item) => item.isSelected === false)
    set(cartListState, updatedCartList)
  },
})

export const getSelectedIdListSelector = selector({
  key: 'getSelectedIdList',
  get: ({get}) => {
    const currentCartList = get(cartListState)
    const selectedList = currentCartList.filter((item) => item.isSelected !== false).map((item) => item.product._id)
    return selectedList
  },
})

export const deleteOneSelector = selector({
  key: 'deleteOneProduct',
  get: ({get}) => get(cartListState),
  set: ({get, set}, productId) => {
    const currentCartList = get(cartListState)
    const updatedCartList = currentCartList.filter((item) => item.product._id !== productId)
    set(cartListState, updatedCartList)
  },
})

export const getTotalCostSelector = selector({
  key: 'getTotalCost',
  get: ({get}) => {
    const currentCartList = get(cartListState)
    const totalCost = currentCartList.reduce((acc, item) => {
      if (item.isSelected !== false) {
        return acc + calculateSaleCost(item.product.cost, item.product.rate) * item.count
      }
      return acc
    }, 0)
    const deliveryFee = totalCost >= 30000 || totalCost === 0 ? 0 : 3000
    return {totalCost, deliveryFee}
  },
})

export const getSelectedListSelector = selector({
  key: 'getSelectedList',
  get: ({get}) => {
    const currentCartList = get(cartListState)
    const selectedList = currentCartList
      .filter((item) => item.isSelected !== false)
      .map((item) => {
        return {
          count: item.count,
          cost: item.product.cost,
          product: item.product._id,
          rate: item.product.rate,
        }
      })
    return selectedList
  },
})
