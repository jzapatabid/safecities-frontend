import React from 'react'

import * as S from './styles'

import FeatureInfoCard from 'components/FeatureInfoCard_Unused'

type detail = {
  content: string
}
type FeatureCardProps = {
  title: string
  desc: string
  details: detail[]
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, desc, details }) => (
  <S.Wrapper>
    <S.Title>{title}</S.Title>
    <S.Description>{desc}</S.Description>
    <S.InfoWrapper>
      {details.map((detail, idx) => (
        <FeatureInfoCard key={idx} content={detail.content}/>
      ))}
    </S.InfoWrapper>
  </S.Wrapper>
)

export default FeatureCard
