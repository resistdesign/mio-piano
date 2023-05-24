import {render} from 'react-dom';
import React, {ChangeEvent, FC, MouseEvent, useCallback, useRef, useState} from 'react';
import styled, {createGlobalStyle} from "styled-components";

const charList = "1234567890qwertyuiop[]\\asdfghjkl;'zxcvbnm,./!@#$%^&*()QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?";

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
  font-size: 1em;
`;

const App: FC = () => {
    const rangeStart = -39;
    const rangeEnd = 48;
    const rangeList = Array.from({length: rangeEnd - rangeStart + 1}, (_, i) => i + rangeStart);
    const [waveType, setWaveType] = useState('sine');
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const keyPressedMapRef = useRef<Record<number, boolean>>({});
    const keyPressedMap = keyPressedMapRef.current;
    const [keyPressedMapTick, setKeyPressedMapTick] = useState<number>(0);
    const setKeyPressed = useCallback((key: number, value: boolean) => {
        keyPressedMapRef.current = {
            ...keyPressedMapRef.current,
            [key]: value,
        };
        setKeyPressedMapTick(keyPressedMapTick + 1);
    }, [keyPressedMapTick, setKeyPressedMapTick]);
    const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setWaveType(e.currentTarget.value);
    }, [setWaveType]);
    const onKeyContainerDown = useCallback((e: MouseEvent<HTMLDivElement>) => setMouseIsDown(true), [setMouseIsDown]);
    const onKeyContainerUp = useCallback((e: MouseEvent<HTMLDivElement>) => setMouseIsDown(false), [setMouseIsDown]);
    const onKeyPlayDown = useCallback((e: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
        if (e.type === 'mousedown' || e.type === 'keydown' || mouseIsDown) {
            const value = e.type === 'keydown' ? getHalfStepFrequency(charList.indexOf((e as KeyboardEvent).key) + rangeStart) : parseFloat(`${(e as MouseEvent<HTMLButtonElement>).currentTarget.value}`);

            if (keyPressedMap[value]) {
                return;
            }

            setKeyPressed(value, true);

            const oscillator = audioCtx.createOscillator();
            const vol = audioCtx.createGain();
            const delay = 0.25;
            const onEnd = (endEvent: MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
                const endValue = endEvent.type === 'keyup' ? getHalfStepFrequency(charList.indexOf((endEvent as KeyboardEvent).key) + rangeStart) : value;

                if (endValue === value) {
                    oscillator.stop(audioCtx.currentTime + delay);
                    vol.gain.setValueAtTime(vol.gain.value, audioCtx.currentTime);
                    vol.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + (delay - 0.01));

                    setTimeout(() => {
                        oscillator.disconnect();
                        vol.disconnect();
                        setKeyPressed(value, false);
                    }, 1000 * delay);
                }
            };

            oscillator.type = waveType as any;
            vol.connect(audioCtx.destination);
            oscillator.connect(vol);
            oscillator.frequency.value = value;
            vol.gain.setValueAtTime(1, audioCtx.currentTime);
            oscillator.start();

            if (e.type !== 'keydown') {
                const mE = e as MouseEvent<HTMLButtonElement>;

                mE.currentTarget.addEventListener('mouseup', onEnd as any);
                mE.currentTarget.addEventListener('mouseout', onEnd as any);
            } else {
                const kE = e as KeyboardEvent;

                kE.currentTarget?.addEventListener('keyup', onEnd as any);
            }
        }
    }, [waveType, mouseIsDown, keyPressedMap, setKeyPressed]);

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
                onKeyDown={onKeyPlayDown as any}
                tabIndex={0}
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
                            style={{
                                backgroundColor: keyPressedMap[f] ? 'lightblue' : undefined,
                            }}
                        />
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
