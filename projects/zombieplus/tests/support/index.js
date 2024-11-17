const { test: base} = require("@playwright/test");
import { Login } from "./actions/Login";
import { Toast } from "./actions/Component";
import { Movies } from "./actions/Movies";
import {Leads} from "./actions/Leads"
import { Api } from "./api";


const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page
            context['leads'] = new Leads(page),
            context['login'] = new Login(page),
            context['movies'] = new Movies(page),
            context['toast'] = new Toast(page)

        await use(context)

        },
        request: async ({request}, use) => {
            const context = request
            context['api'] = new Api(request)
            await context['api'].setToken() //Unique token request

            await use(context)
        }
    }

)

export { test }