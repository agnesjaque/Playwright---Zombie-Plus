const { test } = require('../support');
import data from "../support/fixtures/series.json";
import { executeSQL } from "../support/database";
import { expect } from "@playwright/test";

test.beforeAll(async () => {
    await executeSQL(`DELETE FROM public.tvshows`); //database table
})

test("deve poder cadastrar uma nova serie", async ({ page }) => {

    const serie = data.create
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.series.create(serie);
    await page.popup.haveText(`A série '${serie.title}' foi adicionada ao catálogo.`);
});

test("deve poder remover uma serie", async ({ page, request }) => {
    const serie = data.to_remove;
    await request.api.postSerie(serie);

    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.series.remove(serie.title);
    await page.popup.haveText("Série removida com sucesso.");
});

test("não deve poder cadastrar quando um título é duplicado", async ({ page, request }) => {

    const serie = data.duplicate 
    await request.api.postSerie(serie);
    
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.series.create(serie);
    await page.popup.haveText(`O título '${serie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`);

 });


test("não deve cadastrar quando os campos obrigatórios não são preenchidos", async ({page}) => {
   
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.series.goTvSeries();
    await page.series.goForm();
    await page.series.submit();
    await page.series.alertHaveText([
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório",
        "Campo obrigatório (apenas números)"
    ])
})

test("deve realizar a busca pelo termo zumbi", async({page, request})=>{
    const serie = data.search;

    serie.data.forEach(async(m) => { //the m means that javascript will use one data each time
       await request.api.postSerie(m)
       console.log(m);
    })

    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
    await page.series.search(serie.input);
    await page.series.tableHave(serie.outputs);

})