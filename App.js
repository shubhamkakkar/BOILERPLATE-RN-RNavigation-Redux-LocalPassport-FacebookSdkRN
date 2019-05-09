import React, { Component } from "react"

import { StackNavigator, BottomTabNavigator } from "./src/NavigationSetup"

// import configureStore from "./src/store"


// const store = configureStore()
// store.subscribe(() => {
//   const stores = store.getState()
//   console.log(stores)
// })

export default class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      // <StackNavigator />
      // {
      <BottomTabNavigator />
      // }
      // </Provider>
    );
  }
}
