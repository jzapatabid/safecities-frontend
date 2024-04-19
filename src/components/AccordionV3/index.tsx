import * as S from './styles'

type AccordionProps = {
  data: any
  children: any
  toggleAccordion: () => void
  dark?: boolean
}

const AccordionV2 = ({
  data,
  children,
  toggleAccordion,
  dark
}: AccordionProps) => {
  return (
    <S.Wrapper open={data.enabled ? data.open : false} disabled={!data.enabled}>
      <S.HeaderWrapper
        open={data.enabled ? data.open : false}
        dark={dark}
        disabled={!data.enabled}
        onClick={() => (data.enabled ? toggleAccordion() : null)}
      >
        {children.header}
      </S.HeaderWrapper>

      {data.open ? (
        <S.ContentWrapper>{children.content}</S.ContentWrapper>
      ) : (
        <S.SummaryWrapper
          onClick={() => (data.enabled ? toggleAccordion() : null)}
          disabled={!data.enabled}
        >
          {children.summary}
        </S.SummaryWrapper>
      )}

      {data.open && children.footer && (
        <S.FooterWrapper>{children.footer}</S.FooterWrapper>
      )}
    </S.Wrapper>
  )
}

export default AccordionV2
