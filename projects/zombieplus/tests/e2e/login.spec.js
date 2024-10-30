import { test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { Toast } from "../pages/Component";
import { MoviesPage } from "../pages/MoviesPage";

let loginPage;
let toast;
let moviesPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    toast = new Toast(page);
    moviesPage = new MoviesPage(page);
});

test("deve logar como administrador", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "pwd123");
    await moviesPage.isLoggedIn();
});

test("não deve logar com senha incorreta", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "123");
    const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await toast.haveText(message);
});

test("não deve logar quando o email não é preenchido", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("", "123");
    await loginPage.alertHaveText("Campo obrigatório");
});

test("não deve logar quando o email é incorreto", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("www.wrongemail.com", "pwd123");
    await loginPage.alertHaveText("Email incorreto");
});

test("não deve logar quando a senha não é preenchida", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("admin@zombieplus.com", "");
    await loginPage.alertHaveText("Campo obrigatório");
});

test("não deve logar quando nenhum dado é preenchido", async ({ page }) => {
    await loginPage.visit();
    await loginPage.submit("", "");
    await loginPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});