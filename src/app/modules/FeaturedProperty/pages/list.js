import React, { useState, useEffect } from 'react';
import { Box } from "@material-ui/core";
import PropertyModal from '../propertyModal'
import PropertiesTable from './propertiesTable';
import { BoxContainer } from '../../../baseStyle';
import CustomButton from '../../../../components/customButton/index';
import { getFeaturedProperties } from "../apiCalls/propertyCrud";
import { FeaturedPropertyListContainer, PropertiesSelect } from './style'
import TableSearchHandling from '../../../../components/tableSearchHandling';

const List = ({ BrokerID, TransactionStatusID, EmployeeID, Locations }) => {
    const [ListData, setListData] = useState(null);
    const [modalState, setmodalState] = useState(false)
    const [searchInputValue, setsearchInputValue] = useState('')
    const [propertySelectedId, setpropertySelectedId] = useState(3)
    const [searchSelectedValue, setsearchSelectedValue] = useState('propertyFriendlyName')
    const [locations, setlocations] = useState([])
    const [PropertyTransactionStatusID, setPropertyTransactionStatusID] = useState(TransactionStatusID);

    useEffect(() => {
        getFeaturedProperties(BrokerID, propertySelectedId)
            .then((data) => {
                setListData(data.Data);
            })
            .catch((err) => {
                setListData([]);
            })
    }, [BrokerID, PropertyTransactionStatusID, propertySelectedId]);


    useEffect(() => {
        if (Locations?.length) {
            const swapElements = (Locations, index1, index2) => {
                let temp = Locations[index1];
                Locations[index1] = Locations[index2];
                Locations[index2] = temp;
            };
            swapElements(Locations, 0, 2);
        }
       
    }, [Locations])


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
    const sortingHadler = (order) => {
        if (order === 'asc') {
            const sorted = ListData.sort((a, b) => a.propertyFriendlyName.toLowerCase() > b.propertyFriendlyName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
        else if (order === 'dsc') {
            const sorted = ListData.sort((a, b) => a.propertyFriendlyName.toLowerCase() < b.propertyFriendlyName.toLowerCase() ? 1 : -1);
            setListData([...sorted])
        }
    }

    const navigateHandler = () => {
        setmodalState(true)
    }

    return (
        <FeaturedPropertyListContainer>
            <BoxContainer>
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} featured={true} />
                <Box display='flex' alignItems='center'>
                    <PropertiesSelect>
                        <select onChange={(e) => setpropertySelectedId(e.target.value)} >
                            {
                                Locations?.map((loc) => (
                                    <option value={loc.locationID} >{loc.location}</option>
                                ))
                            }
                           
                        </select>
                    </PropertiesSelect>
                    <CustomButton click={navigateHandler} type='button' text='Add Feature Property' radius='4px' color='white' bgColor='#5C58A5' width='191px' height='51px' fontSize='14px' />
                </Box>
            </BoxContainer>

            <div className='featuredPropertyList_table'>
                <PropertiesTable BrokerID={BrokerID} EmployeeID={EmployeeID} data={searchedTest} PropertyTransactionStatusID={PropertyTransactionStatusID} />
            </div>
            <PropertyModal Locations={Locations} setOpen={setmodalState} propertySelectedId={propertySelectedId} featuredPropertyState={setListData} open={modalState} BrokerID={BrokerID} EmployeeID={EmployeeID} TransactionStatusID={TransactionStatusID} PropertyTransactionStatusID={PropertyTransactionStatusID} />
        </FeaturedPropertyListContainer>
    )
}

export default List;