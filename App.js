import React from 'react';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';


const store = ConfigureStore();

export default class App extends React.Component {
  render() {
    return (
    <Provider store={store}>
      <Main />
    </Provider>
    );
  }
}

//to main store is available which means all states
//and reducers and thunks
