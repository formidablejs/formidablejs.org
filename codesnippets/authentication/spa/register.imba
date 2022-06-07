import { useForm } from '@formidablejs/view'

export tag Register

    user = useForm({
        name: ''
        email: ''
        password: ''
        password_confirmation: ''
    })

    def register
        user.post('/register').then do
            window.location.assign('/home') # authenticated route

    def render
        <self>
            <form @submit.prevent=register>
                <div>
                    <label> "Name"
                    <input type="text" name="name" value=user.name disabled=user.processing?>

                    if user.errors.name
                        for error in user.errors.name
                            <p> error
                
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
                    <label> "Confirm Password"
                    <input type="password" name="password_confirmation" value=user.password_confirmation disabled=user.processing?>

                    if user.errors.password_confirmation
                        for error in user.errors.password_confirmation
                            <p> error
                
                <div>
                    <button disabled=user.processing?> "Register"
