package com.hello;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.toast.ToastModule;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;



import com.zmxv.RNSound.RNSoundPackage;
import com.burnweb.rnsimplealertdialog.RNSimpleAlertDialogPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.burnweb.rnwebview.RNWebViewPackage;
import com.imagepicker.ImagePickerPackage;
import io.cordova.reactnative.CordovaPluginPackage;
import com.reactnativerecordsound.ReactNativeRecordSoundPackager;
import com.wmjmc.reactspeech.VoicePackage;

import com.example.dell.nativemodule.BGNativeExamplePackage;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "hello";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNSoundPackage(),
        new RNSimpleAlertDialogPackage(this),
        new ReactVideoPackage(),
        new RNWebViewPackage(),
        new ImagePickerPackage(),
        new VoicePackage(),
        new BGNativeExamplePackage(),
        new ReactNativeRecordSoundPackager(),
        cordovaPluginPackage = new CordovaPluginPackage(this)
      );
    }
    private CordovaPluginPackage cordovaPluginPackage;
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            cordovaPluginPackage.setSavedInstanceState(savedInstanceState);
        }
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent intent) {
            super.onActivityResult(requestCode, resultCode, intent);
            cordovaPluginPackage.onActivityResult(requestCode, resultCode, intent);
        }
}
