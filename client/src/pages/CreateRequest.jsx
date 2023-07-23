import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'
import web3 from '../utils/web3'
import Campaign from '../utils/getCampaign'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
const CreateRequest = () => {
  const { address } = useParams()
  const navigate = useNavigate()
  const [request, setRequest] = useState({
    description: '',
    recipient: '',
    value: '',
  })
  const [loading, setLoading] = useState(false)

  const handleFormChange = (fieldName, e) => {
    setRequest({ ...request, [fieldName]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log(request)
    setLoading(true)
    try {
      const accounts = await web3.eth.getAccounts()
      const campaign = Campaign(address)
      const { description, recipient, value } = request
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, 'ether'),
          recipient.trim()
        )
        .send({ from: accounts[0] })
      toast.success(
        'Request Create if it has more than 50% approvers money will be sent'
      )
      navigate(`/campaign-details/${address}/requests`)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

    setLoading(false)
  }

  if (loading) {
    return <Loader />
  }
  return (
    <div className='bg-[#1c1c24] flex justify-center  items-center flex-col rounded-[10px] sm:p-10 p-4 gap-3'>
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Create a Request
        </h1>
      </div>
      <form
        className='w-full flex flex-col gap-[30px]'
        onSubmit={handleFormSubmit}
      >
        <FormField
          labelName='Description *'
          placeholder='About your request'
          inputType='text'
          value={request.description}
          handleChange={(e) => handleFormChange('description', e)}
        />
        <label className='flex-1 w-full flex flex-col'>
          <span className='font-epilogue text-[#808191] '>Value *</span>
        </label>
        <input
          type='number'
          placeholder='ETH 0.1'
          step='0.01'
          className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
          value={request.value}
          onChange={(e) => handleFormChange('value', e)}
        />
        <FormField
          labelName='Recipient *'
          placeholder='Address of the recipient'
          inputType='text'
          value={request.recipient}
          handleChange={(e) => handleFormChange('recipient', e)}
        />
        <CustomButton
          btnType='submit'
          title='Create New Request'
          styles='bg-[#1dc071] justify-self-start w-[16rem]'
        />
      </form>
    </div>
  )
}

export default CreateRequest
