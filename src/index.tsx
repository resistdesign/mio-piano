import {render} from 'react-dom';
import React, {ChangeEvent, FC, MouseEvent, useCallback, useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";

// create web audio api context
const audioCtx = new AudioContext();

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
  color: white;
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
    const [waveType, setWaveType] = useState('triangle');
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setWaveType(e.currentTarget.value);
    }, [setWaveType]);
    const onKeyPlayDown = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const value = parseFloat(`${e.currentTarget.value}`);
        const oscillator = audioCtx.createOscillator();

        oscillator.type = waveType as any;
        oscillator.connect(audioCtx.destination);
        oscillator.frequency.value = value;
        oscillator.start();

        e.currentTarget.addEventListener('mouseup', () => {
            oscillator.stop();
            oscillator.disconnect();
        });
    }, [waveType]);

    return (
        <>
            <GlobalStyle/>
            <div>
                <input type="text" value={waveType} onChange={onInput}/>
            </div>
            <KeyContainer>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={261.63}
                >C</KeyButton>
                <BlackKeyButton
                    onMouseDown={onKeyPlayDown}
                    value={277.18}
                >C#</BlackKeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={293.66}
                >D</KeyButton>
                <BlackKeyButton
                    onMouseDown={onKeyPlayDown}
                    value={311.13}
                >D#</BlackKeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={329.63}
                >E</KeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={349.23}
                >F</KeyButton>
                <BlackKeyButton
                    onMouseDown={onKeyPlayDown}
                    value={369.99}
                >F#</BlackKeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={392.00}
                >G</KeyButton>
                <BlackKeyButton
                    onMouseDown={onKeyPlayDown}
                    value={392.00}
                >G#</BlackKeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={440.00}
                >A</KeyButton>
                <BlackKeyButton
                    onMouseDown={onKeyPlayDown}
                    value={466.16}
                >A#</BlackKeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={493.88}
                >B</KeyButton>
                <KeyButton
                    onMouseDown={onKeyPlayDown}
                    value={523.25}
                >C</KeyButton>
            </KeyContainer>
        </>
    );
};

render(
    <App/>,
    root
);
