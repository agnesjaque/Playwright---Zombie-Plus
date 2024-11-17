import { expect } from "@playwright/test";

export class Leads {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    console.log('BASE_URL:', process.env.BASE_URL);
    await this.page.goto("/");
  }

  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();
    await expect(
      this.page.getByTestId("modal").getByRole("heading")
    ).toHaveText("Fila de espera");
  }

  async submitLeadForm(name, email) {
    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);
    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }

  async alertHaveText(target){
    await expect(this.page.locator(".alert")).toHaveText(target);
}
}



//maneira para encontrar para testar mensagens flutuantes
// await page.getByText("seus dados conosco").click();
// const content = await page.content();
// console.log(content);

//await page.waitForTimeout(5000); esse timeout é usado somente para testes
