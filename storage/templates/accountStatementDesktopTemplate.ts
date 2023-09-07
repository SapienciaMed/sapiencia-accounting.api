import Application from "@ioc:Adonis/Core/Application";
import { readFileSync } from "fs";
export const accountStatementDesktopTemplate = () => {
  const basePath = "/storage/templates/assets";
  const logoPath = Application.makePath(basePath, "logo.png");
  const footerPath = Application.makePath(basePath, "footer.png");
  return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Account Statement Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
            rel="stylesheet"
        />
        </head>
        <style>
        body {
            margin: 0;
            font-size: 14px;
            font-family: "Rubik", sans-serif;
        }
        p {
            margin: 0;
            padding: 0;
        }
        .font-size-14 {
            font-size: 14px;
        }
        .font-size-15 {
            font-size: 15px;
        }
        .font-size-16 {
            font-size: 16px;
        }
        .font-size-17 {
            font-size: 17px;
        }
        .px-2 {
            padding: 0 16px;
        }
        .py-1 {
            padding: 8px 0;
        }
        .mt-xs {
            margin-top: 0.5rem;
        }
        .mt-small {
            margin-top: 1.5rem;
        }
        .AccountStatement__container {
            margin-left: 34px;
        }
        .AccountStatement__container__header {
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 2rem;
            min-height: 81px;
        }
        .AccountStatement__container__logo {
            width: 190px;
            position: absolute;
            left: 0;
        }
        .AccountStatement__container__logo > img {
            width: 100%;
        }
        .AccountStatement__container__title {
            font-size: 20px;
        }
        .AccountStatement__container__headerTable {
            display: grid;
            grid-template-columns: 90px;
            grid-template-columns: 1fr 1fr 1fr;
        }
        .AccountStatement__container__headerTable__col {
            display: flex;
            flex-direction: column;
        }
        .AccountStatement__container__headerTable__col > div:first-child {
            height: 45px;
            font-size: 14px;
            background-color: #f0ecec;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .AccountStatement__container__headerTable__col > div:nth-child(2) {
            height: 45px;
            border: 1px solid #d9d9d9;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 17px;
        }
        .AccountStatement__container__headerInfo > div {
            display: grid;
            grid-template-columns: 120px minmax(auto, 350px);
        }
        .AccountStatement__container__bodyTable {
            display: grid;
            grid-template-columns: 2.5fr 1fr;
        }
        .AccountStatement__container__bodyTable__col > div:first-child {
            height: 37px;
            background-color: #f0ecec;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .AccountStatement__container__bodyTable__col > div:nth-child(2) {
            border: 1px solid #d9d9d9;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 111px;
        }
        .AccountStatement__container__bodyInfo {
            background-color: #f0ecec;
            display: grid;
            grid-template-columns: 1fr 3fr;
        }
        .AccountStatement__container__bodyInfo > div {
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .AccountStatement__container__bodyInfo > div:nth-child(2) {
            min-height: 51px;
        }
        .AccountStatement__container__bodyFooter {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        .AccountStatement__container__footer {
            display: flex;
            justify-content: center;
        }
        .AccountStatement__container__footer > div {
            width: 240px;
        }
        .AccountStatement__container__footer > div > img {
            width: 100%;
        }
        </style>
        <body>
        <div class="AccountStatement">
            <div class="AccountStatement__container">
            <div class="AccountStatement__container__header">
                <div class="AccountStatement__container__logo">
                    <img src="data:image/png;base64,${readFileSync(
                      logoPath
                    ).toString("base64")}" alt="" />
                </div>
                <div class="AccountStatement__container__title">
                <strong>
                    <span>CUENTA DE COBRO</span>
                </strong>
                </div>
            </div>
            <div class="AccountStatement__container__headerTable">
                <div class="AccountStatement__container__headerTable__col">
                <div>
                    <strong>
                    <span>Cuenta de cobro</span>
                    </strong>
                </div>
                <div>
                    <span>2422023</span>
                </div>
                </div>
                <div class="AccountStatement__container__headerTable__col">
                <div>
                    <strong>
                    <span>Fecha de expedición</span>
                    </strong>
                </div>
                <div>
                    <span>28/07/2023</span>
                </div>
                </div>
                <div class="AccountStatement__container__headerTable__col">
                <div>
                    <strong>
                    <span>Páguese hasta</span>
                    </strong>
                </div>
                <div>
                    <span>29/08/2023</span>
                </div>
                </div>
            </div>
            <div class="AccountStatement__container__headerInfo mt-small">
                <div class="font-size-16 mt-xs">
                    <strong>
                        <span> Razón social: </span>
                    </strong>
                    <strong>
                        <span>
                        DISTRITO ESPECIAL DE CIENCIA, TECNOLOGÍA E INNOVACIÓN DE
                        MEDELLÍN
                        </span>
                    </strong>
                </div>
                <div class="font-size-15 mt-xs">
                    <strong>
                        <span> NIT: </span>
                    </strong>
                    <span>890905211-1</span>
                </div>
                <div class="font-size-15 mt-xs">
                    <strong>
                        <span> Dirección: </span>
                    </strong>
                    <span>Calle 44 No. 52 - 165 CAM</span>
                </div>
                <div class="font-size-15 mt-xs">
                    <strong>
                        <span> Ciudad: </span>
                    </strong>
                    <span>Medellín</span>
                </div>
                <div class="font-size-15 mt-xs">
                    <strong>
                        <span> Teléfono: </span>
                    </strong>
                    <span>385 55 55</span>
                </div>
            </div>
            <div class="AccountStatement__container__bodyTable mt-small">
                <div class="AccountStatement__container__bodyTable__col">
                <div>
                    <strong>
                    <span class="font-size-15"> CONCEPTO DE COBRO </span>
                    </strong>
                </div>
                <div>
                    <p class="font-size-15 px-2 py-1">
                    Transferencias para los proyectos de funcionamiento de la
                    Agencia Sapiencia, correspondiente al mes de MAYO de 2023.
                    </p>
                </div>
                </div>
                <div class="AccountStatement__container__bodyTable__col">
                <div>
                    <strong>
                    <span class="font-size-15">VALOR</span>
                    </strong>
                </div>
                <div>
                    <span class="font-size-17">$ 226.687.971,00</span>
                </div>
                </div>
            </div>
            <div class="AccountStatement__container__bodyInfo mt-xs">
                <div>
                <strong>
                    <span class="font-size-15">Valor en letras:</span>
                </strong>
                </div>
                <div>
                <p class="font-size-15">
                    Doscientos veinteseis millones seiscientos ochenta y siete mil
                    novecientos setenta y un pesos m/l.
                </p>
                </div>
            </div>
            <div class="AccountStatement__container__bodyFooter mt-small">
                <p>
                Favor consignar estos recursos en la cuenta de ahorros
                <br />
                DAVIVIENDA N° 0376 7015 1721, a nombre de Sapiencia, con NIT
                900.602.106-0.
                <br />
                Agradezco enviar soporte del pago al correo electrónico
                <br />
                luis.valencia@sapiencia.gov.co
                </p>
            </div>
            <div class="AccountStatement__container__footer mt-small">
                <div>
                    <img src="data:image/png;base64,${readFileSync(
                      footerPath
                    ).toString("base64")}" alt="" />
                </div>
            </div>
            </div>
        </div>
        </body>
    </html>  
    `;
};
