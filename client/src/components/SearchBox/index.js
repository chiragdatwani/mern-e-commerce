import React, { useState, useEffect } from 'react'
import { Divider, ListItemText } from '@material-ui/core'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import { SearchContainer, SearchList, StyledInput } from './SearchBox.elements'
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

    let history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/search/${keyword}`)
        setKeyword('');
    };

    return (
        
        <SearchContainer>
            <form onSubmit={handleSubmit}>
                <StyledInput
                    placeholder = 'Search for book or author'
                    value={keyword}
                    onChange={(e) => {
                    setKeyword(e.target.value);
                }}
                >
                
                </StyledInput>
                <SearchIcon />
            </form>
            {
                products.length > 0 && keyword.length > 2 && (
            
                <SearchList>
                <MyList component="nav"  aria-label="mailbox folders">
                    {products.map((product,index) => (
                    <div key={product._id}>
                        <Link
                        to={`/product/${product._id}`}
                        style={{ textDecoration: "none", color: "unset" }}
                        >
                        <MyListItem button onClick={() => setKeyword('')}>
                        <ListItemText primary={product.name} />
                        </MyListItem>
                        {index !== (products.length -1) && <Divider />}
                        
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
