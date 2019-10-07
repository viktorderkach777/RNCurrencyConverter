import React, { Component } from 'react'
import {
    View, Text, StyleSheet, ScrollView, Alert,
    Image, TouchableOpacity, NativeModules,
    Dimensions, TextInput, TouchableHighlight
} from 'react-native'
import axios from 'axios'
import ImagePicker from 'react-native-image-crop-picker';


class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            imagedata: '',
            uploadimageurl: "data:image/png;base64,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",
            UserName: '',
            UserCompany: '',
            UserOffice: '',
            UserPhoneNumber: '',
            UserEmail: '' 

        };
    }


    AddContact(){
        const {UserName,UserCompany,UserOffice,UserPhoneNumber,UserEmail,image}=this.state;
        
        if (UserName !== '' && UserPhoneNumber !== '') {
            const model={Name:UserName,Company:UserCompany,Office:UserOffice,PhoneNumber:UserPhoneNumber,Email:UserEmail,Image:image.uri}
            console.log('model: ',model);
            axios.post(`http://10.0.2.2:5000/api/Contact/addcontact`,  model )
                .then(res => {
                    console.log(res);
                })
        }
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    cleanupSingleImage() {
        let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
        console.log('will cleanup image', image);

        ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
            console.log(`removed tmp image ${image.uri} from tmp directory`);
        }).catch(e => {
            alert(e);
        })
    }


    pickSingle(cropit, circular = false, mediaType) {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeBase64: true,
            includeExif: true,
        }).then(image => {
            console.log('received image', image);
            this.setState({
                image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height},
                images: null
               
            });
        }).catch(e => {
            console.log(e);
            Alert.alert(e.message ? e.message : e);
        });
    }



    scaledHeight(oldW, oldH, newW) {
        return (oldH / oldW) * newW;
    }


    renderImage(image) {
        return (
        <TouchableOpacity onPress={() => this.pickSingle(true, true)} >
        <Image style={styles.ContactImage} source={image} />
        </TouchableOpacity>
        );
    }

    renderUploadImage(image) {

        return (
            <TouchableOpacity onPress={() => this.pickSingle(true, true)} >
                <Image style={styles.ContactImage} source={{ uri: this.state.uploadimageurl }} />
            </TouchableOpacity>
        );
    }

    renderAsset(image) {
        if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
            return this.renderVideo(image);
        }

        return this.renderImage(image);
    }





    render() {



        return (
            <View style={styles.container}>

                <Text style={styles.titleText}>New Contact</Text>

                {this.state.image ? this.renderAsset(this.state.image) : this.renderUploadImage(this.state.uploadimageurl)}

                <TextInput
                    style={styles.input}
                    placeholder='Name'
                    onChangeText={(username) => { if (/^[a-zA-Zа-яА-Я]+$/ui.test(username) || username === '') { this.onChangeText('UserName', username) } }}
                    value={this.state.UserName}
                    maxLength={15}
                />


                <TextInput
                    style={styles.input}
                    placeholder='Company'
                    onChangeText={val => this.onChangeText('UserCompany', val)}
                    maxLength={30}>

                </TextInput>

                <TextInput
                    style={styles.input}
                    placeholder='Office'
                    onChangeText={(useroffice) => { if (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(useroffice) || useroffice === '') { this.onChangeText('UserOffice', useroffice) } }}
                    maxLength={30}>
                </TextInput>

                <TextInput

                    style={styles.input}
                    keyboardType='number-pad'
                    placeholder="Phone number"
                    onChangeText={(phonenumber) => { if (/^\d+$/.test(phonenumber) || phonenumber === '') { this.onChangeText('UserPhoneNumber', phonenumber) } }}
                    value={this.state.UserPhoneNumber}
                    maxLength={10}
                />


                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    onChangeText={val => this.onChangeText('UserEmail', val)}>
                </TextInput>

                <TouchableHighlight style={[styles.buttonContainer, styles.addButton]} onPress={() => this.AddContact()}>
                    <Text style={styles.btnaddText}>Add</Text>
                </TouchableHighlight>



            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#80bfff'
    },

    input: {
        width: 320,
        height: 55,
        backgroundColor: '#b3d9ff',
        margin: 10,
        padding: 8,
        color: '#3d3d5c',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    titleText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#3d3d5c',
        fontStyle: 'italic',
        marginTop: 5,
        marginBottom: 20

    },

    buttonContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 300,
        borderRadius: 30,
        marginTop: 50
    },
    addButton: {
        backgroundColor: "#4d79ff",
    },
    btnaddText: {
        color: 'white',
        fontSize: 20

    },
    ContactImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 200 / 2,
        marginBottom: 5
    }
})


export default Gallery;