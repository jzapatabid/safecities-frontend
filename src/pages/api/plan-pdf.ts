// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PORTUGESE_MONTH_MAPPING } from 'constants/Global'

import fs from 'fs'
import { parseCookies } from 'nookies'
import path from 'path'
import puppeteer from 'puppeteer'
import {
  generateCausesContent,
  generateIndex,
  generateInitiativesContent,
  generateObjectivesContent,
  generateProblemsContent
} from 'utils/pdf-functions'

const upTrendIconPath = path.join(
  process.cwd(),
  'public',
  'images',
  'upTrend.svg'
)

const flatTrendIconPath = path.join(
  process.cwd(),
  'public',
  'images',
  'flatTrend.svg'
)

const downTrendIconPath = path.join(
  process.cwd(),
  'public',
  'images',
  'downTrend.svg'
)

const upTrend = fs.readFileSync(upTrendIconPath, 'utf-8')

const downTrend = fs.readFileSync(downTrendIconPath, 'utf-8')

const flatTrend = fs.readFileSync(flatTrendIconPath, 'utf-8')

const taxaIconPath = path.join(process.cwd(), 'public', 'images', 'taxa.svg')

const taxaIcon = fs.readFileSync(taxaIconPath, 'utf-8')

const florianopolisFlagIconPath = path.join(
  process.cwd(),
  'public',
  'images',
  'florianopolis-flag.svg'
)

const florianopolisPrefectureIconPath = path.join(
  process.cwd(),
  'public',
  'images',
  'florianopolis-prefecture.svg'
)

const planLandingBgImgPath = path.join(
  process.cwd(),
  'public',
  'images',
  'plan-landing.svg'
)

const safeCititesBrandIconPath = path.join(
  process.cwd(),
  'public',
  'images',
  'safe-cities-bw.svg'
)

const planLadingBgImg = fs.readFileSync(planLandingBgImgPath, 'utf-8')
const florianopolisFlagIcon = fs.readFileSync(
  florianopolisFlagIconPath,
  'utf-8'
)
const florianopolisPrefectureIcon = fs.readFileSync(
  florianopolisPrefectureIconPath,
  'utf-8'
)
const safeCititesBrandIcon = fs.readFileSync(safeCititesBrandIconPath, 'utf-8')

