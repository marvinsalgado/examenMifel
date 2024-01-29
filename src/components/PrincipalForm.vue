<template>
  <div class="card">
    <form @submit.prevent="handleNuevoSubmit" class="formulario-nuevo">
      <h2>Registro</h2>
      <div class="grid">
        <div class="col-4">
          <div class="flex flex-column gap-2">
            <label for="nombre" class="p-d-block">Nombre*</label>
            <InputText id="nombre" v-model="nombre" :class="{ 'p-invalid': !isNombreValid }" required @input="validateNombre" />
            <Message v-if="!isNombreValid" severity="error">Ingrese un nombre válido (Solo letras)</Message>
          </div>
        </div>
        <div class="col-4">
          <div class="flex flex-column gap-2">
            <label for="primer-apellido">Primer Apellido*</label>
            <InputText id="primer-apellido" v-model="primerApellido" :class="{ 'p-invalid': !isPrimerApellidoValid }" required @input="validatePrimerApellido" />
            <Message v-if="!isPrimerApellidoValid" severity="error">Ingrese primer apellido válido (Solo letras)</Message>
          </div>
        </div>
        <div class="col-4">
          <div class="flex flex-column gap-2">
            <label for="segundo-apellido">Segundo Apellido</label>
            <InputText id="segundo-apellido" v-model="segundoApellido" @input="validateSegundoApellido"/>
            <Message v-if="!isSegundoApellidoValid" severity="error">Ingrese segundo apellido válido (Solo letras)</Message>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-6">
          <div class="flex flex-column gap-2">
            <label for="curp">CURP*</label>
            <InputText id="curp" v-model="curp" :class="{ 'p-invalid': !isCurpValid }" required @input="validateCurp" />
            <Message v-if="!isCurpValid" severity="error">Ingrese un CURP válido</Message>
          </div>
        </div>
        <div class="col-6">
          <div class="flex flex-column gap-2">
            <label for="rfc">RFC (con homoclave)*</label>
            <InputText id="rfc" v-model="rfc" :class="{ 'p-invalid': !isRfcValid }" required @input="validateRfc" />
            <Message v-if="!isRfcValid" severity="error">Ingrese un RFC válido</Message>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-4">
          <div class="flex flex-column gap-2">
            <label for="codigo-postal">Código postal*</label>
            <InputText id="codigo-postal" v-model="codigoPostal" :min="0" :max="99999" :class="{ 'p-invalid': !isCodigoPostalValid }" required @input="validateCodigoPostal" />
            <Message v-if="!isCodigoPostalValid" severity="error">Ingrese un código postal válido de 5 digitos</Message>
          </div>
        </div>
        <div class="col-8">
          <div class="flex flex-column gap-2">
            <label for="calle">Calle*</label>
            <InputText id="calle" v-model="calle" :class="{ 'p-invalid': !isCalleValid}" required @input="validateCalle"  />
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-4">
          <div class="flex flex-column gap-2">
            <label for="numero-exterior">Número exterior*</label>
            <InputText id="numero-exterior" v-model="numeroExterior" :min="1" :max="99999" :class="{ 'p-invalid': !isNumeroExteriorValid }" required @input="validateNumeroExterior" />
            <Message v-if="!isNumeroExteriorValid" severity="error">Ingrese un número exterior válido</Message>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-column gap-2">
            <label for="numero-interior">Número interior</label>
            <InputText id="numero-interior" v-model="numeroInterior" :maxlength="10" @input="validateNumeroInterior"/>
            <Message v-if="!isNumeroInteriorValid" severity="error">Ingrese un número interior válido</Message>
          </div>
        </div>
        <div class="col-5">
          <div class="flex flex-column gap-2">
            <label for="estado">Estado*</label>
            <InputText id="estado" v-model="estado" :class="{ 'p-invalid': !isEstadoValid }" required @input="validateEstado" />
            <Message v-if="!isEstadoValid" severity="error">Ingrese un estado válido (Solo letras)</Message>
          </div>
        </div>
      </div>
      <div class="grid">
        <div class="col-6">
          <div class="flex flex-column gap-2">
            <label for="municipio">Delegación/Municipio*</label>
            <InputText id="municipio" v-model="municipio" :class="{ 'p-invalid': !isMunicipioValid }" required @input="validateMunicipio" />
            <Message v-if="!isMunicipioValid" severity="error">Ingrese un municipio válido (Solo letras)</Message>
          </div>
        </div>
        <div class="col-6">
          <div class="flex flex-column gap-2">
            <label for="colonia">Colonia*</label>
            <InputText id="colonia" v-model="colonia" :class="{ 'p-invalid': !isColoniaValid }" required @input="validateColonia" />
            <Message v-if="!isColoniaValid" severity="error">Ingrese una colonia válida (Solo letras)</Message>
          </div>
        </div>
      </div>
      <Button type="submit" label="Enviar" :disabled="isAnyFieldInvalid"/>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import Button from "primevue/button";
