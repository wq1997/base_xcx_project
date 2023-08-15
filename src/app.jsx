import './app.scss';
import { Provider as ReduxProvider } from 'react-redux';
import configStore from '@/config/dva';
import ThemeProvider from '@/components/ThemeProvider';
const store = configStore();
window.store = store;

const App = (props) => {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider>
                {props.children}
            </ThemeProvider>
        </ReduxProvider>
    );
}

export default App;
