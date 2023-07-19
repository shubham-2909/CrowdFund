import web3 from './web3'
const address = '0xC84Cde552589B743F179450D5c9E94572754E342'
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
  {
    constant: false,
    inputs: [
      {
        name: 'deadline',
        type: 'uint256',
      },
      {
        name: 'target',
        type: 'uint256',
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
]

const instance = new web3.eth.Contract(factoryABI, address)
export default instance
