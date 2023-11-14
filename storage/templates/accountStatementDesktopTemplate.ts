import Application from "@ioc:Adonis/Core/Application";
import { numberToColombianPesosWord } from "@isildur1/number-to-word";
import { IGetAccountStatementPaginated } from "App/Interfaces/AccountStatement";
import { dateFormatted, formaterNumberToCurrency } from "App/Utils/helpers";
import { readFileSync } from "fs";
import { accountStatementTemplate } from "./accountStatementTemplate";
import { masterTemplate } from "./masterTemplate";
import { referralTemplate } from "./referralTemplate";

export const accountStatementDesktopTemplate = (
  accountStatement: IGetAccountStatementPaginated & { municipality: string }
) => {
  const basePath = "/storage/templates/assets";
  const logoPath = Application.makePath(basePath, "logo.png");
  const footerPath = Application.makePath(basePath, "footer.png");
  const DapnheSignImgName = "DaphneMoralesSotoSign.png";
  const DianaSignImgName = "DaphneMoralesSotoSign.png";
  const DapnheSignPath = Application.makePath(basePath, DapnheSignImgName);
  const DianaSignPath = Application.makePath(basePath, DianaSignImgName);
  const logoString = readFileSync(logoPath).toString("base64");
  const footerLogoString = readFileSync(footerPath).toString("base64");
  const referralTemplateString = referralTemplate({
    logoString,
    expeditionDate: dateFormatted(accountStatement.expeditionDate, "LL"),
    DaphneSignString: readFileSync(DapnheSignPath).toString("base64"),
    DianaSignString: readFileSync(DianaSignPath).toString("base64"),
    footerLogoString,
    accountStatement,
  });
  const accountStatementTemplateString = accountStatementTemplate({
    logoString,
    expeditionDate: dateFormatted(accountStatement.expeditionDate, "DD/MM/YY"),
    expirationDate: dateFormatted(accountStatement.expirationDate, "DD/MM/YY"),
    valuePay: formaterNumberToCurrency(accountStatement.valuePay),
    valuePayWord: numberToColombianPesosWord(accountStatement.valuePay),
    footerLogoString,
    accountStatement,
  });
  return masterTemplate({
    title: "DOCUMENTO DE COBRO",
    referralTemplateString,
    accountStatementTemplateString,
  });
};
