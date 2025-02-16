import { Select } from 'antd';

import './select.css';

const CustomSelect = ( {label , classname , onChange , value , options, mode}) => {

    return (
        <div className={`select-container ${classname}`}>
            <label>{label}</label>
            <Select  onChange={onChange} value={value} options = {options} mode={mode}/>
        </div>
    );
};

export default CustomSelect;