const planPdfTemplateNew = ({
  problem_diagnosis,
  focus_objectives,
  initiatives,
  cause_diagnosis,
  plan_name,
  plan_start,
  plan_end
}: any) => `
<html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
        />
        <style>
            body {
                font-family: 'Poppins';
            }

            .landing-page {
                background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                  planLadingBgImg
                )}');
                background-size: cover; 
                background-repeat: no-repeat;
            }

            .flag {
                width: 100%; 
                display: flex;
                align-items: center;
                gap: 8px;
                background: white; 
                padding: 0px 24px;
                margin-bottom: 5px;
            }

            .prefecture {
                width: 100%; 
                display: flex;
                align-items: center;
                gap: 8px;
                background: white; 
                padding: 0px 24px;
            }

            .prefecture-img {
                height: 20px;
                width: 18px;
                background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                  florianopolisPrefectureIcon
                )}');
                background-size: cover; 
                background-repeat: no-repeat;
                margin-left: 6px;
            }

            .flag-img {
                height: 20px;
                width: 30px;
                background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                  florianopolisFlagIcon
                )}');
                background-size: cover; 
                background-repeat: no-repeat;
            }

            .icon-text {
                font-family: Poppins;
                font-size: 8px;
                font-weight: 700;
                line-height: 16px;
                letter-spacing: 0px;
                text-align: left;
            }

            .prefecture-text {
                margin-left: 6px;
            }

            .plan {
                display: flex;
                flex-direction: column;
                justify-content: center;
                height: calc(100% - 217px);
                padding: 0px 24px;
                margin-bottom: 32px;
                width: 45%;
            }

            .safe-cities-img {
                width: 107px;
                height: 41px;
                background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                  safeCititesBrandIcon
                )}');
                background-size: cover; 
                background-repeat: no-repeat;
            }

            .plan-name {
                font-family: Poppins;
                font-size: 24px;
                font-weight: 700;
                line-height: 32px;
                letter-spacing: 0em;
                text-align: left;
            }

            .empty-boxes {
                display: flex;
                gap: 16px;
                height: 48px;
                padding: 0px 24px;
            }

            .empty-box {
                width: 48px;
                height: 48px;
                background: #00000033;
            }

            .up-trend {
              height: 10px;
              width: 10px;
              background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                upTrend
              )}');
              background-size: cover; 
              background-repeat: no-repeat;
            }

            .flat-trend {
              height: 10px;
              width: 10px;
              background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                flatTrend
              )}');
              background-size: cover; 
              background-repeat: no-repeat;
            }

            .down-trend {
              height: 10px;
              width: 10px;
              background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                downTrend
              )}');
              background-size: cover; 
              background-repeat: no-repeat;
            }

            .taxa-label {
              height: 10px; 
              width: 30px;
              background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
                taxaIcon
              )}');
              background-size: cover; 
              background-repeat: no-repeat;
            }
        </style>
    </head>
    <body style="margin: 0px; padding: 0px;">
    <section class="landing-page" style="width: 100%; height: 100%;">
        <div style="width: 100%; height: 24px; background: white;"></div>
        <div class="flag">
            <div class="flag-img"></div> 
            <p class="icon-text">Florianópolis</p>
        </div>
        <div class="prefecture">
            <div class="prefecture-img"></div> 
            <p class="icon-text prefecture-text">Prefeitura de Florianópolis</p>
        </div>
        <div class="plan">
            <div class="safe-cities-img"></div>
            <p class="plan-name">${plan_name}</p>
        </div>
        <div style="display: flex; gap: 16px; font-family: 'Poppins'; padding: 0px 24px; margin-bottom: 16px;">
            <div>
                <p style="font-family: 'Poppins'; font-size: 7px; font-weight: 500; line-height: 9px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Data de inicio</p>
                <p style="font-family: 'Poppins'; font-size: 9px; font-weight: 700; line-height: 11px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${plan_start}</p>
            </div>
            <div>
                <p style="font-family: 'Poppins'; font-size: 7px; font-weight: 500; line-height: 9px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Data de término</p>
                <p style="font-family: 'Poppins'; font-size: 9px; font-weight: 700; line-height: 11px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${plan_end}</p>
            </div>
        </div>
        <div class="empty-boxes">
            <div class="empty-box"></div>
            <div class="empty-box"></div>
            <div class="empty-box"></div>
            <div class="empty-box"></div>
            <div class="empty-box"></div>
        </div>
    </section>
    <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
          ${generateIndex({
            problems: problem_diagnosis || [],
            causes: cause_diagnosis || [],
            initiatives: initiatives || [],
            objectives: focus_objectives || []
          })}
    </section>
    <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
          ${generateProblemsContent(problem_diagnosis)}
    </section>
    <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
          ${generateCausesContent(cause_diagnosis)}
    </section>
    <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
          ${generateObjectivesContent(focus_objectives)}
    </section>
    <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
          ${generateInitiativesContent(initiatives)}
    </section>
    </body>
</html>
`

