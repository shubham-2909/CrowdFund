pragma solidity ^0.4.17;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint deadline , string target, string title , string description , string image ) public {
         //The deadline should be a date in future
        address newCampaign = new Campaign(msg.sender, title, description , image , target , deadline);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        bool complete;
        string description;
        address recipient;
        uint approvalCount;
        uint value;
        mapping (address=>bool) approvals;
    }
    address public manager;
    uint public approversCount;
    string public title;
    string public purpose;
    string public image;
    Request[] public requests;
    mapping (address=>bool) public approvers;
    string public target;
    uint public deadline;

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }

    function Campaign(address creator , string _title , string _description , string _image , string _target , uint _deadline)public {
        manager = creator;
        title = _title;
        purpose = _description;
        image = _image;
        target = _target;
        deadline = _deadline;
    }

    function contribute() public payable{
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest (string _description, uint _value , address _recipient) public restricted{
    Request memory newRequest = Request({
        description: _description,
        value: _value,
        recipient: _recipient,
        complete: false,
        approvalCount: 0
    });

    requests.push(newRequest);
    }

    function approveRequest(uint index) public{
    Request storage request = requests[index];
    require(approvers[msg.sender]);
    require(!request.approvals[msg.sender]);
    request.approvals[msg.sender] = true;
    request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
    Request storage request = requests[index];
    require(request.approvalCount > (approversCount/2));
    require(!request.complete);
    request.recipient.transfer(request.value);
    request.complete=true;
    }

    function getSummary() public view returns(uint, string, uint , string, string , string ,address){
    return(
        approversCount,
        target,
        deadline,
        title,
        image,
        purpose,
        manager
    );
    }

    function getRequestsCount()public view returns(uint){
       return requests.length;
    }
}