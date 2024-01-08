type IMasterTemplate = {
  title: string;
  referralTemplateString: string;
  accountStatementTemplateString: string;
};

export const masterTemplate = (props: IMasterTemplate) =>
  `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>${props.title}</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap"
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
            table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
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
            .txt-center {
                text-align: center;
            }
            .txt-left {
                text-align: left;
            }
            .px-1 {
                padding-left: 8px;
                padding-right: 8px;
            }
            .px-2 {
                padding-left: 16px;
                padding-right: 16px;
            }
            .py-1 {
                padding-top: 8px;
                padding-bottom: 8px;
            }
            .py-2 {
                padding-top: 16px;
                padding-bottom: 16px;
            }
            .mt-2 {
                margin-top: 16px;
            }
            .mt-xs {
                margin-top: 0.5rem;
            }
            .mt-small {
                margin-top: 1.5rem;
            }
            .mt-normal {
                margin-top: 2.5rem;
            }
            .mt-large {
                margin-top: 4rem;
            }
            .flex-between {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .borderTable td {
                border: 2px solid #000;
                text-align: center;
            }
            .borderTableLeft td {
                border: 2px solid #000;
                text-align: left;
            }
            .house-border {
                border-top: 2px solid #000;
                border-left: 2px solid #000;
                border-right: 2px solid #000;
            }
            .dig-border {
                border-bottom: 2px solid #000;
                border-left: 2px solid #000;
                border-right: 2px solid #000;
            }
            .full-border {
                border: 2px solid #000;
            }
            .ReferralDocument__container__logo {
                width: 200px;
            }
            .ReferralDocument__container__logo > img {
                width: 100%;
                margin-left: 16px;
            }
            .ReferralDocument__container__receptorInfo {
                display: flex;
                flex-direction: column;
                margin-top: 2rem;
            }
            .ReferralDocument__container__body {
                display: flex;
                flex-direction: column;
            }
            .ReferralDocument__container__sign {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }
            .ReferralDocument__container__sign > div {
                width: 140px;
                border-bottom: 1px solid black;
                margin-bottom: 8px;
            }
            .ReferralDocument__container__sign > div > img {
                margin-top: 12px;
                width: 100%;
            }
            .ReferralDocument__container__representativesTable__col {
                display: flex;
                flex-direction: column;
                padding: 2px 16px 8px 2px;
            }
            .ReferralDocument__container__representativesTable__col > div {
                width: 80px;
                height: 40px;
                align-self: flex-end;
            }
            .ReferralDocument__container__representativesTable__col > div > img {
                width: 100%;
                height: 100%;
            }
            .ReferralDocument__container__footer {
                display: flex;
                justify-content: flex-end;
            }
            .ReferralDocument__container__footer > div {
                width: 300px;
            }
            .ReferralDocument__container__footer > div > img {
                width: 100%;
            }
            .AccountStatement {
                margin-top: 0rem;
            }
            .AccountStatement__container__logo {
                width: 200px;
            }
            .AccountStatement__container__logo > img {
                width: 100%;
            }
            .AccountStatement__container__headerTable {
                width: 100%;
            }
            .AccountStatement__container__footer {
                display: flex;
                justify-content: flex-end;
            }
            .AccountStatement__container__footer > div {
                width: 300px;
            }
            .AccountStatement__container__footer > div > img {
                width: 100%;
            }
        </style>
        <body>
            ${props.referralTemplateString}
            ${props.accountStatementTemplateString}
        </body>
    </html>
  `;
