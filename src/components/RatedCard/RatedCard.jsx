/* eslint-disable react/prop-types */
import { Typography, Box } from "@mui/material"

import { Movie } from '..'
import useStyles from './styles'

const RatedCard = ({ title, data}) => {
    const classes = useStyles()
  return (
    <Box>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Box display='flex' flexWrap='wrap' className={classes.container}>
            {data?.results.map((movie, i) => (
                <Movie key={movie.id} movie={movie} i={i}/>
            ))}
        </Box>
    </Box>
  )
}

export default RatedCard