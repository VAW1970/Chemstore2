/**
 * Formata a unidade de medida para exibição padrão
 * - Litros: sempre "L" (maiúscula)
 * - Quilogramas: sempre "kg" (minúscula)
 * - Outras unidades: mantém o formato original
 */
export function formatUnit(unit: string): string {
  const normalized = unit.toUpperCase().trim()
  
  switch (normalized) {
    case 'KG':
    case 'KILOGRAMAS':
    case 'KILO':
      return 'kg'
    case 'L':
    case 'LITROS':
    case 'LITRO':
      return 'L'
    case 'G':
    case 'GRAMAS':
    case 'GRAMA':
      return 'g'
    case 'ML':
    case 'MILILITROS':
    case 'MILILITRO':
      return 'mL'
    case 'UNIDADES':
    case 'UNIDADE':
    case 'UN':
      return 'unidades'
    case 'CAIXA':
    case 'CAIXAS':
      return 'caixa'
    case 'FRASCO':
    case 'FRASCOS':
      return 'frasco'
    default:
      return unit
  }
}

/**
 * Converte a unidade para o valor padrão do enum (para salvar no banco)
 */
export function normalizeUnitForStorage(unit: string): string {
  const normalized = unit.toUpperCase().trim()
  
  switch (normalized) {
    case 'KG':
    case 'KILOGRAMAS':
    case 'KILO':
      return 'KG'
    case 'L':
    case 'LITROS':
    case 'LITRO':
      return 'L'
    case 'G':
    case 'GRAMAS':
    case 'GRAMA':
      return 'G'
    case 'ML':
    case 'MILILITROS':
    case 'MILILITRO':
      return 'ML'
    case 'UNIDADES':
    case 'UNIDADE':
    case 'UN':
      return 'UNIDADES'
    case 'CAIXA':
    case 'CAIXAS':
      return 'CAIXA'
    case 'FRASCO':
    case 'FRASCOS':
      return 'FRASCO'
    default:
      return normalized
  }
}


