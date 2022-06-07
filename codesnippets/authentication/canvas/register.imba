import { config } from '@formidablejs/framework/lib/Support/Helpers'
import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class Register < View

    def render
        <html>
            <head>
                <title> "Register - {config('app.name')}"

            <body>
                <h1> "Register"

                <form action=URL.route('register') method="POST">
                    <input type="hidden" name="_token" value=get('csrf_token')>

                    <div>
                        <label> "Name"
                        <input type="text" name="name" value=old('name')>

                        if hasError('name')
                            for error in error('name')
                                <p> error

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
                        <label> "Confirm Password"
                        <input type="password" name="password_confirmation">

                        if hasError('password_confirmation')
                            for error in error('password_confirmation')
                                <p> error

                    <div>
                        <button> "Register"
