# 📱 Meu App de Tarefas em React Native

Um app de gerenciamento de tarefas feito em **React Native** com o **Expo**, usando navegação com `react-navigation` e ícones do `Ionicons`. Permite criar, editar e gerenciar tarefas em diferentes estados: Para Fazer, Em Andamento e Finalizadas.

---

## 🚀 Funcionalidades

* ✅ Adicionar novas tarefas
* ✅ Visualizar tarefas a fazer
* ✅ Ver tarefas em andamento
* ✅ Ver tarefas finalizadas
* ✅ Editar uma tarefa existente
* ✅ Navegação fluida entre abas

---

## 🧱 Tecnologias e Bibliotecas

* **React Native** (0.74.5)
* **Expo** (\~51.0.28)
* **React Navigation** (Stack e Bottom Tabs)
* **Ionicons** para ícones
* **Native Base** para componentes visuais
* **Formik** e **Yup** para formulários e validação
* **Zustand** para gerenciamento de estado
* **Axios** para chamadas HTTP
* **UUID** e **NanoID** para gerar identificadores únicos

---

## 📂 Estrutura de Pastas

```bash
.
├── App.js
├── components/
│   ├── TarefasPraFazer.js
│   ├── TarefasEmAndamento.js
│   ├── TarefasFinalizadas.js
│   ├── AdicionarTarefa.js
│   └── EditarTarefa.js
├── package.json
└── README.md
```

---

## ▶️ Como Rodar o Projeto

1️⃣ Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio
```

2️⃣ Instale as dependências:

```bash
npm install
# ou
yarn install
```

3️⃣ Inicie o projeto:

```bash
npm start
# ou
yarn start
```

4️⃣ Abra o app:

* Use o Expo Go no celular para escanear o QR code.
* Ou rode no emulador:

```bash
npm run android
# ou
npm run ios
```

---

## ✍️ Navegação

A navegação principal usa:

* **BottomTabNavigator** para alternar entre as listas de tarefas (Nova Tarefa, Para Fazer, Em Andamento, Finalizadas).
* **StackNavigator** para editar tarefas.

A navegação está personalizada com ícones e cores vibrantes para melhorar a experiência do usuário.

---

## 🎨 Temas e Estilo

* Cor principal: **rosa (#FF69B4)**
* Interface alegre e moderna
* Ícones e cabeçalhos seguem o esquema de cores

---

## 📌 Próximos Passos

* ✅ Melhorar a responsividade das telas
* ✅ Adicionar animações de carregamento
* 🔲 Implementar autenticação de usuário
* 🔲 Integrar com um backend para salvar as tarefas em nuvem

---

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Se quiser que eu adicione mais detalhes, como instruções de build para produção ou um resumo das telas, me avise! 🚀✨
