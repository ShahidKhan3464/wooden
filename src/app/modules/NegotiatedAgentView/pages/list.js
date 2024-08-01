import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Hidden, InputAdornment, makeStyles } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import qs from "qs";
import { useSelector } from "react-redux";
import {
    GetAPropertyDetails,
    ViewAProperty,
    GetMy3rdPartyCommissionAgents,
    createNegotiatedBookings
} from "../apiCalls/NegotiatedCrud"

import dateFormat from "dateformat";
const useStyles = makeStyles((theme) => ({
    TextField: {
        width: "25%",
        // height: "50px",
        marginBottom: "5px",
        marginLeft: "15px",
        "& .MuiFormHelperText-root": {
            width: "fit-content",
            padding: "0 5px",
            backgroundColor: "white",
            color: "#3783e7",
            position: "absolute",
            top: "-10px",
        },

        "& .MuiOutlinedInput-input": {
            padding: "17px 0px 15px 10px",
        },


        "@media (max-width: 767px)": {
            width: "100%",
        }
    },

    Div: {
        width: "32%",
    },

    Text: {
        marginLeft: "100px",
        paddingTop: "5px"
    },
    Button: {
        width: "200px",
        maxWidth: "45%",
        height: "52px",
    },
    Table: {
        backgroundColor: "white",
        padding: "20px 15px",
        boxShadow: `
             0px 3px 1px -2px rgb(0 0 0 / 20%),
             0px 2px 2px 0px rgb(0 0 0 / 14%),
             0px 1px 5px 0px rgb(0 0 0 / 12%)
    `,
        width: "100%",
        // display: "table",
        borderSpacing: "0",
        borderCollapse: "collapse",
        borderRadius: "5px"
    },
    TableRow: {
        border: "1px solid black",
        marginTop: "20px"
    }

}));

