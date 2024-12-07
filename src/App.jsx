import { Button, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { NavBar } from './components/index.js'
import useStyles from './components/styles'


const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Button>Global Button</Button>
      <h1 className='text-green-500 text-4xl'>Home</h1>
      <Outlet />
    </div>
  )
}

export default App