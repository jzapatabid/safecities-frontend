import * as S from './styles'

import CheckboxV2 from 'components/CheckboxV2'

const OneToManyTree = ({
  data,
  onProblemsCheck,
  onCausesCheck,
  showCauseConnectors,
  readOnly
}: {
  data: any
  onProblemsCheck: any
  onCausesCheck?: any
  showCauseConnectors?: boolean
  readOnly?: boolean
}) => {
  const { root, children } = data
  return (
    <S.Wrapper showCauseConnectors={showCauseConnectors}>
      <S.Root
        selected={root.selectable ? root?.prioritized : true}
        singleChild={children.length === 1}
        showCauseConnectors
        readOnly={readOnly}
      >
        <S.CheckboxAndTitleWrapper>
          {root.selectable && !readOnly ? (
            <CheckboxV2
              checked={root?.prioritized}
              onChange={(e) => onCausesCheck(root, e.target)}
            />
          ) : null}
          <S.Title>Causa</S.Title>
        </S.CheckboxAndTitleWrapper>
        <S.Name withCheckbox={!readOnly ? root.selectable : false}>
          {root.name}
        </S.Name>
      </S.Root>
      <S.Connecter></S.Connecter>
      <S.Leaves>
        {children.map((data: any, idx: any) => (
          <S.Leaf key={idx} selected={!readOnly ? data?.prioritized : false}>
            <S.CheckboxAndTitleWrapper>
              {!readOnly ? (
                <CheckboxV2
                  checked={data?.prioritized || false}
                  onChange={(e) => onProblemsCheck(data, e.target)}
                />
              ) : null}
              <S.Title>Problema</S.Title>
            </S.CheckboxAndTitleWrapper>
            <S.ProblemName readOnly={readOnly}>
              {data.problemName}
            </S.ProblemName>
          </S.Leaf>
        ))}
      </S.Leaves>
    </S.Wrapper>
  )
}

export default OneToManyTree
