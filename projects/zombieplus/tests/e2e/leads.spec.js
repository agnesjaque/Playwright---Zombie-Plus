import { expect } from "@playwright/test";
import { test } from "../support";
import { faker } from '@faker-js/faker';

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  const leadName = faker.person.fullName();
  const leadEmail = faker.internet.email();

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.toast.containText(message);
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

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm(leadName, leadEmail);

  const message = "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.toast.containText(message);
});

test("não deve cadastrar um email incorreto", async ({ page }) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("John Doe", "johndoe.yahoo.com");

  await page.leads.alertHaveText("Email incorreto")
  //podemos encontrar esse locator através da UI do PW, usado a aba locator
  //procurando por getByText('email incorreto') já é possivel confirmar se esse locator é encontrado na página
  //outra forma é inspecionando o elemento na página e depois testando como classe 'alert'na mesma tela
});

test("não deve cadastrar quando um nome não é preenchido", async ({ page }) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("", "johndoe@yahoo.com");

  await page.leads.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando um email não é preenchido", async ({
  page,
}) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("John Doe", "");

  await page.leads.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar quando nenhuma informação é preenchida", async ({
  page,
}) => {

  await page.leads.visit();
  await page.leads.openLeadModal();
  await page.leads.submitLeadForm("", "");

  await page.leads.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
  ]); //dois outputs com nomes iguais
});
