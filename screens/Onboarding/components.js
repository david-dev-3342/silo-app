import React from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native'
import EmailIcon from '../../assets/images/email-icon.png'
import AppleIcon from '../../assets/images/apple-icon.png'
import GoogleIcon from '../../assets/images/google-icon.png'
import Icon from 'react-native-vector-icons/Feather'
import {AppText} from '../../global/components'

const authIcons = {
  Email: EmailIcon,
  Apple: AppleIcon,
  Google: GoogleIcon,
  Phone: (
    <Icon
      name='phone'
      size={18}
      style={{
        position: 'absolute',
        left: 10,
      }}
    />
  ),
}
/**
 *
 * @param {Object} props
 * @param {'Google' | 'Apple' | 'Email' | 'Phone'} props.type
 * @param {() => {}} props.onPress
 * @param {boolean} props.isLoading
 * @returns
 */
export const AuthProvider = ({type, onPress, isLoading}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#D0D5DD',
      justifyContent: 'center',
      marginBottom: 12,
      padding: 12,
      height: 45,
    }}>
    {isLoading ? (
      <ActivityIndicator size='small' />
    ) : (
      <>
        {typeof authIcons[type] === 'number' ? (
          <Image
            source={authIcons[type]}
            style={{
              position: 'absolute',
              left: 10,
              height: 18,
            }}
            resizeMode='contain'
          />
        ) : (
          authIcons[type]
        )}
        <AppText.Md
          style={{
            textAlign: 'center',
            fontWeight: '600',
          }}>
          Continue with {type}
        </AppText.Md>
      </>
    )}
  </TouchableOpacity>
)

export const OrDivider = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
    }}>
    <View style={{height: 1, backgroundColor: '#D3D3D3', width: '45%'}} />
    <Text style={{color: '#A6A6A6', fontSize: 15, fontWeight: '600'}}>or</Text>
    <View style={{height: 1, backgroundColor: '#D3D3D3', width: '45%'}} />
  </View>
)
