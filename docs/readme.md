# Alkord Core

## Estrutura

### Client
Pasta onde ficam as telas do projeto. São organizadas separadas por pasta e agrupadas sempre que possível.

### Providers

#### AuthorizationProvider
Serve para controlar o acesso à funções ou telas.
É atualmente responsável por controlar as permissões de usuário e licença.
**Observação:** nessa atual versão está fixa para sempre permitir.

#### MenuProvider
A classe serve para informar ao módulo de menu as configurações do projeto sobre o Menu lateral.
É atualmente responsável por adicionar itens no menu e botões na parte inferior do menu.

### Guias rápidos

#### Iniciando o projeto
- Verifique se o node está na versão 16+ com o comando "node -v" no terminal. A versão mais recente testada na data desta documentação é v18.12.1
- Utilize o comando "yarn" e, depois "yarn terceirizacao:start"

#### Criando uma nova tela
- Crie uma View e um Bloc simples seguindo o exemplo de outra tela implementada
- Na View, tenha certeza sempre de ter um ViewHandler (ex: useBaseViewHandler)
- Criar uma rota na classe **NameToken**, com um nome correspondente à tela e o componente apontando à View
- Caso a tela possua opção de acesso no menu, crie o menu na classe **MenuProvider**, no método "menuItems"
- Após os passos acima, a tela já deverá estar disponível para acesso, e pode ser continuado o desenvolvimento