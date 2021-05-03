import { Divider, InputAdornment, ListItemText, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { SearchContainer, SearchList } from './SearchBox.elements'
import SearchIcon from "@material-ui/icons/Search";
import {MyList, MyListItem} from './SearchBox.elements'

const SearchBox = () => {

    const [keyword, setKeyword] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        async function fetchData() {
            if(keyword.length < 3){
            setProducts([]);
            }else{
                const {data} = await axios.get(`/api/products/search/${keyword}`);
                setProducts(data.slice(0,5))
            }
        }
    
        let timeoutId = setTimeout(()=>{
            if(keyword){
                fetchData();
            }
        }, 300)

        return () => {
            if(keyword.length < 3){
            setProducts([])
            }
            clearTimeout(timeoutId)
        }
    
    },[keyword])

    return (
        
        <SearchContainer>
            <form>
                <TextField 
                    color='primary'
                    variant='filled' 
                    fullWidth
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                />
            </form>
            {
                products.length > 0 && keyword.length > 2 && (
            
                <SearchList>
                <MyList component="nav"  aria-label="mailbox folders">
                    {products.map((product) => (
                    <div key={product._id}>
                        <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none", color: "unset" }}
                        >
                        <MyListItem button onClick={() => setKeyword('')}>
                        <ListItemText primary={product.name} />
                        </MyListItem>
                        <Divider />
                        </Link>
                    </div>
                    ))}
                </MyList>
                </SearchList>
                )
            }
        </SearchContainer>
    )
}

export default SearchBox
