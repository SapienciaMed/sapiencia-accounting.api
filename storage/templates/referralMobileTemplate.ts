import Application from "@ioc:Adonis/Core/Application";
import { readFileSync } from "fs";
export const referralMobileTemplate = () => {
  const basePath = "/storage/templates/assets";
  const logoPath = Application.makePath(basePath, "logo.png");
  const footerPath = Application.makePath(basePath, "footer.png");
  const leftSignPath = Application.makePath(basePath, "leftSign.png");
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Referral Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
        rel="stylesheet"
        />
    </head>
    <style>
        body {
            font-size: 14px;
            font-family: "Rubik", sans-serif;
        }
        p {
            margin: 0;
            padding: 0;
        }
        .mt-small {
            margin-top: 1.5rem;
        }
        .ReferralDocument__container {
            margin-left: 34px;
        }
        .ReferralDocument__container__logo {
            display: flex;
            justify-content: center;
        }
        .ReferralDocument__container__logo > img {
            width: 220px;
        }
        .ReferralDocument__container__date {
            margin-top: 2rem;
        }
        .ReferralDocument__container__receptorInfo {
            display: flex;
            flex-direction: column;
            margin-top: 2rem;
        }
        .ReferralDocument__container__issue {
            margin-top: 1.5rem;
        }
        .ReferralDocument__container__body {
            display: flex;
            flex-direction: column;
            margin-top: 2.5rem;
        }
        .ReferralDocument__container__sign {
            display: flex;
            flex-direction: column;
            margin-top: 2.5rem;
        }
        .ReferralDocument__container__representativesTable {
            margin-top: 4rem;
            display: flex;
            flex-direction: column;
        }
        .ReferralDocument__container__representativesTable__col {
            display: flex;
            justify-content: space-between;
        }
        .ReferralDocument__container__representativesTable__col > div:first-child {
            padding: 1rem 0;
            display: flex;
            justify-content: center;
            font-size: 16px;
            letter-spacing: 1px;
        }
        .ReferralDocument__container__representativesTable__col__content {
            display: flex;
            flex-direction: column;
            text-align: right;
        }
        .ReferralDocument__container__representativesTable__col__content > div {
            display: flex;
            justify-content: center;
            margin-top: 1rem;
        }
        .ReferralDocument__container__representativesTable__col__content
        > div
        > img {
            width: 70px;
            height: 40px;
        }
        .ReferralDocument__container__footer {
            margin-top: 5rem;
        }
        .ReferralDocument__container__footer {
            display: flex;
            justify-content: center;
        }
        .ReferralDocument__container__footer > div {
            width: 240px;
        }
        .ReferralDocument__container__footer > div > img {
            width: 100%;
        }
    </style>
    <body>
        <div class="ReferralDocument">
        <div class="ReferralDocument__container">
            <div class="ReferralDocument__container__logo">
            <img src="data:image/png;base64,${readFileSync(logoPath).toString(
              "base64"
            )}" alt="" />
            </div>
            <div class="ReferralDocument__container__date">
            <span>Medellín, 28 de julio de 2023</span>
            </div>
            <div class="ReferralDocument__container__receptorInfo">
            <span>Doctor (a)</span>
            <strong>
                <span>JOSÉ LEONARDO MOLANO</span>
            </strong>
            <strong>
                <span>Representante Legal</span>
            </strong>
            <span>FUNDACIÓN UNIVERSITARIA DEL ÁREA ANDINA</span>
            <span>Calle 24 No 8 55</span>
            <span>Teléfono: 3855555</span>
            <span>Medellín</span>
            </div>
            <div class="ReferralDocument__container__issue">
            <strong>
                <p>
                ASUNTO: Reintegro rendimientos financieros, según Convenio No 724
                de 2021
                </p>
            </strong>
            </div>
            <div class="ReferralDocument__container__body">
            <span>Respetado (a) Señor (a):</span>
            <p class="mt-small">
                Adjuntamos Cuenta de Cobro No 222022 para el asunto en mención, de
                acuerdo a información recibida de Convenio No 724 de 2021, Firmado entre las
                partes.
            </p>
            <span class="mt-small">Gracias por su acostumbrada atención.</span>
            <span class="mt-small">Cordialmente,</span>
            </div>
            <div class="ReferralDocument__container__sign">
            <strong>
                <span>Daphne Morales Soto</span>
            </strong>
            <span>Profesional Universitaria-Contadora</span>
            </div>
            <div class="ReferralDocument__container__representativesTable">
            <div class="ReferralDocument__container__representativesTable__col">
                <div>
                    <strong>
                        <span>Proyectó</span>
                    </strong>
                </div>
                <div class="ReferralDocument__container__representativesTable__col__content">
                    <div>
                        <img src="data:image/png;base64,${readFileSync(
                          leftSignPath
                        ).toString("base64")}" alt="" />
                    </div>
                    <span>Luis Daniel Valencia Garces</span>
                    <span>Contratista de apoyo Financiero</span>
                </div>
            </div>
            <div class="ReferralDocument__container__representativesTable__col">
                <div>
                    <strong>
                        <span>Revisó</span>
                    </strong>
                </div>
                <div class="ReferralDocument__container__representativesTable__col__content">
                    <div>
                        <img />
                    </div>
                    <span>Daphne Morales Soto</span>
                    <span>Profesional Universitaria-Contadora</span>
                </div>
            </div>
            </div>
            <div class="ReferralDocument__container__footer">
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
