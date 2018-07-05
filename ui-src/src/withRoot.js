import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import CssBaseline from 'material-ui/CssBaseline'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#d05ce3',
      main: '#9c27b0',
      dark: '#6a0080'
    },
    secondary: {
      light: '#6ff9ff',
      main: '#26cd6a',
      dark: '#0095a8'
    }
  }
})

// Expose the theme as a global variable so people can play with it.
if (process.browser) {
  window.theme = theme
}

function withRoot (Component) {
  function WithRoot (props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. >> Reboot renamed CssBaseline. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
