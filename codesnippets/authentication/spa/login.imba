import { useForm } from '@formidablejs/view'

export tag Login

    user = useForm({
        email: ''
        password: ''
        remember: false
    })

    def login
        user.post('/login').then do
            window.location.assign('/home') # authenticated route

    def render
        <self>
            <form @submit.prevent=login>
                <div>
                    <label> "Email address"
                    <input type="email" name="email" value=user.email disabled=user.processing?>

                    if user.errors.email
                        for error in user.errors.email
                            <p> error
                
                <div>
                    <label> "Password"
                    <input type="password" name="password" value=user.password disabled=user.processing?>

                    if user.errors.password
                        for error in user.errors.password
                            <p> error

                <div>
                    <label>
                        <input type="checkbox" checked=user.remember disabled=user.processing?>
                        <span> "Remember me"
                
                <div>
                    <button disabled=user.processing?> "Login"
