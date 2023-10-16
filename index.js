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

    console.log("este es el servicio", servicio);

    if (servicio == "Desarrollo Web") {
      valorDesde = "Desde $50000,00";
    } else {
      if (servicio == "Desarrollo Mobile") {
        valorDesde = "Desde $120000,00";
      } else {
        valorDesde = "Desde $100000,00";
      }
    }

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

      if (result) {
        alert("El mensaje se envio correctamente.");
      }
      form.reset();
    } catch (e) {
      console.log(e.message);
      alert(
        "El mensaje no se envio correctamente, espere unos segundo y pruebe nuevamente"
      );
      form.reset();
    }
  });
}

main();
