import { useState, useEffect, Fragment } from 'react';
import { ethers } from "ethers";
import { useWeb3React } from '@web3-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PRESALE_ABI from "../../../contracts/presale.json";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'; 
import Alert from '../../ui/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import moment from 'moment';

//0x10E98e36eAF116d37b24Cce7140825e1A5060468
const StoSaleContractAddress = [
  "0x5256788b3ed4d03a9345c140fad5ab12c379c34f",
  ""
];

// 0: ropsten, 1: bsc testnet
let chainindex = 0; 

const netChainId = [
  0x1,  //Eth mainnet
  0x38  //BSC mainnet
];

// const netChainId = [
//   0x3,  //Ropsten
//   0x61  //BSC testnet
// ];

const CardLabel = ({text}) => {
  return (<Typography 
    color="text.secondary" 
    sx={{ fontWeight: 500}}
    variant="body1" 
    display="block" 
  >
    {text}
  </Typography>)
}

const CardValue = ({text}) => {
  return (
    <Typography 
      color="text.primary"
      sx={{ fontWeight: 500, textAlign: "right"}}
    >
      {text}
    </Typography>
  )
}

const Opened = () => {
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [tokenInfo, setTokenInfo] = useState([])
  const [stosaleInfo, setStoSaleInfo] = useState([])
  const [buyerInfo, setBuyerInfo] = useState([])
  const [status, setStatus] = useState([])
  const [stoSaleState, setStoSaleState] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const {account, library} = useWeb3React();

  useEffect(() => {
    if(!library) {
      Init()
      return;
    }

    if(!library.provider) {
      Init()
      return
    }

    if(parseInt(library.provider.chainId) === netChainId[0]) {
      chainindex = 0
      getInfo()
    } else if(parseInt(library.provider.chainId) === netChainId[1]) {
      chainindex = 1
      getInfo()
    } else {
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
    }   

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library])

  const Init = () => {
    setAmountToBuy(1)
    setTokenInfo([])
    setStoSaleInfo([])
    setStatus([])
    setBuyerInfo([])
    setStoSaleState('')
  }

  const getContract = (abi, address, signer = null) => {
    const signerOrProvider = signer
    return new ethers.Contract(address, abi, signerOrProvider)
  }

  const getInfo = async () => {

    let stosalecontract;

    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();

    stosalecontract = getContract(PRESALE_ABI, StoSaleContractAddress[chainindex], signer)
   
    let chainSuffix = ""
    if(parseInt(library.provider.chainId) === netChainId[0]) {
      chainSuffix = "ETH"
    } else {
      chainSuffix = "BNB"
    }

    let stosaleinfo;
    try {
      stosaleinfo = await stosalecontract.stosale_info();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Presale Information Error')
      return null;
    }

    const starttime = `${moment.utc(parseInt(stosaleinfo.stosale_start)*1000).format('Do of MMM, h A')} UTC`
    const endtime = `${moment.utc(parseInt(stosaleinfo.stosale_end)*1000).format('Do of MMM, h A')} UTC`
    setStoSaleInfo([
      {id: "Token Rate:", val: 1/stosaleinfo.token_rate},
      {id: "Softcap:", val: ethers.utils.formatUnits(stosaleinfo.softcap, 18).toString() + " " + chainSuffix},
      {id: "Hardcap:", val: ethers.utils.formatUnits(stosaleinfo.hardcap, 18).toString() + " " + chainSuffix},
      {id: "Buy min:", val: ethers.utils.formatUnits(stosaleinfo.raise_min, 18).toString() + " " + chainSuffix},
      {id: "Buy max:", val: ethers.utils.formatUnits(stosaleinfo.raise_max, 18).toString() + " " + chainSuffix},
      {id: "Pre-sale Start:", val: starttime},
      {id: "Pre-sale End:", val: endtime},
    ])

    let tokeninfoarr;
    try {
      tokeninfoarr = await stosalecontract.tokeninfo();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Token Information Error')
      return null;
    }
    
    let sale_supply = ethers.utils.formatUnits(tokeninfoarr.totalsupply, tokeninfoarr.decimal) / 100 * 20;
    setTokenInfo([
      {id:"Token Name:", val:tokeninfoarr.name},
      {id:"Token Symbol:", val:tokeninfoarr.symbol},
      {id:"Token Decimal:", val:parseInt(tokeninfoarr.decimal)},
      {id: "Address:", val: stosaleinfo.sale_token},
      {id:"Sale Supply:", val: sale_supply + " " + tokeninfoarr.symbol},
    ])
    
    let status;
    try {
      status = await stosalecontract.status();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Status Information Error')
      return null;
    }

    setStatus([
      {id: "Raised Amount", val: ethers.utils.formatUnits(status.raised_amount, 18).toString() + " " + chainSuffix},
      {id: "Sold Amount", val: ethers.utils.formatUnits(status.sold_amount, tokeninfoarr.decimal).toString() + " " + tokeninfoarr.symbol}
    ])
  
    try{
        const buyerInfo = await stosalecontract.buyers(account);
        setBuyerInfo(
          [
            { id: "Invested", val: ethers.utils.formatUnits(buyerInfo.base, 18).toString() + " " + chainSuffix },
            { id: "CASH Amount", val: ethers.utils.formatUnits(buyerInfo.sale, 18).toString() + " " + tokeninfoarr.symbol},
          ]
        )
    }
    catch (error)
    {
      setOpenAlert(true)
      setAlertMsg('Get Buyers Information Error')
      return null;
    }
    
    const state = await getPresaleStatus(stosalecontract)
    switch(parseInt(state)) {
      case 1:
        setStoSaleState("Active")
      break;
      case 2:
        setStoSaleState("Success")
      break;
      case 3:
        setStoSaleState("Failed")
      break;
      default:
        setStoSaleState("unknown state")
      break;
    }
  }
  
  const getPresaleStatus = async (stosalecontract) => {

    let stoSalestate;
    try {
      stoSalestate = await stosalecontract.stoSaleStatus();
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Get Status Error')
      return null;
    }

    return stoSalestate
  }

  const Deposit = async (amount) => {
    let stosalecontract;
    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();
    stosalecontract = getContract(PRESALE_ABI, StoSaleContractAddress[chainindex], signer)
    if(
      parseInt(library.provider.chainId) !== netChainId[0] 
      && parseInt(library.provider.chainId) !== netChainId[1]
    ) {  
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
      return
    }

    if ((!amount || amount <= 0)) {
      setOpenAlert(true)
      setAlertMsg('Please enter a valid amount')
      return
    }

    let overrid = {
      value: ethers.utils.parseUnits(amount.toString(), 18),
    }

    try {
      await stosalecontract.userDeposit(overrid)
      // const tx = await stosalecontract.userDeposit(overrid)
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true)
      setAlertMsg('Deposit done successfully')
    } catch (error) {
      console.log(error)
      setOpenAlert(true)
      setAlertMsg('Deposit failed')
      return;
    }
  }

  const Withdraw = async () => {
    let stosalecontract;
    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();
    stosalecontract = getContract(PRESALE_ABI, StoSaleContractAddress[chainindex], signer)
    if(
      parseInt(library.provider.chainId) !== netChainId[0] 
      && parseInt(library.provider.chainId) !== netChainId[1]
    ) {  
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
      return
    }

    try {
      await stosalecontract.userWithdrawBaseTokens()
      // const tx = await stosalecontract.userWithdrawBaseTokens()
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true)
      setAlertMsg('Withdraw done successfully')
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Withdraw failed')
      return;
    }
  }

  const Claim = async () => {

    let stosalecontract;
    if(!account) {
      setOpenAlert(true)
      setAlertMsg('Wallet is unconnected')
      return null;
    }

    const signer = await library.getSigner();
    stosalecontract = getContract(PRESALE_ABI, StoSaleContractAddress[chainindex], signer)
    if(
      parseInt(library.provider.chainId) !== netChainId[0] 
      && parseInt(library.provider.chainId) !== netChainId[1]
    ) {  
      setOpenAlert(true)
      setAlertMsg('Selected chain is unrecognized')
      return
    }

    try {
      await stosalecontract.userWithdrawTokens()
      // const tx = await stosalecontract.token_withdraw()
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true)
      setAlertMsg('Claim done successfully')
    } catch (error) {
      setOpenAlert(true)
      setAlertMsg('Claim failed')
      return;
    }
  }

  const actionButton = () => {
    let label;
    switch(stoSaleState) {
      case 'Active':
        label = 'Buy'
      break;
      case 'Success':
        label = 'Claim'
        // Claim()
      break;
      case 'Failed':
        label = 'Withdraw'
        break;
      default:
        return null
    }

    const execFunc = async () => {
      switch(stoSaleState) {
        case 'Active':
          label = 'Buy'
          Deposit(amountToBuy)
        break;
        case 'Success':
          label = 'Claim'
          Claim();
        break;
        case 'Failed':
          label = 'Withdraw'
          Withdraw()
          break;
        default:
          return null
      }
    }

    return (
      <Button
        fullWidth 
        onClick={
          () => execFunc()
        }
        >
        {label}
      </Button>
    )
  }

  const handleStateChipColor = (state) => {
    switch(state) {
      case 'Active':
      case 'Success':
        return 'success'
      case 'Failed':
        return 'error'
      default:
        return 'default'
    }
  }

  const handleSelectedChain = () => {
    try {
      switch(parseInt(library.provider.chainId)) {
        case netChainId[1]:
          return '$BNB'
        case netChainId[0]:
          return '$ETH'
        default:
          return 'Unknown'
      }
    } catch(e) {
      return 'Unrecognized chain'
    }
  }

  return (
    <Fragment>
      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        msg={alertMsg}
      />
      <Grid container spacing={2} justifyContent="center" className="fadeInUp">
        <Grid item xs={12} md={6}>
          <Card 
            elevation={0} 
            sx={{
              borderRadius: 10, 
              p: 1,
              boxShadow: '0 2px 16px rgb(53 69 89 / 5%)'
            }}
          >
            <CardContent>
              <Divider light textAlign="left"><Chip label="Token Information" /></Divider>
              {tokenInfo.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              <Divider light textAlign="left" sx={{mt: 3}}><Chip label="Pre-sale Information" /></Divider>
              {stosaleInfo.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              <Divider light textAlign="left" sx={{mt: 3}}><Chip label="Pre-sale Status" /></Divider>
              {status.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
               <Divider light textAlign="left" sx={{mt: 3}}><Chip label="Buyer Information" /></Divider>
              {buyerInfo.map((item, i) => (
                <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} key={i}>
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              {stoSaleState && (
                (<Stack direction="row" justifyContent="flex-end">
                  <Chip
                    label={stoSaleState} 
                    color={handleStateChipColor(stoSaleState)} 
                    sx={{letterSpacing: 1, fontWeight: 500, mt: 2}}
                  />
                </Stack>)
              )}
              {stoSaleState === "Active" && (
                <Fragment>
                  <Typography variant='caption' display="block" sx={{fontWeight: 700, mb: 1}}>Buy CASH Token</Typography>
                  <TextField
                    type="number"
                    id="amountToBuy" 
                    label="Amount to Buy" 
                    variant="standard"
                    value={amountToBuy}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setAmountToBuy(e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{handleSelectedChain()}</InputAdornment>,
                      autoComplete: "off"
                    }}
                    fullWidth
                    sx={{mb: 1}}
                  />
                </Fragment>
              )}
            </CardContent>
            <CardActions>
              {actionButton()}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
}
 
export default Opened;
