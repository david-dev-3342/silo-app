import React, {useEffect, useRef} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Animated, {
  FadeIn,
  Transition,
  Transitioning,
  ZoomIn,
} from 'react-native-reanimated'
import {AppText} from '../../../../global/components'
import Icon from 'react-native-vector-icons/Feather'
import Lottie from 'lottie-react-native'
import SuccessAnim from '../../../../assets/anims/success-anim.json'

/**
 *
 * @param {Object} props
 * @param {'source' | 'target'} props.type
 * @param {''} props.name
 * @param {''} props.accountID
 * @param {import('react-native').ViewStyle} props.style
 * @param {() => {}} props.onRemove
 * @returns
 */
export const SwapItem = ({type, name, accountID, style, onRemove}) => {
  return (
    <Animated.View
      // layout={SlideInUp}
      entering={ZoomIn}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#0831ff20',
        // shadowColor: '#0831ff',
        // shadowOffset: {
        //   width: 0,
        //   height: 5,
        // },
        // shadowOpacity: 0.08,
        // shadowRadius: 8,
        // elevation: 10,
        padding: 2,
        paddingRight: 15,
        paddingLeft: 2,
        ...style,
      }}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 40,
            backgroundColor: '#e4e4e4',
          }}
          source=''
        />
        <View style={{paddingLeft: 10, justifyContent: 'center'}}>
          <AppText.Xs style={{color: '#999999'}}>
            {type === 'source' ? 'From' : 'To'}
          </AppText.Xs>
          <AppText.Xs>{name}</AppText.Xs>
        </View>
      </View>
      {/* <TouchableOpacity
          onPress={onRemove}
          style={{alignItems: 'center', backgroundColor: '#fafafa', padding: 5}}>
          <Icon name={`x`} size={20} color='#424242' />
        </TouchableOpacity> */}
    </Animated.View>
  )
}

const transition = (
  <Transition.Together>
    <Transition.Change durationMs={200} />
  </Transition.Together>
)

export const SwapContainer = ({data, onRemove, onSwitch}) => {
  const ref = useRef()

  return (
    <View>
      <LinearGradient
        colors={['#A586DD', '#C6ADF3']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          borderRadius: 50,
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Transitioning.View
          ref={ref}
          transition={transition}
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          {data.map((x, index) => (
            <SwapItem
              {...x}
              type={index == 0 ? 'source' : 'target'}
              key={x.name}
              style={{
                marginLeft: index == 1 ? 10 : 0,
                flex: 1,
              }}
            />
          ))}
        </Transitioning.View>
      </LinearGradient>
      <View style={{flexDirection: 'row', padding: 5, paddingTop: 10}}>
        {data.length > 0 && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#F7F4FB',
              padding: 10,
              borderRadius: 5,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={onRemove}>
            <Icon name='x' size={15} />
            <AppText.Sm style={{paddingLeft: 5}}>Clear All</AppText.Sm>
          </TouchableOpacity>
        )}
        {data.length > 1 && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: '#F7F4FB',
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginLeft: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              ref.current?.animateNextTransition()
              onSwitch()
            }}>
            <Icon name='repeat' size={13} />
            <AppText.Sm style={{paddingLeft: 5}}>Switch</AppText.Sm>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export const SwapSuccess = () => {
  const ref = useRef()

  useEffect(() => {
    ref.current?.play()
  }, [])
  return (
    <View
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <Lottie
        ref={ref}
        source={SuccessAnim}
        autoPlay={true}
        loop={false}
        style={{
          height: 350,
          width: 350,
          alignSelf: 'center',
        }}
      />
    </View>
  )
}
