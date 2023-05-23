import React, {FC, useCallback, useState} from 'react';
import ReactDOM from 'react-dom';
import styled, {createGlobalStyle} from "styled-components";

const root = document.getElementById('react-root');

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;
const MessageBox = styled.div`
  background-color: #eee;
  font-size: 5em;
`;
const KeyButton = styled.div`
  background-color: white;
  width: 2em;
  height: 7em;
  margin: 0 0.05em;
`;
const BlackKeyButton = styled(KeyButton)`
  background-color: black;
  width: 1.5em;
  height: 5em;
  margin: 0 -0.75em;
  z-index: 1;
`;
const KeyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1em;
  background-color: #ddd;
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
                <MessageBox>{message}</MessageBox>
            </div>
            <KeyContainer>
                <KeyButton/>
                <BlackKeyButton/>
                <KeyButton/>
                <BlackKeyButton/>
                <KeyButton/>
                <KeyButton/>
                <BlackKeyButton/>
                <KeyButton/>
                <BlackKeyButton/>
                <KeyButton/>
                <BlackKeyButton/>
                <KeyButton/>
            </KeyContainer>
        </>
    );
};

ReactDOM.render(
    <App/>,
    root
);
