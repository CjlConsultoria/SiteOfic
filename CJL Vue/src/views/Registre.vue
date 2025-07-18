<template lang="pug">
section.registro-multi
  .imagem-container
    img(
      src="@/assets/logocjl.png"
      alt="Imagem de registro"
      loading="lazy"
    )

  .form-container
    small.etapa-titulo(v-if="etapaAtual === 1") Insira seu nome
    small.etapa-titulo(v-else-if="etapaAtual === 2") Insira sua data de nascimento
    small.etapa-titulo(v-else-if="etapaAtual === 3") Insira seu endereço
    small.etapa-titulo(v-else-if="etapaAtual === 4") Crie uma senha forte com uma combinação de letras, números e símbolos

    form(@submit.prevent="proximaEtapa")

      // Etapa 1
      template(v-if="etapaAtual === 1")
        .input-group
          input(
            type="text",
            v-model="form.nome",
            :class="{ 'input-erro': erros.nome }",
            placeholder=" ",
            id="nome"
          )
          label(for="nome") Nome próprio

        .input-group
          input(
            type="text"
            v-model="form.sobrenome"
            :class="{ 'input-erro': erros.nome }"
            placeholder=" "
            id="sobrenome"
          )
          label(for="sobrenome") Apelido (opcional)

        span.mensagem-erro(v-if="erros.nome") Introduza o nome próprio.

        section.botoes
          button(type="submit") Seguinte

      // Etapa 2
      template(v-if="etapaAtual === 2")
        section.data-nascimento
          section.data-nascimento-selects
            section.input-group
              select(
                v-model="form.dia"
                :class="{ 'input-erro': erros.diaInvalido }"
                id="dia"
              )
                option(value="") Dia
                option(v-for="d in dias" :key="d" :value="d") {{ d }}

            section.input-group
              select(
                v-model="form.mes"
                :class="{ 'input-erro': erros.mesInvalido }"
                id="mes"
              )
                option(value="") Mês
                option(v-for="(m, index) in meses" :key="index" :value="index + 1") {{ m }}

            section.input-group
              select(
                v-model="form.ano"
                :class="{ 'input-erro': erros.anoInvalido }"
                id="ano"
              )
                option(value="") Ano
                option(v-for="a in anos" :key="a" :value="a") {{ a }}

          span.mensagem-erro-etapa2(v-if="erros.nascimentoIncompleto") Introduza uma data de nascimento completa.

          section.input-group.genero
            select(
              v-model="form.genero"
              :class="{ 'input-erro': erros.generoInvalido }"
              id="genero"
            )
              option(value="") Gênero
              option(value="Feminino") Feminino
              option(value="Masculino") Masculino
              option(value="Outro") Outro

          section
            span.mensagem-erro-etapa2(v-if="erros.generoInvalido") Selecione o seu gênero.
            span.mensagem-erro-etapa2(v-if="erros.idadeInvalida") É necessário ter pelo menos 18 anos para se registrar.

          section.botoes
            button(type="submit") Seguinte

      // Etapa 3
      template(v-if="etapaAtual === 3")
        section.endereco
          .input-group
            input(
              type="text"
              v-model="form.cep"
              :class="{ 'input-erro-etapa3': erros.cepInvalido }"
              id="cep"
              placeholder=" "
              @blur="buscarEndereco"
              maxlength="9"
            )
            label(for="cep") CEP

          .input-group
            input(
              type="text"
              v-model="form.rua"
              :class="{ 'input-erro-etapa3': erros.ruaInvalida }"
              id="rua"
              placeholder=" "
            )
            label(for="rua") Rua

          .input-group
            input(
              type="text"
              v-model="form.numero"
              :class="{ 'input-erro-etapa3': erros.numeroInvalido }"
              id="numero"
              placeholder=" "
            )
            label(for="numero") Número

          .input-group
            input(
              type="text"
              v-model="form.bairro"
              :class="{ 'input-erro-etapa3': erros.bairroInvalido }"
              id="bairro"
              placeholder=" "
            )
            label(for="bairro") Bairro

          .input-group
            input(
              type="text"
              v-model="form.cidade"
              :class="{ 'input-erro-etapa3': erros.cidadeInvalida }"
              id="cidade"
              placeholder=" "
            )
            label(for="cidade") Cidade

          .input-group
            input(
              type="text"
              v-model="form.estado"
              :class="{ 'input-erro-etapa3': erros.estadoInvalido }"
              id="estado"
              placeholder=" "
              maxlength="2"
            )
            label(for="estado") Estado

          span.mensagem-erro-etapa3(v-if="erros.enderecoIncompleto") Preencha todos os campos do endereço corretamente.

          section.botoes
            button(type="submit") Seguinte

      // Etapa 4
      template(v-if="etapaAtual === 4")
        section.credenciais
          .input-group
            input(
              type="email"
              v-model="form.email"
              :class="{ 'input-erro-etapa4': erros.emailInvalido || erros.emailVazio }"
              id="email"
              placeholder=" "
            )
            label(for="email") Email

          span.mensagem-erro-etapa4(v-if="erros.emailVazio") O email é obrigatório.
          span.mensagem-erro-etapa4(v-if="erros.emailInvalido") Por favor, insira um email válido.

          .input-group
            input(
              :type="mostrarSenha ? 'text' : 'password'"
              v-model="form.senha"
              :class="{ 'input-erro-etapa4': erros.senhaInvalida || erros.senhaVazia }"
              id="senha"
              placeholder=" "
            )
            label(for="senha") Senha

          span.mensagem-erro-etapa4(v-if="erros.senhaVazia") A senha é obrigatória.
          span.mensagem-erro-etapa4(v-if="erros.senhaInvalida") A senha deve conter pelo menos uma letra maiúscula e um número.

          .input-group
            input(
              :type="mostrarSenha ? 'text' : 'password'"
              v-model="form.confirmaSenha"
              :class="{ 'input-erro-etapa4': erros.senhasDiferentes || erros.confirmaSenhaVazia }"
              id="confirmaSenha"
              placeholder=" "
            )
            label(for="confirmaSenha") Confirmar Senha

          span.mensagem-erro-etapa4(v-if="erros.confirmaSenhaVazia") Por favor, confirme a senha.
          span.mensagem-erro-etapa4(v-if="erros.senhasDiferentes") As senhas não coincidem.

          .input-group
            input(
              type="checkbox"
              id="mostrarSenha"
              v-model="mostrarSenha"
            )
            label(for="mostrarSenha") Mostrar senha

          section.botoes
            button(type="submit") Finalizar
