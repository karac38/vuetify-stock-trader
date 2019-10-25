import * as types from '../types'
import numeral from 'numeral'
import { utilities } from '../utilities'
//import db from '../db'
const state = {
  funds: 10000,
  stocks: [],
  loading: true,
  userStocks: []
}

const getters = {
  getFunds: state => {
    return numeral(state.funds).format("$0,0.00");
  }
}

const actions = {
  buyStocksAsync({ commit }, payload) {
    return new Promise((resolve) => {
      commit(types.BUY_STOCK, payload);
      resolve();
    })
  },
  sellStocksAsync({ commit }, payload) {
    return new Promise((resolve) => {
      commit(types.SELL_STOCK, payload);
      resolve();
    })
  },
  getStockPriceAsync(context, { id }) {
    return new Promise((resolve, reject) => {
      let stockIndex = context.state.stocks.findIndex(e => e.id == id);
      if (stockIndex < 0) {
        reject("Can not find requested stock");
      }
      resolve(context.state.stocks[stockIndex].price);
    })
  },
  getStocksAsync: context => {
    return new Promise((resolve) => {
      setTimeout(() => {
        context.state.stocks.push({
          id: utilities.uuidv4(),
          name: "BMW",
          price: 110
        });
        context.state.stocks.push({
          id: utilities.uuidv4(),
          name: "Google",
          price: 200
        });

        context.state.stocks.push({
          id: utilities.uuidv4(),
          name: "Twitter",
          price: 110
        });
        context.state.stocks.push({
          id: utilities.uuidv4(),
          name: "Apple",
          price: 290
        });
        resolve();
      }, 3000);
    });

    // db.collection("stocks").onSnapshot(res => {
    //   const changes = res.docChanges();
    //   changes.forEach(change => {
    //     if (change.type === "added") {
    //       context.state.stocks.push({
    //         ...change.doc.data(),
    //         id: change.doc.id
    //       });
    //     } else if (change.type === "removed") {
    //       var index = context.state.stocks.indexOf((x) => x.id == change.doc.id);
    //       context.state.stocks.splice(index, 1);
    //     }
    //   });
    // });
  },
  endDayAsync: context => {
    return new Promise((resolve) => {
      let count = context.state.stocks.length;
      context.state.stocks.forEach(element => {
        setTimeout(() => {
          let rnd = utilities.getRandomArbitrary(-10, 10);
          if (element.price + rnd < 0)
            element.price = 0;
          element.price += rnd;
          count--;
          if (count == 0) {
            resolve();
          }
        }, 1000);
        // db.collection("stocks")
        // .doc(this.element.id)
        // .update(element).then(()=>{count--;})
      });
    })
  },
  // loadUserStocks: context => {
  //   return new Promise((resolve) => {
  //     db.collection("userData").get().then( snapshot => {
  //       context.state.userStocks = snapshot;
        
  //       snapshot.forEach(doc => {
  //         console.log(doc.id, '=>', doc.data());
  //       })
  //     })
  //   }) 
  // },
  // saveUserStocks: context => {

  // }
}

const mutations = {
  [types.BUY_STOCK]: (state, payload) => {
    if (state.funds - payload.price * payload.count < 0) {
      throw "Not enough funds";
    }
    //current payload count will represent amount of stocks to buy
    state.funds -= payload.price * payload.count;
    let currentStockindex = state.userStocks.findIndex(e => e.id == payload.id);
    if (currentStockindex >= 0) {
      state.userStocks[currentStockindex].count = Number(state.userStocks[currentStockindex].count) + Number(payload.count);
    } else {
      state.userStocks.push(payload);
    }
  },
  [types.SELL_STOCK]: (state, payload) => {
    //current payload count will represent amount of stocks to sell
    let stockIndex = state.stocks.findIndex(e => e.id == payload.id);
    let userStockIndex = state.userStocks.findIndex(e => e.id == payload.id);
    if (stockIndex < 0 || userStockIndex < 0) {
      throw "Can not find requested stock"
    }

    state.funds += payload.count * state.stocks[stockIndex].price;
    state.userStocks.splice(userStockIndex, 1);
  },
  [types.SET_LOADING]: state => {
    state.loading = false;
  }
}

export default {
  state: () => (state),
  getters,
  actions,
  mutations
}