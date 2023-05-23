import React, {FC} from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('react-root');

const App: FC = () => {
    return (
        <div>
            App
        </div>
    );
};

ReactDOM.render(
    <App/>,
    root
);
