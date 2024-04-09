import { Address } from "@/features/customers/types";
import axios from "axios";

export const getAddressByZipCode = async (
  cep: string
): Promise<Omit<Address, "number">> => {
  const cepOnlyNumbers = cep.replace(/\D/g, "");

  if (cepOnlyNumbers.length !== 8) {
    return {} as Omit<Address, "number">;
  }

  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

  return {
    street: response.data.logradouro,
    complement: response.data.complemento,
    neighborhood: response.data.bairro,
    city: response.data.localidade,
    state: response.data.uf,
    zipcode: response.data.cep,
  };
};
