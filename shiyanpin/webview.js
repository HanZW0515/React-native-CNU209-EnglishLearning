/**
 * Created by DELL on 2016-3-16.
 */
var React = require('react-native');
var { StyleSheet } = React;

var WebViewAndroid = require('react-native-webview-android');

var SITE_URL = "https://www.baidu.com";

var WebViewAndroidExample = React.createClass({
    getInitialState: function() {
        return {
            url: SITE_URL,
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
        };
    },
    goBack: function() {
        this.refs.webViewAndroidSample.goBack(); // you can use this callbacks to control webview
    },
    goForward: function() {
        this.refs.webViewAndroidSample.goForward();
    },
    reload: function() {
        this.refs.webViewAndroidSample.reload();
    },
    onNavigationStateChange: function(event) {
        console.log(event);

        this.setState({
            backButtonEnabled: event.canGoBack,
            forwardButtonEnabled: event.canGoForward,
            url: event.url,
            status: event.title,
            loading: event.loading
        });
    },
    render: function() {
        return (
            <WebViewAndroid
                ref="webViewAndroidSample"
                javaScriptEnabled={true}
                geolocationEnabled={false}
                builtInZoomControls={false}
                onNavigationStateChange={this.onNavigationStateChange}
                url={SITE_URL}
                style={styles.containerWebView} />
        );

        // other attributes: html(string), htmlCharset(string), baseUrl(string), injectedJavaScript(string), disableCookies(bool), disablePlugins(bool), userAgent(string)
    }
});

var styles = StyleSheet.create({
    containerWebView: {
        flex: 1,
    }
});

module .exports=WebViewAndroidExample;