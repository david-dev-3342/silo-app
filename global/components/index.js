import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import RNPIckerSelect from 'react-native-picker-select';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getRoutes} from '../../data/routes';
import Lottie from 'lottie-react-native';

const defaultFontStyles = {
  fontFamily: 'AirbnbCereal_W_Md',
};

/**
 *
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.style
 * @param {''} props.title
 * @param {boolean} props.defaultSpacing
 * @param {boolean} props.isUIBusy
 * @param {import('react-native').TextStyle} props.titleStyle
 * @returns
 */
export const ScreenContainer = ({
  children,
  style,
  title,
  defaultSpacing = true,
  isUIBusy,
  titleStyle,
}) => {
  const route = useRoute();
  const getScreen = getRoutes().find(x => x.name === route.name);
  return (
    <View
      style={{
        backgroundColor: 'white',
      }}>
      {isUIBusy && (
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            backgroundColor: '#e3e1e1',
          }}
        />
      )}
      <View
        style={[
          {
            height: '100%',
            width: '100%',
            padding: 15,
            paddingLeft: 20,
            paddingRight: 20,
          },
          style,
        ]}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            fontWeight: '600',
            ...titleStyle,
          }}>
          {title || getScreen.title || getScreen.options.title}
        </Text>
        {defaultSpacing && <Spacer multiply={5} />}
        {children}
      </View>
    </View>
  );
};

/**
 *
 * @param {Object} props
 * @param {Number} props.multiply
 * @param {'vertical' | 'horizontal'} props.orientation
 * @returns
 */
export const Spacer = ({multiply = 1, orientation = 'vertical'}) => {
  const getStyles =
    orientation === 'vertical'
      ? {
          height: 5 * multiply,
        }
      : {
          width: 5 * multiply,
        };

  return <View style={getStyles}></View>;
};
/**
 *
 * @param {Object} props
 * @param {Number} props.multiply
 * @param {'vertical' | 'horizontal'} props.orientation
 * @returns
 */
export const Divider = ({multiply = 1, orientation = 'vertical'}) => {
  const getStyles =
    orientation === 'vertical'
      ? {
          height: 1,
          width: '100%',
        }
      : {
          width: 1,
          height: '100%',
        };

  return <View style={[getStyles, {backgroundColor: '#D3D3D3'}]}></View>;
};

