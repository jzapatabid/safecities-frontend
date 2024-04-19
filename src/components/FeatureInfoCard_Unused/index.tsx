import React from 'react'

import * as S from './styles'

type FeatureInfoCardProps = {
  content: string
}

const FeatureInfoCard: React.FC<FeatureInfoCardProps> = ({ content }) => (
  <S.Wrapper>{content}</S.Wrapper>
)

export default FeatureInfoCard
