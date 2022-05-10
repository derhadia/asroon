import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import asroon from "../../assets/images/img.png";
import {createUser, getUser, updateUser} from "../../services";

const InsertEdit = () => {
    const history = useHistory();
    const { id } = useParams();
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
       name: '',
       email: '',
       phone: '',
       pass: ''
    });

    const handleChangeInput = event => {
        let { value, id } = event.target;
        setState((prevState) => ({...prevState, [id]: value}))
    }

    useEffect(() => {
        if (id) {
            getUser(id)
                .then(res => {
                    setData(res.data[0])
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [id]);

//آپدیت کردن فیلدها در هنگام ویرایش
    useEffect(() => {
        if (data !== null) {
            setState({
                name: data.username,
                email: data.email,
                phone: data.phone,
                pass: data.password
            })
        }
    }, [data])

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault();
        let body = {
            email: state.email,
            username: state.name,
            phone: state.phone,
            pass: state.pass,
            address: {
                city:'kilcoole',
                street:'7835 new road',
                number:3,
                zipcode:'12926-3874',
                geolocation:{
                    lat:'-37.3159',
                    long:'81.1496'
                }
            },
            name: {
                firstname:'John',
                lastname:'Doe'
            },
        }
        if (id) {
            updateUser(body, id)
                .then(res => {
                    setMessage('عملیات با موفقیت انجام شد')
                    setLoading(false)
                    history.push('/')
                })
                .catch(err => {
                    setMessage('عملیات نا موفق')
                    setLoading(false)
                })
        } else {
            createUser(body)
                .then(res => {
                    setMessage('عملیات با موفقیت انجام شد')
                    setLoading(false)
                    history.push('/')
                })
                .catch(err => {
                    setMessage('عملیات نا موفق')
                    setLoading(false)
                })
        }
    }
    if (loading) {
        return <div className="flex mtb-30 justify-center white">لطفا شکیبا باشید...</div>
    }
    return (
        <div className="flex justify-center dir-col gray">
            <div className="flex justify-center mtb-30">
                <img src={asroon} loading="lazy" width="125" height="132" alt="arsson"/>
            </div>
            <div className="card flex dir-col">
                {
                    id ? <h3 className="title">ویرایش</h3> : <h3 className="title">فرم زیر را پر کنید</h3>
                }
                <div className='red flex justify-center'>{message}</div>
                <form onSubmit={handleSubmit} className='flex dir-col'>
                    <label htmlFor="name">نام</label>
                    <input
                        onChange={handleChangeInput}
                        value={state.name}
                        placeholder="نام را وارد کنید"
                        id="name"
                        type="text"
                    />
                    <label htmlFor="email">ایمیل</label>
                    <input
                        onChange={handleChangeInput}
                        value={state.email}
                        placeholder="ایمیل را وارد کنید"
                        id="email"
                        type="text"
                    />
                    <label htmlFor="phone">تلفن</label>
                    <input
                        onChange={handleChangeInput}
                        value={state.phone}
                        placeholder="تلفن را وارد کنید"
                        id="phone"
                        type="text"
                    />
                    <label htmlFor="pass">پسورد</label>
                    <input
                        onChange={handleChangeInput}
                        value={state.pass}
                        placeholder="پسورد را وارد کنید"
                        id="pass"
                        type="text"
                    />
                    <button disabled={loading} type="submit" className="btn contained-btn full-w-btn">
                        {
                            id ? 'ثبت اطلاعات' : 'ساخت اکانت'
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default InsertEdit;
