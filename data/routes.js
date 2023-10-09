import React from 'react'
import Wallet from '../assets/images/nav-icons/wallet.png'
import Wallet_Active from '../assets/images/nav-icons/wallet_active.png'
import Transfer from '../assets/images/nav-icons/transfer.png'
import Transfer_Active from '../assets/images/nav-icons/transfer_active.png'
import Account from '../assets/images/nav-icons/account.png'
import Account_Active from '../assets/images/nav-icons/account_active.png'

import WalletScreen from '../screens/MainApp/Wallet'
import SwapScreen from '../screens/MainApp/Swap'
import SwapAmountScreen from '../screens/MainApp/Swap/swapAmount'
import SwapConfirmScreen from '../screens/MainApp/Swap/swapConfirm'
import AccountsScreen from '../screens/MainApp/Accounts'
import TransferAnim from '../assets/anims/transfer-anim.json'

export const AuthRoutes = {
  default: {
    name: '/auth',
  },
  init: {
    name: '/init',
  },
  AuthFlow: {
    name: '/authFlow',
    title: "Let's Start",
  },
  AuthVerify: {
    name: '/authVerify',
    title: 'Confirm Your Profile',
  },
}

export const AppRoutes = {
  default: {
    name: '/',
  },
  Wallet: {
    name: '/wallet',
    component: WalletScreen,
    options: {
      title: 'Wallet',
      icons: {
        regular: Wallet,
        active: Wallet_Active,
      },
    },
  },
  TransferInit: {
    name: '/swap-init',
    options: {
      title: 'Swap',
      icons: {
        regular: TransferAnim,
      },
    },
  },
  Transfer: {
    name: '/swap',
    component: SwapScreen,
    options: {
      title: 'Swap',
    },
  },
  TransferAmount: {
    name: '/swap-amount',
    component: SwapAmountScreen,
    options: {
      title: 'Almost There',
    },
  },
  TransferConfirm: {
    name: '/swap-confirm',
    component: SwapConfirmScreen,
    options: {
      title: 'You are transferring',
    },
  },
  Accounts: {
    name: '/accounts',
    component: AccountsScreen,
    options: {
      title: 'Accounts',
      icons: {
        regular: Account,
        active: Account_Active,
      },
    },
  },
}

export function getRoutes () {
  const allRoutes = [AuthRoutes, AppRoutes] // Keep adding routes in this array

  const returnable = []

  allRoutes.map(route =>
    Object.keys(route).map(nestedRoute => {
      returnable.push({...route[nestedRoute]})
    }),
  )

  return returnable
}

export function getDedicatedRoutes (ignoreDefault = true) {
  return {
    AuthRoutes: combineAllRoutes(AuthRoutes, ignoreDefault),
    AppRoutes: combineAllRoutes(AppRoutes, ignoreDefault),
  }
}

function combineAllRoutes (route, ignoreDefault) {
  const returnable = []
  Object.keys(route).map(nestedRoute => {
    returnable.push({...route[nestedRoute]})
  })

  return ignoreDefault ? returnable.filter(x => x.name !== '/') : returnable
}
