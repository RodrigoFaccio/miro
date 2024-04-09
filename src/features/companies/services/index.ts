import { AccountFormValues } from "@/features/account/schemas/AccountFormSchema";
import { AuthenticatedHttp } from "@/features/common/http/axios";
import {
  PaginationRequest,
  PaginationResponse,
} from "@/features/common/types/pagination";
import { parsePaginationParams } from "@/features/common/utils/http";
import { CompanyCustomAcquirersFormValues } from "@/features/companies/schemas/CompanyCustomAcquirersFormSchema";
import { CompanyFeesFormValues } from "@/features/companies/schemas/CompanyFeesFormSchema";
import { CompanyPermissionsFormValues } from "@/features/companies/schemas/CompanyPermissionsFormSchema";
import { CompanyReserveFormValues } from "@/features/companies/schemas/CompanyReserveFormSchema";
import {
  Cnae,
  Company,
  CompanyFeeData,
  CompanyStatus,
  LegalNature,
  ReadCompanyData,
} from "@/features/companies/types";
import axios from "axios";

export const getCompanies = async (
  params: PaginationRequest,
): Promise<PaginationResponse<Company>> => {
  return AuthenticatedHttp.get("/gateway/companies/", {
    params: parsePaginationParams(params),
  }).then((response) => response.data);
};

export const getCompanyFees = async (
  companyId?: number,
): Promise<CompanyFeeData> => {
  return AuthenticatedHttp.get(companyId ? `/fee/${companyId}/` : "/fee/").then(
    (response) => response.data,
  );
};

export const updateCompanyFees = async (
  companyId: number | null,
  payload: CompanyFeesFormValues | CompanyReserveFormValues,
): Promise<void> => {
  return AuthenticatedHttp.patch(
    companyId ? `/fee/${companyId}/` : "/fee/",
    payload,
  );
};

export const getCompany = async (
  companyId: number,
): Promise<ReadCompanyData> => {
  return AuthenticatedHttp.get(`/gateway/${companyId}/`).then(
    (response) => response.data,
  );
};

export const updateCompanyStatus = async (
  companyId: number,
  status: CompanyStatus,
) => {
  return AuthenticatedHttp.patch(`/gateway/${companyId}/`, {
    status,
  }).then((response) => response.data);
};

export const updateCompanyCustomAcquirers = async (
  companyId: number,
  payload: CompanyCustomAcquirersFormValues,
) => {
  return AuthenticatedHttp.patch(`/gateway/${companyId}/`, payload).then(
    (response) => response.data,
  );
};

export const updateCompanyPermissions = async (
  companyId: number,
  payload: CompanyPermissionsFormValues,
) => {
  return AuthenticatedHttp.patch(`/gateway/${companyId}/`, payload).then(
    (response) => response.data,
  );
};

export const loginAsCompany = async (
  companyId: number,
): Promise<{
  url: string;
}> => {
  return AuthenticatedHttp.get(`/impersonate/${companyId}/`).then(
    (response) => response.data,
  );
};

export const getCompanyDetailsByCNPJ = async (
  cnpj: string,
): Promise<Partial<AccountFormValues>> => {
  return axios
    .get(`https://brasilapi.com.br/api/cnpj/v1/${cnpj.replace(/\D/g, "")}`)
    .then((response) => ({
      companyMainCnae: response.data.cnae_fiscal,
      companyLegalNature: response.data.codigo_natureza_juridica,
      companyLegalName: response.data.razao_social,
      commercialName: response.data.nome_fantasia,
      companyCreatedDate: response.data.data_inicio_atividade,
      address: {
        zipcode: response.data.cep,
        state: response.data.uf,
        city: response.data.municipio,
        neighborhood: response.data.bairro,
        street: response.data.logradouro,
        number: response.data.numero,
      },
    }));
};

export const getCompanyCNAEs = async ({
  search = "",
}): Promise<{
  rows: Cnae[];
  count: number;
}> => {
  return axios
    .get("https://compras.dados.gov.br/fornecedores/v1/cnaes.json", {
      params: {
        descricao: search,
      },
    })
    .then((response) => ({
      rows: response.data._embedded.cnaes.map(
        (cnae: { codigo_longo: string; descricao: string }) => ({
          id: cnae.codigo_longo,
          description: cnae.descricao,
        }),
      ),
      count: response.data.count,
    }))
    .catch(() => ({
      rows: [],
      count: 0,
    }));
};

export const getCompanyLegalNatures = async ({
  search = "",
}): Promise<{
  rows: LegalNature[];
  count: number;
}> => {
  return axios
    .get(
      "https://compras.dados.gov.br/fornecedores/v1/naturezas_juridicas.json",
      {
        params: {
          descricao: search,
          ativo: true,
        },
      },
    )
    .then((response) => ({
      rows: response.data._embedded.naturezasJuridicas.map(
        (nature: { codigo: number; descricao: string }) => ({
          id: nature.codigo,
          description: nature.descricao,
        }),
      ),
      count: response.data.count,
    }))
    .catch(() => ({
      rows: [],
      count: 0,
    }));
};
