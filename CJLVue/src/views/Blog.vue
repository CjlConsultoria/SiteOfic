<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import contaImg from '@/assets/blog1.jpg'

const router = useRouter()
const route = useRoute()

// Destaque principal
const featuredPost = ref({
  id: 99,
  image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
  readTime: 6,
  title1: "Como a Inteligência Artificial pode ser uma aliada na prevenção de vazamento de dados via aplicativos de mensagem",
  date: "29/07/2025",
  category: "categoria3", // pode trocar pela categoria que quiser
  description:
    "O uso de aplicativos de mensagem como o WhatsApp se consolidou como parte da rotina corporativa. A velocidade e conveniência da comunicação instantânea são inegáveis. No entanto, esse canal representa também uma superfície de risco crescente, especialmente quando se trata da prevenção de vazamento de dados e da exposição a ataques cibernéticos como o phishing.",
  sections: [
    {
      extraText:
        "Com a popularização do uso de aplicativos de mensagem no ambiente corporativo, cresce também a necessidade de adotar medidas de segurança que evitem o vazamento de dados sensíveis. A inteligência artificial pode atuar como aliada nesse cenário, detectando padrões de comportamento suspeitos, analisando o tráfego de mensagens e prevenindo ataques como phishing e engenharia social.",
      title: "Ameaças e Prevenção",
      paragraphs: [
        "Aplicativos como WhatsApp, Telegram e Signal são práticos e rápidos, mas também podem ser vetores para ciberataques. Mensagens fraudulentas, links maliciosos e compartilhamento inadvertido de informações estratégicas representam riscos reais.",
        "A IA pode identificar anomalias no envio de dados, aplicar filtros inteligentes e integrar-se a sistemas de monitoramento para agir de forma proativa."
      ],
      descriptionBeforeList: "Principais maneiras pelas quais a IA pode contribuir para a prevenção de vazamentos:",
      list: [
        "Análise automática de mensagens e anexos.",
        "Bloqueio de compartilhamento de dados confidenciais.",
        "Alertas em tempo real para atividades suspeitas."
      ],
      afterListTitle: "Benefícios da Abordagem",
      afterListText: [
        "Ao integrar inteligência artificial à segurança das comunicações corporativas, as empresas podem reduzir significativamente a superfície de ataque e responder mais rapidamente a incidentes.",
        "Essa abordagem não substitui políticas de segurança bem definidas e treinamento de colaboradores, mas complementa e potencializa as estratégias já existentes."
      ]
    },
    {
      extraText:
        "Mais do que prevenir, a inteligência artificial pode ajudar a criar um ecossistema de comunicação mais seguro e confiável. Isso envolve não apenas detectar ameaças, mas também educar os usuários e oferecer camadas adicionais de proteção.",
      title: "Cultura de Segurança",
      paragraphs: [
        "Treinamento constante e conscientização dos colaboradores são fundamentais para minimizar riscos.",
        "Ferramentas de IA podem fornecer feedback em tempo real, ajudando os usuários a reconhecer tentativas de fraude."
      ],
      descriptionBeforeList: "Recomendações para uma estratégia eficaz:",
      list: [
        "Integrar IA aos sistemas de segurança existentes.",
        "Estabelecer diretrizes claras para o uso de aplicativos de mensagem.",
        "Realizar simulações e testes de segurança periódicos."
      ],
      afterListTitle: "Considerações Finais",
      afterListText: [
        "Combinando tecnologia e conscientização, as empresas podem transformar aplicativos de mensagem de um ponto vulnerável para um canal seguro e confiável.",
        "A inteligência artificial, usada de forma estratégica e ética, tem o potencial de se tornar um pilar essencial na defesa corporativa."
      ]
    }
  ]
});


