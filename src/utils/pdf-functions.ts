type IndexDataTypes = {
  problems: any[]
  causes: any[]
  initiatives: any[]
  objectives: any[]
}

function convertDecimal(number: any) {
  if (typeof number !== 'string') {
    number = number.toString()
  }

  number = number.replace('.', ',')

  return number
}

const generateInitiativesContent = (data: any) => {
  const template = data
    .map(
      (initiative: any) => `
    <section>
      <p style="margin-bottom: 6px; font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">
        Iniciativas
      </p>
      <div style="padding: 16px; border: 1px solid #00000033; margin-top: 12px;">
        <div style="margin-bottom: 8px; display: flex; flex-direction: column; gap: 2px;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
            ${
              initiative?.initiative?.name.slice(0, 1).toUpperCase() +
                initiative?.initiative?.name.slice(1) || ''
            }
          </p>
          <div style="border: 1px solid #00000033; height: 30px; margin: 8px 0px;">
          </div>
        </div>
        <div style="margin-bottom: 8px; display: flex; flex-direction: column;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
            Descrição e evidências:
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
            ${initiative.diagnosis}
          </p>
        </div>
        <div style="margin-bottom: 8px; display: flex; flex-direction: column;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;;">
            Bairros:
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
            ${initiative.neighborhood?.name || ''}
          </p>
        </div>
        <div style="margin-bottom: 8px; display: flex; flex-direction: column;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;;">
            Focalização sociodemográfica:
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
            ${initiative?.sociodemographic_targeting || ''}
          </p>
        </div>
        <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;;">
            Período de execução:
          </p>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; margin: 0px; padding: 0px;;">
              <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Data de início:</p>
              <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                ${initiative?.start_at.replaceAll('-', '/') || ''}
              </p>
            </div>
            <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
              <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Data de início:</p>
              <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                ${initiative?.end_at.replaceAll('-', '/') || ''}
              </p>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 12px; display: flex; flex-direction: column; gap: 4px;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;;">
            Órgãos ou entidades envolvidas na execução:
          </p>
          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${initiative.department_roles
              .map(
                (item: any) => `
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Órgão envolvido:</p>
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                    ${item.department.name || ''}
                  </p>
                </div>
                <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Função/responsabilidade de órgão:</p>
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                    ${item.role || ''}
                  </p>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;;">
            Indicadores de produto:
          </p>
          <div style="margin-bottom: 10px; display: flex; flex-direction: column; gap: 10px;">
            ${initiative.goals
              .map(
                (item: any) => `
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Indicador de producto:</p>
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                    ${item?.initiative_outcome?.name || ''}
                  </p>
                </div>
                <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Metas quantitativas:</p>
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                    ${item?.goal || ''}
                  </p>
                </div>
                <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Mês/Ano:</p>
                  <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
                    ${item?.date?.split('-')?.slice(0, 2)?.join('/') || ''}
                  </p>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
          <div style="display: flex; align-items: center; margin: 0px; padding: 0px;">
            <p style="font-family: Poppins; font-size: 9px; font-weight: 400; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px; margin-right: 8px;">Custo total estimado da iniciativa:</p>
            <p style="font-family: Poppins; font-size: 9px; font-weight: 700; height: 9px; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
              R$${initiative?.total_cost || '-'}
            </p>
          </div>
        </div>
      </div>
    </section>
    `
    )
    .join('')

  return template
}

const generateObjectivesContent = (data: any) => {
  const template = `
      <div>
          <p style="margin-bottom: 8px; font-family: Poppins; font-size: 16px; font-weight: 700; height: 16px; letter-spacing: 0px; text-align: left;">
              Construir a dimensão estratégica do plano
          </p>
          <p style="margin-bottom: 16px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
              Aonde Queremos Chegar? Macro objetivos e focos estratégicos do plano
          </p>
          <!--
            <p style="margin-bottom: 6px; font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">
                Valores ao plano
            </p>
            <p style="margin-bottom: 16px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                [Integridade, Proatividade, Direitos Humanos, Participação Social]
            </p>
          -->
          ${data
            .map(
              (item: any, idx: number) => `<${idx === 0 ? 'div' : 'section'}>
            <p style="margin-bottom: 6px; font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">
                Macro objetivos estratégicos e Focos estratégicos
            </p>
            <div style="border: 1px solid #00000033; display: flex; flex-direction: column; gap: 8px; margin-top: 12px; padding: 16px;">
              <div style="padding: 8px 0px; display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 6px; align-items: center;">
                  <div style="display: flex; align-items: center;">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.32978 2.96364C9.1651 3.624 8.57158 4.08707 7.89166 4.08707C7.21173 4.08707 6.61822 3.624 6.45353 2.96364L6.31005 2.39459C6.24156 2.11577 5.95785 1.94619 5.6774 2.01631C5.39695 2.08642 5.22901 2.3685 5.29912 2.64895L5.44098 3.218C5.62034 3.93543 6.09645 4.5159 6.71768 4.842V9.82652C6.71768 10.1151 6.95084 10.3483 7.23945 10.3483C7.52805 10.3483 7.76121 10.1151 7.76121 9.82652V7.73945H8.0221V9.82652C8.0221 10.1151 8.25526 10.3483 8.54387 10.3483C8.83247 10.3483 9.06563 10.1151 9.06563 9.82652V4.842C9.68686 4.5159 10.163 3.93543 10.3423 3.218L10.4842 2.64895C10.5543 2.37013 10.3847 2.08642 10.1043 2.01631C9.82383 1.94619 9.54175 2.11577 9.47326 2.39459L9.33141 2.96364H9.32978ZM7.89166 3.5653C8.09923 3.5653 8.2983 3.48285 8.44507 3.33607C8.59185 3.18929 8.67431 2.99022 8.67431 2.78265C8.67431 2.57508 8.59185 2.37601 8.44507 2.22923C8.2983 2.08246 8.09923 2 7.89166 2C7.68408 2 7.48501 2.08246 7.33824 2.22923C7.19146 2.37601 7.109 2.57508 7.109 2.78265C7.109 2.99022 7.19146 3.18929 7.33824 3.33607C7.48501 3.48285 7.68408 3.5653 7.89166 3.5653ZM2.67398 3.5653C2.88155 3.5653 3.08062 3.48285 3.2274 3.33607C3.37417 3.18929 3.45663 2.99022 3.45663 2.78265C3.45663 2.57508 3.37417 2.37601 3.2274 2.22923C3.08062 2.08246 2.88155 2 2.67398 2C2.46641 2 2.26733 2.08246 2.12056 2.22923C1.97378 2.37601 1.89133 2.57508 1.89133 2.78265C1.89133 2.99022 1.97378 3.18929 2.12056 3.33607C2.26733 3.48285 2.46641 3.5653 2.67398 3.5653ZM2.54354 4.08707C1.96796 4.08707 1.5 4.55503 1.5 5.13061V6.69591V6.70569V9.82652C1.5 10.1151 1.73316 10.3483 2.02177 10.3483C2.31037 10.3483 2.54354 10.1151 2.54354 9.82652V7.73945H2.80442V9.82652C2.80442 10.1151 3.03758 10.3483 3.32619 10.3483C3.61479 10.3483 3.84795 10.1151 3.84795 9.82652V6.12034L4.05992 6.45459C4.15612 6.6046 4.32244 6.69754 4.50016 6.69754H5.28282C5.57142 6.69754 5.80458 6.46438 5.80458 6.17577C5.80458 5.88717 5.57142 5.65401 5.28282 5.65401H4.78714L4.17732 4.69363C3.93926 4.31534 3.52348 4.08707 3.07672 4.08707H2.54354Z" fill="black"/>
                    </svg>
                  </div>
                  <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Macro objetivo ${
                    idx + 1 < 10 ? `0${idx + 1}` : idx + 1
                  }</p>
                  <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${
                    item.name.slice(0, 1).toUpperCase() + item.name.slice(1)
                  }</p>
                </div>
                ${item.goalStatements
                  .map(
                    (statement: string) =>
                      `<p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">${statement}</p>`
                  )
                  .join('')}
              </div>
              ${item.focuses
                .map(
                  (focus: any, index: number) => `<div style="opacity: ${
                    focus.enabled ? '1' : '0.4'
                  }; padding: 8px; display: flex; flex-direction: column; gap: 8px; border: 1px solid #00000033;">
                <div style="display: flex; gap: 6px; align-items: center;">
                  <div style="display: flex; align-items: center;">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.32978 2.96364C9.1651 3.624 8.57158 4.08707 7.89166 4.08707C7.21173 4.08707 6.61822 3.624 6.45353 2.96364L6.31005 2.39459C6.24156 2.11577 5.95785 1.94619 5.6774 2.01631C5.39695 2.08642 5.22901 2.3685 5.29912 2.64895L5.44098 3.218C5.62034 3.93543 6.09645 4.5159 6.71768 4.842V9.82652C6.71768 10.1151 6.95084 10.3483 7.23945 10.3483C7.52805 10.3483 7.76121 10.1151 7.76121 9.82652V7.73945H8.0221V9.82652C8.0221 10.1151 8.25526 10.3483 8.54387 10.3483C8.83247 10.3483 9.06563 10.1151 9.06563 9.82652V4.842C9.68686 4.5159 10.163 3.93543 10.3423 3.218L10.4842 2.64895C10.5543 2.37013 10.3847 2.08642 10.1043 2.01631C9.82383 1.94619 9.54175 2.11577 9.47326 2.39459L9.33141 2.96364H9.32978ZM7.89166 3.5653C8.09923 3.5653 8.2983 3.48285 8.44507 3.33607C8.59185 3.18929 8.67431 2.99022 8.67431 2.78265C8.67431 2.57508 8.59185 2.37601 8.44507 2.22923C8.2983 2.08246 8.09923 2 7.89166 2C7.68408 2 7.48501 2.08246 7.33824 2.22923C7.19146 2.37601 7.109 2.57508 7.109 2.78265C7.109 2.99022 7.19146 3.18929 7.33824 3.33607C7.48501 3.48285 7.68408 3.5653 7.89166 3.5653ZM2.67398 3.5653C2.88155 3.5653 3.08062 3.48285 3.2274 3.33607C3.37417 3.18929 3.45663 2.99022 3.45663 2.78265C3.45663 2.57508 3.37417 2.37601 3.2274 2.22923C3.08062 2.08246 2.88155 2 2.67398 2C2.46641 2 2.26733 2.08246 2.12056 2.22923C1.97378 2.37601 1.89133 2.57508 1.89133 2.78265C1.89133 2.99022 1.97378 3.18929 2.12056 3.33607C2.26733 3.48285 2.46641 3.5653 2.67398 3.5653ZM2.54354 4.08707C1.96796 4.08707 1.5 4.55503 1.5 5.13061V6.69591V6.70569V9.82652C1.5 10.1151 1.73316 10.3483 2.02177 10.3483C2.31037 10.3483 2.54354 10.1151 2.54354 9.82652V7.73945H2.80442V9.82652C2.80442 10.1151 3.03758 10.3483 3.32619 10.3483C3.61479 10.3483 3.84795 10.1151 3.84795 9.82652V6.12034L4.05992 6.45459C4.15612 6.6046 4.32244 6.69754 4.50016 6.69754H5.28282C5.57142 6.69754 5.80458 6.46438 5.80458 6.17577C5.80458 5.88717 5.57142 5.65401 5.28282 5.65401H4.78714L4.17732 4.69363C3.93926 4.31534 3.52348 4.08707 3.07672 4.08707H2.54354Z" fill="black"/>
                    </svg>
                  </div>
                  <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">Foco ${
                    index + 1 < 10 ? `0${index + 1}` : index + 1
                  }</p>
                  <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">${
                    focus.name.slice(0, 1).toUpperCase() + focus.name.slice(1)
                  }</p>
                </div>
                ${focus.focusStatements
                  .map(
                    (stmt: string) =>
                      `<p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">${stmt}</p>`
                  )
                  .join('')}
              </div>`
                )
                .join('')}
            </div>
          </${idx === 0 ? 'div' : 'section'}>`
            )
            .join('')}

      </div>
      `

  return template
}

const performanceIndicators = [
  {
    text: 'Maior que SC',
    slope: 'negative',
    criticality: 'none',
    variant: 'up',
    class: 'up-trend'
  },
  {
    text: 'Equivalente a SC',
    slope: 'neutral',
    criticality: 'none',
    variant: 'center',
    class: 'flat-trend'
  },
  {
    text: 'Menor que SC',
    slope: 'positive',
    criticality: 'none',
    variant: 'down',
    class: 'down-trend'
  }
]

const trendIndicators = [
  {
    text: 'Aumento',
    slope: 'negative',
    criticality: 'none',
    variant: 'up',
    class: 'up-trend'
  },
  {
    text: 'Estável',
    slope: 'neutral',
    criticality: 'none',
    variant: 'center',
    class: 'flat-trend'
  },
  {
    text: 'Redução',
    slope: 'positive',
    criticality: 'none',
    variant: 'down',
    class: 'down-trend'
  }
]

const relativeFrequencyIndicators = [
  {
    text: 'Participação Alta',
    slope: 'negative',
    criticality: 'none',
    variant: 'up',
    class: 'up-trend'
  },
  {
    text: 'Participação Média',
    slope: 'neutral',
    criticality: 'none',
    variant: 'center',
    class: 'flat-trend'
  },
  {
    text: 'Participação Baixa',
    slope: 'positive',
    criticality: 'none',
    variant: 'down',
    class: 'down-trend'
  }
]

const generateProblemsContent = (data: any) => {
  const getPerformanceMapChart = (BLC: any) => `
  <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
        ${BLC.header}
        <div style="border: 1px solid #00000033;">
          <div style="padding: 12px; padding-top: 0px; margin-bottom: 20px;">
            <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">Desempenho</p>
            <div style="display: flex; padding: 8px; gap: 16px; align-items: center;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <p style="font-family: Poppins; font-size: 26px; font-weight: 800; letter-spacing: 0em; text-align: left; color: black; margin: 0px; padding: 0px;">${`${convertDecimal(
                  BLC.performance
                )}${BLC.performance !== '-' ? '%' : ''}`}</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                ${performanceIndicators
                  .map((indicator: any) => {
                    return `
                    <div style="display: flex; align-items: center; opacity: ${
                      BLC?.slope === indicator.slope ? '1' : '0.2'
                    }">
                      <div class="${indicator.class}"></div>
                      <p style="margin: 0px; padding: 0px; margin-left: 4px; font-family: Poppins; font-size: 7px; font-weight: 700; letter-spacing: 0em; text-align: left;">${
                        indicator.text
                      }</p>
                    </div>
                  `
                  })
                  .join('')}
              </div>
            </div>
            <p style="font-family: Poppins; font-size: 8px; font-weight: 700; letter-spacing: 0.5px; text-align: left; color: black; margin: 0px; padding: 0px; margin-left: 8px;">Em relação à</p>
          </div>
          ${BLC.html}
          <div style="padding-bottom: 8px; display: flex; justify-content: center; gap: 24px; align-items: center; margin: 10px 0px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="height: 9px; width: 16px; background: black;"></div>
                <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 11px; font-weight: 500; letter-spacing: 0px; text-align: left;">Florianópolis</p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div class="taxa-label"></div>
                <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 11px; font-weight: 500; letter-spacing: 0px; text-align: left;">Santa Catarina</p>
            </div>
          </div>
          <div style="padding-bottom: 12px; margin-left: 12px;">
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Em relação aos últimos 12 meses</p>
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Fonte: Secretaria Municipal/Estadual de Segurança Pública</p>
          </div>
        </div>
    </section>
  `

  const getTrendMapChart = (SBC: any) => `
  <div style="width: 100%; word-wrap: break-word; padding-top: 12px;">
        <div style="border: 1px solid #00000033;">
          <div style="padding: 12px; padding-top: 0px;">
            <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">Tendência</p>
            <div style="display: flex; padding: 8px; gap: 16px; align-items: center;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <p style="font-family: Poppins; font-size: 26px; font-weight: 800; letter-spacing: 0em; text-align: left; color: black; margin: 0px; padding: 0px;">${`${convertDecimal(
                  SBC.trend
                )}${SBC.trend !== '-' ? '%' : ''}`}</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                ${trendIndicators
                  .map((indicator: any) => {
                    return `
                    <div style="display: flex; align-items: center; opacity: ${
                      SBC.slope === indicator.slope ? '1' : '0.2'
                    }">
                      <div class="${indicator.class}"></div>
                      <p style="margin: 0px; padding: 0px; margin-left: 4px; font-family: Poppins; font-size: 7px; font-weight: 700; letter-spacing: 0em; text-align: left;">${
                        indicator.text
                      }</p>
                    </div>
                  `
                  })
                  .join('')}
              </div>
            </div>
            <p style="font-family: Poppins; font-size: 8px; font-weight: 700; letter-spacing: 0.5px; text-align: left; color: black; margin: 0px; padding: 0px; margin-left: 8px;">Variação da taxa</p>
          </div>
          ${SBC.html}
          <div style="padding-bottom: 8px; display: flex; justify-content: center; gap: 24px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="height: 9px; width: 16px; background: black;"></div>
                <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 11px; font-weight: 500; letter-spacing: 0px; text-align: left;">Ocorrências</p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div class="taxa-label"></div>
                <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 11px; font-weight: 500; letter-spacing: 0px; text-align: left;">Taxa</p>
            </div>
          </div>
          <div style="padding-bottom: 12px; margin-left: 12px;">
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Em relação aos últimos 5 anos</p>
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Fonte: Secretaria Municipal/Estadual de Segurança Pública</p>
          </div>
        </div>
    </div>
  `

  const getRelativeFrequencyMapChart = (TM: any) => `
  <section style="width: 100%; word-wrap: break-word; padding-top: 12px;">
        ${TM.header}
        <div style="border: 1px solid #00000033; margin-top: 5px;">
          <div style="padding: 12px; padding-top: 0px;">
            <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">Frequência relativa</p>
            <div style="display: flex; padding: 8px; gap: 16px; align-items: center;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <p style="font-family: Poppins; font-size: 26px; font-weight: 800; letter-spacing: 0em; text-align: left; color: black; margin: 0px; padding: 0px;">${`${convertDecimal(
                  TM.relativeFrequency
                )}`}</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                ${relativeFrequencyIndicators
                  .map((indicator: any) => {
                    return `
                    <div style="display: flex; align-items: center;  opacity: ${
                      TM.relativeFrequency > 25 &&
                      indicator.text === 'Participação Alta'
                        ? '1'
                        : TM.relativeFrequency >= 5 &&
                          TM.relativeFrequency <= 25 &&
                          indicator.text === 'Participação Média'
                        ? '1'
                        : TM.relativeFrequency < 5 &&
                          indicator.text === 'Participação Baixa'
                        ? '1'
                        : '0.2'
                    }" >
                      <div class="${indicator.class}"></div>
                      <p style="margin: 0px; padding: 0px; margin-left: 4px; font-family: Poppins; font-size: 7px; font-weight: 700; letter-spacing: 0em; text-align: left;">${
                        indicator.text
                      }</p>
                    </div>
                  `
                  })
                  .join('')}
              </div>
            </div>
            <p style="font-family: Poppins; font-size: 8px; font-weight: 700; letter-spacing: 0.5px; text-align: left; color: black; margin: 0px; padding: 0px; margin-left: 8px;">Do total de ocorrências registradas na cidade</p>
          </div>
          <div style="display: flex; justify-content: center;">
            ${TM.html}
          </div>
          <div style="padding: 12px 0px; margin-left: 12px;">
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Em relação ao último ano</p>
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Fonte: Secretaria Municipal/Estadual de Segurança Pública</p>
          </div>
        </div>
    </section>
  `

  const template = `
    <p style="font-family: Poppins; font-size: 16px; font-weight: 700; letter-spacing: 0px; text-align: left; margin: 0px; padding: 0px;">
      Síntese do diagnóstico
    </p>
    <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
      Onde estamos? Resumo executivo dos principais problemas atuais e suas causas
    </p>
    ${data
      .map(
        (problem: any, idx: number) => `
      ${idx === 0 ? '<div>' : '<section>'}
        <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
          Problemas
        </p>
        <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
          ${idx + 1}. ${
          problem.problem_name.slice(0, 1).toUpperCase() +
          problem.problem_name.slice(1)
        }
        </p>
        <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
          Análise descritiva:
        </p>
        <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">${
          problem.diagnosis
        }</p>
        ${problem?.trend?.html ? `${getTrendMapChart(problem.trend)}` : ''}
        
        ${
          problem?.performance?.html
            ? `${getPerformanceMapChart({
                ...problem.performance,
                header: `
            <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
            Problemas
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
            ${idx + 1}. ${
                  problem.problem_name.slice(0, 1).toUpperCase() +
                  problem.problem_name.slice(1)
                }
          </p>
            `
              })}`
            : ''
        }
        
        ${
          problem?.relativeFrequency?.html
            ? `${getRelativeFrequencyMapChart({
                ...problem.relativeFrequency,
                header: `
                <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
                Problemas
              </p>
              <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
                ${idx + 1}. ${
                  problem.problem_name.slice(0, 1).toUpperCase() +
                  problem.problem_name.slice(1)
                }
              </p>
                `
              })}`
            : ''
        }
      ${idx === 0 ? '</div>' : '</section>'}
    `
      )
      .join('')}
  `

  return template
}

