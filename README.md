# Todo Learning

### Como usar o app

### 1. Criar conta

1. Na página inicial, clique em **Login** no canto superior direito.
2. Na tela de login, clique em **Criar conta**.
3. Preencha nome, e-mail e senha e clique em **Cadastrar**.
4. Após o cadastro, você será redirecionado para o login.

### 2. Entrar

1. Informe e-mail e senha e clique em **Entrar**.
2. Com login válido, o nome do usuário aparece na barra superior e o botão **Adicionar** fica disponível.

### 3. Criar tarefas

1. Clique em **Adicionar**.
2. No modal, preencha:
   - **Título** (obrigatório, até 12 caracteres)
   - **Matéria** (obrigatório, até 10 caracteres)
   - **Descrição** (opcional, até 100 caracteres)
   - **Dificuldade**: Fácil, Médio ou Difícil
3. Clique em **Criar** ou **Cancelar** para fechar sem salvar.

### 4. Gerenciar tarefas

Na grade de cards você pode:

- **Marcar como concluída**: use o checkbox no card (o contador de “Temas pendentes” é atualizado).
- **Excluir**: ícone da lixeira no canto do card.
- **Navegar entre páginas**: use **Anterior** e **Próxima** abaixo da lista (até 9 tarefas por página).

### 5. Sair

Clique no ícone de sair ao lado de **Adicionar** para encerrar a sessão (o token é removido do navegador).

## Rotas

| Caminho      | Função                          |
|--------------|---------------------------------|
| `/`          | Lista de tarefas e dashboard    |
| `/login`     | Autenticação                    |
| `/register`  | Cadastro de usuário             |

## Estrutura do projeto

```
src/
├── App.tsx              # Rotas e página principal
├── components/          # UI (Card, Nav, TaskForm, Pagination, etc.)
├── hooks/               # useTasks, useAuth
├── lib/                 # API, auth, tasks, paginação
└── routes/              # Login e Register
```

## API esperada

O front-end consome:

| Método | Endpoint              | Uso                    |
|--------|-----------------------|------------------------|
| POST   | `/api/auth/register`  | Cadastro               |
| POST   | `/api/auth/login`     | Login (retorna JWT)    |
| GET    | `/api/tasks`          | Listar (query: `page`, `limit`, `completed`) |
| POST   | `/api/tasks`          | Criar tarefa           |
| PUT    | `/api/tasks/:id`      | Atualizar (ex.: `completed`) |
| DELETE | `/api/tasks/:id`      | Remover tarefa         |
                    |

## Licença

Projeto de aprendizado — uso livre para estudo.
