/* =====================================================================
   PORTFOLIO CONTENT — edit this file to update the website.
   ---------------------------------------------------------------------
   Everything on the site (skill map, counts, projects, milestones)
   is generated from the data below. You never need to touch HTML/CSS
   to add a project, a certificate or a skill.

   How it fits together
   • evidence[] : projects, roles, competitions, awards, certifications
                  and courses. Each item lists the skill ids it proves
                  in `skills: [...]`.
   • tree[]     : the skill map. Category → capability → skill
                  (three levels maximum).
   • A skill's status is calculated automatically:
       Learning — no project / role / competition evidence yet
       Applied  — at least one project, role or competition
       Proven   — at least two of those AND `proven: true` on the skill
                  (set it once you can rebuild the work without help)
   ===================================================================== */

window.PORTFOLIO = {

  /* ------------------------------------------------------------- profile */
  profile: {
    name: "Nguyen Quoc An",
    shortName: "An Nguyen",
    initials: "AN",
    tagline: "Finance × Data",
    intro: "I use analytics to understand business performance, risk and financial decisions.",
    location: "Ho Chi Minh City, Vietnam",
    email: "antthkdhg@gmail.com",
    linkedin: "https://www.linkedin.com/in/ann-nguyen-a4802a245",
    // Put your CV PDF in assets/cv/ and write its path here, e.g. "assets/cv/An_Nguyen_CV.pdf".
    // Leave empty ("") to hide the "Download CV" buttons.
    cvUrl: "",
    currently: {
      school: "RMIT University Vietnam",
      program: "Bachelor of Business · Finance; Business & Technology",
      detail: "Graduating January 2027"
    },
    seeking: {
      roles: "Finance Analytics · Data Analytics",
      detail: "Internships · Ho Chi Minh City"
    },
    languages: "Vietnamese (native) · English (professional) · German (basic)"
  },

  /* ------------------------------------------------- project categories */
  categories: [
    { id: "finance", name: "Finance" },
    { id: "analytics", name: "Data Analytics" },
    { id: "ml", name: "Machine Learning" },
    { id: "business", name: "Business" }
  ],

  /* ------------------------------------------------------------ evidence
     type: "project" | "role" | "competition" | "award" | "certification" | "course"
     Projects also carry their case-study content (shown on project.html?id=...).
     Optional project fields: contribution[], limitations[], learned[]
     (each section is hidden when empty).
     featured: true  → shown in "Featured" on the Projects page
     featured: false → shown in "Archive & experiments"                      */
  evidence: [
    {
      id: "credit-risk",
      type: "project",
      featured: true,
      title: "Consumer Credit Risk & Lending Policy Analytics",
      short: "Consumer Credit Risk",
      subtitle: "Credit scoring",
      year: "2026",
      categories: ["ml", "finance"],
      summary: "A probability-of-default model that cuts expected credit losses by 77.7% while still approving 70% of applicants.",
      problem: "A UK consumer lender (a coursework case) saw defaults climb from 7% to over 10%. Replace its old rules-based scorecard with a model that ranks applicants by probability of default and reduces expected loss by at least 25% at a 70% approval rate.",
      data: "Four uncleaned tables at a 20 June 2026 snapshot: customers, credit bureau, loans and 18 months of transactions (479,860 rows). 9,999 loan applications with a 10% default rate, split 80/20 into training and validation sets.",
      method: [
        "Documented each data-quality issue and treated it by cause: for example, a missing months-since-delinquency means \"never delinquent\", so it got a sentinel value rather than an imputed one.",
        "Aggregated transactions to one row per customer, joined the four tables and excluded loss-given-default from the inputs to avoid target leakage.",
        "Built Weight-of-Evidence and Information Value encodings plus ratio features such as loan-to-monthly-income.",
        "Tuned an L1 logistic regression and a Random Forest with 5-fold cross-validation, then checked calibration, explained individual decisions with SHAP and ran a regional fairness check."
      ],
      result: [
        "Chose the L1 logistic regression: validation Gini 0.664 (AUC 0.832) against 0.657 for the Random Forest, with a KS of 0.52 and a Brier score of 0.074.",
        "At a 70% approval rate, expected loss falls from £2.38M (approve everyone) to £0.53M, a 77.7% reduction against the 25% target.",
        "A loss breakdown found unemployed applicants are 9.8% of the book but 28.5% of losses, and under-35s cause 51.8% of losses.",
        "Proposed drift monitoring with Population Stability Index alerts (investigate above 0.10, urgent above 0.25) and vintage-based checks for target drift."
      ],
      contribution: [],
      limitations: [
        "Interest rate is a strong predictor, but it partly reflects the lender's previous pricing, so it may carry the old model's view of risk.",
        "Defaulters and non-defaulters still overlap at low scores, so the model ranks risk well but cannot identify every default.",
        "Region carries little weight (IV 0.01), but approval rates by region should still be monitored for proxy discrimination."
      ],
      learned: [],
      links: [
        { label: "Notebook and analysis files", url: "https://drive.google.com/drive/folders/1TZCRWXPbtYixXc6h3eLPwQMTbYHOJb5o?usp=sharing" }
      ],
      skills: ["da", "py", "pd", "sk", "stat", "ml", "cls", "eval", "xai", "shap"]
    },
    {
      id: "ecommerce",
      type: "project",
      featured: true,
      title: "E-commerce Platform Performance: Power BI, Delivery-Time Model & Seller Segmentation",
      short: "E-commerce Analytics (Power BI)",
      subtitle: "Power BI + operations modelling",
      year: "2026",
      categories: ["analytics", "ml"],
      summary: "A Power BI performance review of an e-commerce marketplace, a leakage-aware delivery-time model and a seller segmentation, turned into a prioritised logistics plan.",
      problem: "Order growth had plateaued. Find what is holding the platform back across business, logistics and marketing, and decide where to act first.",
      data: "Marketplace tables for orders, payments, reviews, products, seller leads (MQLs) and closed deals. Columns more than 50% empty were dropped, small gaps were filled with the mode or mean, and missing delivery dates were kept because they reflect order status.",
      method: [
        "Built a Power BI report on order growth, average order value, freight cost share, cancellations by lifecycle stage and delivery times.",
        "Predicted delivery time at the moment of purchase with a linear regression on log distance and buyer and seller state, excluding post-purchase fields to avoid leakage.",
        "Segmented sellers with K-Means, cross-checked with a Gaussian Mixture Model and PCA, on scale, logistics friction, reliability and growth.",
        "Ranked three logistics initiatives with a weighted decision matrix: impact, feasibility, time to value and complexity."
      ],
      result: [
        "Showed growth was capped by last-mile delivery, not sellers: seller handover lateness fell to zero within a month of launch while last-mile times stayed high.",
        "Delivery-time predictions with a mean absolute error of about 7.56 days, against a median delivery of about 10 days, using only information known at purchase.",
        "Predictive delivery estimates ranked first in the decision matrix (49 points against 33 and 30).",
        "Only 10.5% of seller leads converted; 484 strategic sellers formed the core revenue engine, while 488 underperforming sellers carried the most delivery risk."
      ],
      contribution: [
        "Team project with three members."
      ],
      limitations: [
        "An error of about a week is a deliberate trade-off: the model uses only features known at purchase, so it avoids leakage but cannot see later delays."
      ],
      learned: [],
      links: [
        { label: "Power BI report and slides", url: "https://drive.google.com/drive/folders/1D21GyHvmCJ1FEB68dsPvljFtZD31VJuu?usp=sharing" },
        { label: "Analysis files", url: "https://drive.google.com/drive/folders/1Csgp3QMVk0j8Kxi9D9zvR98xEciw2HL-?usp=sharing" }
      ],
      skills: ["da", "bi", "pbi", "dash", "kpi", "py", "pd", "sk", "ml", "reg", "eval", "ps"]
    },
    {
      id: "svc-valuation",
      type: "project",
      featured: true,
      title: "SVC Operating Forecast & FCFE Valuation",
      short: "SVC Forecast & Valuation",
      subtitle: "Forecasting & valuation",
      year: "2026",
      categories: ["finance"],
      summary: "Driver-based FY2026E–FY2030E operating forecast and FCFE valuation, reforecast after Q1 actuals.",
      problem: "Forecast SVC's operations, value the equity, and find which parts of the business actually drive profit.",
      data: "Company financial statements and operating data, analysed in Excel and LSEG Workspace.",
      method: [
        "Built driver-based FY2026E–FY2030E forecasts of revenue, margins, SG&A, working capital and capex.",
        "Valued the equity using free cash flow to equity (FCFE).",
        "Reforecast FY2026 after Q1 actuals and bridged the value change into SG&A and margin-assumption effects."
      ],
      result: [
        "Services generate 37.2% of gross profit from 10.1% of revenue, pointing to after-sales productivity over showroom growth.",
        "Value per share moved from VND 22,918 to VND 17,855 after the Q1 reforecast.",
        "Set service-margin thresholds (above 24% / below 21%) that would change the recommendation."
      ],
      contribution: [],
      limitations: [],
      learned: [],
      links: [
        { label: "Valuation analysis", url: "https://drive.google.com/drive/folders/1tahxT1oXS56IBmr47B9q4Ls8KwOElNh8?usp=drive_link" },
        { label: "Business analysis report", url: "https://drive.google.com/file/d/1QK6RoujLzNLbmB-PcGvT9Li62DlKkRKx/view?usp=sharing" }
      ],
      skills: ["xl", "fa", "fs", "wc", "fc", "scen", "val", "fcfe"]
    },
    {
      id: "fpt-equity",
      type: "project",
      featured: true,
      title: "FPT Equity Research: Forecast, DDM Valuation & Risk-Return",
      short: "FPT Equity Research",
      subtitle: "Equity valuation",
      year: "2026",
      categories: ["finance"],
      summary: "Segment-based FY2026F–FY2030F forecast, two-stage DDM and risk-return analysis behind a Selective BUY/Accumulate call on FPT.",
      problem: "Is FPT worth buying at its current price, and on what terms? Value the shares and set an entry, target and stop-loss a disciplined investor could act on.",
      data: "FPT annual reports (FY2021–FY2025), SSI Research, VietstockFinance and VN-Index price history, with market data such as the 10-year Vietnamese government bond yield. Modelled in an Excel working sheet.",
      method: [
        "Rebuilt the revenue base after FOX was deconsolidated (VND70,113B down to a comparable VND50,606B), then forecast Technology and Education separately because their margins differ sharply.",
        "Estimated the cost of equity with CAPM (risk-free rate 4.37%, Re 9.77%) and a WACC of 9.02% from market-value weights.",
        "Showed that a single-stage Gordon model fails (implied g of 17.64% exceeds Re) and used a two-stage DDM with a 5% terminal growth rate.",
        "Compared FPT with the VN-Index on CAGR, volatility, Sharpe, Treynor and beta, and added a technical entry plan and an ESG review."
      ],
      result: [
        "Forecast revenue rises from VND58.6 trillion (FY2026F) to VND104.6 trillion (FY2030F).",
        "Base-case DDM value is VND60,475 per share; raising terminal growth to 7% lifts it to about VND98,456.",
        "FPT returned 24.49% a year against 6.18% for the VN-Index, with a Sharpe ratio of 0.74 against 0.08 and a beta of 0.93.",
        "Recommended Selective BUY/Accumulate with a VND88,000–98,000 target band and a stop-loss at VND64,000, a reward-to-risk of 3.0–4.7×."
      ],
      contribution: [
        "Individual assignment.",
        "Used ChatGPT-4o for a first draft of the ESG discussion; the final wording was rewritten by hand with further research."
      ],
      limitations: [
        "The base-case DDM value sits below the market price, so the upside depends on sustained growth and a re-rating rather than on dividends alone.",
        "A DDM is conservative for a high-growth company that retains most of its earnings, so it serves as a floor and a cross-check."
      ],
      learned: [],
      links: [
        { label: "Report and working sheet", url: "https://drive.google.com/drive/folders/1SRjhDaoknyNc27-bKVdfF1l_uicVi6ol?usp=drive_link" }
      ],
      skills: ["xl", "fa", "fs", "fc", "scen", "val", "ddm", "inv", "risk"]
    },
    {
      id: "vn30-portfolio",
      type: "project",
      featured: true,
      title: "Equity Portfolio Management: Passive and Two Active VN30 Portfolios",
      short: "VN30 Portfolio Management",
      subtitle: "Portfolio construction",
      year: "2026",
      categories: ["finance"],
      summary: "A nine-stage process that built and evaluated three VND100 billion Vietnamese equity portfolios against the MRP-20 benchmark.",
      problem: "Build one passive and two active portfolios of Vietnamese listed shares, each with VND100 billion, and find out whether the active process beats the benchmark within its security, sector, liquidity and concentration limits.",
      data: "The dated VN30 universe (3 August 2026), company financials, macro data and broker valuation comparisons, evaluated with LSEG portfolio-analytics workbooks.",
      method: [
        "Wrote an investment policy statement, then ran a funnel: eligibility and liquidity screens, a macro transmission gate, an industry attractiveness score and a four-pillar fundamental score.",
        "Narrowed 30 VN30 shares to 19 candidates, of which 12 passed the fundamental gate (8 robustly, 4 on the boundary).",
        "Added a technical entry overlay (moving averages, trend, volume and ATR), then sized positions within the mandate's limits.",
        "Measured return, tracking error, ex-ante risk and sector-allocation versus selection attribution against the MRP-20."
      ],
      result: [
        "The passive portfolio matched the MRP-20 exactly (−2.60%).",
        "Active Portfolio 1 returned +1.50% but trailed the benchmark by 0.74 percentage points.",
        "Active Portfolio 2 lost 1.25% but beat the benchmark by 1.15 percentage points, with +0.96 points from sector allocation and +0.19 points from selection.",
        "Found that the binding constraint was the concentration rule: seven of the twelve eligible shares were banks, but only three could be held."
      ],
      contribution: [
        "Solo project."
      ],
      limitations: [
        "Each active portfolio has only ten daily return observations, so the results cannot show lasting investment skill.",
        "Both active portfolios missed the 90% invested floor, and an order in Active Portfolio 2 was executed at the wrong target weight.",
        "Missing evidence kept Industrials and Real Estate (about 30% of the benchmark) out of the portfolios."
      ],
      learned: [],
      links: [
        { label: "Portfolio report", url: "https://drive.google.com/drive/folders/1YrFwnOL0CixLHb8CvCR-3Og7uxgGdqjt?usp=drive_link" }
      ],
      skills: ["xl", "inv", "port", "risk", "fa", "val", "ps"]
    },
    {
      id: "flfp-regression",
      type: "project",
      featured: true,
      title: "What Drives Female Labour-Force Participation? A Cross-Country Regression",
      short: "Female Labour-Force Regression",
      subtitle: "Econometrics",
      year: "2025",
      categories: ["analytics"],
      summary: "A multiple-regression study of female labour-force participation across 59 lower-income countries, tested for misspecification and heteroskedasticity.",
      problem: "Which social and economic factors explain differences in female labour-force participation between countries, and does the effect of urbanisation depend on women's education?",
      data: "World Bank World Development Indicators for 2022, covering countries below upper-middle income: 66 complete observations, 59 after removing influential points.",
      method: [
        "Handled missing values with complete-case analysis and removed influential points using Cook's distance.",
        "Regressed participation on fertility, urbanisation, education, GDP per capita, legal protection against discrimination and the female wage share, with a squared wage term and an urbanisation × education interaction.",
        "Checked multicollinearity (VIF, with mean-centring), functional form (RESET) and heteroskedasticity (Breusch-Pagan and White) in RStudio.",
        "Ran robustness checks: an alternative interaction, a model without education and a log-fertility specification."
      ],
      result: [
        "Each extra point of fertility rate is linked to about 8.4 points lower participation (significant at 1%).",
        "Countries with laws against gender discrimination show about 13.9 points higher participation (significant at 1%).",
        "The wage share has a U-shaped effect with a turning point near 34.8%; the final model explains 57% of the variation (adjusted R² 0.51) and passes the RESET, Breusch-Pagan and White tests.",
        "Recommended wider access to reproductive health and family planning, and stronger enforcement of anti-discrimination and wage laws."
      ],
      contribution: [],
      limitations: [
        "Education and its interaction term still have high VIFs (above 10).",
        "Urbanisation may be endogenous, and this is discussed but not formally tested.",
        "Dropping education doubles the sample to 118 but cuts the adjusted R² to 0.21, so the results are sensitive to the sample."
      ],
      learned: [],
      links: [
        { label: "Research report", url: "https://docs.google.com/document/d/1IO6zMxTMOcMHNuawFrL7iklzQyXuJW5W/edit?usp=sharing" }
      ],
      skills: ["stat", "econ", "rlang", "da"]
    },

    {
      id: "fba-hdbank",
      type: "project",
      featured: true,
      title: "HDBank Agricultural Value-Chain Financing (Future Business Analyst 2026, Top 15)",
      short: "FBA 2026 · HDBank (Top 15)",
      subtitle: "Business analysis case · Top 15",
      year: "2026",
      categories: ["business", "finance"],
      summary: "A Top 15 entry in Future Business Analyst 2026: a value-chain lending model that gives HDBank visibility over farmers' seasonal cash flows, so it can catch bad loans earlier.",
      problem: "HDBank's NPL ratio rose from 1.65% (Q1 2022) to 2.79% (Q2 2026) while loan-loss coverage fell to 50.01%. As it grows rural and agricultural lending, how can it see and control borrowers' seasonal cash flows early enough to stabilise bad loans without slowing credit growth?",
      data: "Public secondary data only, with no borrower-level personal data: HDBank reports, Vietcap, FiinRatings, the National Statistics Office, VCCI surveys and World Bank research, aligned by period and unit and checked against the original publications.",
      method: [
        "Diagnosed the problem top-down: the macroeconomy, the banking industry, then a CAMEL review of HDBank (capital, asset quality, management, earnings and liquidity).",
        "Turned seven lending challenges and seven case studies into four alternative designs, scored them on seven weighted criteria such as cash-flow visibility and use-of-funds control, and checked that the ranking held under other scores and weights.",
        "Mapped the end-to-end lending process in BPMN, from intake and credit decision to staged disbursement, monitoring, repayment and shortfall handling.",
        "Assessed feasibility and risks (likelihood × impact) and designed a pilot with process and credit-quality KPIs."
      ],
      result: [
        "Recommended a multi-buyer, semi-closed value-chain model, which scored 94 of 100 against 75, 70 and 65 for the alternatives.",
        "Four controls: risk-based assessment on verified partner data, staged payments straight to approved suppliers, production monitoring, and repayment deducted from sales proceeds paid into HDBank accounts.",
        "Proposed a pilot covering one region, one value chain and one crop cycle, with targets such as an early-detection rate of at least 70%, on-time repayment of at least 95% and a pilot NPL ratio of at most 2.2%.",
        "Placed in the Top 15 of Future Business Analyst 2026."
      ],
      contribution: [
        "Team entry."
      ],
      limitations: [
        "The scorecard is illustrative: wider roll-out should depend on pilot results, not on the scores.",
        "Feasibility was the model's weakest criterion (3 of 5), which is why it starts as a pilot.",
        "Collusion on delivery receipts, sales to spot traders outside the repayment channel and climate shocks remain risks that the mitigations must handle in practice."
      ],
      learned: [],
      links: [
        { label: "Competition report", url: "https://drive.google.com/drive/folders/1CKDd-J5icESeanT24GDzZuC9XvDQA3iA?usp=sharing" }
      ],
      skills: ["ps", "bpmn", "fa", "scen", "kpi"]
    },

    /* roles / experience */
    {
      id: "rbac", type: "role",
      title: "Case Team Leader · RMIT Business Analytics Champion",
      short: "RMIT BA Champion",
      subtitle: "RMIT Analytics Club", year: "2024–2025",
      details: [
        "Led a four-member team that designed three analytics competition rounds for 300 teams and 1,000+ participants.",
        "Delivered six case studies with Colgate-Palmolive, Base.vn and WiDS and coordinated 20 academic and industry mentors.",
        "Organised a panel for 100 attendees with a Shopee senior manager."
      ],
      skills: ["ps", "comm", "coord", "pres"]
    },
    {
      id: "ielts", type: "role",
      title: "Private IELTS Tutor", short: "IELTS tutoring",
      subtitle: "Self-employed", year: "2024–now",
      details: ["Individual study plans and progress tracking; learners achieved verified IELTS scores of up to 7.0."],
      skills: ["comm", "coord"]
    },

    /* competitions & awards */
    {
      id: "tomorrow-marketers", type: "competition",
      title: "Top 12 of 200 teams · Tomorrow Marketers Case Competition",
      short: "Tomorrow Marketers",
      subtitle: "Business Analytics & Consulting", year: "2025",
      skills: ["da", "kpi", "ps", "pres"]
    },
    {
      id: "aic", type: "award",
      title: "National Champion · AI Competition (AIC)",
      short: "AIC National Champion",
      subtitle: "Deakin University & FPT University", year: "2023",
      skills: []   // add the skills this competition used, e.g. ["ml"]
    },

    /* certifications */
    { id: "cert-python", type: "certification", title: "Intermediate Python", subtitle: "DataCamp", year: "2025", skills: ["py"] },
    { id: "cert-swe", type: "certification", title: "Foundations of Software Engineering", subtitle: "FullStackDataScience", year: "2025", skills: ["py"] },
    { id: "cert-sql", type: "certification", title: "Intermediate SQL", subtitle: "XomData", year: "2026", skills: ["sql"] },
    { id: "cert-fsa", type: "certification", title: "Corporate Financial Statement Analysis", subtitle: "LinkedIn Learning", year: "2024", skills: ["fa", "fs"] },

    /* coursework (RMIT) */
    { id: "course-ba", type: "course", title: "Introduction to Business Analytics", subtitle: "RMIT", year: "", skills: ["da", "kpi"] },
    { id: "course-fqa", type: "course", title: "Forecasting & Quantitative Analysis", subtitle: "RMIT", year: "", skills: ["stat", "fc"] },
    { id: "course-eco", type: "course", title: "Basic Econometrics", subtitle: "RMIT", year: "", skills: ["stat", "econ"] },
    { id: "course-bdm", type: "course", title: "Business Decision Making", subtitle: "RMIT", year: "", skills: ["ps"] },
    { id: "course-cf", type: "course", title: "Corporate Finance", subtitle: "RMIT", year: "", skills: ["fa", "val"] },
    { id: "course-eq", type: "course", title: "Equity Investment & Portfolio Management", subtitle: "RMIT", year: "", skills: ["inv", "port"] },
    { id: "course-mdm", type: "course", title: "Money & Debt Markets", subtitle: "RMIT", year: "", skills: ["inv"] }
  ],

  /* ------------------------------------------------------------ skill map
     icon names are defined in assets/js/common.js (ICONS).
     proven: true  → can become "Proven" (needs ≥ 2 projects/roles/competitions). */
  tree: [
    {
      id: "analytics", name: "Analytics", icon: "cat_analytics",
      capabilities: [
        { id: "da", name: "Data Analysis", icon: "magnify",
          description: "Turning raw business data into answers: cleaning, joining, aggregating and explaining what changed.",
          skills: [
            { id: "sql", name: "SQL", icon: "db", description: "Currently strengthening: joins, CTEs and window functions on business data." },
            { id: "xl", name: "Excel", icon: "sheet", description: "Linked forecasting models with sensitivity and scenario tables." }
          ] },
        { id: "bi", name: "BI & Reporting", icon: "pie",
          description: "Reports and dashboards that make performance easy to read and act on.",
          skills: [
            { id: "pbi", name: "Power BI", icon: "bars_v", description: "Marketplace performance report: growth, order value, freight costs, cancellations and delivery times." },
            { id: "dash", name: "Dashboarding", icon: "dashboard", description: "Designing dashboards around the decisions they support." },
            { id: "kpi", name: "KPI Analysis", icon: "target", description: "Choosing, defining and tracking the metrics that matter to a business." }
          ] }
      ]
    },
    {
      id: "data", name: "Data / ML", icon: "cat_data",
      capabilities: [
        { id: "py", name: "Python", icon: "code",
          description: "Used for data preparation, analysis and modelling.",
          skills: [
            { id: "pd", name: "pandas", icon: "table", description: "Cleaning, merging and reshaping tabular data." },
            { id: "sk", name: "scikit-learn", icon: "package", description: "Training and comparing machine-learning models." }
          ] },
        { id: "stat", name: "Statistics", icon: "dist",
          description: "Distributions, calibration and inference behind the models and forecasts.",
          skills: [
            { id: "econ", name: "Econometrics", icon: "fit", description: "Multiple regression with diagnostics: VIF, RESET, Breusch-Pagan and White tests, Cook's distance." },
            { id: "rlang", name: "R / RStudio", icon: "rlang", description: "Estimating and testing regression models in R." }
          ] },
        { id: "ml", name: "Machine Learning", icon: "network",
          description: "Supervised models for credit risk and delivery-time prediction.",
          skills: [
            { id: "cls", name: "Classification", icon: "classes", description: "Predicting categories such as default / no default." },
            { id: "reg", name: "Regression", icon: "fit", description: "Predicting continuous values such as delivery time." },
            { id: "eval", name: "Model Evaluation", icon: "gauge", description: "Calibration, error metrics, leakage checks and fairness." }
          ] },
        { id: "xai", name: "Explainability", icon: "eye",
          description: "Making model decisions understandable to non-technical stakeholders.",
          skills: [
            { id: "shap", name: "SHAP", icon: "bars_h", description: "Feature-level explanations of individual predictions." }
          ] }
      ]
    },
    {
      id: "finance", name: "Finance", icon: "cat_finance",
      capabilities: [
        { id: "fa", name: "Financial Analysis", icon: "report",
          description: "Reading and reconciling financial statements to understand performance.",
          skills: [
            { id: "fs", name: "Financial Statements", icon: "doc", description: "Income statement, balance sheet and cash-flow analysis." },
            { id: "wc", name: "Working Capital", icon: "cycle", description: "Receivables, inventory and payables in the cash cycle." }
          ] },
        { id: "fc", name: "Forecasting", icon: "trend",
          description: "Driver-based forecasts of revenue, margins, SG&A, working capital and capex.",
          skills: [
            { id: "scen", name: "Scenario Analysis", icon: "branch", description: "Thresholds and scenarios that would change a recommendation." }
          ] },
        { id: "val", name: "Valuation", icon: "tag",
          description: "Turning forecasts into a value per share.",
          skills: [
            { id: "fcfe", name: "FCFE", icon: "cashflow", description: "Free cash flow to equity valuation." },
            { id: "ddm", name: "DDM & WACC", icon: "coins", description: "Two-stage dividend discount model, CAPM cost of equity and WACC." }
          ] },
        { id: "inv", name: "Investment Analysis", icon: "candle",
          description: "Building an investment thesis, constructing portfolios and judging the result against a benchmark.",
          skills: [
            { id: "port", name: "Portfolio Construction", icon: "layers", description: "Screening a universe, scoring candidates and sizing positions within mandate limits." },
            { id: "risk", name: "Risk & Performance", icon: "shield", description: "Beta, Sharpe and Treynor ratios, tracking error and performance attribution." }
          ] }
      ]
    },
    {
      id: "business", name: "Business", icon: "cat_business",
      capabilities: [
        { id: "ps", name: "Problem Structuring", icon: "hierarchy", proven: true,
          description: "Breaking open-ended business questions into analysable parts.", skills: [] },
        { id: "comm", name: "Stakeholder Communication", icon: "bubbles", proven: true,
          description: "Working with partners, mentors and learners to keep everyone aligned.", skills: [] },
        { id: "coord", name: "Project Coordination", icon: "check", proven: true,
          description: "Planning, tracking and delivering multi-person projects.", skills: [] },
        { id: "bpmn", name: "Process Design (BPMN)", icon: "flow",
          description: "Mapping end-to-end business processes, hand-offs and controls in BPMN.", skills: [] },
        { id: "pres", name: "Presentation", icon: "present",
          description: "Presenting analysis and recommendations to an audience.", skills: [] }
      ]
    }
  ],

  /* ----------------------------------------------------------- milestones
     kind: "featured" (one only) | "standard" | "upcoming"                   */
  milestones: [
    { year: "2023", title: "National Champion", subtitle: "AI Competition (AIC) · Deakin & FPT", kind: "featured", icon: "trophy" },
    { year: "2024 – 2025", title: "Case Team Leader", subtitle: "RMIT Business Analytics Champion", kind: "standard", icon: "flag" },
    { year: "2025", title: "Top 12 of 200 teams", subtitle: "Tomorrow Marketers case competition", kind: "standard", icon: "star" },
    { year: "2026", title: "Top 15", subtitle: "Future Business Analyst 2026 · HDBank case", kind: "standard", icon: "star" },
    { year: "Jan 2027", title: "Graduation", subtitle: "RMIT · Finance; Business & Technology", kind: "upcoming", icon: "cap" }
  ],

  /* ------------------------------------------------------ recommendations */
  recommendations: [
    { name: "Dr Huy Pham", role: "Associate Professor of Finance, RMIT University Vietnam · Corporate Finance lecturer",
      url: "https://drive.google.com/file/d/1NyH1JkcsLc3xe0ZUlW-55_nETcYJJQBj/view?usp=sharing" },
    { name: "Dr Chung Phan", role: "Lecturer in Economics and Finance, RMIT University Vietnam · RBAC academic mentor",
      url: "https://drive.google.com/file/d/10icxC45NZ1jSOsfW47gUyked7GQoBn7Q/view?usp=sharing" }
  ]
};
