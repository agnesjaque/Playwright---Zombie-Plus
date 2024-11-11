const { test: base} = require("@playwright/test");
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Component";
import { MoviesPage } from "../pages/MoviesPage";
import  data  from "../support/fixtures/movies.json";
import { LandingPage } from "../pages/LandingPage";

const test = base.extend({
    page: async ({ page }, use) => {
        
        const context = page
            context['landing'] = new LandingPage(page),
            context['login'] = new LoginPage(page),
            context['movies'] = new MoviesPage(page),
            context['toast'] = new Toast(page)

        await use(page)

        }
    }

)

export { test }