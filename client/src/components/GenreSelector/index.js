import React from 'react';
import { Grid } from '@material-ui/core/';
import { GridContainer } from './GenreSelector.elements';
import { Link } from 'react-router-dom';

const GenreSelector = () => {

    const genres = ['thriller', 'romance', 'young adult', 'science fiction', 'fantasy', 'poetry', 'biography', 'self help'];

    return (
            <GridContainer container justify="center" spacing={2}>
                { genres.map( genre => (
                    <Grid key={genre} item xs={6} sm={3}>
                        <Link style={{textDecoration: 'none'}} to={`/genre/${genre.split(' ').join('-')}`}>
                        <div className={`genre ${genre.split(' ').join('-')}`}>
                            <h3>{genre}</h3>
                        </div>
                        </Link>
                    </Grid>

                ))}
            </GridContainer>
    )
}

export default GenreSelector
