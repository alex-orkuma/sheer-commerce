import { useState } from "react";
import {CreateAuthUserWithEmailAndPassword, auth, creatUserDocumenetFromAuth, signInWithGooglePopup, SignInAuthUserWithEmailAndPassword} from '../../utils/firebase.utils'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button-component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () =>{
 
    const [formFields, setFormFields] = useState(defaultFormFields);

    const {email, password, } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await  signInWithGooglePopup();
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value})
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try {
            const {user} = await SignInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch(error.code)
            {
                case 'auth/wrong-password':
                    alert('Invalid credentials');
                    break;

                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
                break;

            }
        }


    }
    return (<div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
            <FormInput label="Email" onChange={handleChange} type="email" required name="email" value={email}/>
            <FormInput label="Password" onChange={handleChange} type="password" required name="password" value={password}/>

            <div className='buttons-container'>
                <Button onChange={handleChange} type="submit">Sign In</Button>
                <Button buttonType='google' onClick={signInWithGoogle} type='button'>Sign in with google</Button>
            </div>
        </form>
    </div>)
}

export default SignInForm;