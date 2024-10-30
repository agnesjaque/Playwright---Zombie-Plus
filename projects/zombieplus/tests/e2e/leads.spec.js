// @ts-nocheck
import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { Toast } from "../pages/Component";
import { faker } from '@faker-js/faker';

let landingPage;
let toast;

// @ts-ignore
test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page);
  toast = new Toast(page);
});

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await toast.haveText(message);
});

test("não deve cadastrar quando o email já existe", async ({ page, request }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  const newlead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail,
    }
  });

  expect(newlead.ok()).toBeTruthy();

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm(leadName, leadEmail);

  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await toast.haveText(message);
});

test("não deve cadastrar um email incorreto", async ({ page }) => {

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("John Doe", "johndoe.yahoo.com");

  await landingPage.alertHaveText("Email incorreto")
  //podemos encontrar esse locator através da UI do PW, usado a aba locator
  //procurando por getByText('email incorreto') já é possivel confirmar se esse locator é encontrado na página
  //outra forma é inspecionando o elemento na página e depois testando como classe 'alert'na mesma tela
});

test("não deve cadastrar quando um nome não é preenchido", async ({ page }) => {

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "johndoe@yahoo.com");

  await landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando um email não é preenchido", async ({
  page,
}) => {

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("John Doe", "");

  await landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhuma informação é preenchida", async ({
  page,
}) => {

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm("", "");

  await landingPage.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
  ]); //dois outputs com nomes iguais
});
