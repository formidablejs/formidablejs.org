import { URL } from '@formidablejs/framework'
import { View } from '@formidablejs/framework'

export class Home < View

    def render
        <html>
            <head>
                ...

            <body>
                ...

                <a href=URL.route('logout') html:onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    "Logout"

                <form#logout-form[d:none] action=URL.route('logout') method="POST">
                    <input type="hidden" name="_token" value=get('csrf_token')>
