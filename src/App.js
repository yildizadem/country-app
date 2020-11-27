import React, { useEffect, useState, useMemo } from 'react';
import {
  CssBaseline, useMediaQuery, ThemeProvider, createMuiTheme, Paper
} from '@material-ui/core';
import { gql, InMemoryCache, ApolloClient, ApolloProvider } from '@apollo/client';
import { AppBar, GraphTable } from './components';

const settings = {
  title: 'Countries',
  entityName: 'countries',
  columns: [
    {
      Header: 'Code',
      accessor: 'code'
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Capital',
      accessor: 'capital'
    },
    {
      Header: 'Phone',
      accessor: 'phone'
    },
    {
      Header: 'Currency',
      accessor: 'currency'
    },
    {
      Header: 'Languages',
      accessor: data => data.languages.map(lang => `${lang.name} (${lang.code})`)
    },
    {
      Header: 'Emoji',
      accessor: 'emoji'
    }
  ],
  queryAll: gql`
    query GetCountries {
      countries {
        code
        name
        phone
        capital
        currency
        languages {
          code
          name
        }
        emoji
      }
    }
  `,
  details: true,
  hideOnMainTable: ['capital', 'phone', 'Languages', 'currency']
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_ROOT,
  cache: new InMemoryCache()
});

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(true);
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  useEffect(() => {
    setDarkMode(prefersDarkMode)
  }, [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />

      <ApolloProvider client={client}>
        <GraphTable {...settings} />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
