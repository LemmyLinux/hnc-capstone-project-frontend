export const LOGIN_STORAGE_KEY = 'id';
export const MAIL_STORAGE_KEY = 'mail';

type Login = {
    id: number;
    mail: string;
    password: string;
    admin: boolean;
}

export default Login;