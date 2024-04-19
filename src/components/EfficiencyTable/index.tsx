import { useMemo } from 'react'

import { INITIATIVE } from 'enums/Plan'

import { ColumnDef } from '@tanstack/react-table'

import * as S from './styles'

import { getEfficiencyLabel } from 'components/InitiativesTable'
import Table from 'components/Table'
import TubelightIndicator from 'components/TubelightIndicator'

const widthConfig = {
  name: '15%',
  desc: '50%',
  level: '30%'
}

const efficiency_data = [
  {
    name: 'Efeitos negativos',
    desc: 'Indica que não só as evidências existentes dizem que essa iniciativa não funciona, em geral, para gerar os resultados esperados, como também que ela tende a resultar em resultados.',
    level: 1
  },
  {
    name: 'Sem efeitos',
    desc: 'Indica que é improvável que a iniciativa gere os resultados pretendidos. Pelo contrário, nesse caso há fortes evidências de que a implementação da iniciativa não gerará os efeitos esperados.',
    level: 2
  },
  {
    name: 'Evidência mista',
    desc: 'Indica que a efetividade desse tipo de iniciativa não é ponto pacífico na literatura especializada. Enquanto alguns dos estudos rigorosos que avaliaram o seu impacto apontaram para um efeito positivo sobre as variáveis de resultado, outros ou não encontraram efeitos significativos, ou encontraram efeitos negativos.',
    level: 3
  },
  {
    name: 'Promissora',
    desc: 'Significa que, em geral, as evidências indicam que a implementação da iniciativa tem potencial de gerar os resultados pretendidos, ainda que careçam evidências mais fortes, ou que haja circunstâncias em que ela poderá não funcionar.',
    level: 4
  },
  {
    name: 'Efetiva',
    desc: 'Indica que, em geral, há uma grande convergência, entre as evidências cientificamente robustas existentes, de que a implementação da iniciativa efetivamente funciona para gerar o resultado pretendido.',
    level: 5
  }
]

export default function EfficiencyTable() {
  const data = efficiency_data
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'name-sorting',
        cell: (info) => <S.Name>{info.getValue()}</S.Name>,
        header: () => <S.HeaderName>Iniciativa</S.HeaderName>
      },
      {
        accessorFn: (row) => row.desc,
        id: 'desc-sorting',
        cell: (info) => <S.Desc>{info.getValue()}</S.Desc>,
        header: () => <S.HeaderText>Iniciativa</S.HeaderText>
      },
      {
        accessorFn: (row) => row.level,
        id: 'level-sorting',
        cell: (info) => (
          <S.LevelWrapper>
            <TubelightIndicator
              score={info.getValue() as number}
              label={getEfficiencyLabel[info.getValue() as number]}
              type={INITIATIVE.EFFICIENCY}
            />
          </S.LevelWrapper>
        ),
        header: () => <S.HeaderText>Nível de eficácia</S.HeaderText>
      }
    ],
    []
  )

  return (
    <>
      <Table
        {...{
          data,
          columns,
          footer: false,
          showEmptyRows: false,
          widthConfig
        }}
      />
    </>
  )
}
