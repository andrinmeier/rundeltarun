import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#014D40', // dark teal
      light: '#147D64', // light teal
      dark: '#0C6B58' // light-dark teal
    },
    secondary: {
      main: '#102A43', // dark blue gray
      light: '#627D98', // light gray
      dark: '#334E68' // gray
    },
  }
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
};

export default MyApp