export default async (req: any, res: any) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL)
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  // Check if it's a preflight request and respond early
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  const { ['@unacity-token']: accessToken } = parseCookies({ req })

  const body = JSON.parse(req?.body)
  const problem_diagnosis = body?.problem_diagnosis
  const cause_diagnosis = body?.cause_diagnosis

  const pdfData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/plan/pdf`)
  const macro_objectives_data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/plan/macro-objectives/focus/all`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  )

  const pdf_data = await pdfData.json()
  const [year = '', month = '', date = ''] = pdf_data?.plan?.updated_at
    ? pdf_data.plan.updated_at.split('T')[0].split('-')
    : ''

  const plan_start = pdf_data?.plan?.start_at
    ? pdf_data.plan.start_at
        .split('-')
        .reverse()
        .map((item: any, idx: number) => (idx === 2 ? item.slice(2) : item))
        .join('/')
    : '-'

  const plan_end = pdf_data?.plan?.end_at
    ? pdf_data.plan.end_at
        .split('-')
        .reverse()
        .map((item: any, idx: number) => (idx === 2 ? item.slice(2) : item))
        .join('/')
    : '-'

  const plan_name = pdf_data?.plan?.title || '-'

  const focus_objectives_data = await macro_objectives_data.json()
  const focus_objectives = focus_objectives_data.map((item: any) => ({
    name: item.name,
    goalStatements: item.goals.map(
      (goal: any) =>
        `Reducir ${goal.problemName} de ${goal.initialRate}% para ${
          goal.goalValue
        }% hasta ${goal?.endAt?.split('-')?.reverse()?.join('/') || ''}`
    ),
    focuses: item.focuses.map(
      ({ goals, name, causeIndicators, customIndicators, enabled }: any) => {
        return {
          name,
          enabled,
          focusStatements: goals.map((goal: any) => {
            const indicatorId = goal.causeIndicatorId
              ? goal.causeIndicatorId
              : goal.customIndicatorId

            const indicatorsList = goal.causeIndicatorId
              ? causeIndicators
              : customIndicators

            const indicator = indicatorsList.find(
              (item: any) => item.id === indicatorId
            )
            return `Reducir ${indicator.name} de ${goal.initialRate}% para ${
              goal.goalValue
            }% hasta ${goal?.endAt?.split('-')?.reverse()?.join('/') || ''}`
          })
        }
      }
    )
  }))

  // const browser = await puppeteer.launch({ headless: 'new' })
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()

  await page.setContent(
    planPdfTemplateNew({
      problem_diagnosis,
      focus_objectives,
      initiatives: pdf_data.initiative_plans,
      cause_diagnosis,
      plan_name,
      plan_start,
      plan_end
    })
  )
  await page.addStyleTag({
    content: `
    @page {
      margin-top: 48px; 
      margin-left: 24px; 
      margin-right: 24px; 
      margin-bottom: 48px;
    }
    @page:first { margin-top: 0px; margin-left: 0px; margin-right: 0px; }

    section {
      page-break-before: always;
    }
    `
  })
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    headerTemplate: `<header style="display: flex; justify-content: space-between; width: 100%; font-family: Poppins; padding: 0px 24px">
    <div>
      <p style="font-family: 'Poppins'; font-size: 7px; font-weight: 500; line-height: 9px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Síntese do diagnóstico</p>
      <p style="font-family: 'Poppins'; font-size: 9px; font-weight: 700; line-height: 11px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${plan_name}</p>
    </div>
    <div style="display: flex; gap: 16px; font-family: 'Poppins';">
      <div>
        <p style="font-family: 'Poppins'; font-size: 7px; font-weight: 500; line-height: 9px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Data de inicio</p>
        <p style="font-family: 'Poppins'; font-size: 9px; font-weight: 700; line-height: 11px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${plan_start}</p>
      </div>
      <div>
        <p style="font-family: 'Poppins'; font-size: 7px; font-weight: 500; line-height: 9px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Data de término</p>
        <p style="font-family: 'Poppins'; font-size: 9px; font-weight: 700; line-height: 11px; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${plan_end}</p>
      </div>
    </div>
    </header>`,
    footerTemplate: `
    <footer style="display: flex; justify-content: space-between; width: 100%; font-family: Poppins; padding: 0px 24px;">
        <div style="display: flex; gap: 4px; align-items: center;">
            <div style="display: flex; align-items: center;">
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.66667 0.833008V1.66634H3.33333V0.833008H2.5V1.66634H1.25417L1.25 9.16634H8.75V1.66634H7.5V0.833008H6.66667ZM7.08333 5.41634H5V7.49967H7.08333V5.41634ZM2.08333 8.33301H7.91667V3.74967H2.08333V8.33301Z"
                    fill="black"
                    />
                </svg>
            </div>
            <p style="font-family: Poppins; font-size: 7px; font-weight: 500; letter-spacing: 0px; text-align: left;">
                ${`Última atualização: ${date} de ${
                  PORTUGESE_MONTH_MAPPING[month] as string
                } de ${year}`}
            </p>
        </div>
        <div style="font-family: Poppins; font-size: 7px; font-weight: 500; line-height: 9px; letter-spacing: 0px; text-align: right;">
            <p>Página - <span class="pageNumber"></p>
        </div>
    </footer>
    `,
    displayHeaderFooter: true
  })
  await browser.close()
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename=myPDF.pdf')
  res.status(200).end(pdfBuffer)
}
