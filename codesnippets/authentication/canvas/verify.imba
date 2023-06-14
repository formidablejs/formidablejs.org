import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { View } from '@formidablejs/framework'
import { URL } from '@formidablejs/framework'

export class EmailVerify < View

    def render
        const verifyUrl = URL.route('email.verify', {
            email: get('email'),
            signature: get('signature')
        })

        <html>
            <head>
                <title> "Verify - {config('app.name')}"

            <body>
                if hasSession('message')
                    <p> session('message')

                else
                    <a href=verifyUrl html:onclick="event.preventDefault(); document.getElementById('verify-form').submit();">
                        "Verify Email"

                    <form#verify-form[d:none] action=verifyUrl method="POST">
                        <input type="hidden" name="_token" value=get('csrf_token')>