</template>

<script setup>

import { reactive, ref } from 'vue'
import { register } from '@/services/authServices'
import router from '@/router'

const enviarCadastro = async () => {
  try {
    const dadosParaEnviar = {
      nome: form.nome.trim() + (form.sobrenome.trim() ? ' ' + form.sobrenome.trim() : ''),
      diaNascimento: Number(form.dia),
      mesNascimento: Number(form.mes),
      anoNascimento: Number(form.ano),
      genero: form.genero,
      cep: form.cep.replace(/\D/g, ''),
      numeroResidencia: form.numero,
      email: form.email.trim(),
      senha: form.senha
    };

  const response = await fetch('http://localhost:8080/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(dadosParaEnviar),
});


    const contentType = response.headers.get('content-type');

    let data;
    if (contentType && contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch {
        data = { message: 'Resposta JSON inválida' };
      }
    } else {
      const text = await response.text();
      if (text.trim().length === 0) {
        data = { message: 'Resposta vazia do servidor' };
      } else {
        data = { message: text };
      }
    }

    if (!response.ok) {
      alert('Erro ao cadastrar: ' + (data.message || 'Erro desconhecido'));
      return;
    }

    router.push('/login');

  } catch (error) {
    alert('Erro inesperado: ' + error.message);
  }
};

