import React, { useState } from 'react';
import MaterialTable from "material-table";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";
import CustomDropDown from '../../../../components/customDropDown'

import { nopicture } from '../../../../img'


import CustomPagination from '../../../../components/pagination/Pagination';

const PropertyTable = ({ data, instaramDeleteHandler }) => {
    const classes = useStyles();
    const history = useHistory();



    const tableMunuHandler = (option, value) => {
        if (option === 'Delete') {
            instaramDeleteHandler(value)
        }
        else if (option === 'Edit') {
            history.push(`/instagram/editinstagram/${value.propertyId}`)
        }
        else if (option === 'View Details') {
            history.push(`/instagram/viewinstagramdetail/${value.propertyId}`)
        }
        return
    }

    const tableColumn = [
        {
            title: 'Image', field: 'image',
            headerStyle: {
                backgroundColor: 'red',
            },
        },

        {
            title: '', field: 'action',
            render: item => (
                <CustomDropDown tableOptions={tableOptions} tableMunuHandler={tableMunuHandler} data={item} />
            ),
        }
    ]

    const tableData = data?.map((item) => {
        return {
            propertyId: item.instagramID,
            image: item.Image ? <img className={classes.bodyCellImage} src={item.Image} alt='tableListProduct' /> : <img className={classes.bodyCellImage} src={nopicture} alt='nopicture' />,
        }
    })

    return (
        <div className='propertiProductListing' >
            <MaterialTable
                columns={tableColumn}
                data={tableData}
                isLoading={!data}
                //   actions={actions}
                options={{
                    search: false,
                    showTitle: false,
                    toolbar: false,
                    // paging: false,
                    actionsCellStyle: {
                        backgroundColor: "#ffccdd",
                        color: "#FF00dd"
                    },
                }}
                components={{
                    // Pagination: (props) => {
                    //     return <CustomPagination {...props} />;
                    // },
                }}
            //   onSelectionChange={onSelectionChange}
            //   detailPanel={props.nestedFields ? detailPanel : null}
            //   onRowClick={handleRowClick}
            />
        </div>

    )
}

export default PropertyTable;


const tableOptions = [
    'View Details',
    'Edit',
    'Delete'
];

const useStyles = makeStyles(() => ({
    bodyCellImage: {
        width: '119px',
        height: '88px',
        objectFit: 'cover'
    },
    rootTable: {
        "& .MuiTableHead-root": {
            backgroundColor: 'transparent'
        },
    },
}));