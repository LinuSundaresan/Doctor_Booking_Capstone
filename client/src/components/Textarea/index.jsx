import TextArea from 'antd/es/input/TextArea';

import './textarea.css';

const CustomTextArea = ( {label ,classname, onChange}) => {

    return (
        <div className={`input-container ${classname}`}>
            <label>{label}</label>
            <TextArea rows="5" cols="5" onChange={onChange} />
        </div>
    );
};

export default CustomTextArea;