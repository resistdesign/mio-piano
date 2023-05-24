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
    const [waveType, setWaveType] = useState('sine');
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setWaveType(e.currentTarget.value);
    }, [setWaveType]);
    const onKeyPlay = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        const value = parseInt(`${e.currentTarget.value}`, 10);
        const oscillator = audioCtx.createOscillator();

        oscillator.type = waveType as any;
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        oscillator.frequency.setValueAtTime(value / 5, audioCtx.currentTime);

        setTimeout(() => {
            oscillator.stop();
            oscillator.disconnect();
        }, 500);
    }, [waveType]);

    return (
        <>
            <GlobalStyle/>
            <div>
                <input type="text" value={waveType} onChange={onInput}/>
            </div>
            <KeyContainer>
                <KeyButton
                    onClick={onKeyPlay}
                    value={3000}
                >C</KeyButton>
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3100}
                >C#</BlackKeyButton>
                <KeyButton
                    onClick={onKeyPlay}
                    value={3200}
                >D</KeyButton>
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3300}
                >D#</BlackKeyButton>
                <KeyButton
                    onClick={onKeyPlay}
                    value={3400}
                >E</KeyButton>
                <KeyButton
                    onClick={onKeyPlay}
                    value={3500}
                >F</KeyButton>
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3600}
                >F#</BlackKeyButton>
                <KeyButton
                    onClick={onKeyPlay}
                    value={3700}
                >A</KeyButton>
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={3800}
                >A#</BlackKeyButton>
                <KeyButton
                    onClick={onKeyPlay}
                    value={3900}
                >B</KeyButton>
                <BlackKeyButton
                    onClick={onKeyPlay}
                    value={4000}
                >B#</BlackKeyButton>
                <KeyButton
                    onClick={onKeyPlay}
                    value={4100}
                >C</KeyButton>
            </KeyContainer>
        </>
    );
};

render(
    <App/>,
    root
);
