import Input from 'antd/es/input/Input';

import './input.css';

const CustomInput = ( {label , type = "text" , classname , onChange}) => {

    return (
        <div className={`input-container ${classname}`}>
            <label>{label}</label>
            <Input type={type} onChange={onChange}/>
        </div>
    );
};

export default CustomInput;