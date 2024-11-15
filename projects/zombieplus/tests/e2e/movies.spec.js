const { test } = require('../support');
import data from "../support/fixtures/movies.json";
import { executeSQL } from "../support/database";

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.movies`); //database table
})

test("deve poder cadastrar um novo filme", async ({ page }) => {

    const movie = data.create
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.movies.create(movie);
    await page.toast.containText("Cadastro realizado com sucesso");
});

test("deve poder cadastrar quando um título é duplicado", async ({ page }) => {

    const movie = data.duplicate  
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.movies.create(movie);
    await page.toast.containText("Cadastro realizado com sucesso");

    await page.movies.create(movie);
    await page.toast.containText("Este conteúdo já encontra-se cadastrado no catálogo");
});

test("não deve cadastrar quando os campos obrigatórios não são preenchidos", async ({page}) => {
   
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.movies.goForm();
    await page.movies.submit();
    await page.movies.alertHaveText([
        "Por favor, informe o título.",
        "Por favor, informe a sinopse.",
        "Por favor, informe a empresa distribuidora.",
        "Por favor, informe o ano de lançamento."
    ])
})