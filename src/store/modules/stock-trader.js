import * as types from '../types'
import numeral from 'numeral'
import { utilities } from '../utilities'
import db from '../db'
const state = {
  stocks: [],
  loading: true,
  userDataLoading: true,
  userData: {
    id: '',
    funds: '',
    stocks: []
  }
}

const getters = {
  getFunds: state => {
    return numeral(state.userData.funds).format("$0,0.00");
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
      db.collection("stocks").onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            context.state.stocks.push({
              ...change.doc.data(),
              id: change.doc.id
            });
          }
          resolve();
        });
      });
    });
  },
  getUserStocks: context => {
    return new Promise(resolve => {
      db.collection("userData").onSnapshot(res => {
        const changes = res.docChanges();
        changes.forEach(change => {
          if (change.type === "added") {
            context.state.userData.id = change.doc.id;
            context.state.userData.stocks = change.doc.data().stocks;
            context.state.userData.funds = change.doc.data().funds ? change.doc.data().funds : '10000';
          } else if (change.type === "removed") {
            var index = context.state.userData.indexOf(s => { s.id == change.doc.id });
            context.state.userData.splice(index, 1);
          }
        });
        resolve();
      });
    });
  },
  endDayAsync: context => {
    return new Promise((resolve) => {
      let count = context.state.stocks.length;
      context.state.stocks.forEach(element => {
        let rnd = utilities.getRandomArbitrary(-10, 10);
        if (element.price + rnd < 0)
          element.price = 0;
        element.price = Number(element.price) + Number(rnd);
        db.collection("stocks")
          .doc(element.id)
          .update(element).then(() => {
            count = count - 1;
            if (count == 0) {
              resolve();
            }
          })
      });
    })
  },
  loadUserStocksAsync: context => {
    return new Promise((resolve) => {
      db.collection("userData").get().then(snapshot => {
        snapshot.forEach(doc => {
          context.state.userData = doc.data()
        })
        resolve();
      })
    })
  },
  saveUserStocksAsync: context => {
    new Promise((resolve) => {
      let id = context.state.userData.id;
      db.collection("userData").doc(id).update(context.state.userData).then(() => {
        resolve();
      })
    })
  }
}

const mutations = {
  [types.BUY_STOCK]: (state, payload) => {
    if (state.userData.funds - payload.price * payload.count < 0) {
      throw "Not enough funds";
    }
    //current payload count will represent amount of stocks to buy
    state.userData.funds -= payload.price * payload.count;

    let currentStockindex = state.userData.stocks.findIndex(e => e.id == payload.id);
    if (currentStockindex >= 0) {
      state.userData.stocks[currentStockindex].count = Number(state.userData.stocks[currentStockindex].count) + Number(payload.count);
    } else {
      state.userData.stocks.push(payload);
    }
  },
  [types.SELL_STOCK]: (state, payload) => {
    //current payload count will represent amount of stocks to sell
    let stockIndex = state.stocks.findIndex(e => e.id == payload.id);
    let userStockIndex = state.userData.stocks.findIndex(e => e.id == payload.id);
    if (stockIndex < 0 || userStockIndex < 0) {
      throw "Can not find requested stock"
    }

    state.userData.funds += payload.count * state.stocks[stockIndex].price;
    state.userData.stocks[userStockIndex].count -= payload.count;
    if (state.userData.stocks[userStockIndex].count == 0) {
      //if count == 0 then remove stock from array
      state.userData.stocks.splice(userStockIndex, 1);
    }
  },
  [types.SET_LOADING]: state => {
    state.loading = false;
  },
  [types.FINISH_USER_LOADING]: state => {
    state.userDataLoading = false;
  }
}

export default {
  state: () => (state),
  getters,
  actions,
  mutations
}