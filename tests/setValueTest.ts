import TonContract from './utils/ton-contract'
import { TonClient } from '@tonclient/core'
import pkgSafeMultisigWallet from '../ton-packages/SafeMultisigWallet.package'

let client: TonClient
let smcSafeMultisigWallet: TonContract

smcSafeMultisigWallet = new TonContract({
  client,
  name: 'SafeMultisigWallet',
  tonPackage: pkgSafeMultisigWallet,
  address: process.env.MULTISIG_ADDRESS,
  keys: {
    public: process.env.MULTISIG_PUBKEY,
    secret: process.env.MULTISIG_SECRET,
  },
})

export function setValueTest(corvalue, incorvalue) {
  if (typeof corvalue == 'string' && typeof incorvalue != 'string') {
    console.log(
      corvalue,
      ' is correct input.',
      incorvalue,
      ' is incorrect input.',
    )
    return true
  } else if (typeof corvalue == 'string' && typeof incorvalue == 'string') {
    console.log(
      corvalue,
      ' is correct input.',
      incorvalue,
      ' is correct input.',
    )
    return true
  } else {
    return false
  }
}
