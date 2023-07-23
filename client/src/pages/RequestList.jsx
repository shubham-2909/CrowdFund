import { useEffect, useState } from 'react'
import web3 from '../utils/web3'
import Campaign from '../utils/getCampaign'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import RequestRow from '../components/RequestRow'
const RequestList = () => {
  const { address } = useParams()
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [approversCount, setApproversCount] = useState('')

  const getAllRequests = async () => {
    try {
      setLoading(true)
      const campaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()
      const requestCount = await campaign.methods
        .getRequestsCount()
        .call({ from: accounts[0] })
      console.log(requestCount)
      const approversCount = await campaign.methods.approversCount().call()
      setApproversCount(approversCount)
      let newRequests = []
      for (let i = 0; i < requestCount; i++) {
        const req = await campaign.methods.requests(i).call()
        newRequests.push(req)
      }
      setRequests(newRequests)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }
  useEffect(() => {
    getAllRequests()
  }, [])
  if (loading) {
    return <Loader />
  }
  if (!loading && requests.length === 0) {
    return (
      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
          Owner has not created any requests yet
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1 className='font-epilogue font-semibold text-[18px] text-white text-left mb-6'>
        All Requests ({requests.length})
      </h1>
      <div className=' w-full overflox-x-auto'>
        <table className='min-w-full leading-normal'>
          <thead>
            <tr>
              <th className='px-5 py-3 border-b-2 border-gray-200 border-gray-700 bg-[#1c1c24] text-left font-epilogue font-semibold text-[18px] text-white  tracking-wider'>
                ID
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 border-gray-700 bg-[#1c1c24] text-left font-epilogue font-semibold text-[18px] text-white   tracking-wider'>
                Description
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 border-gray-700 bg-[#1c1c24] text-left font-epilogue font-semibold text-[18px] text-white  tracking-wider'>
                Amount
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 border-gray-700 bg-[#1c1c24] text-left font-epilogue font-semibold text-[18px] text-white  tracking-wider'>
                Recipient
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 border-gray-700 bg-[#1c1c24] font-epilogue font-semibold text-[18px] text-white text-left  tracking-wider'>
                Approve
              </th>
              <th className='px-5 py-3 border-b-2 border-gray-200 border-gray-700 bg-[#1c1c24] font-epilogue font-semibold text-[18px] text-white text-left  tracking-wider'>
                Finalize
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => {
              return (
                <RequestRow
                  key={index}
                  id={index}
                  request={request}
                  approversCount={approversCount}
                  address={address}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RequestList
