import React, {FC} from 'react';

interface barProps{
    value:number;
    setValue:(element:number) => void;
    name:string;
}

const Bar:FC<barProps> = ({value, setValue,name}) => {
    return (
        <div className={"input-bar"}>
            <div className="slider-name">
                <p>{name + ": " + value + " GB"}</p>
            </div>
            <div className="slider-bar">
                <output>0</output>
                <input className={"slider"} type="range" min={0} max={1000} value={value} step={1} onChange={(elem)=>{setValue(elem.target.valueAsNumber)}}/>
                <output>1000</output>
            </div>
        </div>
    );
};

export default Bar;