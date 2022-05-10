import React from 'react';

const PopUp = (props) => {
    const { setPopUp, click } = props;
    return (
        <div className="PopUp">
            <span  onClick={()=> setPopUp(false)} className="material-icons pointer">close</span>
            <div className="title-popup">
                <span>حذف ردیف</span>
            </div>
            <div className="content-popup">
                <p>آیا از حذف این ردیف مطمن هستید؟</p>
            </div>
            <div className="flex justify-end">
                <button className="btn contained-btn" onClick={click}>حذف</button>
            </div>
        </div>
    );
};

export default PopUp;
