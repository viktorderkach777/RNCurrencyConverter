import React, { Component } from 'react'
import {
    View,
    Button,
    TextInput,
    StyleSheet,
    Picker,
    Text,
    TouchableHighlight
} from 'react-native'
import axios from 'axios'


class Converter extends Component {
    state = {
        fromcurrency: "",
        tocurrency: "",
        amount: '',
        currencyarr: [],
        result: ''
    }

    componentDidMount() {
        this.sendServerGet();
    }

    sendServerGet = () => {
        const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
        console.log("Show click info");
        axios.get(url).then((response) => {
            this.setState(previousState => ({ currencyarr: response.data }))
            console.log("currency: ", this.state.data);
        });
    }

    convert() {
        const { fromcurrency, tocurrency, amount } = this.state;
        if (fromcurrency !== "", tocurrency !== "", amount !== "") {
            let res = Math.round((fromcurrency * parseInt(amount)) / tocurrency);
            this.setState({ result: res.toString() });
        }
        else
            this.setState({ result: '0' });

    }


    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.titleText}>Super Currency Converter</Text>

                <Text style={styles.subtitleText}>From</Text>

                <Picker
                    selectedValue={this.state.fromcurrency}
                    style={styles.pickerStyle}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ fromcurrency: itemValue })
                    }>
                    {this.state.currencyarr.map((item) => <Picker.Item label={item.cc} value={item.rate} key={item.r030} />)}
                </Picker>



                <TextInput
                    
                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder="Amount"
                    onChangeText={(amount) => {if (/^\d+$/.test(amount) || amount === ''){this.setState({ amount })}}}
                    value={this.state.amount}
                    maxLength={10}
                />

                <Text style={styles.subtitleText}>To</Text>

                <Picker
                    selectedValue={this.state.tocurrency}
                    style={styles.pickerStyle} 
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ tocurrency: itemValue })
                    }>
                    {this.state.currencyarr.map((item) => <Picker.Item label={item.cc} value={item.rate} />)}
                </Picker>

               

                <TextInput
                    style={styles.input}
                    placeholder="Result"
                    value={this.state.result}
                />



                {/* <TouchableHighlight
                    title="Convert"
                    onPress={() => this.convert()}
                /> */}

                <TouchableHighlight style={[styles.buttonContainer, styles.convertButton]} onPress={() => this.convert()}>
                    <Text style={styles.btnconvertText}>Convert</Text>
                </TouchableHighlight>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 320,
        height: 55,
        backgroundColor: '#b3d9ff',
        marginTop: 2,
        padding: 8,
        color: '#3d3d5c',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#80bfff'
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3d3d5c',
        fontStyle:'italic'
       
    },
    pickerStyle:{  
        height: 110,  
        width: "80%",  
        color: '#3d3d5c',  
        justifyContent: 'center',  
        fontSize: 20,
        
    },
    subtitleText:{
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3d3d5c',
        marginTop:50,
        fontStyle:'italic'
    },
    buttonContainer: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:300,
        borderRadius:30,
        marginTop:50
      },
      convertButton: {
        backgroundColor: "#4d79ff",
      },
      btnconvertText: {
        color: 'white',
        fontSize: 20

      }
})


export default Converter;