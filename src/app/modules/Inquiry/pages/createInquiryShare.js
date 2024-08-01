import React from 'react'
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import CustomButton from '../../../../components/customButton/index';
import { BoxContainer, PrimaryHeading } from '../../../baseStyle';
import { CreateInquiryShareContainer } from './style';

const CreateInquiryShare = () => {
    const history = useHistory()

    const navigateHandler = () => {
        history.push('/inquiry/inquirymatchingproperty')
    }

    return (
        <CreateInquiryShareContainer>
            <BoxContainer>
                <PrimaryHeading>Inquiry Shares</PrimaryHeading>
                <CustomButton type='button' click={navigateHandler} text='Inquiry Matching Properties' />
            </BoxContainer>
            <div className='createInquiryShare_content'>
                <div className='createInquiryShare_content_topHeading'>
                    <Typography component='h6'>Inquiry Share #</Typography>
                    <Typography component='h6'>Property Info</Typography>
                </div>
                <div className='createInquiryShare_content_data'>
                    <div className='createInquiryShare_content_data_left'>
                        <Typography component='h6'>09/12/2022</Typography>
                        <div className='createInquiryShare_content_data_left_textField'>
                            <label htmlFor="note">Note*</label>
                            <input id='note' type="text" placeholder='Type here' />
                        </div>
                        <div className='createInquiryShare_content_data_left_buttons'>
                            <CustomButton color='#121212' bgColor='#FAFAFA' border='none' text='Request Hold' />
                            <CustomButton color='#FFFFFF' bgColor='#555BB3' width='136px' text='Details' />
                        </div>
                    </div>
                    <div className='createInquiryShare_content_data_right'>
                        <Typography component='p'>Reference # 469</Typography>
                        <Typography component='p'>Villa MilosTEST45 - 09/15/2022 - 09/17/2022</Typography>
                        <Typography component='p'>Miami</Typography>
                        <Typography component='p'>Total Price: $5600</Typography>
                        <Typography component='p'>5 Bedrooms | 3.5 Bathrooms</Typography>
                        <Typography component='p'>Sleeps: 12</Typography>
                        <Typography component='span'>
                            Bitly:
                            <Typography component='a'>
                                http//bitlylink.com/324112421424_sdf
                            </Typography>
                        </Typography>
                    </div>
                </div>
                <div className='createInquiryShare_content_data'>
                    <div className='createInquiryShare_content_data_left'>
                        <Typography component='h6'>09/12/2022</Typography>
                        <div className='createInquiryShare_content_data_left_textField'>
                            <label htmlFor="note">Note*</label>
                            <input id='note' type="text" placeholder='Type here' />
                        </div>
                        <div className='createInquiryShare_content_data_left_buttons'>
                            <CustomButton color='#121212' bgColor='#FAFAFA' border='none' text='Request Hold' />
                            <CustomButton color='#FFFFFF' bgColor='#555BB3' width='136px' text='Details' />
                        </div>
                    </div>
                    <div className='createInquiryShare_content_data_right'>
                        <Typography component='p'>Reference # 469</Typography>
                        <Typography component='p'>Villa MilosTEST45 - 09/15/2022 - 09/17/2022</Typography>
                        <Typography component='p'>Miami</Typography>
                        <Typography component='p'>Total Price: $5600</Typography>
                        <Typography component='p'>5 Bedrooms | 3.5 Bathrooms</Typography>
                        <Typography component='p'>Sleeps: 12</Typography>
                        <Typography component='span'>
                            Bitly:
                            <Typography component='a'>
                                http//bitlylink.com/324112421424_sdf
                            </Typography>
                        </Typography>
                    </div>
                </div>
                <div className='createInquiryShare_content_data'>
                    <div className='createInquiryShare_content_data_left'>
                        <Typography component='h6'>09/12/2022</Typography>
                        <div className='createInquiryShare_content_data_left_textField'>
                            <label htmlFor="note">Note*</label>
                            <input id='note' type="text" placeholder='Type here' />
                        </div>
                        <div className='createInquiryShare_content_data_left_buttons'>
                            <CustomButton color='#121212' bgColor='#FAFAFA' border='none' text='Request Hold' />
                            <CustomButton color='#FFFFFF' bgColor='#555BB3' width='136px' text='Details' />
                        </div>
                    </div>
                    <div className='createInquiryShare_content_data_right'>
                        <Typography component='p'>Reference # 469</Typography>
                        <Typography component='p'>Villa MilosTEST45 - 09/15/2022 - 09/17/2022</Typography>
                        <Typography component='p'>Miami</Typography>
                        <Typography component='p'>Total Price: $5600</Typography>
                        <Typography component='p'>5 Bedrooms | 3.5 Bathrooms</Typography>
                        <Typography component='p'>Sleeps: 12</Typography>
                        <Typography component='span'>
                            Bitly:
                            <Typography component='a'>
                                http//bitlylink.com/324112421424_sdf
                            </Typography>
                        </Typography>
                    </div>
                </div>
            </div>
        </CreateInquiryShareContainer>
    )
}

export default CreateInquiryShare