const List = ({ location }) => {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useSelector((state) => state.auth);

    const propertyFriendlyName = qs.parse(location.search, { ignoreQueryPrefix: true }).propertyFriendlyName;
    const propertyID = qs.parse(location.search, { ignoreQueryPrefix: true }).propertyID;
    const shareViewID = qs.parse(location.search, { ignoreQueryPrefix: true }).shareViewID;
    const startDate = qs.parse(location.search, { ignoreQueryPrefix: true }).startDate;
    const endDate = qs.parse(location.search, { ignoreQueryPrefix: true }).endDate;


    const date1 = new Date(startDate)
    const date2 = new Date(endDate)

    const Difference_In_Time = date2.getTime() - date1.getTime();

    const nights = Difference_In_Time / (1000 * 3600 * 24);

    const [Loading, setLoading] = useState(true);

    // const [propertyID, setPropertyID] = useState(null)
    const [propertyCategoryID, setPropertyCategoryID] = useState(null)
    const [suggestedCommissionRate, setSuggestedCommissionRate] = useState(null)
    const [negotiatedCommissionRate, setNegotiatedCommissionRate] = useState(null)
    const [employeeFirstName, setEmployeeFirstName] = useState(null)
    const [employeeLastName, setEmployeeLastName] = useState(null)
    const [suggestedBookingAmount, setSuggestedBookingAmount] = useState(null)
    const [negotiatedBookingAmount, setNegotiatedBookingAmount] = useState(null)
    const [commissionAgent, setCommissionAgent] = useState([])
    const [suggestedCommissionRate2, setSuggestedCommissionRate2] = useState(0)
    const [negotiatedCommissionRate2, setNegotiatedCommissionRate2] = useState(0)
    // const [employeeID, setEmployeeID] = useState(null)
    const [overandUnder, setOverandUnder] = useState(0)
    const [negotiatedAllInFromClient, setNegotiatedAllInFromClient] = useState(null)
    const [suggestedAllInFromClient, setSuggestedAllInFromClient] = useState(null)
    const [suggestedNetToBroker, setSuggestedNetToBroker] = useState(null)
    const [negotiatedNetToBroker, setNegotiatedNetToBroker] = useState(null)
    const [suggestedTax, setSuggestedTax] = useState(null)
    const [negotiatedTax, setNegotiatedTax] = useState(null)
    const [suggestedTrueNetToBroker, setSuggestedTrueNetToBroker] = useState(null)
    const [negotiatedTrueNetToBroker, setNegotiatedTrueNetToBroker] = useState(null)
    const [negotiatedGainLoss, setNegotiatedGainLoss] = useState(null)
    const [negotiatedGainLossPercent, setNegotiatedGainLossPercent] = useState(null)
    const [bookingAgentEmployeeID, setBookingAgentEmployeeID] = useState(null)
    const [bookingCommissionRateTypeID, setBookingCommissionRateTypeID] = useState(null)
    const [thirdPartyBookingCommissionRateTypeID, setThirdPartyBookingCommissionRateTypeID] = useState(null)

    const [additionalSellerAgent, setAdditionalSellerAgent] = useState([{
        employeeID: '',
        suggestedCommissionRate: 0,
        negotiatedCommissionRate: 0,
        commissionRateTypeID: 0,
        negotiatedBookingAgentTypeID: 1,
        negotiatedCommissionDollar: 0
    }]);

    const [additional3PartyAgent, setAdditional3PartyAgent] = useState([{
        employeeID: '',
        suggestedCommissionRate: 0,
        negotiatedCommissionRate: 0,
        commissionRateTypeID: 0,
        negotiatedBookingAgentTypeID: 1,
        negotiatedCommissionDollar: 0
    }]);

    const buyerAgentCommissionRate = 5.25;

    const [data, setData] = useState([])
    useEffect(() => {
        propertyID &&
            ViewAProperty(propertyID)
                .then((data) => {
                    setData(data.Data)
                    setPropertyCategoryID(data.Data.propertyCategoryTypeID);
                    setLoading(false)
                })
    }, [propertyID]);

    useEffect(() => {
        setSuggestedBookingAmount(nights * data.wednesdayMinimumPrice)
        setNegotiatedBookingAmount(nights * data.wednesdayMinimumPrice)

    }, [data]);

    useEffect(() => {
        setNegotiatedAllInFromClient(negotiatedBookingAmount + data.damageDeposit + data.cleaningFee + data.adminFee + ((nights * data.wednesdayMinimumPrice) * (data.salesAndUseTaxRate + data.conventionAndTourismTaxRate) / 100))

        setSuggestedAllInFromClient(suggestedBookingAmount + data.damageDeposit + data.cleaningFee + data.adminFee + ((nights * data.wednesdayMinimumPrice) * (data.salesAndUseTaxRate + data.conventionAndTourismTaxRate) / 100))

        setSuggestedTax(suggestedBookingAmount * (data.salesAndUseTaxRate + data.conventionAndTourismTaxRate) / 100)

        setNegotiatedTax(negotiatedBookingAmount * (data.salesAndUseTaxRate + data.conventionAndTourismTaxRate) / 100)
    }, [negotiatedBookingAmount, suggestedBookingAmount]);

    useEffect(() => {
        const ownerSuggestedRate = suggestedBookingAmount * (data.brokerSplitFromOwnerRate) / 100
        const ownerNegotiatedRate = negotiatedBookingAmount * (data.brokerSplitFromOwnerRate) / 100

        let suggestedSellerTotal = 0
        additionalSellerAgent.forEach(element => {
            suggestedSellerTotal += (suggestedBookingAmount * element.suggestedCommissionRate) / 100
        });

        let suggested3PartyTotal = 0
        additional3PartyAgent.forEach(element => {
            suggested3PartyTotal += (suggestedBookingAmount * element.suggestedCommissionRate) / 100
        });

        setSuggestedNetToBroker(suggestedAllInFromClient - suggestedTax - suggestedTax - data.damageDeposit - data.cleaningFee - suggestedSellerTotal - suggested3PartyTotal - ownerSuggestedRate)

        let negotiatedSellerTotal = 0
        additionalSellerAgent.forEach(element => {
            negotiatedSellerTotal += (suggestedBookingAmount * element.negotiatedCommissionRate) / 100
        });

        let negotiated3PartyTotal = 0
        additional3PartyAgent.forEach(element => {
            negotiated3PartyTotal += (suggestedBookingAmount * element.negotiatedCommissionRate) / 100
        });

        const numb = negotiatedAllInFromClient - negotiatedTax - negotiatedTax - data.damageDeposit - data.cleaningFee - negotiatedSellerTotal - negotiated3PartyTotal - ownerNegotiatedRate
        var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
        setNegotiatedNetToBroker(rounded)

    }, [suggestedAllInFromClient,
        negotiatedAllInFromClient,
        suggestedTax,
        negotiatedTax,
        additionalSellerAgent,
        additional3PartyAgent
    ]);
    useEffect(() => {
        setSuggestedTrueNetToBroker(suggestedNetToBroker - suggestedBookingAmount * buyerAgentCommissionRate / 100)

        const numb = negotiatedNetToBroker - negotiatedBookingAmount * buyerAgentCommissionRate / 100
        var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
        setNegotiatedTrueNetToBroker(rounded)
    }, [
        suggestedNetToBroker,
        negotiatedNetToBroker,
        suggestedBookingAmount,
        negotiatedBookingAmount
    ]);

    useEffect(() => {
        const numb = negotiatedTrueNetToBroker - suggestedTrueNetToBroker
        var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
        setNegotiatedGainLoss(rounded)
    }, [
        suggestedTrueNetToBroker,
        negotiatedTrueNetToBroker
    ]);

    useEffect(() => {
        const numb = (negotiatedGainLoss / suggestedTrueNetToBroker) * 100
        var rounded = Math.round((numb + Number.EPSILON) * 100) / 100;
        setNegotiatedGainLossPercent(rounded)
    }, [
        negotiatedGainLoss,
        suggestedTrueNetToBroker
    ]);

    useEffect(() => {
        GetMy3rdPartyCommissionAgents(propertyID)
            .then((data) => {
                setCommissionAgent(data.Data)
                setBookingAgentEmployeeID(data.Data[0].employeeID)
                setEmployeeFirstName(data.Data[0].employeeFirstName)
                setEmployeeLastName(data.Data[0].employeeLastName)
                let employeeData = data.Data[0].commissionRatesList.filter((element) => element.commissionRateTypeID == propertyCategoryID)
                if (employeeData[0]) {
                    setBookingCommissionRateTypeID(employeeData[0].commissionRateTypeID)
                    setSuggestedCommissionRate(employeeData[0].commissionRate);
                    setNegotiatedCommissionRate(employeeData[0].commissionRate);
                }
            })
    }, [propertyCategoryID]);

    let AgentList = (
        <>
            <option aria-label="None" value="" />
            {commissionAgent.map((agent) => {
                return <option value={agent.employeeID}>{agent.employeeFirstName}  {agent.employeeLastName}</option>;
            })}
        </>
    );

    // *For Add Additional Seller/3Party Agent 
    const addAdditionalAgent = (type) => {
        try {
            const obj = {
                employeeID: '',
                suggestedCommissionRate: 0,
                negotiatedCommissionRate: 0,
                commissionRateTypeID: 0,
                negotiatedBookingAgentTypeID: 1,
                negotiatedCommissionDollar: 0
            }
            if (type === 'seller') {
                let newList = [...additionalSellerAgent]
                newList.push(obj)
                setAdditionalSellerAgent(newList)
            } else {
                let newList = [...additional3PartyAgent]
                newList.push(obj)
                setAdditional3PartyAgent(newList)
            }
        } catch (error) {
            console.log('file: list.js => line 315 => getAgentDetail => error', error)
        }
    }

    // *For Add Seller Agent Detail
    const addAgentDetail = (index, type, value, employeeType) => {
        try {
            let newArray = []
            if (employeeType === 'seller') {
                newArray = [...additionalSellerAgent]
            } else {
                newArray = [...additional3PartyAgent]
            }
            if (type === 'select') {
                let employeeData = commissionAgent.filter((element) => element.employeeID == value)
                let commission = employeeData[0].commissionRatesList.filter((element) => element.commissionRateTypeID == propertyCategoryID)
                newArray[index].employeeID = Number(value)
                newArray[index].suggestedCommissionRate = Number(commission[0].commissionRate)
                newArray[index].negotiatedCommissionRate = Number(commission[0].commissionRate)
                newArray[index].commissionRateTypeID = Number(commission[0].commissionRateTypeID)
                newArray[index].negotiatedCommissionDollar = Number((negotiatedBookingAmount * commission[0].commissionRate) / 100)
            } else {
                newArray[index].negotiatedCommissionRate = Number(value)
                newArray[index].negotiatedCommissionDollar = Number((negotiatedBookingAmount * value) / 100)
            }
            if (employeeType === 'seller') {
                setAdditionalSellerAgent(newArray)
            } else {
                setAdditional3PartyAgent(newArray)
            }
        } catch (error) {
            console.log('file: list.js => line 315 => getAgentDetail => error', error)
        }
    }

    // *For Submit Inquiry Form
    const handleSubmit = () => {
        let newNegotiatedBookingAgents = [...additionalSellerAgent]
        newNegotiatedBookingAgents.forEach(element => {
            const index = newNegotiatedBookingAgents.findIndex(e => e.employeeID === "")
            if (index !== -1) newNegotiatedBookingAgents.splice(index, 1)
            delete element['suggestedCommissionRate'];
        });

        let newNegotiated3RdPartyAgents = [...additional3PartyAgent]
        newNegotiated3RdPartyAgents.forEach(element => {
            const index = newNegotiated3RdPartyAgents.findIndex(e => e.employeeID === "")
            if (index !== -1) return newNegotiated3RdPartyAgents.splice(index, 1)
            delete element['suggestedCommissionRate'];
        });
        console.log(newNegotiatedBookingAgents);
        console.log(newNegotiated3RdPartyAgents);
        const formData = {
            inquiryShareViewID: shareViewID,
            negotiatedBookingAmount: negotiatedBookingAmount,
            negotiatedDamageDeposit: data.damageDeposit,
            negotiatedCleaningFee: data.cleaningFee,
            negotiatedAdminFee: data.adminFee,
            negotiatedAllInFromClient: negotiatedAllInFromClient,
            overUnder: overandUnder,
            negotiatedNetToBroker: negotiatedNetToBroker,
            negotiatedOwnerSplitRate: data.brokerSplitFromOwnerRate,
            negotiatedOwnerSplitDollar: negotiatedBookingAmount * (data.brokerSplitFromOwnerRate) / 100,
            negotiatedTrueNetToBroker: negotiatedTrueNetToBroker,
            negotiatedGainLossDollars: negotiatedGainLoss,
            negotiatedGainLossRate: negotiatedGainLossPercent,
            negotiatedBookingAgents: newNegotiatedBookingAgents,
            negotiated3RdPartyAgents: newNegotiated3RdPartyAgents,
            negotiatedBuyerAgents: [
                {
                    employeeID: 30,
                    commissionRateTypeID: 6,
                    negotiatedBookingAgentTypeID: 2,
                    negotiatedCommissionRate: 8.0,
                    negotiatedCommissionDollar: 413.12
                }
            ]
        }

        createNegotiatedBookings(formData, Number(user.brokerID), Number(user.employeeID))
            .then((data) => {
                if (data) {
                    history.push("/inquiry/list")
                }
            })
        console.log("form data", formData)
        localStorage.setItem("NegotiatedAgentView", JSON.stringify(formData))
    }

    return !Loading ? (
        <div className={classes.Table}>
            <div className={classes.TableRow}>
                <div className="m-3">
                    <div className="d-flex">
                        <div className={classes.TextField}># Nights</div>
                        <div className={classes.TextField}>ADR</div>
                        <p className={classes.Text}>{propertyFriendlyName}</p>
                    </div>
                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={nights}
                            type="text"
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.wednesdayMinimumPrice}
                            type="text"
                        />
                        <p className={classes.Text}>{startDate}  -  {endDate}</p>
                    </div>

                    <div className="d-flex mt-3">

                        <div className={classes.TextField}>
                            Suggested
                        </div>
                        <div className={classes.TextField}>
                            Negotiated
                        </div>

                    </div>


                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={suggestedBookingAmount}
                            type="text"
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedBookingAmount}
                            type="text"
                        />
                        <p className={classes.Text}>Booking Amount</p>
                    </div>

                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.damageDeposit}
                            type="text"
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.damageDeposit}
                            type="text"
                        />
                        <p className={classes.Text}>Damage Deposit</p>
                    </div>

                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.cleaningFee}
                            type="text"
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.cleaningFee}
                            type="text"
                        />
                        <p className={classes.Text}>Cleaning Fee</p>
                    </div>

                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.adminFee}
                            type="text"
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={data.adminFee}
                            type="text"
                        />
                        <p className={classes.Text}>Admin Fee</p>
                    </div>

                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={suggestedTax}
                            type="text"
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedTax}
                            type="text"
                        />
                        <p className={classes.Text}>Tax {data.salesAndUseTaxRate + data.conventionAndTourismTaxRate} %</p>
                    </div>

                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={suggestedAllInFromClient}
                            type="text"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedAllInFromClient}
                            type="text"
                            onChange={(e) => {
                                setNegotiatedAllInFromClient(e.target.value)
                                setOverandUnder(e.target.value - suggestedAllInFromClient)
                                setNegotiatedBookingAmount(suggestedBookingAmount - (suggestedAllInFromClient - e.target.value))
                            }}
                        />
                        <p className={classes.Text}>All In From Client</p>
                    </div>

                    <div className="d-flex">

                        <div className={classes.TextField}>
                        </div>
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={overandUnder}
                            type="text"

                        />
                        <p className={classes.Text}>Under</p>
                    </div>
                </div>
            </div>

            {/* ========== Seller Agents ========== */}
            <div className={classes.TableRow}>
                <div className="m-3">
                    {additionalSellerAgent.map((item, i) => (
                        <>
                            <div className="d-flex">
                                <div className={classes.TextField}>
                                </div>
                                <div className={classes.TextField}>
                                </div>

                                <FormControl
                                    required
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    style={{ marginLeft: "100px" }}
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple">Seller Agents</InputLabel>
                                    <Select
                                        native
                                        label="Seller Agents"
                                        value={item.employeeID}
                                        onChange={(e) => {
                                            addAgentDetail(i, 'select', e.target.value, 'seller')
                                        }}
                                    >
                                        {AgentList}
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="d-flex">
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={item.suggestedCommissionRate}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">%</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={item.negotiatedCommissionRate}
                                    type="text"
                                    onChange={(e) => {
                                        addAgentDetail(i, 'field', e.target.value, 'seller')
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">%</InputAdornment>
                                        ),
                                    }}
                                />
                                <p className={classes.Text}>Commission Rate</p>
                            </div>
                            <div className="d-flex">
                                <div className={classes.TextField}>

                                    <p className="text-center">
                                        of
                                    </p>
                                </div>
                                <div className={classes.TextField}>

                                    <p className="text-center">
                                        of
                                    </p>
                                </div>

                            </div>
                            <div className="d-flex">
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={suggestedBookingAmount}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={negotiatedBookingAmount}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="d-flex">
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={(suggestedBookingAmount * item.suggestedCommissionRate) / 100}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={(negotiatedBookingAmount * item.negotiatedCommissionRate) / 100}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                                <p className={classes.Text}>Commission</p>
                            </div>
                        </>
                    ))}
                    <div className="d-flex">
                        <div className={classes.TextField}>
                        </div>
                        <div className={classes.TextField}>
                        </div>
                        <Button
                            className={classes.Text}
                            variant="contained"
                            color="secondary"
                            onClick={() => addAdditionalAgent('seller')}
                        >
                            Add Seller Agent
                        </Button>
                    </div>
                </div>
            </div>

            {/* ========== 3 Party Agents ========== */}
            <div className={classes.TableRow}>
                <div className="m-3">
                    {additional3PartyAgent.map((item, i) => (
                        <>
                            <div className="d-flex">
                                <div className={classes.TextField}>
                                </div>
                                <div className={classes.TextField}>
                                </div>

                                <FormControl
                                    required
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    style={{ marginLeft: "100px" }}
                                >
                                    <InputLabel htmlFor="outlined-age-native-simple">Add 3rd Party Agents</InputLabel>
                                    <Select
                                        native
                                        label="Add 3rd Party Agents"
                                        value={item.employeeID}
                                        onChange={(e) => {
                                            addAgentDetail(i, 'select', e.target.value, '3party')
                                        }}
                                    >
                                        {AgentList}
                                    </Select>
                                </FormControl>

                            </div>
                            <div className="d-flex">
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={item.suggestedCommissionRate}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">%</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={item.negotiatedCommissionRate}
                                    type="text"
                                    onChange={(e) => {
                                        addAgentDetail(i, 'field', e.target.value, '3party')
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">%</InputAdornment>
                                        ),
                                    }}
                                />
                                <p className={classes.Text}>Commission Rate</p>
                            </div>
                            <div className="d-flex">
                                <div className={classes.TextField}>

                                    <p className="text-center">
                                        of
                                    </p>
                                </div>
                                <div className={classes.TextField}>

                                    <p className="text-center">
                                        of
                                    </p>
                                </div>

                            </div>
                            <div className="d-flex">
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={suggestedBookingAmount}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={negotiatedBookingAmount}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className="d-flex">
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={(suggestedBookingAmount * item.suggestedCommissionRate) / 100}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="outlined-required"
                                    variant="outlined"
                                    color="secondary"
                                    className={classes.TextField}
                                    value={(negotiatedBookingAmount * item.negotiatedCommissionRate) / 100}
                                    type="text"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">$</InputAdornment>
                                        ),
                                    }}
                                />
                                <p className={classes.Text}>Commission</p>
                            </div>
                        </>
                    ))}
                    <div className="d-flex">
                        <div className={classes.TextField}>
                        </div>
                        <div className={classes.TextField}>
                        </div>
                        <Button
                            className={classes.Text}
                            variant="contained"
                            color="secondary"
                            onClick={() => addAdditionalAgent('3party')}
                        >
                            Add 3rd Party Agent
                        </Button>
                    </div>
                </div>
            </div>

            <div className={classes.TableRow}>
                <div className="m-3">
                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={suggestedNetToBroker}
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedNetToBroker}
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                        />
                        <p className={classes.Text}>Net to Broker</p>
                    </div>
                </div>
            </div>

            <div className={classes.TableRow}>
                <div className="m-3">
                    <div className="d-flex">
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={suggestedTrueNetToBroker}
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedTrueNetToBroker}
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                        />
                        <p className={classes.Text}>True Net To Broker (Net above minus other)</p>
                    </div>
                    <div className="d-flex">
                        <div className={classes.TextField}>

                        </div>
                        <div className={classes.TextField}>

                        </div>
                        <p className={classes.Text}>Negotiated Gain / Loss From Suggested</p>
                    </div>

                    <div className="d-flex">
                        <div className={classes.Div}>
                        </div>
                        <div className={classes.Div}>
                        </div>
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedGainLoss}
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">$</InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <div className="d-flex">
                        <div className={classes.Div}>
                        </div>
                        <div className={classes.Div}>
                        </div>
                        <TextField
                            disabled
                            required
                            id="outlined-required"
                            variant="outlined"
                            color="secondary"
                            className={classes.TextField}
                            value={negotiatedGainLossPercent}
                            type="text"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">%</InputAdornment>
                                ),
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className=" d-flex justify-content-around mt-3">

                <Button
                    className={classes.Button}
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSubmit()}
                >
                    Submit
                </Button>
                <Button
                    className={classes.Button}
                    variant="contained"
                    onClick={() => {
                        setNegotiatedBookingAmount(nights * data.wednesdayMinimumPrice)
                    }}
                >
                    Reset
                </Button>
            </div>
        </div>
    ) : (
        <div className={"container"}>
            <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
        </div>
    )
}

export default List;
