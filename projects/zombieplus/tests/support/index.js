const { test: base} = require("@playwright/test");
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Component";
import { MoviesPage } from "../pages/MoviesPage";
import  data  from "../support/fixtures/movies.json";
import { LandingPage } from "../pages/LandingPage";

const test = base.extend({
    page: async ({ page }, use) => {
        await use({
            ...page,
            landing: new LandingPage(page),
            login: new LoginPage(page),
            movies: new MoviesPage(page),
            toast: new Toast(page)

        })
    }
}

)

export { test }