import Message  from 'primevue/message';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import Swal from 'sweetalert2';
import axios from "../axios.js";

// Nuevas referencias y variables para validación
const isNombreValid = ref(true);
const isPrimerApellidoValid = ref(true);
const isSegundoApellidoValid = ref(true);
const isCurpValid = ref(true);
const isRfcValid = ref(true);
const isCalleValid = ref(true);
const isCodigoPostalValid = ref(true);
const isNumeroExteriorValid = ref(true);
const isNumeroInteriorValid = ref(true);
const isEstadoValid = ref(true);
const isMunicipioValid = ref(true);
const isColoniaValid = ref(true);

// Variables del nuevo formulario
const nombre = ref('');
const primerApellido = ref('');
const segundoApellido = ref('');
const curp = ref('');
const rfc = ref('');

const codigoPostal = ref(null);
const calle = ref('');
const numeroExterior = ref(null);
const numeroInterior = ref('');
const estado = ref('');
const municipio = ref('');
const colonia = ref('');


const validateNombre = () => {
  isNombreValid.value = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(nombre.value);
};

const validatePrimerApellido = () => {
  isPrimerApellidoValid.value = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(primerApellido.value);
};

const validateSegundoApellido = () => {
  isSegundoApellidoValid.value = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(segundoApellido.value);
};

const validateCalle = () => {
  // isCalleValid.value = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9][0-9]$/i.test(calle.value);
};

const validateCurp = () => {
  isCurpValid.value = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9][0-9]$/i.test(curp.value);
};

const validateRfc = () => {
  const rfcFormatoHomoclave = /^[A-Z&Ññ]{4}\d{6}[A-Z0-9]{3}$/i;
  isRfcValid.value =  rfcFormatoHomoclave.test(rfc.value);
};

const validateCodigoPostal = () => {
  isCodigoPostalValid.value = /^\d{5}$/.test(codigoPostal.value);
};

const validateNumeroExterior = () => {
  isNumeroExteriorValid.value = /^\d{1,5}$/.test(numeroExterior.value);
};

const validateNumeroInterior = () => {
  isNumeroInteriorValid.value = /^[a-zA-Z0-9]{0,10}$/.test(numeroInterior.value);
};

const validateEstado = () => {
  isEstadoValid.value = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(estado.value);
};

const validateMunicipio = () => {
  isMunicipioValid.value = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(municipio.value);
};

const validateColonia = () => {
  isColoniaValid.value = /^[A-Za-záéíóúüñÁÉÍÓÚÜÑ\s]+$/.test(colonia.value);
};

const isAnyFieldInvalid = computed(() => {
  return (
      !isNombreValid.value ||
      !isPrimerApellidoValid.value ||
      !isSegundoApellidoValid.value ||
      !isCurpValid.value ||
      !isRfcValid.value ||
      !isCodigoPostalValid.value ||
      !isNumeroExteriorValid.value ||
      !isNumeroInteriorValid.value ||
      !isEstadoValid.value ||
      !isMunicipioValid.value ||
      !isColoniaValid.value
  );
});

const resetForm = () => {
  nombre.value = '';
  primerApellido.value = ''
  segundoApellido.value = '';
  curp.value = '';
  rfc.value = '';
  codigoPostal.value = null;
  calle.value = '';
  numeroExterior.value = null;
  numeroInterior.value = '';
  estado.value = '';
  municipio.value = '';
  colonia.value = '';
};


const handleNuevoSubmit = () => {
  if (!isAnyFieldInvalid.value) {
    const formData = {
      infoUsuario: {
        Nombre: nombre.value,
        PrimerApellido: primerApellido.value,
        SegundoApellido: segundoApellido.value,
        Curp: curp.value,
        Rfc: rfc.value,
      },
      Domicilio: {
        CodigoPostal: codigoPostal.value,
        Calle: calle.value,
        NumeroExterior: numeroExterior.value,
        NumeroInterior: numeroInterior.value,
        Estado: estado.value,
        Municipio: municipio.value,
        Colonia: colonia.value,
      },
    };
    throw Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Campos validados correctamente.',
    }).then((result) => {
      resetForm();
      if (result.isConfirmed) {
        axios.post('http://httpbin.org/post', formData)
            .then(response => {
              console.log(response.data);
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Se guardo correctamente.',
              });
              resetForm();
            })
            .catch(error => {
              // Manejar errores en la solicitud POST
              console.error('Error al enviar el formulario:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al enviar el formulario. Por favor, inténtalo de nuevo.',
              });
            });
      }
    })

  }
};
</script>
