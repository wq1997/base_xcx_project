import './app.scss';
import { Provider } from 'react-redux';
import configStore from '@/config/dva';

const store = configStore();

const App = (props) => {
    return <Provider store={store}>{props.children}</Provider>;
}

export default App;
