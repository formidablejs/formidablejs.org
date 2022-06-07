import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
...

export class AppServiceResolver < ServiceResolver

    def boot
        ...

        # Redirect the user to the home route after logging in.
        Auth.onAuthenticated do(request\Request)
            Redirect.to('/home') if request.expectsHtml!
