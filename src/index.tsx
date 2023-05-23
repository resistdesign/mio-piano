import {render} from 'react-dom';
import React, {ChangeEvent, FC, MouseEvent, useCallback, useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";

// create web audio api context
const audioCtx = new AudioContext();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

oscillator.type = "square";
oscillator.frequency.setValueAtTime(0, audioCtx.currentTime); // value in hertz
oscillator.connect(audioCtx.destination);
oscillator.start();

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
const KeyButton = styled.button`
  background-color: white;
  width: 2em;
  height: 7em;
  margin: 0 0.05em;
  cursor: pointer;

  &:hover {
    background-color: lightblue;
  }
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
    }, [setMessage]);
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    }, [setMessage]);
    const onKeyPlay = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        oscillator.frequency.setValueAtTime(parseInt(`${e.currentTarget.value}`, 10), audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(0, audioCtx.currentTime + 1000);
    }, []);

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
                <KeyButton
                    onClick={onKeyPlay}
                    value={3000}
                />
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3100}
                />
                <KeyButton
                    onClick={onKeyPlay}
                    value={3200}
                />
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3300}
                />
                <KeyButton
                    onClick={onKeyPlay}
                    value={3400}
                />
                <KeyButton
                    onClick={onKeyPlay}
                    value={3500}
                />
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3600}
                />
                <KeyButton
                    onClick={onKeyPlay}
                    value={3700}
                />
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3800}
                />
                <KeyButton
                    onClick={onKeyPlay}
                    value={3900}
                />
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={4000}
                />
                <KeyButton
                    onClick={onKeyPlay}
                    value={4100}
                />
            </KeyContainer>
        </>
    );
};

render(
    <App/>,
    root
);
