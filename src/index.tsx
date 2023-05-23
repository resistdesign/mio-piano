import React, {FC, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import {createGlobalStyle} from "styled-components";

const root = document.getElementById('react-root');

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

const App: FC = () => {
    const [message, setMessage] = useState('Waiting...');
    const onClick = useCallback(() => {
        setMessage('Things are happening!!!');
    }, setMessage);

    return (
        <>
            <GlobalStyle/>
            <div>
                {message}
                <br/>
                <button onClick={onClick}>YEY!</button>
            </div>
        </>
    );
};

ReactDOM.render(
    <App/>,
    root
);
