import { AuthService as Auth } from '@formidablejs/framework'
import { ServiceResolver } from '@formidablejs/framework'
import { Request } from '@formidablejs/framework'
import { FastifyReply } from '@formidablejs/framework'
import { Redirect } from '@formidablejs/framework'
...

export class AppServiceResolver < ServiceResolver

    def boot
        ...

        # Redirect the user to the home route after logging in.
        Auth.onEmailVerified do(request\Request, reply\FastifyReply, verified\boolean)
            Redirect.back!.with('message', verified ? 'success' : 'failed') if request.expectsHtml!
