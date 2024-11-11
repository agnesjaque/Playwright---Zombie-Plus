const { test: base} = require("@playwright/test");
import { Login } from "../actions/Login";
import { Toast } from "../actions/Component";
import { Movies } from "../actions/Movies";
import  data  from "../support/fixtures/movies.json";
import {Leads} from "../actions/Leads"


const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page
            context['leads'] = new Leads(page),
            context['login'] = new Login(page),
            context['movies'] = new Movies(page),
            context['toast'] = new Toast(page)

        await use(page)

        }
    }

)

export { test }