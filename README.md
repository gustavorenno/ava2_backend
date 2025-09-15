# Sistema de Agendamento para Clínicas Médicas

Este projeto é um **sistema de agendamento de consultas médicas**, desenvolvido com foco em **simplicidade, eficiência e integração com serviços externos**, permitindo que clínicas gerenciem horários, pacientes e informações de forma segura e prática.

---

## Funcionalidades Principais

- **Cadastro e login de usuários** com autenticação JWT.  
- **Agendamento de consultas** com controle de horários.  
- **Painel administrativo** para visualizar, editar e gerenciar agendamentos.  
- **Integração com APIs externas**:  
  - **ViaCEP** para preenchimento automático de endereços.  
  - **OpenWeatherMap** para exibir a previsão do clima no dia da consulta.  

---

## Tecnologias Utilizadas

- **Backend:** Node.js, Express  
- **Banco de Dados:** MongoDB  
- **Autenticação:** JWT (JSON Web Tokens)  
- **Frontend:** Vue.js  
- **APIs Externas:** ViaCEP, OpenWeatherMap  

---

## Estrutura do Projeto

### Backend
- `routes/` → Definição das rotas da API  
- `controllers/` → Lógica para login, cadastro e agendamento  
- `middlewares/` → Autenticação JWT e proteção de rotas  

### Frontend
- Formulários reativos para login, cadastro e agendamento  
- Painel administrativo com lista de agendamentos  
- Consumo dos endpoints da API e exibição clara dos dados  

---

## Como Usar

1. **Cadastre-se** ou faça login  
2. **Agende consultas**, visualize informações e acompanhe a previsão do clima no dia da consulta  

---

## Observações

- Todas as rotas e endpoints estão documentados dentro do projeto.  
