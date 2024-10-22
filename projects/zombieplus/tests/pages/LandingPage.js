const { expect } = require("@playwright/test");

export class LandingPage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("http://localhost:3000");
  }

  async openLeadModal() {
    await this.page.getByRole("button", { name: /Aperte o play/ }).click();

    await expect(this.page.getByTestId("modal").getByRole("heading")).toHaveText(
      "Fila de espera"
    );
  }

  async submitLeadForm(name, email) {
    await this.page.getByPlaceholder("Informe seu nome").fill(name);
    await this.page.getByPlaceholder("Informe seu email").fill(email);

    await this.page
      .getByTestId("modal")
      .getByText("Quero entrar na fila!")
      .click();
  }

  async toastHaveText(message) {
    await expect(this.page.locator(".toast")).toHaveText(message); //se deixar só com esse teste, vai ser validado mas nao vai aparecer na ui

    await expect(this.page.locator(".toast")).toBeHidden({ timeout: 5000 }); //quando é mensagem flutuante, ela vai aparecer no trace ou teste no modo ui, cuidar com o timeout pq se a aplicação foi lenta vai falhar
  }
}

//maneira para encontrar para testar mensagens flutuantes
// await page.getByText("seus dados conosco").click();
// const content = await page.content();
// console.log(content);

//await page.waitForTimeout(5000); esse timeout é usado somente para testes
