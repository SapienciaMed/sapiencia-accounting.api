import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";

type IAccountStatementTemplateProps = {
  logoString: string;
  expeditionDate: string;
  expirationDate: string;
  valuePay: string;
  valuePayWord: string;
  footerLogoString: string;
  accountStatement: IGetAccountStatementPaginated & { municipality: string };
};

export const accountStatementTemplate = (
  props: IAccountStatementTemplateProps
) =>
  `
    <div class="AccountStatement">
        <div class="AccountStatement__container">
            <div class="AccountStatement__container__logo">
                <img src="data:image/png;base64,${props.logoString}" alt="" />
            </div>
            <div class="mt-normal">
                <table cellpadding="0" cellspacing="0" class="AccountStatement__container__headerTable">
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <table class="borderTable">
                                <tr>
                                    <td>NÚMERO</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>${props.accountStatement.accountNum}</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <strong>DOCUMENTO DE COBRO</strong>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <table class="borderTable">
                                <tr>
                                    <td>
                                        <strong>FECHA EXPEDICIÓN</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Formato (dd/mm/aa)</td>
                                </tr>
                                <tr>
                                    <td>${props.expeditionDate}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Razón social:</strong>
                        </td>
                        <td>
                            <strong>${props.accountStatement.contract.business.name}</strong>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <table class="house-border">
                                <tr class="txt-center">
                                    <td class="py-1 txt-center">
                                        <strong>PÁGUESE HASTA</strong>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <strong>NIT:</strong>
                        </td>
                        <td>
                            <strong>${props.accountStatement.contract.business.name}</strong>
                        </td>
                        <td>
                            <table class="full-border">
                                <tr class="txt-center">
                                    <td>Formato (dd/mm/aa)</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>Dirección</td>
                        <td>${props.accountStatement.contract.business.address}</td>
                        <td>
                            <table class="dig-border">
                                <tr class="txt-center">
                                    <td>${props.expirationDate}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td>Ciudad</td>
                        <td>${props.accountStatement.municipality}</td>
                        <td></td>
                    </tr>

                    <tr>
                        <td>Teléfono</td>
                        <td>${props.accountStatement.contract.business.phone}</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            <table class="borderTable mt-normal">
                <tr>
                    <td>
                        <strong>CONCEPTO DE COBRO</strong>
                    </td>
                    <td>
                        <strong>VALOR</strong>
                    </td>
                </tr>
                <tr>
                    <td class="py-1" style="width: 70%">
                        <p class="font-size-15">${props.accountStatement.concept}</p>
                    </td>
                    <td>
                        <div class="px-1" style="display: flex; justify-content: space-between">
                            <strong>
                                <span>$</span>
                            </strong>
                            <strong>
                                <span>${props.valuePay}</span>
                            </strong>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="borderTable mt-2">
                <tr>
                    <td class="py-2">
                        <p class="txt-left">
                            VALOR EN LETRAS: ${props.valuePayWord}
                        </p>
                    </td>
                </tr>
            </table>
            <div class="mt-small">
                <p class="txt-left" style="line-height: 20px">
                    <strong>
                        Favor consignar estos recursos en la cuenta de ahorros DAVIVIENDA
                        N° 0376 7015 1721, a nombre de Sapiencia, con NIT 900.602.106-0.
                        <br />
                        Agradezco enviar soporte del pago al correo electrónico
                        marcela.suarez@sapiencia.gov.co
                    </strong>
                </p>
            </div>
            <div class="AccountStatement__container__footer mt-large">
                <div>
                    <img src="data:image/png;base64,${props.footerLogoString}" alt="" />
                </div>
            </div>
        </div>
    </div>
  `;
