import {useNavigation} from '@react-navigation/native'
import React, {useEffect} from 'react'
import {Image, Text, View} from 'react-native'
import LoadingAnim from '../../assets/anims/loading.gif'
import {AuthRoutes} from '../../data/routes'

export default () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(
      () =>
        navigation.reset({
          index: 0,
          routes: [AuthRoutes.AuthFlow],
        }),
      1500,
    )
  }, [])
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fbf9f9',
      }}>
      <Image
        style={{position: 'absolute', alignSelf: 'center', height: 100}}
        resizeMode='contain'
        source={LoadingAnim}
      />
    </View>
  )
}
