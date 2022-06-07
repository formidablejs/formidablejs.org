import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
...

export class AppServiceResolver < ServiceResolver

    def boot
        ...

        # Redirect the user to the login route after logging out.
        Auth.onSessionDestroyed do(request\Request)
            Redirect.to('/login') if request.expectsHtml!