// Estado da etapa atual do formulário
const etapaAtual = ref(1)

// Dados para selects de data de nascimento
const dias = Array.from({ length: 31 }, (_, i) => i + 1)
const meses = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril',
  'Maio', 'Junho', 'Julho', 'Agosto',
  'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]
const anos = []
for (let a = 2025; a >= 1900; a--) anos.push(a)

// Formulário reativo
const form = reactive({
  nome: '',
  sobrenome: '',
  dia: '',
  mes: '',
  ano: '',
  genero: '',
  cep: '',
  rua: '',
  numero: '',
  bairro: '',
  cidade: '',
  estado: '',
  email: '',
  senha: '',
  confirmaSenha: ''
})

// Estado reativo dos erros de validação
const erros = reactive({
  nome: false,
  sobrenome: false,
  diaInvalido: false,
  mesInvalido: false,
  anoInvalido: false,
  nascimentoIncompleto: false,
  generoInvalido: false,
  idadeInvalida: false,
  cepInvalido: false,
  ruaInvalida: false,
  numeroInvalido: false,
  bairroInvalido: false,
  cidadeInvalida: false,
  estadoInvalido: false,
  enderecoIncompleto: false,
  emailVazio: false,
  emailInvalido: false,
  senhaVazia: false,
  senhaInvalida: false,
  confirmaSenhaVazia: false,
  senhasDiferentes: false
})

// Mostrar ou ocultar senha
const mostrarSenha = ref(false)

// ===== VALIDAÇÃO DAS ETAPAS =====

const validarEtapa1 = () => {
  erros.nome = form.nome.trim() === ''
  erros.sobrenome = false
  return !erros.nome
}

const validarEtapa2 = () => {
  const dia = +form.dia
  const mes = +form.mes
  const ano = +form.ano

  erros.diaInvalido = !(dia >= 1 && dia <= 31)
  erros.mesInvalido = !(mes >= 1 && mes <= 12)
  erros.anoInvalido = !(ano >= 1900 && ano <= 2025)
  erros.nascimentoIncompleto = erros.diaInvalido || erros.mesInvalido || erros.anoInvalido

  erros.idadeInvalida = false
  if (!erros.nascimentoIncompleto) {
    erros.idadeInvalida = !temMaisDe18Anos(dia, mes, ano)
  }

  erros.generoInvalido = form.genero === ''

  return !(
    erros.nascimentoIncompleto ||
    erros.idadeInvalida ||
    erros.generoInvalido
  )
}

function temMaisDe18Anos(dia, mes, ano) {
  const hoje = new Date()
  let idade = hoje.getFullYear() - ano
  if (
    hoje.getMonth() + 1 < mes ||
    (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)
  ) {
    idade--
  }
  return idade >= 18
}

const validarEtapa3 = () => {
  erros.cepInvalido = !form.cep.match(/^\d{5}-?\d{3}$/)
  erros.ruaInvalida = form.rua.trim() === ''
  erros.numeroInvalido = form.numero.trim() === ''
  erros.bairroInvalido = form.bairro.trim() === ''
  erros.cidadeInvalida = form.cidade.trim() === ''
  erros.estadoInvalido = !form.estado.match(/^[A-Za-z]{2}$/)

  erros.enderecoIncompleto =
    erros.cepInvalido ||
    erros.ruaInvalida ||
    erros.numeroInvalido ||
    erros.bairroInvalido ||
    erros.cidadeInvalida ||
    erros.estadoInvalido

  return !erros.enderecoIncompleto
}

const validarEtapa4 = () => {
  erros.emailVazio = form.email.trim() === ''
  erros.emailInvalido = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

  erros.senhaVazia = form.senha.trim() === ''
  erros.senhaInvalida = !/(?=.*[A-Z])(?=.*\d)/.test(form.senha)

  erros.confirmaSenhaVazia = form.confirmaSenha.trim() === ''
  erros.senhasDiferentes = form.senha !== form.confirmaSenha

  return !(
    erros.emailVazio ||
    erros.emailInvalido ||
    erros.senhaVazia ||
    erros.senhaInvalida ||
    erros.confirmaSenhaVazia ||
    erros.senhasDiferentes
  )
}

