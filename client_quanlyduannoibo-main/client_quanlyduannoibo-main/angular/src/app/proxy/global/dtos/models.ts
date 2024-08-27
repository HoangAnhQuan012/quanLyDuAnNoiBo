
export interface LookupTableDto<Guid = "string"> {
  id: Guid;
  displayName?: string;
}

export interface LookupTableDto<Guid> {
  id: Guid;
  displayName?: string;
}

export interface LookupTableIntDto<TPrimaryKey = "number"> {
  id: TPrimaryKey;
  displayName?: string;
}
