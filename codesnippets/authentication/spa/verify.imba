import { useForm } from '@formidablejs/view'

export tag EmailVerify

    user = useForm!

    def verify
        user.post(router.realpath).then do
            window.location.assign('/home') # authenticated route

    def render
        <self>
            if user.isFatal? || user.errors.email
                <p> "Email could not be verified"
            else
                <form @submit.prevent=verify>
                    <div>
                        <button disabled=user.processing?> "Verify email"
