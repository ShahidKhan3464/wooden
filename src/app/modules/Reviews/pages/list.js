import React, { useState, useEffect } from 'react';
import { Box, makeStyles } from "@material-ui/core";
import Reviewtable from './reviewtable';
import { getAnReviews, updateReview } from "../apiCalls/reviewsCrud";
import TableSearchHandling from '../../../../components/tableSearchHandling';
import CustomButton from '../../../../components/customButton/index';
import { useHistory } from 'react-router-dom';



const List = ({ BrokerID, EmployeeID, TransactionStatusID }) => {
    const history = useHistory()
    const [ListData, setListData] = useState(null);
    const [searchInputValue, setsearchInputValue] = useState('')
    const [searchSelectedValue, setsearchSelectedValue] = useState('propertyFriendlyName')
    const [PropertyTransactionStatusID, setPropertyTransactionStatusID] = useState(TransactionStatusID);



    console.log('asdf');

    useEffect(() => {
        getAnReviews(EmployeeID, BrokerID)
            .then((data) => {
                setListData(data.Data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [BrokerID, EmployeeID]);


    const deleteReviewHandler = (value) => {
        setListData([])
        const newasd = {
            reviewID: value.propertyId,
            brokerID: BrokerID,
            transactionStatusEmployeeID: 0,
            authorFirstName: value.name,
            numberOfStars: value.rating,
            displayOrder: 3,
            transactionStatusID: 0,
        };

        updateReview(EmployeeID, newasd)
            .then((res) => {
                getAnReviews(EmployeeID, BrokerID)
                    .then((data) => {
                        setListData(data.Data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err, 'err');
            })
    }

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
        history.push('/reviews/addnewreviews')
    }



    return (
        <Box sx={{ width: '100%', p: 4 }}>
            <Box display='flex' justifyContent='space-between' >
                <TableSearchHandling searchInputHandler={searchInputHandler} searchSelctionHanlder={searchSelctionHanlder} sortingHadler={sortingHadler} />
                <CustomButton click={navigateHandler} type='button' text='Create Review' radius='4px' color='white' bgColor='#5C58A5' width='178px' height='44px' fontSize='14px' />
            </Box>

            <Box mt={4} mb={2} >
                <Reviewtable deleteReviewHandler={deleteReviewHandler} data={ListData} PropertyTransactionStatusID={PropertyTransactionStatusID} />
            </Box>

        </Box>
    )
}

export default List;