import * as types from '../types' 
import numeral from 'numeral'

const state = {
    funds: 10000
}

const getters = {
    [types.GET_FUNDS]: state => {
        return numeral(state.funds).format("$0,0.00");
    }
}

const actions = {

}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}