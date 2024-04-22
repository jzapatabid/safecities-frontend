import { getAPIClient } from 'services/axios'
import { getPersonalizedCauseDetail } from 'services/causes'
import PersonalizedCauseDetail from 'templates/PersonalizedCauseDetail'
import { withSSRAuth } from 'utils/withSSRAuth'

type CauseDetailPageProps = {
  id: number
  detail: any
  problemId: number
  problemName: string
}

const additionalData = {
  evidences:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget blandit ligula. Pellentesque aliquet, felis ac laoreet elementum, erat ex scelerisque tellus, non mattis lacus arcu sed lectus. Cras laoreet lorem dui, at accumsan nisi scelerisque quis. Sed vulputate dictum sapien non dictum.',
  annexes: [
    { url: 'File1.pdf' },
    { url: 'File2.pdf' },
    { url: 'File3.pdf' },
    { url: 'File4.pdf' },
    { url: 'File5.pdf' }
  ],
  references: [
    'http://example.com/blood?activity=advertisement1',
    'http://example.com/blood?activity=advertisement2',
    'http://example.com/blood?activity=advertisement3',
    'http://example.com/blood?activity=advertisement4'
  ]
}

export default function CauseDetailPage({
  id,
  problemId,
  problemName,
  detail
}: CauseDetailPageProps) {
  const formattedDetail = {
    ...detail,
    annexes: detail.annexes.map((file: any) => ({
      ...file,
      name: file.fileName
    }))
  }

  return (
    <PersonalizedCauseDetail
      id={id}
      problemId={problemId}
      problemName={problemName}
      detail={{ ...additionalData, ...formattedDetail }}
    />
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const urlParam = String(ctx.query.id)
  const causeId = urlParam.split('-')[0]
  const problemId = urlParam.split('-')[1]
  const problemName = urlParam.split('-')[2]

  const detail = await getPersonalizedCauseDetail(apiClient, causeId)

  return {
    props: {
      id: causeId,
      problemId,
      problemName,
      detail: detail?.data || {}
    }
  }
})
