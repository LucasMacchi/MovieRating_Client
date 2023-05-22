import {  useState } from "react";
import { changePassword } from "../../Store/userSlice";

export default function PasswordReset(){

    const [passwordData, setPasswords] = useState({
        password: "",
        passwordCon: ""
    })

    const [errorPassword, SetErrorPassword] = useState({error: false, message: ""})
    const [errorPasswordCon, SetErrorPasswordCon] = useState({error: false, message: ""})

    const handlePasswordErrors = () => {
        const passwordValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/
        if(passwordData.password.length < 7 || !passwordValidator.test(passwordData.password)) SetErrorPassword({error:true, message: "password need at least 8 character, one uppercase and one number"})
        else {SetErrorPassword({error: false, message: ""})}
    }
    const handlePasswordConfirmation = () => {
        if(passwordData.passwordCon !== passwordData.password || passwordData.passwordCon.length === 0) SetErrorPasswordCon({error: true, message: "Passwords doesn't match"})
        else {SetErrorPasswordCon({error: false, message: ""})}
    }
    const handlePassword = (e: string) => {
        setPasswords({...passwordData, password: e})
    }
    const handlePasswordCon = (e: string) => {
        setPasswords({...passwordData, passwordCon: e})
    }



}