// ===== FUNÇÃO CORRIGIDA PARA BUSCAR ENDEREÇO PELO CEP =====

const buscarEndereco = async () => {
  const cepLimpo = form.cep.replace(/\D/g, '') // remove tudo que não for número
  const cepValido = /^\d{8}$/.test(cepLimpo)
  erros.cepInvalido = !cepValido

  if (!cepValido) {
    form.rua = ''
    form.bairro = ''
    form.cidade = ''
    form.estado = ''
    return
  }

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
    const dados = await resposta.json()

    if (dados.erro) {
      erros.cepInvalido = true
      form.rua = ''
      form.bairro = ''
      form.cidade = ''
      form.estado = ''
    } else {
      erros.cepInvalido = false
      form.rua = dados.logradouro || ''
      form.bairro = dados.bairro || ''
      form.cidade = dados.localidade || ''
      form.estado = dados.uf || ''
    }
  } catch (error) {
    erros.cepInvalido = true
    form.rua = ''
    form.bairro = ''
    form.cidade = ''
    form.estado = ''
    console.error('Erro ao buscar CEP:', error)
  }
}
// ===== FUNÇÃO PARA AVANÇAR ETAPAS =====

const proximaEtapa = () => {
  if (etapaAtual.value === 1) {
    if (validarEtapa1()) etapaAtual.value++
  } else if (etapaAtual.value === 2) {
    if (validarEtapa2()) etapaAtual.value++
  } else if (etapaAtual.value === 3) {
    if (validarEtapa3()) etapaAtual.value++
  } else if (etapaAtual.value === 4) {
    if (validarEtapa4()) {
      enviarCadastro()
      alert('Cadastro concluído com sucesso!')
      // Aqui você pode adicionar envio real dos dados
    }
  }
}
</script>

<style scoped>
body, * {
  font-family: 'SuaFonteEscolhida', sans-serif !important;
}

/* Espaçamento extra somente nas mensagens de erro da Etapa 2 */
.mensagem-erro-etapa2 + .mensagem-erro-etapa2 {
  margin-top: 8px;
}
.mensagens-erros-etapa2 {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: -32px;
  margin-bottom: 16px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 6px; /* espaçamento pequeno entre checkbox e texto */
  margin-top: -12px; /* se quiser tirar o espaço, ajuste aqui */
}

.input-group input[type="checkbox"] {
  width: 12px;
  height: 12px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: 2px solid white;
  border-radius: 2px;
  background-color: transparent;
  position: relative;
  appearance: none;
  -webkit-appearance: none;
}

.input-group input[type="checkbox"]:checked {
  background-color: #ffffff;
  border-color: #ffffff;
}

.input-group input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 0;      /* Ajuste vertical */
  left: 2px;     /* Ajuste horizontal */
  width: 4px;
  height: 7px;
  border: solid black;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  transform-origin: center;
}


.input-group label[for="mostrarSenha"] {
  color: white;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  margin-left: 5px;
  margin-top: -2px;
}


/* ===== AJUSTES ESPECÍFICOS DA ETAPA 3 ===== */
.endereco {
  display: flex;
  flex-direction: column;
  gap:14px; /* reduz o espaçamento entre os campos */
  margin-bottom: 8px;
}

.endereco .input-group {
  margin-bottom: 8px; /* diminui o espaço entre os inputs */
}

.endereco .botoes {
  margin-top: 12px; /* sobe o botão */
}

.etapa-titulo {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 16px;
  display: block;
  text-align: left;
}

.input-erro-etapa4 {
  border-color: #d93025 !important;
  box-shadow: none !important;
}

