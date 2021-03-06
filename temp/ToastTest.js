'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    Image,
    StyleSheet
} from 'react-native';

var Cordova = require('react-native-cordova-plugin');

var try1 = React.createClass ({

    getInitialState: function() {
        return {
            result: 'No picture taken yet',
            img: 'http://placehold.it/350x350'
        };
    },

    takePicture(source) {
        this.setState({ result: '' });
        Cordova.navigator.camera.getPicture(
            (img) => this.setState({ img }),
            (result) => this.setState({ result }),
            { sourceType: source }
        );
    },

    render : function () {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Select a picture</Text>
                <View style={styles.buttonContainer}>
                    <Text name="camera" onPress={() => this.takePicture(Cordova.Camera.PictureSourceType.CAMERA) }>
                        Camera
                    </Text>
                    <Text name="ios-albums" onPress ={() => this.takePicture(Cordova.Camera.PictureSourceType.SAVEDPHOTOALBUM) }>
                        Album
                    </Text>
                </View>
                <View style={styles.separator}></View>
                <Text style={styles.message}>
                    {this.state.img}
                </Text>
                <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={{ uri: this.state.img, isStatic: true }}>
                </Image>
                <Text style={styles.message}>
                    {this.state.result}
                </Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        padding: 10,
        alignItems: 'stretch',
        flexDirection: 'column'
    },
    titleText: {
        fontSize: 20,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-around'
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
        marginTop: 20,
        marginBottom: 20
    },
    icon: {
        alignItems: 'stretch',
        height: 150,
    },
    message: {
        fontSize: 15,
        textAlign: 'center',
        margin: 5
    }
});

module .exports=try1;