// Mini highlights
const miniHighlights = ref([
  { id: 1, image: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=600&q=80", title: "Ataques de phishing e ransomware: as ameaças mais comuns no trabalho remoto" },
  { id: 2, image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=600&q=80", title: "Tendências do Gartner para 2025: o que líderes de segurança precisam saber" },
  { id: 3, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80", title: "Os desafios de segurança em startups de IA em rápido crescimento" },
  { id: 4, image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=600&q=80", title: "Proteção de dados em ambientes híbridos: estratégias para 2025" }
])

const col1 = ref([
  { 
    id: 1,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    readTime: 7,
    title1: "Tendências em inteligência artificial\npara impulsionar empresas de TI",
    date: "03/07/2025",
    category: "categoria1",
    description: "Panorama rápido das principais tendências em IA que impactam serviços e produtos de TI.",
    sections: [
      {
        extraText: "A inteligência artificial (IA) tem se consolidado como uma das tecnologias mais transformadoras para empresas de tecnologia da informação (TI). Em 2025, as tendências em IA estão focadas em soluções que vão desde automação inteligente até análise preditiva avançada, oferecendo às empresas novas maneiras de otimizar processos, melhorar a experiência do cliente e aumentar a eficiência operacional.",
        title: "Panorama Geral",
        paragraphs: [
          "A inteligência artificial está redefinindo os modelos de negócios no setor de TI. Soluções como aprendizado de máquina e processamento de linguagem natural permitem automação avançada e insights preditivos.",
       ],
        descriptionBeforeList: "Nesta seção, detalhamos os conceitos básicos e o alcance da inteligência artificial no ambiente corporativo. Entender essa base é fundamental para aproveitar as oportunidades que a IA oferece.",
        afterListTitle: "Considerações Finais sobre IA",
        afterListText: [
          "A inteligência artificial deixou de ser uma promessa distante para se tornar uma ferramenta essencial na transformação digital das empresas de TI. As tendências atuais demonstram que a IA está moldando um novo cenário corporativo, em que automação, personalização, análise de dados e tomada de decisões inteligentes se tornam parte do dia a dia operacional. No entanto, mais do que apenas adotar novas tecnologias, é fundamental que as empresas saibam integrar estrategicamente a IA aos seus processos, respeitando aspectos éticos, legais e humanos. A implementação consciente da inteligência artificial pode ampliar a eficiência, a inovação e a competitividade, mas deve sempre ser guiada por princípios de transparência, segurança e respeito à privacidade dos dados. Em um mercado cada vez mais dinâmico e orientado por dados, as empresas que souberem explorar o potencial da IA de forma inteligente e responsável estarão mais preparadas para enfrentar os desafios do futuro e liderar a próxima era da tecnologia."
        ]
      },
      {
        extraText: "A computação em nuvem viabiliza soluções escaláveis e ágeis para empresas de TI. Sua adoção permite reduzir custos e aumentar a flexibilidade operacional. Com o cloud computing, dados e serviços ficam acessíveis em qualquer lugar. Lideranças estratégicas precisam entender essas vantagens para manter a competitividade. Esta seção detalha os impactos práticos da nuvem nos negócios.",
        title: "Impactos Práticos",
        list: [
          "Automatização de tarefas repetitivas.",
          "Análise de grandes volumes de dados em tempo real.",
          "Melhor tomada de decisão baseada em dados."
        ],
        descriptionBeforeList: "Aqui destacamos os benefícios tangíveis da computação em nuvem que transformam o dia a dia das empresas. A nuvem não é apenas uma tecnologia, mas um motor de inovação.",
        afterListTitle: "Reflexões sobre Cloud Computing",
        afterListText: [
          "O avanço da computação em nuvem (cloud computing) transformou profundamente a forma como as empresas de TI operam, desenvolvem e entregam soluções. Mais do que uma simples mudança tecnológica, a nuvem representa uma mudança de mentalidade: sair de uma estrutura física e local para um modelo flexível, escalável e sob demanda. A possibilidade de acessar recursos computacionais de forma remota e em tempo real democratizou o acesso à tecnologia de ponta, permitindo que empresas de todos os portes inovem com agilidade e reduzam seus custos operacionais. Com isso, Cloud deixou de ser uma “opção” para se tornar uma infraestrutura essencial para quem deseja permanecer competitivo. No entanto, essa evolução também traz desafios que merecem reflexão. Segurança, conformidade regulatória, soberania de dados e dependência de fornecedores são questões cada vez mais discutidas, exigindo planejamento estratégico e governança sólida por parte das organizações. Além disso, a integração entre Cloud Computing e outras tecnologias emergentes, como Inteligência Artificial, Big Data e IoT, reforça o papel da nuvem como pilar central da transformação digital. O futuro aponta para arquiteturas híbridas, multicloud e serverless — modelos que prometem ainda mais flexibilidade, mas também mais complexidade. Assim, refletir sobre Cloud Computing hoje não é apenas pensar em infraestrutura, mas em como criar uma base tecnológica sólida, sustentável e preparada para as mudanças constantes do mercado digital."
        ]
      }
    ]
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    readTime: 6,
    title1: "Computação em nuvem nos negócios\ncomo diferencial competitivo",
    date: "08/03/2025",
    category: "categoria2",
    description: "Como arquiteturas em nuvem reduzem custos e aceleram entrega de software.",
    sections: [
      {
        extraText: "A computação em nuvem redefine a infraestrutura tecnológica das empresas. Ela oferece escalabilidade quase instantânea e custo reduzido. A flexibilidade na gestão de recursos é um diferencial competitivo essencial. A segurança dos dados na nuvem é prioridade constante. Este texto explora os principais benefícios dessa tecnologia.",
        title: "Vantagens da Computação em Nuvem",
        paragraphs: [
          "A computação em nuvem revolucionou a forma como empresas e usuários lidam com tecnologia, oferecendo uma série de vantagens que vão muito além do simples armazenamento de dados. Uma das principais vantagens é a redução de custos, já que não é necessário investir em servidores físicos, manutenção ou infraestrutura local. Em vez disso, paga-se apenas pelos recursos utilizados, o que torna o modelo altamente econômico, especialmente para pequenas e médias empresas. Outro ponto de destaque é a escalabilidade. Com a nuvem, é possível aumentar ou reduzir os recursos conforme a demanda, de forma rápida e eficiente, sem interrupções nos serviços. Isso garante maior flexibilidade para os negócios se adaptarem a diferentes cenários e necessidades."
        ],
        descriptionBeforeList: "Esta seção aborda as características que tornam a computação em nuvem uma ferramenta indispensável para negócios modernos e competitivos.",
        afterListTitle: "Perspectivas Futuras para Nuvem",
        afterListText: [
          "A computação em nuvem continua evoluindo e se consolidando como um dos pilares da transformação digital em diversos setores. Nos próximos anos, as perspectivas apontam para uma adoção ainda mais ampla, impulsionada por avanços tecnológicos, mudanças nos modelos de negócios e maior exigência por escalabilidade e segurança. Uma das principais tendências é a expansão do modelo multicloud, no qual as empresas utilizam serviços de diferentes provedores simultaneamente. Essa abordagem aumenta a flexibilidade, reduz riscos de dependência de um único fornecedor e permite escolher as melhores soluções para cada demanda específica. Outra perspectiva promissora é o crescimento do edge computing, que complementa a nuvem ao processar dados mais próximos da origem (como dispositivos IoT), reduzindo latência e aumentando a eficiência. Isso será fundamental em aplicações que exigem respostas em tempo real, como veículos autônomos, cidades inteligentes e saúde digital."
        ]
      },
      {
        extraText: "Segurança digital é crítica para proteger ativos e garantir continuidade do negócio. As ameaças virtuais estão se tornando mais sofisticadas e frequentes. Estratégias de defesa robustas são indispensáveis para todas as organizações. Treinamento e monitoramento constante aumentam a resiliência. Esta seção apresenta soluções essenciais para a segurança corporativa.",
        title: "Principais Benefícios",
        list: [
          "Redução de custos com servidores físicos.",
          "Melhor escalabilidade e performance.",
          "Acesso remoto a sistemas e dados empresariais."
        ],
        descriptionBeforeList: "Destacamos aqui como a segurança e a eficiência operacional se beneficiam diretamente com a adoção de estratégias digitais modernas.",
        afterListTitle: "Segurança como Pilar Estratégico",
        afterListText: [
          "À medida que as organizações avançam na transformação digital e migram suas operações para a nuvem, a segurança da informação deixa de ser apenas uma preocupação técnica e passa a ocupar uma posição de pilar estratégico nos negócios. A proteção de dados sensíveis, a garantia da continuidade operacional e a conformidade com normas regulatórias tornaram-se essenciais para a confiança dos clientes e a reputação das empresas. Na computação em nuvem, os desafios de segurança são amplificados pelo acesso remoto, múltiplos dispositivos conectados e compartilhamento de recursos em ambientes virtuais. Por isso, torna-se fundamental adotar uma abordagem proativa, que envolva tecnologia, processos e cultura organizacional."
        ]
      }
    ]
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    readTime: 10,
    title1: "Futuro dos dispositivos móveis\nna transformação digital corporativa",
    date: "01/06/2025",
    category: "categoria1",
    description: "Impacto dos dispositivos móveis em modelos de trabalho e segurança corporativa.",
    sections: [
      {
        extraText: "Os dispositivos móveis são pilares para a nova era do trabalho remoto e colaborativo. Aplicativos seguros permitem operações eficientes em qualquer lugar. Políticas como BYOD são adotadas para equilibrar mobilidade e proteção. A gestão adequada dos dispositivos garante conformidade e segurança. Aqui destacamos a importância estratégica desses aparelhos.",
        title: "Mobilidade Estratégica",
        paragraphs: [
          "Os dispositivos móveis deixaram de ser apenas ferramentas de comunicação para se tornarem elementos centrais da transformação digital nas empresas. Em um cenário corporativo cada vez mais ágil, descentralizado e orientado por dados, a mobilidade estratégica é um diferencial competitivo essencial. Com smartphones, tablets e notebooks conectados à nuvem, colaboradores podem acessar sistemas corporativos, realizar tarefas críticas e tomar decisões em tempo real, de qualquer lugar. Isso impulsiona a produtividade, a colaboração e a continuidade dos negócios, especialmente em modelos híbridos e remotos. O futuro aponta para uma integração ainda mais profunda entre mobilidade, inteligência artificial e Internet das Coisas (IoT), permitindo que dispositivos móveis atuem como hubs de controle e análise, facilitando operações logísticas, gestão de equipes de campo, atendimento ao cliente e muito mais."
        ],
        descriptionBeforeList: "Analisamos como a mobilidade está sendo integrada à estratégia corporativa, destacando sua importância para produtividade e segurança.",
        afterListTitle: "Tendências em Mobilidade",
        afterListText: [
          "A mobilidade corporativa está em constante evolução, impulsionando a transformação digital das organizações. Entre as principais tendências, destaca-se a crescente adoção de políticas BYOD (Bring Your Own Device), que permitem aos colaboradores utilizar seus dispositivos pessoais para atividades profissionais, aumentando flexibilidade e satisfação, mas exigindo maior atenção à segurança. Além disso, a popularização de aplicativos colaborativos tem potencializado a comunicação e produtividade, facilitando o trabalho em equipe mesmo à distância. As soluções móveis estão cada vez mais integradas a plataformas de gestão empresarial, criando um ambiente conectado e eficiente. Outro ponto importante é o avanço das tecnologias de segurança móvel, que buscam proteger dados corporativos contra ameaças crescentes, por meio de autenticação multifator, criptografia e monitoramento constante. Essa preocupação cresce na mesma proporção do aumento do uso de dispositivos móveis no ambiente corporativo."
        ]
      },
      {
        extraText: "Transformações tecnológicas trazem maior integração entre plataformas e usuários. Aplicativos colaborativos aumentam produtividade e comunicação. Políticas BYOD incentivam o uso de dispositivos pessoais no trabalho. A gestão eficaz desses processos é essencial para resultados positivos. Esta seção analisa as mudanças recentes observadas nas corporações.",
        title: "Transformações Observadas",
        list: [
          "Adoção de políticas BYOD.",
          "Maior produtividade com apps colaborativos.",
          "Integração com plataformas de gestão empresarial."
        ],
        descriptionBeforeList: "Apresentamos aqui as principais mudanças que vêm remodelando o uso dos dispositivos móveis nas empresas modernas.",
        afterListTitle: "Impactos para o Ambiente Corporativo",
        afterListText: [
          "As transformações provocadas pela mobilidade têm causado impactos profundos no ambiente corporativo, alterando a forma como as empresas operam, colaboram e gerenciam seus recursos. A adoção de dispositivos móveis e soluções digitais promove maior flexibilidade e agilidade nos processos, permitindo que equipes trabalhem de qualquer lugar, a qualquer hora, o que eleva significativamente a produtividade e a eficiência. Por outro lado, esses avanços trazem desafios importantes, especialmente no que diz respeito à segurança da informação e à gestão de dispositivos. O aumento da superfície de ataque exige políticas robustas de governança, com controles de acesso rigorosos e treinamentos constantes para conscientizar os colaboradores sobre boas práticas digitais."
        ]
      }
    ]
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    readTime: 5,
    title1: "Segurança cibernética em 2025\ndesafios e estratégias para empresas",
    date: "03/06/2025",
    category: "categoria1",
    description: "Principais ameaças e como montar um programa de segurança efetivo.",
    sections: [
      {
        extraText: "A cibersegurança enfrenta desafios crescentes devido à evolução das ameaças virtuais. Ataques como phishing e ransomware ameaçam dados e sistemas. Políticas atualizadas e ferramentas robustas são essenciais para proteção. A conscientização dos funcionários reduz riscos internos. Esta seção explora as principais ameaças emergentes no cenário atual.",
        title: "Ameaças Emergentes",
        paragraphs: [
          "O cenário da segurança cibernética está em constante evolução, com ameaças emergentes que desafiam cada vez mais a capacidade das empresas de se protegerem. Nos últimos anos, o número e a complexidade dos ataques virtuais cresceram drasticamente, tornando-se um dos maiores riscos para organizações em todo o mundo. Técnicas sofisticadas, como phishing altamente direcionado, ataques de ransomware avançados e exploração de vulnerabilidades zero-day, estão entre as principais formas de ataque que vêm causando prejuízos significativos. Além disso, o crescimento da Internet das Coisas (IoT) e a expansão do trabalho remoto aumentam a superfície de ataque, criando novas portas de entrada para invasores."
        ],
        descriptionBeforeList: "Discutimos os tipos de ameaças que as empresas enfrentam e a necessidade de adaptação constante para se proteger.",
        afterListTitle: "Preparação e Resposta",
        afterListText: [
          "Uma preparação eficaz é fundamental para minimizar os impactos de ataques cibernéticos e garantir a continuidade dos negócios. Para isso, as empresas precisam investir em tecnologia, processos e pessoas, criando uma estrutura capaz de detectar, responder e se recuperar rapidamente de incidentes de segurança. Investir em ferramentas avançadas de monitoramento e detecção permite identificar atividades suspeitas em tempo real, reduzindo o tempo de reação e evitando danos maiores. Além disso, é essencial contar com planos de resposta bem definidos, que detalhem as ações a serem tomadas em diferentes cenários de ataque. O treinamento contínuo dos colaboradores é outro pilar importante, pois muitas ameaças exploram falhas humanas. Equipes bem preparadas são capazes de agir com rapidez e precisão, colaborando para a mitigação dos riscos."
        ]
      },
      {
        extraText: "Para mitigar riscos, estratégias como autenticação multifator são recomendadas. Monitoramento constante das redes detecta atividades suspeitas precocemente. Capacitação contínua dos colaboradores fortalece a defesa. Ferramentas automatizadas auxiliam na resposta rápida a incidentes. Aqui detalhamos soluções práticas para fortalecer a segurança digital.",
        title: "Soluções Recomendadas",
        list: [
          "Autenticação multifator (MFA).",
          "Monitoramento contínuo de redes.",
          "Capacitação dos colaboradores em segurança digital."
        ],
        descriptionBeforeList: "Apresentamos as principais soluções que as empresas podem implementar para fortalecer sua segurança digital.",
        afterListTitle: "Implementação e Manutenção",
        afterListText: [
          "A implementação eficaz de medidas de segurança cibernética exige planejamento detalhado e um compromisso contínuo da organização. Não basta apenas instalar tecnologias; é fundamental estabelecer processos claros, definir responsabilidades e garantir que as práticas estejam alinhadas com as necessidades do negócio. Treinamentos constantes para os colaboradores são essenciais para manter a equipe atualizada sobre as melhores práticas e as ameaças emergentes, fortalecendo a cultura de segurança dentro da empresa. Além disso, as tecnologias utilizadas devem ser regularmente atualizadas e monitoradas para assegurar que ofereçam proteção contra vulnerabilidades recém-identificadas. A manutenção envolve também auditorias periódicas, que avaliam a eficácia dos controles implementados e indicam oportunidades de melhorias. Esse ciclo contínuo de revisão e aprimoramento é crucial para adaptar-se a um cenário digital em constante evolução."
        ]
      }
    ]
  }
])

const col2 = ref([
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    readTime: 8,
    title1: "Blockchain e o futuro das finanças\nno ecossistema corporativo digital",
    date: "04/05/2025",
    category: "categoria2",
    description: "Aplicações empresariais do blockchain além das criptomoedas.",
    sections: [
      {
        extraText: "O blockchain traz transparência e segurança revolucionando setores além das finanças. Contratos inteligentes automatizam processos complexos com confiança. A tecnologia garante rastreabilidade e auditabilidade em operações. Empresas exploram usos em logística e identidade digital. Esta seção aborda a inovação tecnológica no ambiente corporativo.",
        title: "Tecnologia além das criptos",
        paragraphs: [
          "Embora as criptomoedas tenham sido a primeira aplicação de grande destaque do blockchain, a tecnologia vai muito além desse universo. O blockchain é uma estrutura descentralizada e imutável que pode transformar diversos setores, oferecendo segurança, transparência e eficiência em processos complexos. No campo corporativo, o blockchain está sendo utilizado para garantir a rastreabilidade em cadeias de suprimentos, autenticar documentos digitais, facilitar contratos inteligentes e aprimorar sistemas de identidade digital. Essas aplicações ajudam a reduzir fraudes, aumentar a confiança entre parceiros e acelerar transações. Além disso, setores como saúde, logística, votação eletrônica e até propriedade intelectual têm explorado as potencialidades do blockchain para criar soluções inovadoras que vão muito além das moedas digitais."
        ],
        descriptionBeforeList: "Exploramos o papel do blockchain como uma tecnologia que vai além do universo das criptomoedas, impactando vários setores corporativos.",
        afterListTitle: "Oportunidades com Blockchain",
        afterListText: [
          "O blockchain oferece inúmeras oportunidades para empresas que buscam inovar e otimizar seus processos no ambiente digital. Uma das principais vantagens é a capacidade de criar sistemas descentralizados, que eliminam intermediários e reduzem custos operacionais, trazendo maior eficiência às transações e operações corporativas. Além disso, o blockchain possibilita a criação de contratos inteligentes, que automatizam acordos e garantem sua execução conforme regras pré-estabelecidas, aumentando a confiança e agilidade nas negociações. Essa automação tem o potencial de revolucionar setores como financeiro, jurídico e logística. Outra oportunidade importante está na melhoria da transparência e rastreabilidade, essenciais para cadeias de suprimentos, auditorias e conformidade regulatória. Com dados imutáveis e acessíveis em tempo real, as empresas conseguem monitorar seus processos com maior segurança e confiabilidade."
        ]
      },
      {
        extraText: "Vantagens da blockchain incluem transparência e redução de custos operacionais. A eliminação de intermediários acelera processos e evita fraudes. Confiança e segurança são aumentadas em todas as transações. Empresas estão adotando blockchains privados para controle e auditoria. Aqui apresentamos benefícios corporativos da tecnologia.",
        title: "Vantagens Corporativas",
        list: [
          "Transparência total em transações.",
          "Eliminação de intermediários.",
          "Redução de fraudes e custos operacionais."
        ],
        descriptionBeforeList: "Destacamos os principais benefícios que a tecnologia blockchain traz para as operações corporativas do futuro.",
        afterListTitle: "Desafios e Considerações",
        afterListText: [
          "Embora o blockchain ofereça grandes oportunidades, sua adoção também apresenta desafios significativos que precisam ser cuidadosamente avaliados pelas empresas. Um dos principais obstáculos é a complexidade técnica da tecnologia, que exige investimentos em infraestrutura adequada e mão de obra qualificada para implementação e manutenção. Além disso, questões regulatórias ainda são um ponto de atenção. Muitas jurisdições ainda estão definindo normas específicas para o uso do blockchain, o que pode gerar incertezas jurídicas e dificultar a conformidade, especialmente em setores altamente regulados como o financeiro. Outro desafio importante está na escalabilidade e no consumo de energia, especialmente em algumas implementações do blockchain, que podem gerar custos elevados e impactos ambientais consideráveis."
        ]
      }
    ]
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=600&q=80",
    readTime: 6,
    title1: "Realidade aumentada nas indústrias\nmelhorando processos e treinamentos",
    date: "01/04/2025",
    category: "categoria1",
    description: "Como AR reduz erros operacionais e acelera o onboarding de técnicos.",
    sections: [
      {
        extraText: "A realidade aumentada está transformando treinamentos e operações industriais. Técnicos simulam cenários complexos com auxílio visual em tempo real. Isso reduz erros e aumenta a eficiência operacional. A tecnologia facilita manutenção e monitoração de equipamentos. Esta seção detalha as aplicações práticas do AR na indústria.",
        title: "Uso prático do AR",
        paragraphs: [
          "A realidade aumentada (AR) tem se consolidado como uma ferramenta prática e eficaz em diversos setores, especialmente na indústria, saúde, educação e varejo. No ambiente industrial, a AR é usada para sobrepor informações digitais em equipamentos e máquinas, facilitando inspeções, manutenção e montagem, com instruções passo a passo diretamente no campo de visão do operador. Na área da saúde, a AR auxilia cirurgiões com visualizações em 3D durante procedimentos complexos, aumentando a precisão e a segurança. Na educação, proporciona experiências interativas que tornam o aprendizado mais envolvente e dinâmico. No varejo, a AR permite que clientes experimentem produtos virtualmente antes da compra, melhorando a experiência do consumidor e reduzindo devoluções."
        ],
        descriptionBeforeList: "Apresentamos aqui os benefícios imediatos que a AR traz para a indústria, tornando operações mais seguras e eficazes.",
        afterListTitle: "Futuro da Realidade Aumentada",
        afterListText: [
          "A realidade aumentada (RA) está em rápida evolução e promete transformar profundamente diversos setores nos próximos anos. Com avanços tecnológicos como inteligência artificial, 5G e computação em nuvem, a RA se tornará cada vez mais acessível, precisa e integrada ao cotidiano das pessoas e das empresas. No futuro, espera-se que dispositivos mais leves e confortáveis, como óculos inteligentes, substituam os smartphones e tablets como principal interface para experiências de RA. Isso permitirá uma interação mais natural e contínua com informações digitais sobrepostas ao mundo real. Além disso, a integração da RA com outras tecnologias emergentes, como Internet das Coisas (IoT) e machine learning, possibilitará ambientes altamente inteligentes e responsivos, onde sistemas anteciparão necessidades e fornecerão suporte contextualizado em tempo real. No campo industrial, a RA facilitará ainda mais a automação, manutenção preditiva e treinamentos personalizados, aumentando a eficiência e reduzindo custos operacionais. No varejo e marketing, experiências imersivas envolverão consumidores de formas inéditas, ampliando o engajamento e a fidelização."
        ]
      },
      {
        extraText: "Treinamentos interativos e manutenção assistida aumentam a segurança e produtividade. Projetos podem ser visualizados em escala real para melhor entendimento. A realidade aumentada acelera o onboarding e reduz custos operacionais. Empresas investem cada vez mais nessas tecnologias para competitividade. Aqui destacamos as aplicações reais do AR.",
        title: "Aplicações Reais",
        list: [
          "Treinamentos interativos com AR.",
          "Manutenção assistida por realidade aumentada.",
          "Projetos e design visualizados em escala real."
        ],
        descriptionBeforeList: "Exemplificamos casos concretos onde a AR já está sendo aplicada para melhorar resultados em indústrias diversas.",
        afterListTitle: "Considerações para Adoção",
        afterListText: [
          "A adoção da realidade aumentada (RA) nas organizações exige uma análise cuidadosa para garantir que a tecnologia seja implementada de forma eficaz e traga benefícios reais. Primeiramente, é fundamental identificar os objetivos específicos que a RA deve atender, seja na melhoria de processos, treinamentos, atendimento ao cliente ou inovação de produtos. Além disso, deve-se avaliar a infraestrutura tecnológica disponível, incluindo dispositivos compatíveis, conectividade e integração com sistemas existentes. Investir em equipamentos adequados e garantir uma rede robusta são passos essenciais para o sucesso da implantação. Outro aspecto importante é a capacitação das equipes, que precisam ser treinadas para utilizar a RA de maneira eficiente, entendendo suas funcionalidades e limitações. A mudança cultural dentro da organização também deve ser promovida para que haja aceitação e engajamento dos colaboradores."
        ]
      }
    ]
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    readTime: 9,
    title1: "Automação inteligente para casa\ne integração com sistemas corporativos",
    date: "08/01/2025",
    category: "categoria3",
    description: "Tendências em automação residencial que conversam com IoT corporativo.",
    sections: [
      {
        extraText: "A automação residencial está se integrando com sistemas corporativos via IoT. Controle remoto de sensores e dispositivos aumenta conforto e segurança. Empresas aproveitam essa convergência para gestão eficiente. Tecnologia inteligente conecta ambientes pessoais e profissionais. Esta seção explora os benefícios da automação integrada.",
        title: "Casa conectada, empresa conectada",
        paragraphs: [
          "No mundo digital atual, a conexão entre casa e empresa se torna cada vez mais estreita, impulsionada pela automação, Internet das Coisas (IoT) e tecnologias inteligentes. Uma casa conectada oferece conforto, segurança e eficiência, permitindo controlar remotamente iluminação, climatização, segurança e eletrodomésticos via dispositivos móveis. Por outro lado, empresas conectadas utilizam sistemas integrados para otimizar processos, gerenciar recursos e garantir segurança cibernética, promovendo ambientes de trabalho mais produtivos e ágeis. A convergência dessas duas realidades, casa e empresa conectadas, transforma o modo como as pessoas trabalham e vivem, especialmente com o crescimento do home office e ambientes híbridos. Essa integração possibilita maior flexibilidade, melhor equilíbrio entre vida pessoal e profissional, e otimização do uso de tecnologias para apoiar as atividades diárias."
        ],
        descriptionBeforeList: "Exploramos o cenário onde a automação residencial e empresarial se unem, trazendo mais eficiência e controle.",
        afterListTitle: "Benefícios da Integração",
        afterListText: [
          "A integração entre sistemas domésticos e corporativos traz diversos benefícios que impactam positivamente a vida dos usuários e a eficiência das organizações. Um dos principais ganhos é a conveniência proporcionada pela centralização do controle, permitindo gerenciar remotamente dispositivos e recursos tanto do ambiente residencial quanto do ambiente profissional. Essa conexão facilita o equilíbrio entre vida pessoal e trabalho, especialmente em contextos de home office, ao possibilitar a adaptação automática dos ambientes conforme a rotina e necessidades do usuário. Além disso, a automação integrada aumenta a eficiência energética, reduzindo custos e o impacto ambiental por meio do uso inteligente de recursos. Outro benefício importante é a melhoria na segurança, com sistemas de monitoramento e controle de acesso que atuam de forma sincronizada, garantindo proteção tanto em casa quanto no trabalho. A integração também possibilita a coleta e análise de dados para otimização de processos, suporte à tomada de decisões e antecipação de demandas."
        ]
      },
      {
        extraText: "Benefícios cruzados incluem eficiência energética e controle remoto. Sincronização com agendas e plataformas facilita a gestão diária. Automação inteligente promove maior conforto e economia. Integração entre casa e empresa é tendência crescente. Aqui detalhamos essas vantagens.",
        title: "Benefícios Cruzados",
        list: [
          "Maior conforto e eficiência energética.",
          "Controle remoto de dispositivos empresariais.",
          "Sincronização com agendas e plataformas de gestão."
        ],
        descriptionBeforeList: "Detalhamos as vantagens práticas que surgem da convergência entre automação residencial e sistemas corporativos.",
        afterListTitle: "Desafios e Oportunidades",
        afterListText: [
          "A integração entre sistemas residenciais e corporativos oferece inúmeras oportunidades, mas também apresenta desafios que precisam ser enfrentados para garantir uma implementação eficaz e segura. Entre as oportunidades, destacam-se o aumento da produtividade, com ambientes adaptativos que respondem às necessidades do usuário, e a otimização do uso de recursos, resultando em economia energética e redução de custos operacionais. Além disso, a integração promove maior conveniência e flexibilidade, facilitando o equilíbrio entre vida pessoal e profissional, especialmente em modelos de trabalho remoto ou híbrido. Por outro lado, os desafios incluem a complexidade técnica da integração de diferentes plataformas e dispositivos, que muitas vezes possuem padrões e protocolos distintos. A segurança da informação é um ponto crítico, exigindo medidas robustas para proteger dados sensíveis contra ameaças cibernéticas, tanto no ambiente doméstico quanto no corporativo."
        ]
      }
    ]
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=600&q=80",
    readTime: 4,
    title1: "Redes 5G e suas aplicações\nna conectividade empresarial",
    date: "02/02/2025",
    category: "categoria2",
    description: "O impacto do 5G em aplicações empresariais e IoT.",
    sections: [
      {
        extraText: "O 5G oferece velocidade e baixa latência transformando a conectividade empresarial. Aplicações em tempo real, como realidade aumentada e IoT, se beneficiam muito. A tecnologia permite integração eficiente entre unidades e dispositivos. Monitoramento e comunicação são ampliados com qualidade superior. Esta seção detalha o que muda com o 5G nas empresas.",
        title: "O que muda com o 5G?",
        paragraphs: [
          "A chegada do 5G traz mudanças significativas na conectividade, impactando tanto o cotidiano das pessoas quanto as operações empresariais. Em relação à velocidade, o 5G oferece taxas de transferência muito superiores às das gerações anteriores, possibilitando downloads e uploads quase instantâneos. Outro aspecto crucial é a redução da latência — o tempo de resposta entre o envio e o recebimento de dados — que se torna praticamente imperceptível, essencial para aplicações em tempo real como jogos, realidade aumentada, telemedicina e veículos autônomos. Além disso, o 5G suporta uma quantidade muito maior de dispositivos conectados simultaneamente, o que viabiliza a expansão massiva da Internet das Coisas (IoT) em ambientes urbanos e industriais."
        ],
        descriptionBeforeList: "Analisamos os avanços tecnológicos proporcionados pelo 5G que estão redefinindo a conectividade no mundo empresarial.",
        afterListTitle: "Visão para o Futuro com 5G",
        afterListText: [
          "O 5G está preparado para ser a base da próxima grande revolução tecnológica, moldando o futuro da conectividade global. Com sua alta velocidade, baixa latência e capacidade massiva de conexão, o 5G possibilitará o desenvolvimento de cidades inteligentes, onde sistemas de transporte, energia, segurança e serviços públicos estarão interligados para melhorar a qualidade de vida dos cidadãos. No ambiente corporativo, o 5G viabilizará a adoção plena da Indústria 4.0, com fábricas altamente automatizadas, robôs colaborativos e análises em tempo real, aumentando a eficiência, produtividade e flexibilidade. A integração de realidade aumentada e virtual em processos de treinamento, design e suporte será amplificada, criando novas formas de interação e colaboração remota."
        ]
      },
      {
        extraText: "Cenários de uso incluem monitoramento em tempo real de equipamentos industriais. Videochamadas com qualidade superior são possíveis graças ao 5G. Integração instantânea entre filiais melhora produtividade. Empresas podem inovar com aplicações avançadas e conectividade. Aqui apresentamos casos reais e benefícios práticos do 5G.",
        title: "Cenários de Uso",
        list: [
          "Monitoramento em tempo real de máquinas.",
          "Videochamadas com altíssima qualidade.",
          "Integração instantânea entre filiais."
        ],
        descriptionBeforeList: "Destacamos as aplicações práticas do 5G que já estão sendo adotadas por empresas para melhorar processos e comunicação.",
        afterListTitle: "Preparação para o 5G",
        afterListText: [
          "A preparação para a chegada do 5G envolve uma série de ações estratégicas e técnicas essenciais para que empresas, governos e usuários possam aproveitar plenamente os benefícios dessa nova tecnologia. Para as organizações, é fundamental avaliar a infraestrutura de rede atual e planejar investimentos para atualizar equipamentos, garantindo compatibilidade com o 5G e capacidade para suportar o aumento no volume de dados. Além disso, é necessário revisar políticas de segurança para proteger sistemas contra as novas ameaças que podem surgir com a maior conectividade e a expansão da Internet das Coisas (IoT). A capacitação de equipes técnicas e usuários finais também é um ponto-chave para garantir a adoção eficiente e segura das soluções baseadas em 5G. No âmbito regulatório, governos e órgãos responsáveis devem estabelecer normas claras para o uso das frequências, proteção de dados e interoperabilidade entre redes, criando um ambiente favorável para o desenvolvimento da tecnologia."
        ]
      }
    ]
  }
])

const col3 = ref([
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    readTime: 7,
    title1: "Inteligência artificial explicável\npara decisões corporativas seguras",
    date: "02/08/2025",
    category: "categoria3",
    description: "Por que explicabilidade é crítica em IA corporativa.",
    sections: [
      {
        extraText: "A inteligência artificial explicável está ganhando importância à medida que empresas buscam transparência e confiança em decisões automatizadas. Entender como modelos de IA chegam a conclusões permite maior controle e conformidade com regulações. Isso é fundamental para setores que demandam auditoria e responsabilidade. A explicabilidade ajuda a evitar vieses e erros críticos. Esta seção introduz o conceito e sua relevância crescente.",
        title: "O que é IA explicável?",
        paragraphs: [
          "IA explicável, ou Explainable Artificial Intelligence (XAI), refere-se a sistemas de inteligência artificial que fornecem transparência e compreensão sobre como tomam decisões e geram resultados. Diferentemente de modelos tradicionais, muitas vezes considerados “caixas-pretas”, a IA explicável oferece insights claros sobre os processos internos, permitindo que humanos entendam, verifiquem e confiem nas decisões automatizadas. Essa transparência é fundamental para assegurar a ética, a responsabilidade e a conformidade com regulações, especialmente em setores onde as decisões impactam diretamente pessoas e negócios, como finanças, saúde e justiça. Além disso, a IA explicável facilita a identificação de erros, vieses e limitações dos modelos, possibilitando melhorias contínuas e maior segurança operacional. Em suma, IA explicável é um avanço crucial para integrar inteligência artificial de forma confiável e responsável no ambiente corporativo e na sociedade, promovendo decisões mais justas, seguras e eficazes."
        ],
        descriptionBeforeList: "Exploramos aqui os fundamentos da inteligência artificial explicável e sua crescente importância para negócios que exigem transparência.",
        afterListTitle: "Implicações para o Futuro",
        afterListText: [
          "A adoção crescente da inteligência artificial explicável (XAI) terá profundas implicações para o futuro das organizações, da tecnologia e da sociedade. Com sistemas mais transparentes e compreensíveis, empresas poderão tomar decisões mais seguras, éticas e alinhadas com valores humanos, aumentando a confiança dos usuários e reguladores. A IA explicável facilitará a conformidade regulatória, pois permitirá auditorias mais precisas e verificações sobre como os algoritmos operam, reduzindo riscos legais e reputacionais. Além disso, promoverá o desenvolvimento de tecnologias mais justas, ao identificar e mitigar vieses que podem levar a discriminações ou erros. No campo da inovação, a transparência dos sistemas de IA abrirá espaço para novas aplicações em setores sensíveis, como saúde, finanças e segurança pública, onde a confiança nas decisões automatizadas é imprescindível."
        ]
      },
      {
        extraText: "A importância da IA explicável está ligada à necessidade de garantir justiça e conformidade legal. Decisões automatizadas impactam pessoas e negócios, e a capacidade de auditoria é crucial. Além disso, a explicabilidade ajuda a identificar e mitigar vieses prejudiciais. Organizações que adotam essas práticas se destacam pela ética e transparência. Nesta seção, destacamos os principais motivos para investir em IA explicável.",
        title: "Por que importa?",
        list: [
          "Evita decisões enviesadas.",
          "Atende a exigências legais.",
          "Facilita auditorias e compliance."
        ],
        descriptionBeforeList: "Destacamos os motivos pelos quais a inteligência artificial explicável é crucial para a conformidade e justiça em decisões automatizadas.",
        afterListTitle: "Recomendações para Adoção",
        afterListText: [
          "Para garantir o sucesso na implementação da inteligência artificial explicável (XAI), organizações devem seguir algumas recomendações essenciais. Primeiramente, é fundamental investir em tecnologias e ferramentas que ofereçam transparência nos modelos de IA, permitindo que os resultados sejam interpretáveis por humanos sem comprometer a performance. Além disso, a capacitação das equipes técnicas e dos tomadores de decisão é crucial para que compreendam os conceitos de explicabilidade e possam analisar criticamente as decisões automatizadas. É importante também estabelecer políticas claras que garantam a governança ética dos sistemas de IA, incluindo a identificação e mitigação de vieses. A colaboração entre áreas técnicas, jurídicas e de negócios deve ser incentivada para garantir que os modelos estejam alinhados com os objetivos organizacionais e conformes às regulamentações vigentes. Testes constantes e auditorias regulares ajudam a manter a confiabilidade e a segurança dos sistemas."
        ]
      }
    ]
  }
])



const posts = computed(() => [...col1.value, ...col2.value, ...col3.value])

const selectedCategory = ref('todos')
function setCategory(cat: string) { selectedCategory.value = cat }

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split('/')
  return new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`)
}

function isRecent(postDate: string): boolean {
  const postTime = parseDate(postDate).getTime()
  const now = Date.now()
  const days30 = 30 * 24 * 60 * 60 * 1000
  return now - postTime <= days30 && postTime <= now
}

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'todos') return posts.value
  if (selectedCategory.value === 'recentes') return posts.value.filter(p => isRecent(p.date))
  return posts.value.filter(p => p.category === selectedCategory.value)
})

const currentId = computed(() => {
  const idParam = route.params.id
  if (!idParam) return null
  const idNum = Number(Array.isArray(idParam) ? idParam[0] : idParam)
  return Number.isNaN(idNum) ? null : idNum
})

const isArticleOpen = computed(() => currentId.value !== null)

function showImage(postId: number) {
  if (currentId.value === null) return true
  return postId !== currentId.value
}

const cardsPosts = computed(() => posts.value)

const articleView = computed(() => {
  if (currentId.value === null) return null
  return posts.value.find(p => p.id === currentId.value) || (featuredPost.value.id === currentId.value ? featuredPost.value : null)
})

function shouldShowCardImage(postId: number) {
  if (!isArticleOpen.value) return true
  return postId !== currentId.value
}

const currentArticle = articleView

const showDetailImage = computed(() => {
  return false
})

function openArticle(id: number) {
  router.push({ path: `/artigo/${id}` })
}

function closeArticle() {
  router.push({ path: '/' })
}
const loading = ref(true)
const showLoader = ref(true)

onMounted(() => {
  // Spinner aparece imediatamente
  showLoader.value = true

  // Aguarda 10 segundos antes de começar a abrir a tela preta
setTimeout(() => {
  showLoader.value = false

  const topHalf = document.querySelector('.top-half')
  const bottomHalf = document.querySelector('.bottom-half')

  if (topHalf && bottomHalf) {
    topHalf.classList.add('slide-up')
    bottomHalf.classList.add('slide-down')
  }

  // Remove overlay depois da animação (1s no CSS)
    setTimeout(() => {
      loading.value = false
    }, 50000) // duração da animação das metades
  }, 10000) // espera 10s antes de abrir
})
const cookieAceito = ref(false)

onMounted(() => {
  cookieAceito.value = localStorage.getItem('cookieAceito') === 'true'
})

function aceitarCookie() {
  localStorage.setItem('cookieAceito', 'true')
  cookieAceito.value = true
}

// Novo método para rejeitar cookies
function rejeitarCookie() {
  localStorage.setItem('cookieAceito', 'true') // fecha o banner
  cookieAceito.value = true
  // aqui você pode limpar cookies indesejados se houver
}
</script>


<template lang="pug">  

.loading-overlay(v-if="loading")
  .top-half
  .bottom-half
  .loader-container(v-if="showLoader")
   
section.article-detail(v-if="currentArticle")

  .container-top
    h3.container-subtitle INSIGHTS DO MUNDO DIGITAL
    h1.container-title.custom-title-color {{ currentArticle.title1 }}
    p.container-date {{ currentArticle.date }}

  // Novo container para imagem e botão
  .image-and-button
    img.article-banner(:src="currentArticle.image", alt="Imagem do artigo")

    // Botão logo abaixo da imagem, alinhado à esquerda
    button.back-button(@click="router.push('/blog')")
      span.arrow ←
      span.voltar-text(style="display: inline-block; margin-top: 4px;") Voltar

  // Conteúdo principal
  .content-limited
    .article-body(v-for="(section, index) in currentArticle.sections" :key="index")

      // Texto adicional acima do título
      template(v-if="section.extraText")
        p {{ section.extraText }}

      h2.title-main {{ section.title }}

      // Texto antes da lista, se existir
      template(v-if="section.descriptionBeforeList")
        p {{ section.descriptionBeforeList }}

      // Se a seção tiver parágrafos
      template(v-if="section.paragraphs")
        p(v-for="(paragraph, i) in section.paragraphs" :key="i") {{ paragraph }}

      // Se a seção tiver uma lista
      template(v-if="section.list")
        ul
          li(v-for="(item, i) in section.list" :key="i") {{ item }}

      // Título após a lista
      template(v-if="section.afterListTitle")
        h3.subtitle-after-list {{ section.afterListTitle }}

      // Texto após o título depois da lista
      template(v-if="section.afterListText")
        p(v-for="(text, i) in section.afterListText" :key="i") {{ text }}

section.blog-list(v-else)
  section.banner-container
    img.banner-image(:src="contaImg" alt="Banner Conta")
    section.banner-with-text
      .shape-left
        h1.title.animated.fade-in-left.delay-1 Conteúdos que
          br
          | Transformam
        p.description.animated.fade-in-left.delay-2
          | Fique por dentro das últimas tendências em tecnologia, inovação, transformação digital e boas práticas de gestão. No blog da CJL, compartilhamos conhecimento para ajudar sua empresa a evoluir com inteligência, estratégia e ferramentas modernas.
  .cookie-banner-wrapper(v-if="!cookieAceito")
    p Clicando em "Aceito todos os Cookies", você concorda com o armazenamento de cookies no seu dispositivo para melhorar a experiência e navegação no site.
    .botoes-cookie
      button(@click="aceitarCookie") Aceitar Todos
      button(@click="rejeitarCookie") Rejeitar Todos


  section.blog-container#sessao
    h2.section-title.title-destaque Destaques
    .highlight-section
      .highlight-main
        .highlight-image-wrapper
          img.highlight-image(:src="featuredPost.image" :alt="featuredPost.title1")
        .highlight-info
          .card-top
            span.article-type1 ARTIGOS
            span.card-date {{ featuredPost.date }}
          h3.highlight-title {{ featuredPost.title1 }}
          p.highlight-description {{ featuredPost.description }}
          button.highlight-btn(@click="openArticle(featuredPost.id)") Leia o artigo
      .highlight-side
        .mini-card(v-for="item in miniHighlights" :key="item.id")
          .mini-image-wrapper
            img.mini-image(:src="item.image" :alt="item.title")
          .mini-info
            span.article-type ARTIGOS
            h4.mini-title {{ item.title }}

    h2.section-title.title-artigos Artigos
    .filters
      button(:class="{ active: selectedCategory === 'todos' }", @click="setCategory('todos')") Todos
      button(:class="{ active: selectedCategory === 'recentes' }", @click="setCategory('recentes')") Mais recentes
      select#filter(v-model="selectedCategory")
        option(value="todos") Todos
        option(value="recentes") Mais recentes
        option(value="categoria1") Tendências em inteligência artificial
        option(value="categoria2") Blockchain e o futuro das finanças
        option(value="categoria3") Inteligência artificial explicável

    .blog-grid
      article.blog-card(v-for="post in filteredPosts" :key="post.id")
        .image-wrapper
          img.post-image(v-if="shouldShowCardImage(post.id)" :src="post.image" :alt="post.title1")
          .time-badge
            span.clock-icon
              svg(xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2")
                path(stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z")
            span {{ post.readTime }} MIN
        .card-content
          .card-top
            span.article-type ARTIGOS
            span.card-date {{ post.date }}
          h3.title1(v-html="post.title1")
          button.card-button(@click="openArticle(post.id)") Leia o artigo
</template>


<style scoped>
/* Mobile: telas até 767px */

/* iPhone 12 / 12 Pro */
@media (max-width: 767px) and (min-width: 390px) and (max-width: 390px) {
  .content-limited {
    transform: translateY(0rem);
  }
}





/* Todos os celulares e tablets */
@media (max-width: 1024px) {
  .container-top {
    margin-top: 5rem !important; /* ajuste a distância para baixo */
    
  }
}

/* iPhone X / XS aproximado */
@media (min-width: 360px) and (max-width: 380px) {
  button.back-button {
    margin-top: 35rem !important; /* aumenta a distância só nesse intervalo */
    display: block;
    margin-bottom: -2rem;
  }
}
/* Apenas iPhone XR */
@media (min-width: 413px) and (max-width: 415px) {
  button.back-button {
    margin-top: 25rem !important; /* distância para baixo só no iPhone XR */
    display: block;
    margin-bottom: -2rem;
  }
}
/* Apenas iPhone 12 Mini */
@media (min-width: 359px) and (max-width: 361px) {
  button.back-button {
    margin-top: 35rem !important; /* distância para baixo só no iPhone 12 Mini */
    display: block;
    margin-bottom: -2rem;
  }
}
/* Apenas iPhone 12 */
@media (min-width: 389px) and (max-width: 391px) {
  button.back-button {
    margin-top: 30rem !important; /* distância para baixo só no iPhone 12 */
    display: block;
    margin-bottom: -2rem;
  }
}
/* Apenas iPhone 12 Pro Max */
@media (min-width: 427px) and (max-width: 429px) {
  button.back-button {
    margin-top: 25rem !important; /* distância para baixo só no iPhone 12 Pro Max */
    display: block;
    margin-bottom: -2rem;
  }
}
/* Apenas tablets */
@media (min-width: 768px) and (max-width: 1024px) {
  button.back-button {
    margin-top: 3rem !important; /* ajusta apenas nos tablets */
    display: block;
    margin-bottom: -5rem;
  }
}
@media (min-width: 768px) and (max-width: 1024px) {
  button.back-button {
    margin-top: 0rem !important; /* ajusta apenas nos tablets */
    display: block;
    margin-bottom: -5rem;
  }
}

/* Outros tablets (excluindo iPad Mini) */
@media (min-width: 781px) and (max-width: 1024px) {
  button.back-button {
    margin-top: 2rem !important;
    display: block;
    margin-bottom: -5rem;
  }
}

/* iPad Mini aproximado */
@media (min-width: 760px) and (max-width: 780px) {
  button.back-button {
    margin-top: 10rem !important; /* ajuste só para iPad Mini */
    display: block;
    margin-bottom: -4rem;
  }
}
/* Apenas Google Pixel 5 */
@media (min-width: 392px) and (max-width: 394px) {
  button.back-button {
    margin-top: 35rem !important;
    display: block;
    margin-bottom: -2rem;
  }
}
/* Apenas OnePlus Nord 2 */
@media (min-width: 411px) and (max-width: 413px) {
  button.back-button {
    margin-top: 30rem !important;
    display: block;
    margin-bottom: -2rem;
  }
}



.cookie-banner-wrapper p {
  color: #000;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  max-width: 450px; /* largura máxima do texto */
  word-wrap: break-word; /* força a quebra de linha se ultrapassar */
  
}

.cookie-banner-wrapper {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(50px); /* começa 50px abaixo */
  width: 60%;
  max-width: 1200px;
  background-color: white;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  justify-content: space-between;
  align-items: center;

  opacity: 0; /* começa invisível */
  animation: mostrarCookie 10s forwards; /* animação de 3s e mantém estado final */
}

@keyframes mostrarCookie {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(50px); /* começa abaixo */
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0); /* final na posição correta */
  }
}


.botoes-cookie {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.botoes-cookie button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.botoes-cookie button:first-child {
  background-color: #ff8c00; /* Aceitar */
  color: white;
}

.botoes-cookie button:last-child {
  background-color: #555; /* Rejeitar todos */
  color: white;
}

.botoes-cookie button:first-child {
  background-color: #ff8c00; /* Aceitar */
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.botoes-cookie button:first-child:hover {
  background-color: #ff6600; /* tom mais escuro no hover */
  transform: scale(1.05);   /* leve aumento ao passar o mouse */
}

.botoes-cookie button:last-child {
  background-color: #555; /* Rejeitar todos */
  color: white;
  transition: background-color 0.3s, transform 0.2s;
}

.botoes-cookie button:last-child:hover {
  background-color: #333; /* tom mais escuro no hover */
  transform: scale(1.05); /* leve aumento ao passar o mouse */
}

@media (max-width: 480px) {
  .cookie-banner-wrapper {
    width: 90% !important;            /* ocupa mais da tela */
    padding: 0.8rem 1rem;  /* reduz padding */
    font-size: 0.85rem;    /* fonte menor */
    flex-direction: column; /* coloca texto e botões em coluna */
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;       /* não ultrapassa a largura do wrapper */
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: column; /* botões empilhados */
    gap: 8px;
  }

  .botoes-cookie button {
    width: 100%;           /* cada botão ocupa toda a largura */
  }
}

/* Tablets */
@media (min-width: 481px) and (max-width: 768px) {
  .cookie-banner-wrapper {
    width: 80%;            /* ocupa menos que no celular pequeno */
    padding: 1rem 1.2rem;
    font-size: 0.9rem;
    flex-direction: column; 
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: row;   /* botões lado a lado */
    justify-content: center;
    gap: 10px;
  }

  .botoes-cookie button {
    width: auto;           /* largura natural do botão */
    min-width: 120px;      /* largura mínima para não ficar muito pequeno */
  }
}
@media (min-width: 481px) and (max-width: 768px) {
  .cookie-banner-wrapper {
    width: 80%;            /* ocupa menos que no celular pequeno */
    padding: 1rem 1.2rem;
    font-size: 0.9rem;
    flex-direction: column; 
    align-items: center;
    text-align: center;
  }

  .cookie-banner-wrapper p {
    max-width: 100%;
    margin-bottom: 0.5rem;
  }

  .botoes-cookie {
    flex-direction: row;   /* botões lado a lado */
    justify-content: center;
    gap: 10px;
  }

  .botoes-cookie button {
    width: auto;           /* largura natural do botão */
    min-width: 120px;      /* largura mínima para não ficar muito pequeno */
  }
}



.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  pointer-events: none;
}



@keyframes slideUp {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}

@keyframes slideDown {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}

/* Loader */
.loader-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #fff;
  border-top: 5px solid #ff8c00;
  border-radius: 50%;

}




.loading-overlay .top-half,
.loading-overlay .bottom-half {
  position: absolute;
  width: 100%;
  height: 50%;
  background-color: #000;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

/* animação da metade de cima subindo */
.loading-overlay .top-half {
  top: 0;
  animation-name: slideUp;
}

/* animação da metade de baixo descendo */
.loading-overlay .bottom-half {
  bottom: 0;
  animation-name: slideDown;
}


.section-title.title-artigos {
  display: flex;
  flex-direction: column;
  align-items: center;  /* centraliza horizontalmente */
  text-align: center;
  width: 100%;
  padding-bottom:5rem !important;
  bottom:5rem !important;
}

.section-title.title-artigos::after {
  content: "";
  display: block;
  height: 3px;
  background-color: rgb(2, 0, 129);
  width: 10%;          /* largura da linha */
  margin: 5px auto 0;  /* centraliza horizontalmente automaticamente */
  margin-right: 37rem;
  margin-top: -4px;
}
@media (max-width: 768px) {
  .section-title.title-artigos::after {
    width: 30%;         /* aumenta a linha para caber melhor no mobile */
    margin-bottom: 2rem;
    
  }
}






.section-title.title-destaque {
  display: flex;
  flex-direction: column;
  align-items: center;  /* centraliza horizontalmente */
  text-align: center;
  width: 100%;
  margin-bottom: 5rem;
 
  
}

.section-title.title-destaque::after {
  content: "";
  display: block;
  height: 3px;
  background-color: rgb(2, 0, 129);
  width: 10%;          /* largura da linha */
  margin: 5px auto 0;  /* centraliza horizontalmente automaticamente */
  margin-right: 38rem;
  margin-top: -4px;
}

/* Responsivo para mobile */
@media (max-width: 768px) {
  .section-title.title-destaque::after {
    width: 30%;         /* aumenta a linha para caber melhor no mobile */
    margin-bottom: 1rem;
  }
}



@media (max-width: 480px) { /* celular */
  .filters {
    display: flex;
    flex-direction: column; /* coloca botões e select em coluna */
    gap: 0.5rem;            /* espaçamento vertical */
    padding: 0 1rem;        /* respiro nas laterais */
  }

  .filters select {
    width: 100%;            /* ocupa todo o espaço interno da .filters */
    max-width: 100%;        /* nunca ultrapassa */
    box-sizing: border-box; /* considera padding */
  }

  .filters button {
    width: 100%;            /* para ficar responsivo em coluna */
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  section.blog-container#sessao {
    padding-left: 0rem !important; /* desloca tudo para a direita */
    padding-right: 0 !important;
  }

  .highlight-section {
    margin-left: 2rem !important; /* garante que a seção principal se mova */
  }

  .highlight-main,
  .highlight-side {
    margin-left: 0 !important; /* remove margens internas conflitantes */
  }

  .mini-image-wrapper,
  .mini-info {
    margin-left: -4rem !important; /* desloca mini-cards um pouco para a direita */
    transform: none !important;    /* remove qualquer transform que estava atrapalhando */
  }
    .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-210px) !important;
    max-height: 25rem;
  }
    .mini-info{
    margin-left: 0 !important;
    transform: translateX(-80px) !important;
  }
  
}
@media (width: 884px) {
  .highlight-side {
    margin-left: -3rem !important; /* positivo => move para a direita */
  }

  .mini-card {
    margin-left: 3rem !important;
  }

  .mini-image-wrapper,
  .mini-info {
    margin-left: 0 !important;
    transform: none !important;
  }
}

@media (min-width: 800px) and (max-width: 1280px) {
  section.blog-container#sessao {
    padding-left: 0rem !important; /* desloca tudo para a direita */
    padding-right: 0 !important;
  }

  .highlight-section {
    margin-left: 2rem !important; /* garante que a seção principal se mova */
  }

  .highlight-main,
  .highlight-side {
    margin-left: 0 !important; /* remove margens internas conflitantes */
  }

  .mini-image-wrapper,
  .mini-info {
    margin-left: -4rem !important; /* desloca mini-cards um pouco para a direita */
    transform: none !important;    /* remove qualquer transform que estava atrapalhando */
  }
    .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-80px) !important;
    max-height: 25rem;
  }
    .mini-info{
    margin-left: 0 !important;
    transform: translateX(-80px) !important;
  }
  
}
@media (min-width: 800px) and (max-width: 1280px) {
  .highlight-main {
    margin-left: -1rem !important;       /* remove qualquer margem que empurre pra direita */
    padding-left: 0rem !important;   /* ajusta um pouco para dentro da tela, opcional */
  }
}


@media (min-width: 414px) and (max-width: 896px) {


  .highlight-main,
  .highlight-side {
    position: relative;
    left: 0;
    transform: translateX(-0rem);
  }

  /* Se quiser, força a mini-image também para a esquerda */
  .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-4rem) !important;
    max-height: 25rem;
  }
  .mini-info{
    margin-left: 0 !important;
    transform: translateX(-0rem) !important;
  }
    .highlight-main {
    width: 90vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column; /* imagem em cima, texto abaixo */
    align-items: flex-start; /* mantém texto alinhado à esquerda */
  }
}

@media (min-width: 375px) and (max-width: 812px) {


  .highlight-main,
  .highlight-side {
    position: relative;
    left: 0;
    transform: translateX(-0rem);
  }

  /* Se quiser, força a mini-image também para a esquerda */
  .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-3rem) !important;
    max-height: 25rem;
  }
  .mini-info{
    margin-left: 0 !important;
    transform: translateX(-0.5rem) !important;
  }
    .highlight-main {
    width: 90vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column; /* imagem em cima, texto abaixo */
    align-items: flex-start; /* mantém texto alinhado à esquerda */
  }
}

@media (min-width: 414px) and (max-width: 896px) {


  .highlight-main,
  .highlight-side {
    position: relative;
    left: 0;
    transform: translateX(-0rem);
  }

  /* Se quiser, força a mini-image também para a esquerda */
  .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-4rem) !important;
    max-height: 25rem;
  }
  .mini-info{
    margin-left: 0 !important;
    transform: translateX(-0.5rem) !important;
  }
    .highlight-main {
    width: 90vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column; /* imagem em cima, texto abaixo */
    align-items: flex-start; /* mantém texto alinhado à esquerda */
  }
}

@media (min-width: 768px) and (max-width: 1024px) {


  .highlight-main,
  .highlight-side {
    position: relative;
    left: 0;
    transform: translateX(-0rem);
  }

  /* Se quiser, força a mini-image também para a esquerda */
  .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-13rem) !important;
    max-height: 25rem;
  }
  .mini-info{
    margin-left: 0 !important;
    transform: translateX(-6rem) !important;
  }
    .highlight-main {
    width: 90vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column; /* imagem em cima, texto abaixo */
    align-items: flex-start; /* mantém texto alinhado à esquerda */
  }
}





@media (min-width: 800px) and (max-width: 1280px) {
  section.blog-container#sessao {
    padding-left: 2rem !important;
    padding-right: 0 !important;
  }

  .highlight-section {
    margin-left: 0 !important;
  }

  .highlight-main,
  .highlight-side {
    position: relative;
    left: 0;
    transform: translateX(1.4rem);
  }

  /* Se quiser, força a mini-image também para a esquerda */


}



@media (min-width: 884px) and (max-width: 1104px) {
  section.blog-container#sessao {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .highlight-section {
    margin-left: 0 !important;
  }


  /* Se quiser, força a mini-image também para a esquerda */
  .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-12rem) !important;
    max-height: 25rem;
  }
 

}



@media (min-width: 820px) and (max-width: 850px) {
  section.blog-container#sessao {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .highlight-section {
    margin-left: 0 !important;
  }

  .highlight-main,
  .highlight-side {
    position: relative;
    left: 0;
    transform: translateX(-2.4rem);
  }

  /* Se quiser, força a mini-image também para a esquerda */
  .mini-image-wrapper {
    margin-left: 0 !important;
    transform: translateX(-13rem) !important;
    max-height: 25rem;
  }
  .mini-info{
    margin-left: 0 !important;
    transform: translateX(-6rem) !important;
  }
    .highlight-main {
    width: 90vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column; /* imagem em cima, texto abaixo */
    align-items: flex-start; /* mantém texto alinhado à esquerda */
  }
}


/* Tablets (entre 768px e 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .highlight-section {
    display: flex;
    flex-direction: column; /* empilha todos os cards */
    gap: 1.5rem;
    width: 100vw;
    margin: 0;
    padding: 0;
    align-items: center;
  }

  /* Primeiro card continua normal */
  .highlight-main {
    width: 90vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column; /* imagem em cima, texto abaixo */
    align-items: flex-start; /* mantém texto alinhado à esquerda */
  }

  /* Cards menores do segundo em diante */
  .highlight-side,
  .mini-card {
    width: 70vw !important;
    max-width: 100vw !important;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column !important; /* força título/texto abaixo da imagem */
    align-items: flex-start;            /* mantém texto à esquerda */
    gap: 0.5rem;                        /* espaço entre imagem e texto */
  }

  /* Imagem ocupa 50% da tela */
  .mini-image-wrapper,
  .highlight-side .highlight-image-wrapper {
    width: 50% !important;
    max-width: 50% !important;
  }

  .mini-image,
  .highlight-side .highlight-image {
    width: 50% !important; /* ocupa toda a largura do wrapper */
    height: auto !important;
    display: block;
  }

  .mini-info,
  .highlight-side .highlight-info {
    width: 100% !important;
  }

  .mini-title,
  .mini-description {
    display: block;
    width: 100%;
    margin-top: 0.5rem;
  }
}

/* Tablets (entre 768px e 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .mini-title,
  .highlight-title {
    margin-bottom: 1rem !important; /* ajusta o espaçamento entre título e a próxima imagem */
  }

  /* Se quiser mais controle entre cards menores */
  .mini-card + .mini-card,
  .highlight-side + .highlight-side {
    margin-top: 1.5rem !important; /* espaço entre os cards */
  }
}





@media (min-width: 880px) and (max-width: 888px) 
       and (min-height: 1100px) and (max-height: 1108px) {
  .highlight-main,
  .highlight-side {
    padding-right: 6rem !important;
  }
}
@media (min-width: 880px) and (max-width: 888px) {
  .highlight-main,
  .highlight-side {
    padding-right: 8rem !important;
  }
}



/* Exclusivo para tela 768x1024 */
/* Tablets próximos de 768px de largura */
@media (min-width: 768px) and (max-width: 800px) {
  .highlight-main,
  .highlight-side {
    transform: translateX(-4.5rem); /* desloca o conteúdo para a esquerda */
  }
}

/* Tablets (entre 768px e 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
  .banner-container {
    max-height: 450px; /* ajusta conforme necessário */
    overflow: hidden;  /* corta excesso da imagem */
  }

  .banner-image {
    height: 100%;
    width: auto;       /* mantém proporção */
    object-fit: cover; /* cobre o container sem distorcer */
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  .highlight-main {
    margin-bottom: 9rem; /* aumenta o espaço entre o card e o conteúdo abaixo */
  }
}


/* Tablets (entre 768px e 1024px) */
@media (min-width: 768px) and (max-width: 1024px) {
.highlight-section {
  display: flex;
  flex-direction: column; /* empilha */
  gap: 1.5rem;
  width: 100vw; /* ocupa toda a tela */
  margin: 0;
  padding-left: 6rem;
}

.highlight-main,
.highlight-side {
  width: 90vw !important;   /* ocupa 80% da tela */
  max-width: 100vw !important;
  margin-left: auto;        /* centraliza horizontalmente */
  margin-right: auto;       /* centraliza horizontalmente */
}


  .highlight-image-wrapper,
  .mini-image-wrapper,
  .highlight-info,
  .mini-info {
    width: 100% !important; /* cada bloco ocupa 100% do container */
    max-width: 100% !important;
  }

  .highlight-image,
  .mini-image {
    width: 100% !important;  
    height: auto !important;
    display: block;
  }

  .highlight-title,
  .highlight-description,
  .mini-title {
    width: 100% !important;
    display: block;
    margin-top: 0.5rem;
  }
}


/* Para todos tamanhos, cards um abaixo do outro */
@media (min-width: 768px) and (max-width: 1024px) {
  .filters {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  .filters select {
    width: 55%;        /* ocupa o espaço interno da .filters */
    max-width: 50%;    /* nunca ultrapassa */
    box-sizing: border-box; /* respeita o padding/margin */
  }
}


@media (max-width: 1024px) {
  .blog-grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 1.2rem; /* um pouco menor o espaçamento */
    align-items: center; /* centraliza os cards na tela */
  }
  
  .blog-card {
    width: 90% !important;       /* menor que 100% */
    max-width: 600px !important; /* limita tamanho em tablets grandes */
    padding: 1rem !important;    /* diminui padding interno */
  }

  /* Imagem do post menor */
  .image-wrapper img.post-image {
    width: 100% !important;
    height: 180px !important;  /* altura menor */
    object-fit: cover;
    border-radius: 8px;        /* opcional: deixa mais bonito */
  }

  /* Botões e textos menores */
  .card-button {
    width: auto !important;
    padding: 0.4rem 0.8rem !important;
    font-size: 0.9rem !important;
  }

  h3.title1 {
    font-size: 1.1rem !important;
  }

  .card-top span {
    font-size: 0.8rem !important;
  }
}

@media (max-width: 768px) {
  .blog-card {
    width: 95% !important;   /* ocupa menos que 100% */
    padding: 0.8rem !important;
  }

  .image-wrapper img.post-image {
    height: 160px !important; /* ainda menor no mobile */
  }

  h3.title1 {
    font-size: 1rem !important;
  }
}


@media (max-width: 768px) {
  .highlight-section {
    display: flex !important;
    flex-direction: column !important;
    flex-wrap: nowrap !important;
  }
  
  .highlight-main,
  .highlight-side {
    width: 100% !important;
  }

  .highlight-main {
    margin-bottom: 2.5rem; /* Espaço abaixo do main card */
  }
  
  .highlight-side {
    margin-top: 5rem !important; /* Aumenta o espaço acima dos mini cards */
  }
  
  .highlight-image-wrapper,
  .mini-image-wrapper {
    width: 100% !important;
  }
  
  img.highlight-image,
  img.mini-image {
    width: 100% !important;
    height: auto !important;
  }
}
@media (max-width: 768px) {
  .mini-card {
    display: flex !important;
    flex-direction: column !important;
    align-items: center;
    text-align: center;
  }

  .mini-image-wrapper {
    width: 250px !important;
    max-width: 250px !important;
    margin: 0 auto !important;
  }

  img.mini-image {
    height: 180px !important; /* altura fixa */
    max-width: 250px !important; /* limite máximo da largura */
    object-fit: cover;        /* preenche mantendo proporção */
    display: block;           /* evita espaços indesejados */
    margin: 0 auto;           /* centraliza horizontalmente */
  }
}

@media (max-width: 1600px) {
  .shape-left {
    width: 70% !important; /* aumenta a largura */
    
  }
}

@media (max-width: 1024px) {
  .shape-left {
    width: 95% !important; /* aumenta mais em tablets */
  }
}

@media (max-width: 768px) {
  .shape-left {
    width: 90% !important; /* quase toda a largura em celulares */
    margin: 0 auto;         /* centraliza horizontalmente */
  }
}
@media (max-width: 1024px) {

  .shape-left .title {
    font-size: 1.5rem !important;
    top: -1rem;
  }
  .shape-left .description {
    font-size: 1rem !important;
    top: -1rem;
  }
}

@media (max-width: 768px) {

  .shape-left .title {
    font-size: 1.3rem !important;
  }
  .shape-left .description {
    font-size: 0.7rem !important;
  }
}

@media (max-width: 480px) {

  .shape-left .title {
    font-size: 1.2rem !important;
  }
  .shape-left .description {
    font-size: 0.7rem !important;
  }
}
@media (max-width: 1024px) {
  .shape-left .title,
  .shape-left .description {
    margin-left: 0 !important;
    padding-left: 0 !important;
    padding-right: 1rem !important; /* dá um respiro à direita */
    text-align: left !important;
    position: relative;
    left: calc(-1 * var(--container-padding-left, 0px)) !important;

    white-space: normal !important;       /* permite quebra de linha */
    word-wrap: break-word !important;     /* quebra palavras longas */
    overflow-wrap: break-word !important; /* mesma coisa */
    box-sizing: border-box !important;
  }
}

@media (max-width: 768px) {
  .shape-left .title,
  .shape-left .description {
    margin-left: 0 !important;
    padding-left: 0 !important;
    padding-right: 1rem !important;
    text-align: left !important;
    position: relative;
    left: calc(-1 * var(--container-padding-left, 0px)) !important;
    white-space: normal !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    box-sizing: border-box !important;
  }
}

@media (max-width: 480px) {
  .shape-left .title,
  .shape-left .description {
    margin-left: 0 !important;
    padding-left: 0 !important;
    padding-right: 1rem !important;
    text-align: left !important;
    position: relative;
    left: calc(-1 * var(--container-padding-left, 0px)) !important;

    white-space: normal !important;
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
    box-sizing: border-box !important;
  }
}

/* aplica espaçamento abaixo da área de destaque inteira */
.highlight-section {
  margin-bottom: 40px; /* ajuste para o valor que quiser */
}


.subtitle-after-list{
  font-weight: 700;
  font-size: 1.5rem;       /* tamanho grande para destaque */
  line-height: 1.3;
  color: #ff6600;        /* vermelho forte padrão */
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;  /* para títulos mais marcantes */
  letter-spacing: 0.05em;
  /* efeito sutil de sombra */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  margin-left: 0px;
}
.image-and-button {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* alinha o botão à esquerda */
  margin-bottom: 2rem; /* espaço antes do conteúdo */
}

.back-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #000000;
  font-size: 1rem;
  cursor: pointer;
  margin-top: -8rem!important;
  margin-left: 0;     /* alinhado à esquerda */
  margin-bottom: 7rem;
}


.back-button .arrow {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  margin-top: 0rem;
}


.container-subtitle {
  font-size: 0.95rem !important;
  font-weight: 500;
  color: #585858!important;
  margin-bottom: 0.5rem;
  font-weight: 700!important;
}

.container-top .container-title {
  color: #2b2b2b !important;
}

section.article-detail {
  position: relative; /* referência para posicionamento absoluto */
}
.container-top {
  position: absolute;
  top: 20rem;
  left: 50%;
  transform: translateX(-50%) translateY(-20px); /* começa 20px acima */
  background-color: rgb(230, 230, 230);
  border-radius: 12px;
  padding: 2rem 2rem;
  max-width: 900px;
  width: 90%;
  min-height: auto;
  color: #000000;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.9);
  z-index: 10;

  opacity: 0; /* invisível no início */
    animation: slideFadeInTopDown 2s ease forwards; /* aumentei para 2 segundos */
  animation-delay: 0.3s;
}

@keyframes slideFadeInTopDown {
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0); /* posição final natural */
  }
}

.container-subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #585858;
  margin-bottom: 0.5rem;
}
/* Se tiver um título, exemplo: */
.article-title {
  color: #000;
  text-align: center;
  margin: 1rem auto;
  max-width: 700px;
  font-weight: bold;
  font-size: 2rem;
}
.container-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1.5rem;
}

.container-date {
  font-size: 0.95rem;
  color: #585858 !important;
  font-weight: 700;
  margin-top: -15px !important; /* diminua de 20px para 8px, ajuste como quiser */
}

.content-limited {
  width: 90%;
  max-width: 1000px;         /* opcional, para limitar largura em telas grandes */
  margin: 0 auto;            /* centraliza horizontalmente */
  text-align: left;          /* alinha o conteúdo interno à esquerda */
  padding: 2rem 0;           /* espaçamento vertical */
  box-sizing: border-box;
margin-top: 4rem; 
  
}


h2.title-main {
  font-weight: 700;
  font-size: 1.5rem;       /* tamanho grande para destaque */
  line-height: 1.3;
  color: #ff6600;        /* vermelho forte padrão */
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;  /* para títulos mais marcantes */
  letter-spacing: 0.05em;
  /* efeito sutil de sombra */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
  margin-left: 0px;
}

.call-to-action {
  margin-top: 1.5rem;
  font-weight: 600;
  color: #e60050;
  cursor: pointer;
  text-decoration: underline;
}

.article-date {
  width: 100%;
  display: block;
  text-align: left !important;
  margin-top: 0.5rem;
  color: rgb(82, 82, 82)!important;
  font-size: 1.1rem !important;
  font-style: italic;
  margin-left: 20px;
  margin-bottom: 5rem;

}

.arrow {
  font-weight: 900;
  font-size: 1.2rem;
  margin-left: 20px;
}


.article-title {
  color: rgb(255, 115, 0) !important; /* força a cor */
  text-align: left;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  margin-top: 1.5rem;
  margin-left: 20px;
}


.article-banner {
  width: 100%;
  height: 60vh;
  object-fit: cover;
  margin: 0 auto 1.5rem auto; /* margem superior=0, horizontal=auto (centra), inferior=1.5rem */
  display: block; /* garante que a margem auto funcione corretamente */
  margin-top: -5rem;
  margin-bottom: 10rem;
  
}

.article-body {
  color: black;
  font-size: 1.1rem;
  line-height: 2;     /* aumentei para mais espaço entre linhas */
  margin-left: 20px;

  text-align: left;
  font-weight: 300;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-style: normal;
  font-variant: normal;
  
}


.highlight-main {
  position: relative;
}
.section-title:nth-of-type(2) {
  margin-top: 4rem; /* aumenta o espaço antes do título "Artigos" */
}

.highlight-btn {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background-color: transparent; /* sem fundo */
  color: rgb(255, 145, 0); /* azul */
  border: 2px solid rgb(255, 145, 0); /* borda azul */
  padding: 0.8rem 1.6rem; /* maior */
  border-radius: 30px; /* mais arredondado */
  font-size: 1.2rem; /* texto maior */
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: -1rem;
  margin-left: -1rem;
}
/* Mobile - telas menores que 767px */
/* Mobile - celulares */
@media (max-width: 767px) {
  .highlight-btn {
    transform: translateY(70px); /* empurra o botão para baixo no mobile */
  }
}

/* Tablet - telas entre 768px e 1024px */
@media (min-width: 768px) and (max-width: 1024px) {
  .highlight-btn {
    transform: translateY(100px); /* empurra ainda mais para baixo no tablet */
  }
}

.highlight-btn:hover {
  color: rgb(255, 255, 255); /* texto laranja */
  border-color: rgb(10, 0, 102); /* borda laranja */
  background-color: rgb(10, 0, 102);
}


.highlight-image,
.mini-image {
  transition: transform 0.3s ease; /* suaviza o zoom */
  will-change: transform;          /* otimiza animação */
}

.highlight-image:hover,
.mini-image:hover {
  transform: scale(1.05);          /* zoom leve ao passar o mouse */
  cursor: pointer;                 /* muda o cursor para indicar interação */
}

/* Wrappers para aplicar sombra */
.highlight-image-wrapper,
.mini-image-wrapper {
  position: relative;
  overflow: hidden;
}

.highlight-image,
.mini-image {
  display: block;
  width: 100%;
  height: auto;
}

/* Gradiente branco na parte inferior da imagem */

.mini-image-wrapper::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 70%;
  height: 40%;
  background: linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
  pointer-events: none;
  z-index: 1;
  left: 7rem;
}
.highlight-image-wrapper::after {
  content: "";
  position: absolute;
  bottom: -3px;    /* empurra um pouco pra baixo */
  left: -5px;      /* expande 5px à esquerda */
  right: -5px;     /* expande 5px à direita */
  height: 65%;     /* aumenta um pouco a altura */
  background: linear-gradient(
    to top,
    rgb(255, 255, 255) 0%,
    rgba(255, 255, 255, 0.5) 30%,
    rgba(255, 255, 255, 0.1) 70%,
    rgba(255, 255, 255, 0) 100%
  );
  pointer-events: none;
  z-index: 1;
  filter: blur(2px);
}



.title-destaque {
  position: relative;
  top: -3rem; /* Ajuste esse valor para subir mais ou menos */
}


.highlight-section {
  display: flex;
  gap: 2rem;
  margin: -1rem 0 4rem;
}

.highlight-main {
  width: 50%; /* Ocupa 60% da largura da tela */
  flex-shrink: 0; /* Não deixa encolher */
}

.highlight-image {
  width: 100%;
  height: 300px; /* ajuste a altura aqui */
  object-fit: cover;
  border-radius: 12px;
}

.highlight-info {
  margin-top: 1rem;
}

.highlight-title {
  font-size: 1.8rem;
  font-weight: 900; /* mais grosso que 700 */
  color: #ff8800;
  margin: 1rem 0;
  text-align: left;
}


.highlight-description {
  color: #000000;
  font-size: 1rem;
  text-align: left;
}


.card-top {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-date {
  font-size: 0.875rem;
  color: #555;
}



.highlight-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mini-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
@media (max-width: 1024px) {
  .mini-image-wrapper {
    position: relative; /* garante que o ::after use o wrapper como referência */
  }

  .mini-image-wrapper::after {
    left: 0;          /* gruda na borda da imagem */
    width: 100%;      /* acompanha a largura da imagem */
  }

  .mini-image {
    margin-left: 0;   /* remove deslocamento lateral só no responsivo */
  }
}

.mini-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-left: 7rem;
}

.mini-title {
  font-size: 1.4rem;
  font-weight: 900;
  color: #ff8800;
  margin: 0;
  text-align: left;
  margin-left: 10px;
  margin-top: 10px;
}

.mini-info {
  flex: 1;
  text-align: left;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  width: 100%;
}
.article-type1 {
  background-color: #081f57;
  color: white;
  font-size: 1rem;         /* AUMENTADO de 0.85rem para 1rem */
  font-weight: bold;
  padding: 0.4rem 0.9rem;  /* AUMENTADO para dar mais área visual */
  border-radius: 999px;
  text-transform: uppercase;
  margin-top: 2rem;
}

.article-type1 {
color: #ffffff;
font-size: 0.65rem;
margin: 0rem 0.5rem 0rem;
font-weight: 600;
margin-bottom: 8px;
text-align: left;
margin-top: 1rem;

}
.article-type {
  background-color: #070064;
  color: white;
  font-size: 1rem;         /* AUMENTADO de 0.85rem para 1rem */
  font-weight: bold;
  padding: 0.5rem 0.9rem;  /* AUMENTADO para dar mais área visual */
  border-radius: 999px;
  text-transform: uppercase;
  margin-top: 2rem;
}

.article-type {
color: #ffffff;
font-size: 0.65rem;
margin: 0rem 0.5rem 0rem;
font-weight: 600;
margin-bottom: 8px;
text-align: left;
margin-top: -1rem;

}
.article-type:hover,
.article-type1:hover {
  background-color: #ff9100; /* cor que você quer ao passar o mouse */
  color: #ffffff;            /* cor do texto no hover */
  cursor: pointer;           /* muda o cursor para indicar que é interativo */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.card-date {
  font-size: 0.85rem;
  color: #444;
  margin-top: -20px;
}


.card-button {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border: 1.5px solid #ff7300;
  background: transparent;
  color: #ff7300;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: -2rem;
}

.card-button:hover {
  background: #10006d;
  color: white;
  border-color: #10006d;
}


.section-title {
  animation: slideDown 0.8s ease-out forwards;
}

.shape-left {
  background-color: #181818;
  padding: 10rem 4rem 3rem 3rem;
  width: 40%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1.5rem;
  pointer-events: auto;
  margin-left: -50px;
  margin-top:-30px;
  margin-bottom: -5rem;

  border-radius: 0;

  /* Diagonal mais inclinada */
  clip-path: polygon(0 0, 60% 0, 100% 100%, 0 100%);
}

.section-title {
  text-align: le;      /* centraliza o texto */
  font-size: 2.4rem;
  font-weight: 800;
  margin: 0 auto 2rem;
  color: #000000;
  display: inline-block;   /* largura do título = largura do texto */
  position: relative;
  margin-top: -3rem;
}

/* Para garantir que os elementos internos não ocupem toda a largura */
section.blog-container .filters,
section.blog-container h2,
section.blog-container select,
section.blog-container button {
  max-width: calc(100% - 20px); /* considera o padding do container */
}






@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* base */
.animated {
  opacity: 0;
  animation: fadeInLeft 0.8s cubic-bezier(.2,.8,.2,1) forwards;
}

/* delays (ajustados) */
.delay-1 { animation-delay: 0.2s; }  /* título */
.delay-2 { animation-delay: 1.2s; }  /* descrição — agora mais lenta */
.delay-3 { animation-delay: 1.6s; }  /* seta */

.clock-icon svg {
  stroke: #0015d4;
  fill: none;
  width: 16px;
  height: 16px;
  margin-right: 4px;
  margin-top: 4px; /* aumentei para descer mais */
}

.blog-card img {
  height: 220px;
  
}
.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 10px;
}

.post-image {
  width: 100%;
  height: 70px; /* altura menor ainda, você pode ajustar */
  object-fit: cover;
  border-radius: 20px;
  transition: transform 0.3s ease;
  z-index: 1;
}
.article-detail .post-image {
  display: none !important;
}


.blog-container {
  margin-top: 8rem;
  padding: 0 1rem;
}

.filters {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;
  button {
    
    border: none;
    padding: 0.8rem 1rem;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
    &.active {
      background: #001881;
      color: white;
    }
  }
  select {
    margin-left: auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 0.4rem 0.8rem;
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 4 colunas iguais */
  gap: 3.5rem;
  max-width: 1200px; /* opcional: limita largura total */
  margin: 0 auto; /* centraliza */
  margin-bottom: 8rem; /* ou o valor que preferir */
}


.blog-card .card-content {
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  gap: 0.8rem;
  
  
}
.card-content {
  border: 1px solid #1100ac; /* só na parte branca */
  border-top: none;
  border-radius: 0 0 20px 20px;
  padding: 1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: rgb(245, 245, 245);
  flex: 1;
}
.image-wrapper:hover .post-image {
  transform: scale(1.05);
  backface-visibility: hidden;
  transform-origin: center center;
}
.time-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.692); 
  color: #0015d4;
  padding: 0rem 0.3rem; /* ↓ diminuído no eixo vertical */
  font-size: 0.8rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 700;
  pointer-events: none;
  z-index: 5;
}



  .title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0.2rem 1rem 1rem 1rem;
  }
.blog-card {
  border: none;
  border-radius: 20px;
  overflow: hidden;
  background: transparent;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-right: 20px;
}


.blog-card img {
  width: 100%;
  height: 150px; /* aumentei aqui para imagem maior */
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}


html, body {
font-family: Arial, Helvetica, sans-serif;
  overflow-x: hidden; /* para evitar scroll horizontal */
}
* {
  font-family: Arial, sans-serif !important;
}


.btn-prev:hover,
.btn-next:hover {
  background-color: transparent; /* sem fundo */
  color: #2b2b2b; /* só muda a cor da seta */
}
.btn-prev:disabled,
.btn-next:disabled {
  opacity: 0.3;
  cursor: default;
  color: #aaa;
}

.banner-image {
  width: 100vw;          /* toda largura da viewport */
  height: 60vh;          /* 50% da altura da viewport */
  object-fit: cover;     /* mantém proporção e corta o excesso */
  display: block;        /* remove espaços em linha */
  margin-top: -80px;
}
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* para evitar scroll horizontal */
}



.logo {
  width: 120px;
  margin-bottom: 2rem;
}

.title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #ffffff;
  margin-bottom: -10px;
  margin-left: 40px;
  font-family: inherit;
}
.title1 {
  font-size: 1.4rem;
  line-height: 1.2;
  margin-bottom: 1.5rem; /* mantive espaço pra baixo */
  color: #000000;
  margin-left: 0;       /* remove a margem da esquerda */
  text-align: left;     /* alinha o texto à esquerda */
  font-family: inherit;
  margin-left: 8px;
  font-weight: 800;


}

.description {
  font-size: 1rem;
  color: #c4c4c4;
  line-height: 1.5;
  max-width: 400px;
  margin-bottom: 3rem;
  text-align: left;
  margin-left: 40px;
  font-family: inherit;
}



.banner-container {
  position: relative;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-top: -80px;
}


.banner-with-text {
  position: absolute;
  top: 0; /* ajusta pra alinhar */
  left: 0;
  width: 100%;
  height: 100%;
  color: rgb(214, 12, 12); /* ou o que quiser para o texto */
  background: rgba(0, 0, 0, 0.5); /* fundo semi-transparente preto para destacar o texto */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

</style>
