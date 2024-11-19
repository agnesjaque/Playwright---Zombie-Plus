![poster](https://raw.githubusercontent.com/qaxperience/thumbnails/main/playwright-zombie.png)

## Português:

## 🤘 Sobre

Repositório do projeto de testes automatizados do sistema Zombie Plus, construído no curso Playwright Zombie Edition! O Playwright é uma ferramenta de código aberto desenvolvida pela Microsoft que revoluciona a automação de testes em sistemas web, oferecendo uma abordagem eficaz e altamente confiável.

## 💻 Tecnologias
- Node.js
- Playwright
- Javascript
- Faker
- PostgreSQL

## 🤖 Como executar

1. Clonar o repositório, instalar as dependências
```
npm install
```

2. Executar testes em Headless
```
npx playwright test 
```

3. Executar ver o relatório dos testes
```
npx playwright show-report
```

# Zombie+ Test Automation em Playwright

## O que foi testado?

O **Zombie+** é um sistema web de gestão de catálogo de filmes e séries sobre Zumbis.  
Com uma interface inspirada no Disney+, Zombie+ é um sistema web moderno desenvolvido com **ReactJS**, incorporando:

- Autenticação **JWT**;
- Integração com **API REST** em Node.js;
- Armazenamento de dados no **PostgreSQL**.

Para iniciar os testes, foi necessária a configuração inicial da aplicação web completa, incluindo a API e o banco de dados.  
Durante o teste, foram aplicadas atualizações de versões, simulando desafios reais enfrentados por profissionais de Qualidade de Software.

---

## O que foi implementado?

Foram implementados testes para 4 regiões da aplicação:

1. **Login**
2. **Leads**
3. **Filmes**
4. **Séries** (desafio de código)

Além disso, as **Page Objects** foram inicialmente utilizadas e, posteriormente, substituídas por **Custom Actions**.

---

## Principais aspectos do Playwright abordados

Durante o desenvolvimento dos testes, exploramos diversas funcionalidades do Playwright. Aqui estão os principais aspectos trabalhados:

### Configuração e Instalação
- Instalação do **Playwright** para Node.js.
- Configuração do ambiente utilizando **dotEnv**.

### Automação de Testes
- Testes de regressão em grande escala.
- Uso de localizadores para encontrar elementos na página.
- Consumo de APIs da aplicação web para:
  - Login com **Session Token**.
  - Validação de duplicidade de cadastro.
  - Inclusão de filmes e séries com arquivo de imagem (**multipart body**).
- Interação com elementos variados, como botões, alertas e elementos flutuantes.
- Validação do comportamento esperado da aplicação.

### Arquitetura e Manutenção
- Implementação de **Page Objects** para melhorar a manutenção dos testes.
- Utilização de **Custom Actions** como alternativa ao POM (Page Object Model).
- Injeção de Page Objects dentro do contexto do Playwright.
- Encapsulamento para melhorar a modularidade dos testes.

### Dados de Teste
- Integração de **Faker** para a criação de dados dinâmicos.

### Boas Práticas
- Estratégias para lidar com elementos dinâmicos e situações complexas.
- Cobertura de testes e boas práticas para garantir resultados confiáveis.
- Exploração de testes independentes e sua importância.

### Relatórios e Controle de Versão
- Geração de relatórios detalhados.
- Uso de **Git** e **GitHub** para controle de versão e colaboração.

---

Com essa estrutura de testes e boas práticas, garantimos a confiabilidade e a qualidade do Zombie+, simulando desafios reais e explorando ao máximo as funcionalidades do Playwright.



<hr>
Curso disponível em https://qaxperience.com

## English:

## 🤘 About

Repository for the automated testing project of the Zombie Plus system, built during the **Playwright Zombie Edition** course!  
**Playwright** is an open-source tool developed by Microsoft that revolutionizes web system test automation, offering an efficient and highly reliable approach.

## 💻 Technologies

- **Node.js**
- **Playwright**
- **JavaScript**
- **Faker**
- **PostgreSQL**

## 🤖 How to Run

1. Clone the repository and install dependencies:
```
   npm install
```

2. Run tests in headless mode:
```
npx playwright test 
```

3. View the test report:
```
npx playwright show-report
```

# Zombie+ Test Automation in Playwright

## What was tested?

**Zombie+** is a web system for managing a catalog of zombie-themed movies and series.  
With an interface inspired by Disney+, Zombie+ is a modern web application built with **ReactJS**, incorporating:

- **JWT Authentication**;
- Integration with **REST API** in Node.js;
- Data storage in **PostgreSQL**.

To begin testing, the complete web application, including the API and database, was set up.  
During testing, version updates were applied, simulating real-world challenges faced by Software Quality professionals.

---

## What was implemented?

Tests were implemented for four main areas of the application:

1. **Login**
2. **Leads**
3. **Movies**
4. **Series** (code challenge)

Additionally, **Page Objects** were initially used but later replaced by **Custom Actions**.

---

## Key Playwright Aspects Covered

During the development of the tests, various Playwright features were explored. Below are the main aspects covered:

### Setup and Installation
- Installation of **Playwright** for Node.js.
- Environment configuration using **dotEnv**.

### Test Automation
- Large-scale regression testing.
- Use of selectors to locate elements on the page.
- API testing for:
  - Login with **Session Token**.
  - Duplicate registration validation.
  - Adding movies and series with image files (**multipart body**).
- Interaction with various elements, such as buttons, alerts, and floating elements.
- Validation of the application's expected behavior.

### Architecture and Maintenance
- Implementation of **Page Objects** to improve test maintainability.
- Use of **Custom Actions** as an alternative to the POM (Page Object Model).
- Injection of Page Objects into the Playwright context.
- Encapsulation to improve test modularity.

### Test Data
- Integration of **Faker** to create dynamic test data.

### Best Practices
- Strategies to handle dynamic elements and complex scenarios.
- Test coverage and best practices to ensure reliable results.
- Exploration of independent tests and their importance.

### Reporting and Version Control
- Generation of detailed test reports.
- Use of **Git** and **GitHub** for version control and collaboration.

---

With this testing structure and best practices, we ensured the reliability and quality of Zombie+, simulating real-world challenges and fully leveraging Playwright's capabilities.
