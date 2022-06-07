import { useForm } from '@formidablejs/view'

export tag Login

    def logout
        useForm!.post('/logout').then do
            window.location.assign('/login')

    def render
        <self>
            ...

            <a href="/logout" @click.prevent=logout> "Logout"