export const Picker = ({
  options,
  value,
  onValueChange = val => {},
  title,
  style,
}) => {
  const pickerRef = useRef();
  return (
    <TouchableOpacity
      onPress={() => pickerRef.current?.togglePicker()}
      style={{
        justifyContent: 'center',
        ...style,
      }}>
      {title && <Text style={{color: '#A6A6A6', fontSize: 12}}>{title}</Text>}
      <RNPIckerSelect
        ref={pickerRef}
        onValueChange={onValueChange}
        items={options}
        style={{
          inputIOS: {fontSize: 18},
          viewContainer: {
            marginTop: title ? 5 : 0,
            width: '100%',
          },
        }}
        value={value}
        Icon={() => (!title ? <Icon name="chevron-down" size={24} /> : <></>)}
      />
      {title && (
        <Icon
          name="chevron-down"
          size={24}
          style={{
            position: 'absolute',
            right: 15,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

/**
 *
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.style
 * @param {''} props.label
 * @param {boolean} props.isLoading
 * @param {() => {}} props.onPress
 * @returns
 */
export const CTAButton = ({
  children,
  style,
  label = 'Continue',
  isLoading,
  onPress = () => {},
}) => {
  const buttonRef = useRef();
  function performPress() {
    if (!isLoading) {
      onPress();
    }
  }
  return (
    <LinearGradient
      colors={['#A586DD', '#C6ADF3']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        borderRadius: 10,
      }}>
      <TouchableHighlight
        ref={buttonRef}
        underlayColor="#A586DD"
        style={{
          height: 55,
          justifyContent: 'center',
          alignContent: 'center',
          ...style,
        }}
        onPress={() => !isLoading && performPress()}>
        {isLoading ? (
          <ActivityIndicator size="small" color={'#fff'} />
        ) : (
          <AppText.Lg style={{textAlign: 'center', color: '#fff'}}>
            {label}
          </AppText.Lg>
        )}
      </TouchableHighlight>
    </LinearGradient>
  );
};

/**
 * The default Text component to be used in this app
 * @param {Object} props
 * @param {import('react-native').TextStyle} props.style
 * @returns
 */
export const AppText = {
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Xs: ({style, children, isBold}) => (
    <Text style={[defaultFontStyles, {fontSize: 12}, style]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Sm: ({style, children, isBold}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 14}]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Md: ({style, children}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 16}]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Lg: ({style, children}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 20}]}>{children}</Text>
  ),
  /**
   * The default Text component to be used in this app
   * @param {Object} props
   * @param {import('react-native').TextStyle} props.style
   * @returns
   */
  Xl: ({style, children}) => (
    <Text style={[defaultFontStyles, style, {fontSize: 26}]}>{children}</Text>
  ),
};

export function CustomTabBar({
  state,
  descriptors,
  navigation,
  specialTabIndex,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        shadowColor: '#8c8c8c',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
        overflow: 'visible',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const RegularTab = () => (
          <TouchableOpacity
            accessibilityRole="button"
            // accessibilityState={isFocused ? {selected: true} : {}}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              paddingTop: 15,
            }}>
            <Image
              source={isFocused ? options.icons.active : options.icons.regular}
            />
            <Text
              style={{
                color: isFocused ? '#673ab7' : '#222',
                paddingTop: 10,
                fontSize: 10,
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );

        const SpecialTab = () => (
          <TouchableOpacity
            accessibilityRole="button"
            // accessibilityState={isFocused ? {selected: true} : {}}
            // accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#A586DD',
              padding: 10,
              borderRadius: 50,
              height: 80,
              maxWidth: 80,
              marginTop: -30,
              shadowColor: '#4f2994',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,

              elevation: 12,
              zIndex: 99,
            }}>
            <Lottie
              source={options.icons.regular}
              autoPlay
              loop
              style={{
                height: 50,
                width: 50,
                marginRight: 5,
              }}
            />
            {/* <Text
              style={{
                color: '#fff',
                fontSize: 10,
                marginTop: -5
              }}>
              {label}
            </Text> */}
          </TouchableOpacity>
        );

        return index == specialTabIndex ? (
          <SpecialTab key={index} />
        ) : (
          <RegularTab key={index} />
        );
      })}
    </View>
  );
}

/**
 *
 * @param {Object} props
 * @param {import('react-native').ViewStyle} props.containerStyle
 * @param {import('react-native').TextStyle} props.inputStyle
 * @param {(val) => {}} props.onChangeText
 * @param {''} props.value
 * @param {'money' | 'other'} props.purpose
 * @param {import('react-native').TextInputProps} props.inputProps
 * @param {JSX.Element} props.leftElement
 */
export const AppTextInput = ({
  containerStyle,
  inputStyle,
  onChangeText,
  inputProps,
  leftElement,
  purpose,
  value,
}) => {
  const [focused, setFocued] = useState(false);
  return (
    <View
      style={[
        {
          borderWidth: 1,
          borderColor: focused ? '#000' : '#D3D3D3',
          padding: 10,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          alignContent: 'center',
        },
        containerStyle,
      ]}>
      {leftElement}
      {purpose === 'money' && (
        <AppText.Xs
          style={{
            color: focused ? '#000' : '#D3D3D3',
            marginRight: 10,
            ...inputStyle,
          }}>
          $
        </AppText.Xs>
      )}
      <TextInput
        placeholder="0.00"
        style={[
          {
            fontSize: 20,
            color: focused ? '#000' : '#D3D3D3',
            width: '100%',
          },
          inputStyle,
        ]}
        onChangeText={onChangeText}
        onFocus={() => setFocued(true)}
        onBlur={() => setFocued(false)}
        value={value}
        {...inputProps}
      />
    </View>
  );
};
