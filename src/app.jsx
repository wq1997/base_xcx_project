import './app.scss';
import { Provider } from 'react-redux';
import configStore from '@/config/dva';
import ThemeProvider from '@/components/ThemeProvider';
const store = configStore();
window.store = store;

const App = (props) => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                {props.children}
            </ThemeProvider>
        </Provider>
    );
}

export default App;
