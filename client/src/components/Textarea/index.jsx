import TextArea from 'antd/es/input/TextArea';

import './textarea.css';

const CustomTextArea = ( {label ,classname, onChange, value}) => {

    return (
        <div className={`input-container ${classname}`}>
            <label>{label}</label>
            <TextArea rows="5" cols="5" value={value} onChange={onChange} />
        </div>
    );
};

export default CustomTextArea;