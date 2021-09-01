import { TonClient } from '@tonclient/core'
import { createClient } from './utils/client'
import pkgSafeMultisigWallet from '../ton-packages/SafeMultisigWallet.package'
import TonContract from './utils/ton-contract'
import pkgJokes from '../ton-packages/Jokes.package'
import { assert } from 'chai'

import { setValueTest } from './setValueTest'
import { getValueTest } from './getValueTest'

const fs = require('fs')
describe('debot test', () => {
  let client: TonClient
  let smcSafeMultisigWallet: TonContract
  let smcTest: TonContract
  let aTest: TonContract

  before(async () => {
    client = createClient()
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
  })

  it('deploy test', async () => {
    const keys = await client.crypto.generate_random_sign_keys()
    smcTest = new TonContract({
      client,
      name: 'Jokes',
      tonPackage: pkgJokes,
      keys,
    })
    it('addrWallet test', async () => {
      const keys = await client.crypto.generate_random_sign_keys()
      aTest = new TonContract({
        client,
        name: 'aWallet',
        tonPackage: pkgJokes,
        keys,
      })
    })

    await smcTest.calcAddress()

    console.log('Test address: ', smcTest.address)

    await smcSafeMultisigWallet.call({
      functionName: 'sendTransaction',
      input: {
        dest: smcTest.address,
        value: 2e9,
        bounce: false,
        flags: 2,
        payload: '',
      },
    })

    await smcTest.deploy({
      input: {
        rootData: {
          name: 'name',
          symbol: 'symbol',
          icon: 'icon',
          desc: 'desc',
          decimals: 0,
          totalSupply: 100,
        },
        pubkeyOwner: `0x${keys.public}`,
        addrOwner: smcSafeMultisigWallet.address,
      },
    })
  }),
    it('setValue test', async () => {
      await smcTest.call({
        functionName: 'setValue',
        input: {
          value:
            'Купил мужик шляпу, она ему как раз. Купил вторую, она ему как два.',
        },
      })
      //   assert.isTrue(setValueTest('Joke №25', 123))
      //   assert.isTrue(setValueTest('Joke №12', 'Joke №15'))
    }),
    it('setValue test', async () => {
      await smcTest.call({
        functionName: 'setValue',
        input: {
          value:
            'Корабль потерпел крушение. Выжить и добраться до острова удалось лишь американцу, немцу и русскому.\n' +
            'Оказалoсь, что на необитаемом острове абсолютно нет еды. Прошло три дня и американец, не выдержав голода, отрезал кусок своей ноги.\nВсе трое поели. Ещё через три дня тоже самое сделал немец. Через неделю русский достаёт чл*н, присев за кустом. Немец, увидев это, радостно говорит:\n– Ох, сегодня будет колбаска!\nРусский:– Ага, сейчас будет тебе колбаска. По йогурту и спать!',
        },
      })
    }),
    it('setValue test', async () => {
      await smcTest.call({
        functionName: 'setValue',
        input: {
          value:
            'Лежит парочка после секса.\n–Олег, скажи мне что-нибудь, что я никогда не забуду.\n–Мой дед умер на этом диване.',
        },
      })
    }),
    it('getValue test', async () => {
      const res = await smcTest.run({
        functionName: 'getValues',
        input: {
          index: 0,
        },
      })
      console.log(res)
      assert.isTrue(getValueTest(0, -1))
    }),
    it('getValue test', async () => {
      const res = await smcTest.run({
        functionName: 'getValues',
        input: {
          index: 1,
        },
      })
      console.log(res)
      assert.isTrue(getValueTest(0, -1))
    }),
    it('getValue test', async () => {
      const res = await smcTest.run({
        functionName: 'getValues',
        input: {
          index: 2,
        },
      })
      console.log(res)
      assert.isTrue(getValueTest(0, -1))
    })
  // it('getLen test', async () => {
  //   await smcTest.run({
  //     functionName: 'getLenght',
  //     input: {},
  //   })
  // })
})
