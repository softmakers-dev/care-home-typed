import { Form, Link, useSearchParams, useActionData, useNavigation } from 'react-router-dom';

import loginWithGitHub from '../actions/githubActions';
import classes from './styles/AuthForm.module.css';

function AuthForm() {
    const [ searchParams ] = useSearchParams();
    const isSignup = searchParams.get('mode') === 'signup';

    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method="post" className={classes.form}>
            {data && data.error && (<ul>
                {Object.values(data.errors).map((err) => (
                    <li key={err}>{err}</li>
                ))}
            </ul>)}
            {data && data.message && <p>{data.message}</p>}
            <p>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" required />
            </p>
            <p>
                <label htmlFor="image">Password</label>
                <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}>
                <button onClick={loginWithGitHub}>GitHub Login</button>
                <Link to={`?mode=${isSignup ? 'login' : 'signup'}`}>
                    {!isSignup ? 'Create new user ?' : 'Already have account ?'}
                </Link>
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...  ' : (isSignup ? 'Sign Up' : 'Login')}
                </button>
            </div>
        </Form>
    );
}

export default AuthForm;
