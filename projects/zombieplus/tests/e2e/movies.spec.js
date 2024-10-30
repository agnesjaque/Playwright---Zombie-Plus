import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Component";
import { MoviesPage } from "../pages/MoviesPage";
import  data  from "../support/fixtures/movies.json";

let loginPage;
let toast;
let moviesPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
});

test("deve poder cadastrar um novo filme", async ({ page }) => {

    const movie = data.create;

    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd123");
    await moviesPage.isLoggedIn();

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year);

    await toast.containText("Cadastro realizado com sucesso");
});