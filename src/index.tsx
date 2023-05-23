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
    const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    }, [setMessage]);

    return (
        <>
            <GlobalStyle/>
            <div>
                <input type="text" value={message} onChange={onInput}/>
                <br/>
                <button onClick={onClick}>YEY!</button>
                <br/>
                <span>{message}</span>
            </div>
        </>
    );
};

ReactDOM.render(
    <App/>,
    root
);
