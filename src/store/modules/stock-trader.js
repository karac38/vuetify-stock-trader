import * as types from '../types' 
import numeral from 'numeral'

const state = {
    funds: 10000
}

const getters = {
    getFunds: state => {
        return numeral(state.funds).format("$0,0.00");
    }
}

const actions = {

}

const mutations = {
    [types.UPDATE_STOCKS]: state => {
        
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}