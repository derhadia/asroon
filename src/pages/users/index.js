import React, {useState} from 'react';
import { useHistory } from "react-router-dom";

import { HEADER_FORM } from "../../assets/json";
import asroon from '../../assets/images/img.png'
import withDataFetching from "../../hoc/withDataFetching";
import {baseURL, deleteUser} from "../../services";
import PopUp from "../../components/PopUp";

const Users = ({ loading, results, error, onClick }) => {
    const history = useHistory();
    const [popUp, setPopUp] = useState(false);
    const [id, setId] = useState(null);

    if (loading || error) {
        return loading ? <div className="flex mtb-30 justify-center white">لطفا شکیبا باشید...</div> : error.message;
    }

    const handleDelete = () => {
        deleteUser(id)
            .then(res => {
                console.log(res)
                setPopUp(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // اضافه کردن بکگراند تیره هنگامی که مدال باز میشه
    const duringPopUp = popUp ? "during-popup" : ""

    return (
        <div className="flex justify-center dir-col w-90">
            <div className={duringPopUp} />
            <div className="flex justify-center mtb-30">
                <img src={asroon} loading="lazy" width="125" height="132" alt="arsson"/>
            </div>
            <div className="flex justify-end">
                <button onClick={onClick} className="btn outlined-btn" type='button'>دریافت اطلاعات از سرور</button>
                <button onClick={() => history.push('/add')} className="btn contained-btn" type='button'>
                    <span className="material-icons icon-add">add_circle</span>
                    ساخت اکانت جدید
                </button>
            </div>
            <table>
                <thead>
                <tr>
                    {
                        HEADER_FORM.map((item, idx) => (
                            <th key={idx}>
                                {item.label}
                            </th>
                        ))
                    }
                </tr>
                </thead>
                <tbody>
                {
                    results.map((item, idx) => (
                        <tr key={idx}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.password}</td>
                            <td className="flex justify-evenly">
                                <span
                                    onClick={() => history.push(`/edit/${item.id}`)}
                                    className="material-icons pointer"
                                >
                                    edit
                                </span>
                                <span
                                    onClick={() => {
                                        setId(item.id)
                                        setPopUp(true)
                                    }}
                                    className="material-icons red pointer"
                                >
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {popUp && <PopUp click={handleDelete} setPopUp={setPopUp}/>}
        </div>
    );
};

export default withDataFetching({
    dataSource: `${baseURL}users`
})(Users)
