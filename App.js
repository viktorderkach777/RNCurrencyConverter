import React,{Component,Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
 import SignUp from './app/components/registration'
 import SignIn from './app/components/login'
 import Converter from './app/components/converter'


class App extends Component{


  render(){
    return(
      <Fragment>

          {/* <SignUp></SignUp> */}
          {/* <SignIn></SignIn> */}
          <Converter></Converter>
        
      </Fragment>
    );
  }
  
}



export default App;
