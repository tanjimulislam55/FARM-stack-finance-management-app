/* eslint-disable no-unused-vars */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Home, Navbar, Income, Expenditure, Login, Signup } from './components';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';

const theme = createTheme({
    typography: {
        fontFamily: 'Josefin Sans',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
    palette: {
      background: {
        default: '#fafafa00'
      }
    }
});


function App() {
  



  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <BrowserRouter>
            <AuthProvider>
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute path="/expenditure" component={Expenditure} />
                <PrivateRoute path="/income" component={Income} />
              </Switch>
              <Navbar />
            </AuthProvider>
          </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
