export enum FormScope {
  INDEX = "index",
  CREATE = "create",
  EDIT = "edit",
  DELETE = "delete",
  VIEW = "view",
}

export const FormScopeLabel: Record<FormScope, string> = {
  [FormScope.INDEX]: "List",
  [FormScope.CREATE]: "Create",
  [FormScope.EDIT]: "Edit",
  [FormScope.DELETE]: "Delete",
  [FormScope.VIEW]: "View",
};

export type FileFormField = File | { id: number; name: string; url: string };
