import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Coupons from './users/Coupons'
import config from 'config';
import { fetchWrapper, history } from '@/_helpers';
const baseUrl = `${config.apiUrl}`;


function Overview({ match }) {

    const [coupons, setCoupons] = useState([])

    // useEffect(() => {
    //     fetchWrapper.get(`${baseUrl}/coupons/get-coupons`).then(x => setCoupons(x));
    // }, []);


    const { path } = match;

    const initialValues = {
        store: 'teststore',
        code: '12345',
        uuid: 'admin'
    };

    const validationSchema = Yup.object().shape({
        store: Yup.string()
            .required('Store is required'),
        code: Yup.string()
            .required('Code is required')
    });

    function addCoupon(store, code, uuid) {
        return fetchWrapper.post(`${baseUrl}/coupons/add-coupon`, { store, code, uuid })
            .then(coupon => {
                return coupon;
            });
    } 


    function onSubmit({ store, code, uuid }, { setSubmitting }) {
        addCoupon(store, code, uuid)
            .then(() => {
                const { from } = location.state || { from: { pathname: "/" } };
                history.push(from);
            })
            .catch(error => {
                setSubmitting(false);
                console.error(error);
            });
    }


    return (
        <div>
            <h1>Admin</h1>
            <p>This section can only be accessed by administrators.</p>
            <p><Link to={`${path}/users`}>Manage Users</Link></p>

            <div style={{border: '1px solid black', padding: '15px', borderRadius: '5px', margin: '10px'}}>
                <h3>Add Coupon Test Form</h3>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Store</label>
                                    <Field name="store" type="text" className={'form-control'} />
                                </div>
                                <div className="form-group">
                                    <label>Code</label>
                                    <Field name="code" type="text" className={'form-control'} />
                                </div>
                                <div className="form-group">
                                    <label>UUID</label>
                                    <Field name="uuid" type="text" className={'form-control'} />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <Coupons />
            </div>
        </div>
    );
}

export { Overview };