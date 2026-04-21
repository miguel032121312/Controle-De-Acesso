🔐 Sistema de Controle de Acesso com Firebase (Admin x User)
📌 Descrição

Este projeto é uma aplicação web simples que utiliza o Firebase Authentication e o Firebase Realtime Database para implementar um sistema de controle de acesso baseado em cargos (roles).

Existem dois tipos de usuários:

👤 User (usuário comum)
🛠️ Admin (administrador)

Cada tipo de usuário possui permissões diferentes, controladas através das Firebase Security Rules.

🚀 Tecnologias utilizadas
HTML5
JavaScript (Vanilla JS)
Firebase Authentication
Firebase Realtime Database
🧠 Funcionalidades
✅ Cadastro de usuários com escolha de cargo (user/admin)
✅ Login com autenticação via Firebase
✅ Armazenamento de usuários no banco de dados
✅ Controle de acesso baseado em cargo
✅ Dashboard dinâmico com exibição de dados:
Dados públicos (todos usuários)
Dados administrativos (apenas admin)
📊 Estrutura do Banco de Dados

Estrutura em formato JSON:

{
  "users": {
    "uid": {
      "name": "Nome do usuário",
      "email": "email@email.com",
      "role": "user ou admin"
    }
  },
  "public-data": {
    "avisos": {
      "a1": {
        "mensagem": "Bem-vindo ao sistema"
      }
    }
  },
  "admin-data": {
    "relatorios": {
      "r1": {
        "titulo": "Relatório secreto",
        "conteudo": "Somente admin pode ver"
      }
    }
  }
}
🔐 Regras de Segurança (Security Rules)

As regras garantem que cada usuário acesse apenas o que tem permissão:

{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    },
    "admin-data": {
      ".read": "root.child('users').child(auth.uid).child('role').val() === 'admin'",
      ".write": "root.child('users').child(auth.uid).child('role').val() === 'admin'"
    },
    "public-data": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
🔑 Autenticação

O sistema utiliza Firebase Authentication (Email e Senha).

Durante o cadastro:

O usuário é criado no Authentication
Seus dados são salvos em /users
O campo role define o nível de acesso
🖥️ Interface

A aplicação possui:

Tela de cadastro
Tela de login
Dashboard com:
Informações do usuário
Dados públicos
Dados administrativos (se for admin)
⚙️ Como executar o projeto
1. Clonar o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
2. Configurar Firebase
Acesse o Firebase Console
Crie um projeto
Ative:
Authentication (Email/Senha)
Realtime Database
3. Configurar credenciais

No arquivo app.js, substitua:

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  databaseURL: "https://SEU_PROJETO.firebaseio.com",
  projectId: "SEU_PROJETO"
};
4. Rodar o projeto

Abra o arquivo:

index.html

🎯 Objetivo acadêmico

Este projeto foi desenvolvido com o objetivo de praticar:

Modelagem de banco NoSQL
Controle de acesso por usuário
Autenticação em aplicações web
Uso de regras de segurança no Firebase
👨‍💻 Autor

Desenvolvido por Miguel Vinicius

🏁 Status do Projeto

✅ Concluído
🚀 Pronto para entrega e avaliação