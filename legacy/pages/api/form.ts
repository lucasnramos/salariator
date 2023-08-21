// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { clt, cnpj } from "../../server/calculation";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if ((req.method = "GET")) {
    res.status(400);
  }

  const cltCalculado = clt(req.body);
  const cnpjCalculado = cnpj(req.body);

  const response = {
    cltCalculado,
    cnpjCalculado,
  };

  res.status(200).json(response);
}
