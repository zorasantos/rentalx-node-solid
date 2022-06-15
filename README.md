# CADASTRO DE CARRO

**RF**
  Deve ser possível cadastrar um novo carro.

**RN**
  Não deve ser possível cadastrar um carro com uma placa já existente.
  Não deve ser possível alterar a placa de um carro já cadastrado.
  O carro deve ser cadastrado, por padrão, com disponibilidade.
  O usuário responsável pelo cadastro deve ser um administrador.

# LISTAGEM DE CARROS

**RF**
  Deve ser possível listar todos os carro disponíveis.
  Deve ser possível listar todas os carro disponíveis pelo nome da categoria.
  Deve ser possível listar todas os carro disponíveis pelo nome do carro.

**RN**
  O usuário não precisa estar logado no sistema.

# CADASTRO DE ESPECIFICAÇÕES DO CARRO

**RF**
  Deve ser possível cadastrar uma especificação para um carro.

**RN**
  Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
  Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
  O usuário responsável pelo cadastro deve ser um administrador.

# CADASTRO DE IMAGENS DO CARRO

**RF**
  Deve ser possível cadastrar a imagem carro.
  Deve ser possível listar todos os carro.

**RNF**
  Utilizar o multer para upload dos arquivos

**RN**
  O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
  O usuário responsável pelo cadastro deve ser um administrador.

# ALUGUEL DE CARRO

**RF**
  Deve ser possível cadastrar um aluguel.

**RN**
  O aluguel deve ter duração mínima de 24hs.
  Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
  Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.


