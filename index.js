const Swal = require("sweetalert2");

function validateEmailName(mail, name) {
  // Define our regular expression.
  var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

  // Using test we can check if the text match the pattern
  if (validEmail.test(mail)) {
    if (name.length > 4) {
      return true;
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre no tiene mas de 4 letras, por favor ingrese un nombre válido.",
      });
      return false;
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El email no tiene un formato valido, ejemplo a seguir: miemail@gmail.com",
    });
    return false;
  }
}

async function sendMsj(name, email, fecha, servicio, valorDesde, msj) {
  const fetchApi = fetch(
    "https://backend-actividad-2-ihc-production.up.railway.app/mail",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        mode: "no-cors",
      },

      body: JSON.stringify({
        name,
        email,
        fecha,
        servicio,
        valorDesde,
        msj,
      }),
    }
  );

  try {
    const res = await fetchApi;
    const result = await res.json();
    Swal.fire("OK", "El mensaje se envio correctamente.", "success");

    if (result) {
      Swal.fire("OK", "El mensaje se envio correctamente.", "success");

      //alert("El mensaje se envio correctamente.");
    }
  } catch (e) {
    console.log(e.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "El mensaje no se envio correctamente, espere unos segundo y pruebe nuevamente",
    });
    /*
    alert(
      "El mensaje no se envio correctamente, espere unos segundo y pruebe nuevamente"
    );*/
  }
}

function main() {
  const form = document.querySelector(".contenedor-form__form");
  const buttonForm = document.querySelector(".button-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.nombre.value;
    const email = e.target.email.value;
    const fecha = e.target.fecha.value;
    const servicio = e.target.servicio.value;
    const msj = e.target.msj.value;

    let valorDesde;

    if (servicio == "Desarrollo Web") {
      valorDesde = "Desde $50000,00";
    } else {
      if (servicio == "Desarrollo Mobile") {
        valorDesde = "Desde $120000,00";
      } else {
        valorDesde = "Desde $100000,00";
      }
    }

    if (validateEmailName(email, name)) {
      await sendMsj(name, email, fecha, servicio, valorDesde, msj);
      form.reset();
    }
  });
}

main();