.mensagem-erro-etapa4 {
  font-size: 12px;
  color: #d93025;
  font-family: Roboto, Arial, sans-serif;
  user-select: text;
  display: block;
  margin-top: 0;

  transform: translateY(-25px); /* sobe 12px visualmente */
}


.mensagem-erro-etapa4::before {
  content: '!';
  background-color: #d93025;
  color: white;
  border-radius: 50%;
  font-weight: 700;
  width: 15px;
  height: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  line-height: 18px;
  margin-right: 6px;
  vertical-align: middle;

}


.mensagem-erro-etapa3 {
  font-size: 12px;
  color: #d93025;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Roboto, Arial, sans-serif;
  user-select: text;
  margin-top: -10px;

}

.mensagem-erro-etapa3::before {
  content: '!';
  background-color: #d93025;
  color: white;
  border-radius: 50%;
  font-weight: 700;
  width: 15px;
  height: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  line-height: 18px;
  margin-top: -5px;
}
.input-group input.input-erro-etapa3 {
  border: 2px solid #d93025 !important;
  box-shadow: none !important;
  outline: none !important;
  background-color: transparent !important; /* impede qualquer preenchimento branco */
}
/* ---------- REGISTRO CONTAINER ---------- */
.registro-multi {
  max-width: 900px;
  margin: 6rem auto 2rem;
  padding: 48px;
  background-color: #222222;
  border-radius: 16px;
  box-shadow: 0 0 24px rgb(0 0 0 / 0.2);
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  color: #202124;
  user-select: none;
  height: auto;
  position: relative;
  margin-top: 100px;
  display: flex;
  gap: 40px;
  align-items: center;
  max-height: 600px;
}

/* ---------- IMAGEM ---------- */
.imagem-container {
  flex: 1;
}
.imagem-container img {
  width: 110%;
  height: auto;
  border-radius: 12px;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  margin-top: -10px;
  margin-left: -20px;
}

/* ---------- FORMULÁRIO ---------- */
.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

h1 {
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 32px;
  letter-spacing: 0.3px;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px 12px;
}

/* ---------- INPUT FLOATING LABEL ---------- */
.input-group {
  position: relative;
  margin-bottom: 32px;
}

.input-group input {
  width: 100%;
  padding: 24px 12px 8px;
  font-size: 16px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  outline-offset: -2px;
  background-color: transparent;
  color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.input-group input:focus {
  border-color: #ffffff;
}

.input-group input.input-erro:focus {
  outline: none !important;
  box-shadow: none !important;
  border-color: #d93025 !important;
}

.input-group label {
  position: absolute;
  top: 16px;
  left: 12px;
  font-size: 14px;
  color: #6b6b6b;
  pointer-events: none;

  padding: 0 6px;
  transition: 0.2s ease all;
}

.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  box-shadow: -6px 0 0 #222222, 6px 0 0 #222222;
}
.input-group input:focus + label,
.input-group input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  background-color: #222222;  /* COR do fundo da tela */
  padding: 0 6px;             /* espaço lateral para o fundo não cortar o texto */
}
/* ---------- ERRO INPUT ETAPA 1 ---------- */
.mensagem-erro {
  font-size: 12px;
  color: #d93025;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Roboto, Arial, sans-serif;
  user-select: text;
  margin-top: -50px;
}

.mensagem-erro-etapa2 {
  min-height: 20px; /* ajuste conforme altura real das mensagens */
  display: block;
}
.mensagem-erro::before {
  content: '!';
  background-color: #d93025;
  color: white;
  border-radius: 50%;
  font-weight: 700;
  width: 15px;
  height: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  line-height: 18px;
  margin-top: -5px;
}

