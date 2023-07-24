import { useState, useEffect } from 'react'
import web3 from '../utils/web3'
import instance from '../utils/factory'
import Campaign from '../utils/getCampaign'
import DisplayCampaigns from '../components/DisplayCampaigns'
import { toast } from 'react-toastify'
const Profile = () => {
  const [allCampaigns, setAllCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const getCampaigns = async () => {
    setIsLoading(true)
    try {
      let arr = []
      const accounts = await web3.eth.getAccounts()
      const campaigns = await instance.methods.getDeployedCampaigns().call()
      for (const address of campaigns) {
        const campaign = Campaign(address)
        const summary = await campaign.methods
          .getSummary()
          .call({ from: accounts[0] })
        const newObj = {
          approversCount: summary['0'],
          target: web3.utils.fromWei(summary['1'], 'ether'),
          deadline: summary['2'],
          title: summary['3'],
          image: summary['4'],
          description: summary['5'],
          owner: summary['6'],
        }
        if (newObj.owner === accounts[0]) {
          arr.push({ ...newObj, address })
        }
      }
      setAllCampaigns(arr)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getCampaigns()
  }, [])
  return (
    <DisplayCampaigns
      title={`Your Campaigns`}
      campaigns={allCampaigns}
      isLoading={isLoading}
    />
  )
}

export { Profile }
