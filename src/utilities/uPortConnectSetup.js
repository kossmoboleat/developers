import { Connect } from 'uport-connect'
let uPortConnect = {}

if (typeof window !== 'undefined') {
  uPortConnect = new Connect('MyApps', {
    accountType: 'keypair',
    profileImage: {'/': '/ipfs/Qmez4bdFmxPknbAoGzHmpjpLjQFChq39h5UMPGiwUHgt8f'},
    bannerImage: {'/': '/ipfs/QmTFNFu1v4dev6YCDoMuSG9Zi3EubagUJ4LQxoZkMiBPSF'},
    description: 'uPort Developer Portal'
  })
}

export {uPortConnect}