const generateCausesContent = (data: any) => {
  const getTrendMapChart = (SBC: any) => `
  <div style="width: 100%; word-wrap: break-word; padding-top: 12px;">
        <div style="border: 1px solid #00000033;">
          <div style="padding: 12px; padding-top: 0px;">
            <p style="font-family: Poppins; font-size: 10px; font-weight: 700; letter-spacing: 0em; text-align: left;">Tendência</p>
            <div style="display: flex; padding: 8px; gap: 16px; align-items: center;">
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <p style="font-family: Poppins; font-size: 26px; font-weight: 800; letter-spacing: 0em; text-align: left; color: black; margin: 0px; padding: 0px;">${`${convertDecimal(
                  SBC.trend
                )}${SBC.trend !== '-' ? '%' : ''}`}</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                ${trendIndicators
                  .map((indicator: any) => {
                    return `
                    <div style="display: flex; align-items: center; opacity: ${
                      SBC.slope === indicator.slope ? '1' : '0.2'
                    }">
                      <div class="${indicator.class}"></div>
                      <p style="margin: 0px; padding: 0px; margin-left: 4px; font-family: Poppins; font-size: 7px; font-weight: 700; letter-spacing: 0em; text-align: left;">${
                        indicator.text
                      }</p>
                    </div>
                  `
                  })
                  .join('')}
              </div>
            </div>
            <p style="font-family: Poppins; font-size: 8px; font-weight: 700; letter-spacing: 0.5px; text-align: left; color: black; margin: 0px; padding: 0px; margin-left: 8px;">Variação da taxa</p>
          </div>
          ${SBC.html}
          <div style="padding-bottom: 8px; display: flex; justify-content: center; gap: 24px; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <div style="height: 9px; width: 16px; background: black;"></div>
                <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 11px; font-weight: 500; letter-spacing: 0px; text-align: left;">Ocorrências</p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
                <div class="taxa-label"></div>
                <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 11px; font-weight: 500; letter-spacing: 0px; text-align: left;">Taxa</p>
            </div>
          </div>
          <div style="padding-bottom: 12px; margin-left: 12px;">
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Em relação aos últimos 5 anos</p>
            <p style="margin: 0px; padding: 0px; font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">Fonte: Secretaria Municipal/Estadual de Segurança Pública</p>
          </div>
        </div>
    </div>
  `

  const template = `
    <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
      Causas
    </p>
    ${data
      .map(
        (problem: any, idx: number) => `
      ${idx === 0 ? '<div>' : '<section>'}
        <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
          ${idx + 1}. ${
          problem.cause_indicator_name.slice(0, 1).toUpperCase() +
          problem.cause_indicator_name.slice(1)
        }
        </p>
        <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
          Análise descritiva:
        </p>
        <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left; margin: 0px; padding: 0px;">
          ${problem.diagnosis}
        </p>
        ${problem?.trend?.html ? `${getTrendMapChart(problem.trend)}` : ''}
      ${idx === 0 ? '</div>' : '</section>'}
    `
      )
      .join('')}
  `

  return template
}

