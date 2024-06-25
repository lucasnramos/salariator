import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  calculeFgts,
  calculeInss,
  calculeIrrf,
  calculeSalarioBase,
} from "~/server/util/clt";

export const calculoMensalRouter = createTRPCRouter({
  getMock: publicProcedure.query(() => ({
    salarioBruto: 9_797.26,
    salarioLiquido: 6_941.43,
    aliquotaReal: (6_941.43 / 9_797.26 - 1) * 100,
  })),

  calculaMensalClt: publicProcedure
    .input(
      z.object({
        salarioBrutoMensal: z.number(),
        numDependentes: z.number(),
        outrosDescontos: z.number(),
        outrosProventos: z.number(),
      }),
    )
    .query(({ input }) => {
      const {
        salarioBrutoMensal,
        numDependentes,
        outrosDescontos,
        outrosProventos,
      } = input;
      const inss = calculeInss(salarioBrutoMensal);
      const salarioBase = calculeSalarioBase({
        salarioBrutoMensal,
        inss,
        numDependentes,
      });
      const irrf = calculeIrrf(salarioBase);
      const fgts = calculeFgts(salarioBrutoMensal);
      const salarioLiquido =
        salarioBrutoMensal - inss - irrf + outrosProventos - outrosDescontos;
      const porcentagemInss = inss / salarioBrutoMensal;
      const porcentagemIrrf = irrf / salarioBrutoMensal;

      return {
        salarioBrutoMensal,
        fgts,
        inss,
        irrf,
        salarioLiquido,
        porcentagemInss,
        porcentagemIrrf,
      };
    }),
});
