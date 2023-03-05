import React, {FC, useEffect, useRef} from 'react';
import {providers} from "../App";

interface chartProps {
    calcValue: (provider: providers) => number;
    storage: number;
    transfer: number;
    isSSD: boolean;
    isMulti: boolean;
    isMobile: boolean;
}

const Chart: FC<chartProps> = ({calcValue, storage, transfer, isSSD, isMulti, isMobile}) => {
    const one = useRef() as React.MutableRefObject<HTMLDivElement>;
    const two = useRef() as React.MutableRefObject<HTMLDivElement>;
    const three = useRef() as React.MutableRefObject<HTMLDivElement>;
    const four = useRef() as React.MutableRefObject<HTMLDivElement>;
    const refs = [one, two, three, four]

    function setHeight(provider: providers, ref: React.MutableRefObject<HTMLDivElement>) {
        if (isMobile)
            ref.current.style.height = calcValue(provider) + "%"
        else
            ref.current.style.width = calcValue(provider) + "%"

    }

    function checkMax() {
        let best = one
        for (const ref of refs) {
            ref.current.classList.remove("best")
        }
        if (isMobile) {
            for (const ref of refs) {
                if (Number(best.current.style.height.slice(0, -1)) >= Number(ref.current.style.height.slice(0, -1)))
                    best = ref
            }
        }
        if (!isMobile) {
            for (const ref of refs) {
                if (Number(best.current.style.width.slice(0, -1)) >= Number(ref.current.style.width.slice(0, -1)))
                    best = ref
            }
        }
        best.current.classList.add("best")
    }

    useEffect(() => {

        checkMax()
        setHeight(providers.backblaze, one)
        setHeight(providers.bunny, two)
        setHeight(providers.scaleway, three)
        setHeight(providers.vulrt, four)
    }, [storage, transfer, isSSD, isMulti, isMobile])
    return (
        <div className={"slider__wrapper"}>
            {isMobile && <div>
                <div className={"container"}>
                    <div className="bar one" ref={one}><p>{calcValue(providers.backblaze)}</p></div>
                    <div className="bar two" ref={two}><p>{calcValue(providers.bunny)}</p></div>
                    <div className="bar three" ref={three}><p>{calcValue(providers.scaleway)}</p></div>
                    <div className="bar four" ref={four}><p>{calcValue(providers.vulrt)}</p></div>
                </div>
                <div className="titles">
                    <div>{providers.backblaze}</div>
                    <div>{providers.bunny}</div>
                    <div>{providers.scaleway}</div>
                    <div>{providers.vulrt}</div>
                </div>
            </div>}
            {!isMobile && <div className={"wrapper"}>
                <div className="desktop-titles">
                    <div>{providers.backblaze}</div>
                    <div>{providers.bunny}</div>
                    <div>{providers.scaleway}</div>
                    <div>{providers.vulrt}</div>
                </div>
                <div className={"desktop-container container"}>
                    <div className="desktop-bar one" ref={one}><p>{calcValue(providers.backblaze)}</p></div>
                    <div className="desktop-bar two" ref={two}><p>{calcValue(providers.bunny)}</p></div>
                    <div className="desktop-bar three" ref={three}><p>{calcValue(providers.scaleway)}</p></div>
                    <div className="desktop-bar four" ref={four}><p>{calcValue(providers.vulrt)}</p></div>
                </div>
            </div>}


        </div>
    );
};

export default Chart;