const generateIndex = (data: IndexDataTypes) => {
  const { problems, causes, initiatives, objectives } = data

  const getCausesIndex = () => {
    const causesTemplate = causes
      .map(
        (problem: any, idx: number) => `
            <div style="margin-top: 16px; display: flex; justify-content: space-between; height: 12px; align-items: center;">
                <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                    ${idx + 1}. ${
          problem.cause_indicator_name.slice(0, 1).toUpperCase() +
          problem.cause_indicator_name.slice(1)
        }
                </p>
                <div style="flex-grow: 2; height: 10px; margin: 0px 8px; border-bottom: 1px dashed gray;"></div>
                <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                    pág. ${idx + 1}
                </p>
            </div>
        `
      )
      .join('')

    return causesTemplate
  }

  const getInitiativesIndex = () => {
    const initiativesTemplate = initiatives
      .map(
        (item: any, idx: number) => `
            <div style="margin-top: 16px; display: flex; justify-content: space-between; height: 12px; align-items: center;">
                <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                    ${idx + 1}. ${
          item.initiative.name.slice(0, 1).toUpperCase() +
          item.initiative.name.slice(1)
        }
                </p>
                <div style="flex-grow: 2; height: 10px; margin: 0px 8px; border-bottom: 1px dashed gray;"></div>
                <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                    pág. ${idx + 1}
                </p>
            </div>
        `
      )
      .join('')

    return initiativesTemplate
  }

  const getProblemsIndex = () => {
    const problemsTemplate = problems
      .map(
        (problem: any, idx: number) => `
            <div style="margin-top: 16px; display: flex; justify-content: space-between; height: 12px; align-items: center;">
                <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                    ${idx + 1}. ${
          problem.problem_name.slice(0, 1).toUpperCase() +
          problem.problem_name.slice(1)
        }
                </p>
                <div style="flex-grow: 2; height: 10px; margin: 0px 8px; border-bottom: 1px dashed gray;"></div>
                <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                    pág. ${idx + 1}
                </p>
            </div>
        `
      )
      .join('')

    return problemsTemplate
  }

  const problems_index_template = `
      <div style="margin: 16px 0px; height: 12px; display: flex; justify-content: space-between; align-items: center;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
              Problemas
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; line-height: 12px; letter-spacing: 0em; text-align: left;">
              pág. #
          </p>
      </div>
      ${getProblemsIndex()}
    `

  const initiatives_index_template = `
      <div style="margin: 16px 0px; height: 12px; display: flex; justify-content: space-between; align-items: center;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
              Iniciativas
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; line-height: 12px; letter-spacing: 0em; text-align: left;">
              pág. #
          </p>
      </div>
      ${getInitiativesIndex()}
    `

  const causes_index_template = `
      <div style="margin: 16px 0px; height: 12px; display: flex; justify-content: space-between; align-items: center;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
              Causas
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; line-height: 12px; letter-spacing: 0em; text-align: left;">
              pág. #
          </p>
      </div>
      ${getCausesIndex()}
    `

  const getMacrosAndFocusesIndex = () => {
    const marcrosAndFocusTemplate = objectives
      .map(
        (item: any, idx: number) => `
          <div style="margin-top: 16px; display: flex; justify-content: space-between; height: 12px; align-items: center;">
              <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
              Macrobjetivo ${idx + 1 < 10 ? `0${idx + 1}` : idx + 1}: ${
          item.name.slice(0, 1).toUpperCase() + item.name.slice(1)
        }
              </p>
              <div style="flex-grow: 2; height: 10px; margin: 0px 8px; border-bottom: 1px dashed gray;"></div>
              <p style="font-family: Poppins; font-size: 10px; font-weight: 400; letter-spacing: 0em; text-align: left;">
                  pág. ${idx + 1}
              </p>
          </div>
      `
      )
      .join('')
    return marcrosAndFocusTemplate
  }

  const macro_and_focus_objectives_template = `
      <div style="margin: 16px 0px; height: 12px; display: flex; justify-content: space-between; align-items: center;">
          <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
              Macro objetivos estratégicos e Focos estratégicos
          </p>
          <p style="font-family: Poppins; font-size: 10px; font-weight: 400; line-height: 12px; letter-spacing: 0em; text-align: left;">
              pág. #
          </p>
      </div>
      ${getMacrosAndFocusesIndex()}
    `

  const template = `
    <div>
      <p style="font-family: Poppins; font-size: 16px; font-weight: 700; letter-spacing: 0px; text-align: left; height: 20px;">
          Índice
      </p>
      <div style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; height: 20px;">
              <p style="font-family: Poppins; font-size: 16px; font-weight: 700; letter-spacing: 0px; text-align: left;">
                  Síntese do diagnóstico
              </p>
              <p style="font-family: Poppins; font-size: 16px; font-weight: 400; letter-spacing: 0px; text-align: right;">
                  pág. #
              </p>
          </div>
          ${problems_index_template}
          ${causes_index_template}
      </div>
      <div style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; height: 20px;">
              <p style="font-family: Poppins; font-size: 16px; font-weight: 700; letter-spacing: 0px; text-align: left;">
                  Construir a dimensão estratégica do plano
              </p>
              <p style="font-family: Poppins; font-size: 16px; font-weight: 400; letter-spacing: 0px; text-align: right;">
                  pág. #
              </p>
          </div>
          <!-- 
            <div style="margin: 16px 0px; height: 12px; display: flex; justify-content: space-between; align-items: center;">
              <p style="font-family: Poppins; font-size: 10px; font-weight: 700; line-height: 12px; letter-spacing: 0em; text-align: left;">
                  Valores ao plano
              </p>
              <p style="font-family: Poppins; font-size: 10px; font-weight: 400; line-height: 12px; letter-spacing: 0em; text-align: left;">
                  pág. #
              </p>
            </div>
          -->
          ${macro_and_focus_objectives_template}
      </div>
      <div style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; justify-content: space-between; height: 20px;">
              <p style="font-family: Poppins; font-size: 16px; font-weight: 700; letter-spacing: 0px; text-align: left;">
                  Construir a dimensão tática do plano
              </p>
              <p style="font-family: Poppins; font-size: 16px; font-weight: 400; letter-spacing: 0px; text-align: right;">
                  pág. #
              </p>
          </div>
          ${initiatives_index_template}
      </div>
    </div>
    `
  return template
}

export {
  generateIndex,
  generateObjectivesContent,
  generateInitiativesContent,
  generateProblemsContent,
  generateCausesContent
}
