export type OmitMultiple<T, K extends keyof T> = Omit<T, K>

export type ExtractEnumValues<TEnum, TSubset> = {
  [K in keyof TEnum as K extends keyof TSubset ? K : never]: TEnum[K]
}

export function extractEnumProperties(
  enumInput: any,
  properties: string[]
): any {
  return Object.keys(enumInput)
    .filter((property) => properties.includes(property))
    .reduce(
      (enumInput: any, property) => ({
        ...enumInput,
        [property]: enumInput[property]
      }),
      {}
    )
}
