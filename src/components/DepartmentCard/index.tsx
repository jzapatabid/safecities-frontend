import * as S from './styles'

import DeptHospitalIcon from 'components/icons/DeptHospitalIcon'
import DeptSchoolIcon from 'components/icons/DeptSchoolIcon'
import DeptSecurityIcon from 'components/icons/DeptSecurityIcon'

type DepartmentCardProps = {
  label: string
}

const Icons = [DeptHospitalIcon, DeptSchoolIcon, DeptSecurityIcon]

const DepartmentCard = ({
  label = 'Unknown Department'
}: DepartmentCardProps) => {
  const Icon = Icons[Math.floor(Math.random() * 3)]
  return (
    <S.Wrapper>
      <Icon/>
      <S.Text>{label}</S.Text>
    </S.Wrapper>
  )
}

export default DepartmentCard
