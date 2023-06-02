const SibApiV3Sdk = require('sib-api-v3-sdk');
const axios = require('axios');

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = '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';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function getPolicyData(policyNumber, environment) {
  try {
    const url = `https://apidevunit.azurewebsites.net/api/Cotizador/ObtenerPoliza?numeroPoliza=${policyNumber}&environment=${environment}`;
    const response = await axios.get(url);

    const policyData = response.data;
    const nameClient = policyData.ClienteNombres;

    // Llama a la función para enviar el correo electrónico, pasando los datos obtenidos
    sendEmail(nameClient);
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error al obtener la información de la póliza:', error.response.data);
    } else {
      console.error('Error al obtener la información de la póliza:', error);
    }
  }
}

async function sendEmail(nameClient) {
  try {

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = `Bienvenido(a) Unit`;
    sendSmtpEmail.sender = { "name": "UNIT, S.A", "email": "no-responder@unit.com.do" };
    sendSmtpEmail.to = [{ "email": "bryanbg.jg@gmail.com", "name": nameClient }];
    sendSmtpEmail.cc = [{ "email": "afeliz@unit.com.do", "name": "Ariel" }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "Bievenida", "subject": "Informaciones de tu poliza" };

    // Establece el ID del template de Brevo
    sendSmtpEmail.templateId = 1; 

    // Envía el correo electrónico utilizando la API de Brevo
    const responseBrevo = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Llamada a la API de Brevo exitosa. Datos devueltos:', responseBrevo);
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}


getPolicyData('F-EH-0000000275', 'Calidad');

