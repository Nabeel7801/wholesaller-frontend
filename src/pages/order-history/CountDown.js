import React from 'react'
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;

const timerProps = {
    isPlaying: true,
    size: 100,
    strokeWidth: 6
};

function CountDown(props) {

    const remainingTime = React.useMemo(() => {
        const startTime = new Date(props?.startDate || Date.now()) / 1000;
        const endTime = parseInt(startTime + 2 * hourSeconds);
        return parseInt(endTime - Date.now()/1000);

    }, [])
    
    const renderTime = (time) => {
        const hh = ("00" + Math.floor(time / 3600)).slice(-2);
        const mm = ("00" + Math.floor((time % 3600) / 60)).slice(-2);
        const ss = ("00" + time % 60).slice(-2);

        return (
            time >= hourSeconds ?
                <div className="time-wrapper">
                    <div className="text-xs">Delivering in</div>
                    <div className="text-md text-center text-bold">{`${hh}:${mm}:${ss}`}</div>
                    <div className="text-xs text-center">Time</div>
                </div>
                :
                time >= minuteSeconds ?
                    <div className="time-wrapper">
                        <div className="text-xs">Delivering in</div>
                        <div className="text-md text-center text-bold">{`${mm}:${ss}`}</div>
                        <div className="text-xs text-center">Time</div>
                    </div>
                    :
                    time > 0 ?
                        <div className="time-wrapper">
                            <div className="text-xs">Delivering in</div>
                            <div className="text-md text-center text-bold">{time}</div>
                            <div className="text-xs text-center">Seconds</div>
                        </div>
                        :
                        <div className="time-wrapper">
                            <div className="text-xs">Just Around</div>
                            <div className="text-md text-center m-0 text-bold">YOUR</div>
                            <div className="text-xs text-center">corner</div>
                        </div>
        )
    };

    return (
        <CountdownCircleTimer
            {...timerProps}
            colors={["#7E2E84", "#D14081", "#EF798A", "#218380", "#333"]}
            colorsTime={[hourSeconds*2, hourSeconds, hourSeconds/2, minuteSeconds, 0]}
            duration={hourSeconds*2}
            updateInterval={1}
            initialRemainingTime={remainingTime}
            isSmoothColorTransition={true}
        >
            {({ remainingTime, color }) => (
                <span style={{ color }}>
                    {renderTime(remainingTime)}
                </span>
            )}
        </CountdownCircleTimer>
    )
}

export default CountDown