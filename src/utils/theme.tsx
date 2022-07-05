import { DefaultTheme, Theme } from '@react-navigation/native'

const AppTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(255, 45, 85)',
        background: 'rgb(242, 243, 245)'
    }
}

export default AppTheme
