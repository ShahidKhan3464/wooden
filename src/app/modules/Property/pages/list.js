import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropertiesTable from './propertiesTable';
import { getProperties } from "../apiCalls/propertyCrud";
import { Tabs, Typography, Box } from "@material-ui/core";
import CustomButton from '../../../../components/customButton/index';
import TableSearchHandling from '../../../../components/tableSearchHandling';
import { PropertyListContainer, Panel, LabelTab } from './style';
import { BoxContainer } from '../../../baseStyle';

const List = ({ BrokerID, TransactionStatusID, EmployeeID }) => {
    const history = useHistory()
    const [value, setValue] = useState(0);
    const [ListData, setListData] = useState(null);
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('propertyFriendlyName')
    const [PropertyTransactionStatusID, setPropertyTransactionStatusID] = useState(TransactionStatusID);

    useEffect(() => {
        getProperties(BrokerID, PropertyTransactionStatusID)
            .then((data) => {
                // setListData(data.Data);
                sortingHadler('dsc', data.Data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [BrokerID, PropertyTransactionStatusID]);

    const searchInputHandler = (value) => {
        setsearchInputValue(value.trim())
    }

    const searchSelctionHanlder = (value) => {
        if (value === 'name') {
            setsearchSelectedValue('propertyFriendlyName')
        }
        else if (value === 'city') {
            setsearchSelectedValue('city')
        }
        else if (value === 'location') {
            setsearchSelectedValue('location')
        }
    }

    const searchedTest = searchInputValue === '' ? ListData : ListData?.filter((c) => (c[searchSelectedValue].toLowerCase().includes(searchInputValue?.toLowerCase())))

    const handleChange = (event, newValue) => {
        setListData([])
        setPropertyTransactionStatusID(newValue === 0 ? 1 : 2)
        setValue(newValue);
    };

    const sortingHadler = (order, List = ListData) => {

        if (order === 'asc') {
            // const sorted = ListData.sort((a, b) => a.propertyFriendlyName.toLowerCase() > b.propertyFriendlyName.toLowerCase() ? 1 : -1);
            const sorted = List.sort((a, b) => a.propertyID > b.propertyID ? 1 : -1);
            setListData([...sorted])
        }
        else if (order === 'dsc') {
            const sorted = List.sort((a, b) => a.propertyID < b.propertyID ? 1 : -1);
            setListData([...sorted])
        }
    }

    const navigateHandler = () => {
        history.push('/property/addProperty')
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <Panel
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </Panel>
        );
    }

    return (
        <PropertyListContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton type='button' click={navigateHandler} text='Create Property' />
            </BoxContainer>

            <div className='propertyListing_tabs' >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    // className='propertyListing_tabs_indicator'
                    TabIndicatorProps={{ className: 'propertyListing_tabs_indicatorBorder' }}
                >
                    <LabelTab className='propertyListing_tabs_tab' label="Active Properties" {...a11yProps(0)} />
                    <LabelTab className='propertyListing_tabs_tab' label="Inactive Properties" {...a11yProps(1)} />
                </Tabs>
            </div>

            <TabPanel value={value} index={0}>
                <PropertiesTable BrokerID={BrokerID} EmployeeID={EmployeeID} data={searchedTest} PropertyTransactionStatusID={PropertyTransactionStatusID} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PropertiesTable BrokerID={BrokerID} EmployeeID={EmployeeID} data={searchedTest} PropertyTransactionStatusID={PropertyTransactionStatusID} />
            </TabPanel>
        </PropertyListContainer>
    )
}

export default List;