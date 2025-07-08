<template lang="pug">
section.registro-multi
  .imagem-container
    img(
      src="@/assets/logocjl.png",
      alt="Logo CJL",
      loading="lazy"
    )

  .form-container
    small.etapa-titulo Faça login na sua conta

    form(@submit.prevent="logarUsuario")
      .input-group
        input(
          type="email",
          v-model="email",
          :class="{ 'input-erro': erroEmail }",
          placeholder=" ",
          id="email"
        )
        label(for="email") Email

      span.mensagem-erro(v-if="erroEmail") O email é obrigatório.

      .input-group
        input(
          :type="mostrarSenha ? 'text' : 'password'",
          v-model="senha",
          :class="{ 'input-erro': erroSenha }",
          placeholder=" ",
          id="senha"
        )
        label(for="senha") Senha

      span.mensagem-erro(v-if="erroSenha") A senha é obrigatória.

      .input-group
        input(type="checkbox", id="mostrarSenha", v-model="mostrarSenha")
        label(for="mostrarSenha") Mostrar senha

      section.botoes
        button(type="submit") Entrar
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const senha = ref('')
const mostrarSenha = ref(false)

const erroEmail = ref(false)
const erroSenha = ref(false)

const logarUsuario = () => {
  erroEmail.value = email.value.trim() === ''
  erroSenha.value = senha.value.trim() === ''

  if (!erroEmail.value && !erroSenha.value) {
    alert('Login realizado com sucesso!')
    // Aqui você pode fazer o redirecionamento ou chamada à API
  }
}
</script>
<style>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0px 1000px #222222 inset !important;
  box-shadow: 0 0 0px 1000px #222222 inset !important;
  -webkit-text-fill-color: white !important;
  caret-color: white !important;
  transition: background-color 9999s ease-in-out 0s;
}
</style>

<style scoped>
/* IDÊNTICO AO REGISTRO */

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

.form-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}

.etapa-titulo {
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 2px;
  display: block;
  text-align: left;
}

form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px 12px;
}

.input-group {
  position: relative;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
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
  margin-bottom: 12px;
  margin-top: -17px;

 
}

.input-group input[type="checkbox"]:checked {
  background-color: #ffffff;
  border-color: #ffffff;
}

.input-group input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 0;
  left: 2px;
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
  margin-top: -20px;
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
  background-color: #222222;
  padding: 0 6px;
  box-shadow: -6px 0 0 #222222, 6px 0 0 #222222;
}

.mensagem-erro {
  font-size: 12px;
  color: #d93025;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: Roboto, Arial, sans-serif;
  user-select: text;
  margin-top: -30px;
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

section.botoes {
  display: flex;
  justify-content: flex-end;
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

.input-group input.input-erro {
  border-color: #d93025 !important;
  box-shadow: none !important;
}

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
}
</style>
