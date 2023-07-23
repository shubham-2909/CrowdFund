import React from 'react'
import web3 from '../utils/web3'
import Campaign from '../utils/getCampaign'
import { toast } from 'react-toastify'
const RequestRow = ({ id, address, approversCount, request }) => {
  const { approvalCount, complete, recipient, description, value } = request
  const handleApprove = async () => {
    try {
      const campaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.approveRequest(id).send({ from: accounts[0] })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleFinalize = async () => {
    try {
      const campaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.finalizeRequest(id).send({ from: accounts[0] })
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  return (
    <tr className='text-gray-400 cursor-not-allowed'>
      <td className='px-5 py-5 border-b border-gray-200 border-gray-700  bg-[#1c1c24] text-sm '>
        <div className='flex items-center'>
          <div className='ml-3'>
            <p className=' text-white text-left whitespace-no-wrap'>{id}</p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 border-gray-700  bg-[#1c1c24] text-sm '>
        <div className='flex items-center'>
          <div className='ml-3'>
            <p className=' text-white text-left whitespace-no-wrap'>
              {description}
            </p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 border-gray-700  bg-[#1c1c24] text-sm '>
        <div className='flex items-center'>
          <div className='ml-3'>
            <p className=' text-white text-left whitespace-no-wrap'>
              {web3.utils.fromWei(value, 'ether')}
            </p>
          </div>
        </div>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 border-gray-700  bg-[#1c1c24] text-sm '>
        <p className=' text-white text-left whitespace-no-wrap'>{recipient}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 border-gray-700  bg-[#1c1c24] text-sm '>
        <p className=' text-white text-left whitespace-no-wrap'>
          {complete ? null : (
            <button
              className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#1dc071]`}
              onClick={handleApprove}
            >
              Approve
            </button>
          )}
        </p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 border-gray-700  bg-[#1c1c24] text-sm '>
        {complete ? null : (
          <button
            className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#1dc071]`}
            onClick={handleFinalize}
          >
            Finalize
          </button>
        )}
      </td>
    </tr>
  )
}

export default RequestRow
