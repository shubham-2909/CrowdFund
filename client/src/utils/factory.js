import web3 from './web3'
const address = '0x893a1a51D638a30c4d14C7ded65814E9BEADDfA3'
const factoryABI = [
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    name: 'deployedCampaigns',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'deadline',
        type: 'uint256',
      },
      {
        name: 'target',
        type: 'string',
      },
      {
        name: 'title',
        type: 'string',
      },
      {
        name: 'description',
        type: 'string',
      },
      {
        name: 'image',
        type: 'string',
      },
    ],
    name: 'createCampaign',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'getDeployedCampaigns',
    outputs: [
      {
        name: '',
        type: 'address[]',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

const instance = new web3.eth.Contract(factoryABI, address)
export default instance
