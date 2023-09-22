import Application from "@ioc:Adonis/Core/Application";
import { numberToColombianPesosWord } from "@isildur1/number-to-word";
import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";
import { dateFormatted, formaterNumberToCurrency } from "App/Utils/helpers";
import { readFileSync } from "fs";

export const accountStatementMobileTemplate = (
  accountStatement: IGetAccountStatementPaginated & { municipality: string }
) => {
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
            .mt-xs {
                margin-top: 0.5rem;
            }
            .mt-small {
                margin-top: 1.5rem;
            }
            .mt-normal {
                margin-top:  2rem;
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
            .AccountStatement {
                margin-top: 20rem;
            }
            .AccountStatement__container__header {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .AccountStatement__container__logo {
                width: 188px;
            }
            .AccountStatement__container__logo > img {
                width: 100%;
            }
            .AccountStatement__container__body {
                display: flex;
                flex-direction: column;
                row-gap: 1.5rem;
            }
            .AccountStatement__container__body > div {
                display: grid;
                grid-template-columns: 180px 280px;
            }
            .AccountStatement__container__footer {
                width: 240px;
            }
            .AccountStatement__container__footer > img {
                width: 100%;
            }
            .AccountStatement__container__footerInfo {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
        </style>
        <body>
            <div class="ReferralDocument">
                <div class="ReferralDocument__container">
                    <div class="ReferralDocument__container__logo">
                        <img src="data:image/png;base64,${readFileSync(
                          logoPath
                        ).toString("base64")}" alt="" />
                    </div>
                    <div class="ReferralDocument__container__date">
                        <span>Medellín, ${dateFormatted(
                          accountStatement.expeditionDate,
                          "LL"
                        )}</span>
                        </div>
                    <div class="ReferralDocument__container__receptorInfo">
                        <span>Doctor (a)</span>
                        <strong>
                            <span>${accountStatement.contract.business.sender.toLocaleUpperCase()}</span>
                        </strong>
                        <strong>
                            <span>${
                              accountStatement.contract.business.chargeSender
                            }</span>
                        </strong>
                        <span>${accountStatement.contract.business.name.toLocaleUpperCase()}</span>
                        <span>${
                          accountStatement.contract.business.address
                        }</span>
                        <span>Teléfono: ${
                          accountStatement.contract.business.phone
                        }</span>
                        <span>${accountStatement.municipality}</span>
                    </div>
                    <div class="ReferralDocument__container__issue">
                        <strong>
                            <p>ASUNTO: ${accountStatement.concept}</p>
                        </strong>
                    </div>
                    <div class="ReferralDocument__container__body">
                        <span>Respetado (a) Señor (a):</span>
                        <p class="mt-small">
                            Adjuntamos Cuenta de Cobro No ${
                              accountStatement.accountNum
                            } para el asunto en mención, de
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
            <div class="AccountStatement">
                <div class="AccountStatement__container">
                    <div class="AccountStatement__container__header">
                        <div class="AccountStatement__container__logo">
                            <img src="data:image/png;base64,${readFileSync(
                              logoPath
                            ).toString("base64")}" alt="" />
                        </div>
                        <div class="mt-small">
                            <strong>
                                <span class="font-size-17">CUENTA DE COBRO</span>
                            </strong>
                        </div>
                    </div>
                    <div class="AccountStatement__container__body mt-normal">
                        <div>
                            <strong>
                                <span>Cuenta de cobro</span>
                            </strong>
                            <span>${accountStatement.accountNum}</span>
                        </div>
                        <div>
                            <strong>
                                <span>Fecha de expedición</span>
                            </strong>
                            <span>${dateFormatted(
                              accountStatement.expeditionDate,
                              "DD/MM/YYYY"
                            )}</span>
                        </div>
                        <div>
                            <strong>
                                <span>
                                Páguese hasta
                                </span>
                            </strong>
                            <span>29/08/2023</span>
                        </div>
                        <div>
                            <strong>
                                <span>Páguese hasta</span>
                            </strong>
                            <span>${dateFormatted(
                              accountStatement.expirationDate,
                              "DD/MM/YYYY"
                            )}</span>
                        </div>
                        <div>
                            <strong>
                                <span>Razón social</span>
                            </strong>
                            <span>${accountStatement.contract.business.name.toLocaleUpperCase()}</span>
                        </div>
                        <div>
                            <strong>
                                <span>NIT:</span>
                            </strong>
                            <span>${
                              accountStatement.contract.business.nit
                            }</span>
                        </div>
                        <div>
                            <strong>
                                <span>Dirección:</span>
                            </strong>
                            <span>${
                              accountStatement.contract.business.address
                            }</span>
                        </div>
                        <div>
                            <strong>
                                <span>Ciudad:</span>
                            </strong>
                            <span>${accountStatement.municipality}</span>
                        </div>
                        <div>
                            <strong>
                                <span>Teléfono:</span>
                            </strong>
                            <span>${
                              accountStatement.contract.business.phone
                            }</span>
                        </div>
                        <div>
                            <strong>
                                <span>CONCEPTO DE COBRO</span>
                            </strong>
                             <p>${accountStatement.concept}</p>
                        </div>
                        <div>
                            <strong>
                                <span>VALOR</span>
                            </strong>
                            <span>${formaterNumberToCurrency(
                              accountStatement.valuePay
                            )}</span>
                        </div>
                        <div>
                            <strong>
                                <span>Valor en letras:</span>
                            </strong>
                            <span>
                            ${numberToColombianPesosWord(
                              accountStatement.valuePay
                            )}
                            </span> 
                        </div>
                    </div>
                    <div class="AccountStatement__container__footerInfo mt-normal">
                        <p>
                        Favor consignar estos recursos en la cuenta de ahorros DAVIVIENDA N° 0376 7015 1721, a nombre de Sapiencia, con NIT 900.602.106-0. Agradezco enviar soporte del pago al correo electrónico luis.valencia@sapiencia.gov.co
                        </p>
                        <div class="AccountStatement__container__footer mt-normal">
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
