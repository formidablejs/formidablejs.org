import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class Login < View

    def render
        <html>
            <head>
                <title> "Login - {config('app.name')}"

            <body>
                <h1> "Login"

                <form action=URL.route('login') method="POST">
                    <input type="hidden" name="_token" value=get('csrf_token')>

                    <div>
                        <label> "Email address"
                        <input type="email" name="email" value=old('email')>

                        if hasError('email')
                            for error in error('email')
                                <p> error

                    <div>
                        <label> "Password"
                        <input type="password" name="password">

                        if hasError('password')
                            for error in error('password')
                                <p> error

                    <div>
                        <button> "Login"
