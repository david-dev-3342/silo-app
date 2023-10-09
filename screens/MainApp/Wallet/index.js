import React from 'react'
import {ScrollView, View} from 'react-native'
import {
  AppText,
  Divider,
  ScreenContainer,
  Spacer,
} from '../../../global/components'
import {WalletComponents} from './components'

export default () => {
  return (
    <ScreenContainer title="Aousaf's Wallet">
      <ScrollView>
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          <WalletComponents.BalanceBox />
          <Spacer multiply={3} />
          <Divider />
          <Spacer multiply={3} />
          <AppText.Xl>Assets</AppText.Xl>
          <Spacer multiply={3} />
          <WalletComponents.AssetContainer />
        </View>
      </ScrollView>
    </ScreenContainer>
  )
}
