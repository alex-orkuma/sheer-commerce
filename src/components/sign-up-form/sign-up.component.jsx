import { useState } from "react";
import {CreateAuthUserWithEmailAndPassword, auth, creatUserDocumenetFromAuth} from '../../utils/firebase.utils'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";
import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
 
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(password !== confirmPassword)
        {
            alert("password does not match"); 
            return;
        }

        try 
        {
            const {user} = await CreateAuthUserWithEmailAndPassword(email, password);


            await creatUserDocumenetFromAuth(user, {displayName});

            resetFormFields();

        } 
        catch (error) {
            if(error.code == 'auth/email-already-in-use')
            {
                alert('cannot create user, email already in use');
            } else if( error.code == 'auth/weak-password')
            {
                alert('pasword must be atleast 6 characters');
            }
            else{
                console.log('user-creation: ', error);
            }
        }


    }
    return (<div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>

        <form onSubmit={handleSubmit}>
            <FormInput label="Display Name" onChange={handleChange} type="text" required name="displayName" value={displayName}/>
            <FormInput label="Email" onChange={handleChange} type="email" required name="email" value={email}/>
            <FormInput label="Password" onChange={handleChange} type="password" required name="password" value={password}/>
            <FormInput label="Confirm Password" onChange={handleChange} type="password" required name="confirmPassword" value={confirmPassword}/>
            <Button onChange={handleChange} type="submit">Sign Up</Button>
        </form>
    </div>)
}

export default SignUpForm;