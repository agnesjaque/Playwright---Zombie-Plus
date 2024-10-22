// @ts-check
const { test, expect } = require("@playwright/test");
const { LandingPage } = require("./pages/LandingPage");

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Jaqueline Agnes", "agnesjaque@yahoo.com");
  await landingPage.toastHaveText(message);
});

test("não deve cadastrar um email incorreto", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Jaqueline Agnes", "agnesjaque.yahoo.com");

  await expect(page.locator(".alert")).toHaveText("Email incorreto");
  //podemos encontrar esse locator através da UI do PW, usado a aba locator
  //procurando por getByText('email incorreto') já é possivel confirmar se esse locator é encontrado na página
  //outra forma é inspecionando o elemento na página e depois testando como classe 'alert'na mesma tela
});

test("não deve cadastrar quando um nome não é preenchido", async ({ page }) => {
  const landingPage = new LandingPage(page);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(" ", "agnesjaque@yahoo.com");

  await expect(page.locator(".alert")).toHaveText("Campo obrigatório");
});

test("não deve cadastrar quando um email não é preenchido", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("Jaqueline Agnes", "");

  await expect(page.locator(".alert")).toHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhuma informação é preenchida", async ({
  page,
}) => {
  const landingPage = new LandingPage(page);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");

  await expect(page.locator(".alert")).toHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
  ]); //dois outputs com nomes iguais
});
