import {render} from 'react-dom';
import React, {ChangeEvent, FC, MouseEvent, useCallback, useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";

const getHalfStepFrequency = (n = 0) => 440 * Math.pow(Math.pow(2, 1 / 12), n);

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
  appearance: none;
  display: block;
  font-size: 1em;

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
  user-select: none;
  font-size: 2em;
`;

const App: FC = () => {
    const rangeStart = -20;
    const rangeEnd = 20;
    const rangeList = Array.from({length: rangeEnd - rangeStart + 1}, (_, i) => i + rangeStart);
    const [waveType, setWaveType] = useState('triangle');
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setWaveType(e.currentTarget.value);
    }, [setWaveType]);
    const onKeyContainerDown = useCallback((e: MouseEvent<HTMLDivElement>) => setMouseIsDown(true), [setMouseIsDown]);
    const onKeyContainerUp = useCallback((e: MouseEvent<HTMLDivElement>) => setMouseIsDown(false), [setMouseIsDown]);
    const onKeyPlayDown = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        if (e.type === 'mousedown' || mouseIsDown) {
            const value = parseFloat(`${e.currentTarget.value}`);
            const oscillator = audioCtx.createOscillator();
            const onEnd = () => {
                oscillator.stop();
                oscillator.disconnect();
            };

            oscillator.type = waveType as any;
            oscillator.connect(audioCtx.destination);
            oscillator.frequency.value = value;
            oscillator.start();

            e.currentTarget.addEventListener('mouseup', onEnd);
            e.currentTarget.addEventListener('mouseout', onEnd);
        }
    }, [waveType, mouseIsDown]);

    return (
        <>
            <GlobalStyle/>
            <div>
                <input type="text" value={waveType} onChange={onInput}/>
            </div>
            <KeyContainer
                onMouseDown={onKeyContainerDown}
                onMouseUp={onKeyContainerUp}
                onMouseLeave={onKeyContainerUp}
            >
                {rangeList.map((n) => {
                    const f = getHalfStepFrequency(n);
                    const offSetIndex = n < 0 ? 12 - Math.abs(n % 12) : Math.abs(n % 12);
                    const blkIndices = [1, 3, 6, 8, 10];
                    const isBlack = blkIndices.includes(offSetIndex);
                    const Comp = isBlack ? BlackKeyButton : KeyButton;

                    return (
                        <Comp
                            key={n}
                            value={f}
                            onMouseDown={onKeyPlayDown}
                            onMouseOver={onKeyPlayDown}
                        >
                            {n}
                        </Comp>
                    );
                })}
            </KeyContainer>
        </>
    );
};

render(
    <App/>,
    root
);
