import { createMuiTheme } from '@material-ui/core/styles';

export const myTheme = createMuiTheme({

    palette: {

        primary: {
            main:'#009688',
            light:'#ffffff',
            dark: '#ffffff'
        },
        grey:{
            800: '#212121'
        },
        background:{
            default: '#000000'
        }
    }
})