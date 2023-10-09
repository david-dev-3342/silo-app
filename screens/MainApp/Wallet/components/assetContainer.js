import React, {useState} from 'react'
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import {AppText, Spacer} from '../../../../global/components'
import Icon from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

const dummyAssets = [
  {
    name: 'USD',
    description: 'Flat Currency',
    value: 40000.21,
    valueShift: {
      type: 'positive',
      value: 352.9,
    },
  },
  {
    name: 'Stocks',
    description: 'Robinhood',
    value: 28090.51,
    valueShift: {
      type: 'negative',
      value: 120.9,
    },
  },
  {
    name: 'BTC',
    description: 'Bitcoin',
    value: 1350.21,
    valueShift: {
      type: 'negative',
      value: 20.5,
    },
  },
  {
    name: 'ALGO',
    description: 'Flat Currency',
    value: 40000.21,
    valueShift: {
      type: 'positive',
      value: 352.9,
    },
  },
]

/**
 *
 * @param {Object} props
 * @param {Object} props.iconSource The source of the icon
 * @param {string} props.name Name of asset
 * @param {string} props.description Description of asset
 * @param {number} props.value Description of asset
 * @param {{type: 'positive' | 'negative', value: number}} props.valueShift Description of asset
 * @returns
 */
const SingleAsset = ({iconSource, name, description, value, valueShift}) => (
  <TouchableOpacity
    style={{
      width: '100%',
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    }}>
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          backgroundColor: '#e4e4e4',
        }}
        source={iconSource || ''}
      />
      <View style={{paddingLeft: 10, justifyContent: 'center'}}>
        <AppText.Md>{name}</AppText.Md>
        <AppText.Xs style={{color: '#999999'}}>{description}</AppText.Xs>
      </View>
    </View>
    {value && valueShift && (
      <View>
        <AppText.Md>$ {value}</AppText.Md>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Icon
            name={
              valueShift?.type === 'positive'
                ? 'arrow-up-right'
                : 'arrow-down-left'
            }
            color={valueShift?.type === 'positive' ? '#3FBFA0' : '#ff3d3d'}
          />
          <AppText.Xs
            style={{
              textAlign: 'right',
              color: valueShift?.type === 'positive' ? '#3FBFA0' : '#ff3d3d',
            }}>
            {valueShift?.value}
          </AppText.Xs>
        </View>
      </View>
    )}
  </TouchableOpacity>
)

const AddAsset_Button = ({onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      width: '100%',
      flexDirection: 'row',
      height: 50,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
    }}>
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 40,
          borderColor: '#A586DD',
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderStyle: 'dashed',
        }}>
        <Icon name='plus' color={'#A586DD'} size={24} />
      </View>
      <View style={{paddingLeft: 10, justifyContent: 'center'}}>
        <AppText.Md style={{color: '#4f2994'}}>Add Wallet</AppText.Md>
        <AppText.Xs style={{color: '#999999'}}>
          Tap to connect new wallet
        </AppText.Xs>
      </View>
    </View>
  </TouchableOpacity>
)

const ShowAll_Button = ({onPress, isExpanded}) => (
  <TouchableOpacity style={styles.ShowButton} onPress={onPress}>
    <LinearGradient
      colors={['#F7F4FB00', '#F7F4FB']}
      start={{x: 0, y: 0}}
      end={{
        x: 0,
        y: 1,
      }}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingRight: 25,
        paddingLeft: 25,
        borderRadius: 10,
      }}>
      <Icon name={`arrow-${isExpanded ? 'up' : 'down'}`} size={18} />
      <AppText.Md style={{textAlign: 'center', paddingLeft: 5}}>
        {isExpanded ? 'Hide' : 'Show All'}
      </AppText.Md>
    </LinearGradient>
  </TouchableOpacity>
)

export default ({showAddButton = true, showExpandButton = true, expanded}) => {
  const [isExpanded, setExpanded] = useState(expanded)
  const item_height = 75

  const animatedStyles = {
    height: useSharedValue(item_height * (dummyAssets.length / 2 + 1)),
  }

  const containerStyle = useAnimatedStyle(() => {
    return {
      height: animatedStyles.height.value,
    }
  })

  function expandOrCollapse () {
    if (!isExpanded) {
      animatedStyles.height.value = withSpring(
        (dummyAssets.length + 1) * item_height,
        500,
      )
    } else {
      animatedStyles.height.value = withSpring(
        item_height * ((dummyAssets.length / 2) + 1),
        500,
      )
    }
    setExpanded(prev => !prev)
  }
  return (
    <Animated.View style={[containerStyle, {overflow: 'hidden'}]}>
      {showAddButton && <AddAsset_Button />}
      {dummyAssets.map(x => (
        <SingleAsset key={x.name} {...x} />
      ))}
      {showExpandButton && (
        <ShowAll_Button onPress={expandOrCollapse} isExpanded={isExpanded} />
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  ShowButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
