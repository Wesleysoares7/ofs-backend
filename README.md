
# OFS Backend

Este projeto é uma API desenvolvida em Node.js e MongoDB para gerenciar o cadastro de membros de uma fraternidade da OFS (Ordem Franciscana Secular). Ele permite o registro de membros, aprovação de cadastros pendentes e listagem de membros, com acesso controlado para administradores.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de APIs REST.
- **MongoDB**: Banco de dados NoSQL para armazenamento de dados.
- **Mongoose**: ODM (Object Data Modeling) para modelagem de dados no MongoDB.
- **Multer**: Biblioteca para upload de arquivos.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **bcrypt**: Hashing de senhas para segurança.

---

## 📂 Estrutura do Projeto

```
ofs-backend/
├── src/
│   ├── controllers/
│   │   └── membroController.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   └── membroModel.js
│   ├── routes/
│   │   └── membroRoutes.js
│   └── uploads/ (armazenamento de fotos)
├── .env
├── server.js
├── package.json
```

---

## 🚀 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd ofs-backend
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
```
MONGO_URI=mongodb+srv://<seu-usuario>:<sua-senha>@<seu-cluster>.mongodb.net/<seu-banco>?retryWrites=true&w=majority
PORT=3000
```

### 4. Inicie o Servidor
```bash
npm run dev
```

---

## 🛠️ Funcionalidades

### 1. Cadastro de Membro
- **Endpoint:** `POST /membros/cadastro`
- **Descrição:** Registra um novo membro com os dados fornecidos.
- **Campos:** `name`, `sexo`, `email`, `password`, `phone`, `logradouro`, `numero`, `bairro`, `cidade`, `estado`, `cep`, `tipo`, e upload de uma foto.

### 2. Listar Cadastros
- **Endpoint:** `GET /membros`
- **Descrição:** Lista todos os cadastros. Pode filtrar pelo status (`pendente`, `aprovado`).
- **Exemplo:** `GET /membros?status=pendente`.

### 3. Aprovar Cadastro
- **Endpoint:** `PUT /membros/aprovar/:id`
- **Descrição:** Altera o status de um membro para `aprovado`.

### 4. Atualizar Dados de Membro
- **Endpoint:** `PUT /membros/:id`
- **Descrição:** Atualiza os dados de um membro com base no ID.

---

## 🔐 Autenticação do Administrador

Algumas rotas exigem autenticação de administrador, implementada via middleware.

### Credenciais do Administrador
- **Email:** `admin@ofs.com`
- **Senha:** `123456`

### Como Usar no Postman
Adicione os seguintes cabeçalhos (Headers) nas requisições protegidas:
```
email: admin@ofs.com
senha: 123456
```

---

## 🧪 Testando as Rotas

### 1. Cadastro de Membro
- **Método:** `POST`
- **URL:** `http://localhost:3000/membros/cadastro`
- **Body (form-data):**
  - Campos: `name`, `sexo`, `email`, `password`, `phone`, `logradouro`, `numero`, `bairro`, `cidade`, `estado`, `cep`, `tipo`, e `foto`.

### 2. Listar Cadastros Pendentes
- **Método:** `GET`
- **URL:** `http://localhost:3000/membros?status=pendente`
- **Headers:**  
  - `email`: `admin@ofs.com`  
  - `senha`: `123456`

### 3. Aprovar um Cadastro
- **Método:** `PUT`
- **URL:** `http://localhost:3000/membros/aprovar/:id`
- **Headers:**  
  - `email`: `admin@ofs.com`  
  - `senha`: `123456`

---

## 🛡️ Segurança
1. **Senhas:** Armazenadas de forma segura com hashing (bcrypt).
2. **Acesso Restrito:** Rotas protegidas por middleware que valida credenciais do administrador.

---

## 🤝 Contribuição

1. Faça um fork do projeto.
2. Crie uma branch com sua feature: `git checkout -b minha-feature`.
3. Realize os commits: `git commit -m 'Adiciona nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.

---

## 📝 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para utilizá-lo e modificá-lo conforme necessário.
