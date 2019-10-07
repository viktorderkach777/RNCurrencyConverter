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
 import Gallery from './app/components/gallery'



class App extends Component{


  render(){
    return(
      <Fragment>

          {/* <SignUp></SignUp> */}
          {/* <SignIn></SignIn> */}
          {/* <Converter></Converter> */}
          <Gallery></Gallery>
      </Fragment>
    );
  }
  
}



export default App;
