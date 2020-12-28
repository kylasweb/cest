/** @format */

import React from 'react';
import { Image } from 'react-native';
import { Images } from '@common';
import { AppLoading, Asset, Font } from 'expo';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from '@store/configureStore';
import RootRouter from './src/Router';

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

export default class App extends React.Component {
  state = { appIsReady: false };

  componentWillMount() {
    console.ignoredYellowBox = [
      'Warning: View.propTypes',
      'Warning: BackAndroid',
    ];
  }

  loadAssets = async () => {
    const fontAssets = cacheFonts([
      { OpenSans: require('@assets/fonts/SF-Pro-Text-Regular.otf') },
      { Baloo: require('@assets/fonts/SF-Pro-Text-Regular.otf') },
      { Entypo: require('react-native-vector-icons/fonts/Entypo.ttf') },
      {
        'Material Icons': require('react-native-vector-icons/fonts/MaterialIcons.ttf'),
      },
      {
        MaterialCommunityIcons: require('react-native-vector-icons/fonts/MaterialCommunityIcons.ttf'),
      },
      {
        'Material Design Icons': require('react-native-vector-icons/fonts/MaterialCommunityIcons.ttf'),
      },
      { FontAwesome: require('react-native-vector-icons/fonts/FontAwesome.ttf') },
      {
        'simple-line-icons': require('react-native-vector-icons/fonts/SimpleLineIcons.ttf'),
      },
      { Ionicons: require('react-native-vector-icons/fonts/Ionicons.ttf') },
    ]);

    const imageAssets = cacheImages([
      require('@images/payment_logo/PayPal.png'),
      require('@images/payment_logo/cash_on_delivery.png'),
      require('@images/payment_logo/stripe.png'),
      require('@images/payment_logo/razorpay.png'),
      Images.icons.iconCard,
      Images.icons.iconColumn,
      Images.icons.iconLeft,
      Images.icons.iconRight,
      Images.icons.iconThree,
      Images.icons.iconAdvance,
      Images.icons.iconHorizal,
      Images.icons.back,
      Images.icons.home,
      Images.IconSwitch,
      Images.IconFilter,
      Images.IconList,
      Images.IconGrid,
      Images.IconCard,
      Images.IconSearch,
      Images.IconHome,
      Images.IconCategory,
      Images.IconHeart,
      Images.IconOrder,
      Images.IconCart,
      Images.IconFBLike,
      Images.CartIcon,
      Images.AddIcon,
      Images.TrashIcon,
      Images.IconUser
    ]);

    await Promise.all([...fontAssets, ...imageAssets]);
  };

  render() {
    const persistor = persistStore(store);

    if (!this.state.appIsReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={() => this.setState({ appIsReady: true })}
        />
      );
    }

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RootRouter />
        </PersistGate>
      </Provider>
    );
  }
}
