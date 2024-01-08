import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";

type IReferralTemplateProps = {
  logoString: string;
  expeditionDate: string;
  EmptySignString: string;
  DaphneSignString: string;
  DianaSignString: string;
  footerLogoString: string;
  accountStatement: IGetAccountStatementPaginated & { municipality: string };
};

export const referralTemplate = (props: IReferralTemplateProps) =>
  `
    <div class="ReferralDocument">
        <div class="ReferralDocument__container">
            <div class="ReferralDocument__container__logo">
                <img src="data:image/png;base64,${props.logoString}" alt="" />
            </div>
            <div class="mt-normal flex-between">
                <span>Medellín, ${props.expeditionDate}</span>
                <span>130-10-01</span>
            </div>
            <div class="ReferralDocument__container__receptorInfo">
                <span>Doctor (a)</span>
                <strong>
                    <span>${props.accountStatement.contract.sender}</span>
                </strong>
                <strong>
                    <span>${props.accountStatement.contract.chargeSender}</span>
                </strong>
                <span>${props.accountStatement.contract.business.name}</span>
                <span>${props.accountStatement.contract.business.address}</span>
                <span>Teléfono: ${props.accountStatement.contract.business.phone}</span>
                <span>${props.accountStatement.municipality}</span>
            </div>
            <div class="mt-small">
                <strong>
                    <p>ASUNTO: ${props.accountStatement.concept}</p>
                </strong>
            </div>
            <div class="ReferralDocument__container__body mt-small">
                <span>Respetado (a) Señor(a) :</span>
                <p class="mt-normal">
                    Adjuntamos Cuenta de Cobro N° ${props.accountStatement.accountNum} para el asunto en mención, de
                    acuerdo a información recibida de Convenio N° 404 de 2022, firmado
                    entre las partes.
                </p>
                <span class="mt-normal">Gracias por su acostumbrada atención.</span>
            </div>
            <div class="ReferralDocument__container__sign mt-normal">
                <span>Cordialmente,</span>
                <div>
                <img src="data:image/png;base64,${props.EmptySignString}" alt="" />
                </div>
                <strong>
                    <span>Daphne Morales Soto</span>
                </strong>
                <span class="mt-xs">Profesional Universitaria-Contadora</span>
            </div>
            <div>
                <table class="borderTableLeft mt-large">
                    <tbody>
                        <tr>
                            <td>Proyectó:</td>
                            <td>Revisó: Daphne Morales Soto</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="ReferralDocument__container__representativesTable__col">
                                    <span>Contratista de apoyo Financiero</span>
                                    <div>
                                    <img src="data:image/png;base64,${props.EmptySignString}" alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="ReferralDocument__container__representativesTable__col">
                                    <span>Profesional Universitaria-Contadora</span>
                                    <div>
                                        <img src="data:image/png;base64,${props.DaphneSignString}" alt="" />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="ReferralDocument__container__footer mt-normal">
                <div>
                    <img src="data:image/png;base64,${props.footerLogoString}" alt="" />
                </div>
            </div>
        </div>
    </div>
  `;