/* ---------- ERRO INPUT ETAPA 2 ---------- */
.mensagem-erro-etapa2 {
  font-size: 12px;
  color: #d93025;
  display: block;
  margin-top: 8px;
  font-family: Roboto, Arial, sans-serif;
  text-align: left;
  user-select: text;
  margin-top: -40px;
}
.mensagem-erro-etapa2::before {
  content: '!';
  background-color: #d93025;
  color: white;
  border-radius: 50%;
  font-weight: 700;
  width: 15px;
  height: 15px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  line-height: 18px;
  margin-right: 6px; /* espaçamento do ícone para o texto */
  vertical-align: middle;
}
/* ---------- SELECTS ETAPA 2 ---------- */
.data-nascimento {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.data-nascimento-selects {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.data-nascimento-selects .input-group {
  flex: 1 1 30%;
  min-width: 100px;
}

/* SELECT PADRÃO */
.input-group select {
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #dadce0;
  border-radius: 6px;
  background-color: transparent !important;
  color: #ffffff !important; /* letras pretas quando não focado */
  appearance: none;
  box-sizing: border-box;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  background-image:
    linear-gradient(45deg, transparent 50%, #5f6368 50%),
    linear-gradient(135deg, #5f6368 50%, transparent 50%);
  background-position:
    calc(100% - 20px) 50%,
    calc(100% - 15px) 50%;
  background-size: 5px 5px;
  background-repeat: no-repeat;
  cursor: pointer;
  outline-offset: -2px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background-color 0.15s ease-in-out, color 0.15s ease-in-out;
}

/* Quando o select estiver focado */

.input-group select:focus {
  outline: none;
  background-color: #ffffff !important;
  color: #000000 !important;
  border-color: #000000;

}

.input-group select {
  color: transparent; /* esconde o texto visível */
  text-shadow: 0 0 0 black; /* faz o texto parecer preto dentro do select */
}



/* ---------- LABELS ESPECÍFICOS ---------- */
section.data-nascimento .input-group label {
  display: none;
}
form .input-group label {
  display: block;
}

/* ---------- CAMPO DE GÊNERO ---------- */
.genero select {
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border: 1px solid #dadce0;
  border-radius: 6px;
  background-color: white;
  color: #202124;
  appearance: none;
}

/* ---------- TEXTO INFORMATIVO ---------- */
.texto-explicativo {
  font-size: 14px;
  color: #1a73e8;
  font-family: Roboto, Arial, sans-serif;
  margin-top: -4px;
  cursor: pointer;
}

/* ---------- BOTÃO SUBMIT ---------- */
section.botoes {
  display: flex;
  justify-content: flex-end; /* Alinha à direita */
  margin-top: 16px;
}

section.botoes button[type="submit"] {
  background-color: #fffda2;
  border-radius: 14px;
  color: rgb(0, 0, 0);
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  padding: 10px 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 1px 1px rgb(0 0 0 / 0.1);
  transition: background-color 0.15s ease-in-out;
  user-select: none;
}

section.botoes button[type="submit"]:hover {
  background-color: #ffffff;
}


/* ---------- BORDAS VERMELHAS EM INPUTS COM ERRO ---------- */
.input-group input.input-erro {
  border-color: #d93025 !important;
  box-shadow: none !important;
}

/* ---------- BORDAS VERMELHAS EM SELECTS COM ERRO ---------- */
.input-group select.input-erro {
  border-color: #d93025 !important;
  box-shadow: none !important;
}

/* ---------- Seta vermelha nos selects com erro ---------- */
.input-group select.input-erro {
  background-image:
    linear-gradient(45deg, transparent 50%, #d93025 50%),
    linear-gradient(135deg, #d93025 50%, transparent 50%);
}

/* ---------- AUTOFILL ---------- */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: #ffffff !important;
  box-shadow: 0 0 0 1000px #222222 inset !important;
  caret-color: white;
}

/* ---------- RESPONSIVO ---------- */
@media (max-width: 768px) {
  .registro-multi {
    flex-direction: column;
    padding: 32px 24px;
    max-width: 100%;
    height: auto;
  }

  .imagem-container {
    display: none;
  }

  .data-nascimento-selects .input-group {
    flex: 1 1 100%;
  }
}
</style>
