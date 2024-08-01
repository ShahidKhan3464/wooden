import React from 'react'
import { TableSearchHandlingContainer } from './style';
import { inputSearch } from '../../img'

const Index = ({ searchInputHandler, searchSelctionHanlder, sortingHadler, asc = false, featured  = false}) => {

    return (
        <TableSearchHandlingContainer featured={featured}>
            <div className='groupTextField' >
                <div className='groupTextField_input' >
                    <img src={inputSearch} alt='inputSearch' />
                    <input onChange={(e) => searchInputHandler(e.target.value)} type='text' placeholder='Search' />
                </div>
                {featured ? null : (
                    <div className='groupTextField_select'  >
                        <select onChange={(e) => searchSelctionHanlder(e.target.value)}>
                            <option value='name' >By Name</option>
                            <option value='city' >By City</option>
                            <option value='location' >By Location</option>
                        </select>
                    </div>
                )}
               
            </div>
            {
                asc ?  null : (
            <div className='textFieldSortSelection' >
                <select onChange={(e) => sortingHadler(e.target.value)} >
                    <option value='dsc' >Sort In Decending</option>
                    <option value='asc' >Sort In Ascending</option>
                </select>
            </div>
                ) 
            }
          
        </TableSearchHandlingContainer>
    )
}

export default Index