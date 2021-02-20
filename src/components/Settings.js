import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Settings = () => {
    const [ formData, setFormData ] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });
    const { register, handleSubmit } = useForm();
    const url = `${appLocalizer.apiUrl}/wprk/v1/settings`;

    const onSubmit = ( data ) => {
        axios.post( url, {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
        },{
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': appLocalizer.nonce
            }
        } )
        .then( ( res ) => {
            // console.log( res );
        } )
    }

    useEffect( () => {
        axios.get( url )
        .then( ( res ) => {
            setFormData( res.data )
            console.log( res.data )
        } )
    }, [] )

    return(
        <React.Fragment>
            <h2>Settings From</h2>
            <form id="wprk-settings-form" onSubmit={ handleSubmit( onSubmit ) }>
                <table className="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label htmlFor="firstname">Firstname</label>
                            </th>
                            <td>
                                <input id="firstname" name="firstname" ref={ register } className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="lastname">Lastname</label>
                            </th>
                            <td>
                                <input id="lastname" name="lastname" ref={ register } className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="email">Email</label>
                            </th>
                            <td>
                                <input id="email" name="email" ref={ register } className="regular-text" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="button button-primary">Save Settings</button>
                </p>
            </form>
        </React.Fragment>
    )
}

export default Settings;