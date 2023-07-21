import { useState, useEffect } from 'react'
import web3 from '../utils/web3'
import instance from '../utils/factory'
import { toast } from 'react-toastify'
import DisplayCampaigns from '../components/DisplayCampaigns'
import Campaign from '../utils/getCampaign'
const Home = () => {
  const [allCampaigns, setAllCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const getAllCampaigns = async () => {
    setIsLoading(true)
    try {
      let arr = []
      const accounts = await web3.eth.getAccounts()
      const campaigns = await instance.methods
        .getDeployedCampaigns()
        .call({ from: accounts[0] })
      for (const address of campaigns) {
        const campaign = Campaign(address)
        const summary = await campaign.methods
          .getSummary()
          .call({ from: accounts[0] })
        const balance = await web3.eth.getBalance(address)
        console.log(summary)
        const newObj = {
          approversCount: summary['0'],
          target: web3.utils.fromWei(summary['1'], 'ether'),
          deadline: summary['2'],
          title: summary['3'],
          image: summary['4'],
          description: summary['5'],
          owner: summary['6'],
        }
        arr.push({ ...newObj, address, balance })
      }
      setAllCampaigns(arr)
    } catch (err) {
      toast.error(err.message)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    getAllCampaigns()
  }, [])
  return (
    <DisplayCampaigns
      title='All Campaigns'
      campaigns={allCampaigns}
      isLoading={isLoading}
    />
  )
}

export { Home }
