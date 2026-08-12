(function (global) {
  "use strict";

  const CONFIG = global.EXAM_PLATFORM_CONFIG || {};
  const APP_VERSION = CONFIG.APP_VERSION || "1.0.0";
  const STORAGE_KEY = "math3_extraordinary_exam_draft_v1";
  const PASSING_SCORE = 70;

  const SCORE_CONFIG = {
    sectionI: 20,
    sectionII: 10,
    sectionIII: 20,
    sectionIV: 20,
    sectionV: 10,
    sectionVI: 20,
    sectionIPerQuestion: 2,
    sectionIIPerQuestion: 5,
    sectionIIIPerQuestion: 5,
    ruffiniQuotient: 8,
    ruffiniRemainder: 2,
    sectionVPerQuestion: 5,
    vennRegion: 2.5,
    vennQuestion: 5
  };

  const FORMULA_REMINDERS = [
    "Evaluación de polinomios: sustituye x por el valor indicado, respeta paréntesis y calcula potencias antes que multiplicaciones, sumas y restas.",
    "Ecuaciones lineales: realiza la misma operación en ambos miembros hasta aislar x.",
    "Inecuaciones: aísla x y recuerda que el signo cambia solamente al multiplicar o dividir por un número negativo.",
    "Ruffini: identifica la raíz del divisor; para x - a se usa a y para x + a se usa -a; baja el primer coeficiente, multiplica, suma y repite; el último valor es el resto.",
    "Suma de polinomios: combina términos semejantes.",
    "Resta de polinomios: distribuye primero el signo negativo al segundo polinomio y luego combina términos semejantes.",
    "Venn: coloca primero la intersección, réstala de cada total y comprueba que todas las regiones, incluida ninguna, sumen el universo."
  ];

  const EXAM_SECTIONS = [
    {
      id: "sectionI",
      short: "I",
      title: "Selección múltiple",
      points: 20,
      intro: "Lee cada definición y marca la alternativa correcta.",
      questions: [
        choice("i1", "Expresión algebraica compuesta por la suma de uno o más monomios.", ["Polinomio", "Desigualdad", "Ecuación", "Inecuación"], "A", "Un polinomio está formado por uno o más monomios sumados o restados."),
        choice("i2", "Es una expresión matemática que muestra que dos cantidades no son iguales.", ["Ecuación", "Igualdad", "Desigualdad", "Exponente"], "C", "Una desigualdad compara cantidades que no son necesariamente iguales."),
        choice("i3", "Una igualdad matemática que contiene una variable elevada a la primera potencia.", ["Igualdad", "Polinomio", "Ecuación", "Suma"], "C", "Una ecuación lineal es una igualdad con variable de primer grado."),
        choice("i4", "Es una desigualdad que involucra una variable con exponente 1.", ["Exponente", "Inecuación", "Igualación", "Sistema de ecuación"], "B", "La inecuación lineal usa signos de desigualdad y una variable de primer grado."),
        choice("i5", "Conjunto de dos o más ecuaciones lineales con dos incógnitas que se resuelven para encontrar el valor de las variables.", ["Sistema de ecuación", "Ecuación", "Inecuación", "Polinomio"], "A", "Un sistema reúne varias ecuaciones que se cumplen al mismo tiempo."),
        choice("i6", "Consiste en sacar fuera del paréntesis el número o variable que es común en el polinomio.", ["Factor por agrupación", "Término", "Factor común", "Variable"], "C", "El factor común es el elemento repetido que se extrae de todos los términos."),
        choice("i7", "En una función, la variable independiente generalmente se representa con:", ["y", "a", "x", "b"], "C", "Por convención, x suele representar la variable independiente."),
        choice("i8", "El dominio de una función es:", ["El conjunto de resultados", "El conjunto de valores de la variable independiente", "El conjunto de coeficientes", "El grado del polinomio"], "B", "El dominio contiene los valores que puede tomar la variable independiente."),
        choice("i9", "¿Cuál de las siguientes gráficas representa una función?", ["Un círculo", "Una recta vertical", "Una parábola vertical", "Dos líneas verticales"], "C", "Una parábola vertical pasa la prueba de la recta vertical."),
        choice("i10", "La gráfica de una función cuadrática tiene forma de:", ["Recta", "Circunferencia", "Parábola", "Triángulo"], "C", "Las funciones cuadráticas se representan con parábolas.")
      ]
    },
    {
      id: "sectionII",
      short: "II",
      title: "Evaluación de polinomios",
      points: 10,
      intro: "Calcula el valor del polinomio en el número indicado.",
      questions: [
        numberQuestion("ii1", "\\(P(x)=3x^2-2x+5\\) para \\(P(4)\\).", 45, "Sustituye x por 4: 3(4²) - 2(4) + 5 = 48 - 8 + 5 = 45."),
        numberQuestion("ii2", "\\(Q(x)=2x^3-x^2+4x-7\\) para \\(Q(2)\\).", 13, "Sustituye x por 2: 2(8) - 4 + 8 - 7 = 13.")
      ]
    },
    {
      id: "sectionIII",
      short: "III",
      title: "Ecuaciones e inecuaciones",
      points: 20,
      intro: "Resuelve cada ejercicio y escribe la solución de x.",
      questions: [
        relationQuestion("iii1", "\\(3x+5=14\\)", { kind: "eq", value: 3 }, "Resta 5 en ambos miembros: 3x = 9. Divide entre 3: x = 3."),
        relationQuestion("iii2", "\\(2x-7=9\\)", { kind: "eq", value: 8 }, "Suma 7 en ambos miembros: 2x = 16. Divide entre 2: x = 8."),
        relationQuestion("iii3", "\\(7x-5<16\\)", { kind: "lt", value: 3 }, "Suma 5: 7x < 21. Divide entre 7: x < 3."),
        relationQuestion("iii4", "\\(2x+4\\le 10\\)", { kind: "le", value: 3 }, "Resta 4: 2x <= 6. Divide entre 2: x <= 3.")
      ]
    },
    {
      id: "sectionIV",
      short: "IV",
      title: "Regla de Ruffini",
      points: 20,
      intro: "Completa cociente y resto. Puedes usar la cuadrícula como guía.",
      questions: [
        ruffiniQuestion("iv1", "\\((x^3-4x^2+x+6)\\div(x-2)\\)", [1, -4, 1, 6], 2, "x^2 - 2x - 3", 0, "Con raíz 2: los coeficientes producen cociente x² - 2x - 3 y resto 0."),
        ruffiniQuestion("iv2", "\\((x^3+2x^2-5x-6)\\div(x+1)\\)", [1, 2, -5, -6], -1, "x^2 + x - 6", 0, "Con raíz -1: los coeficientes producen cociente x² + x - 6 y resto 0.")
      ]
    },
    {
      id: "sectionV",
      short: "V",
      title: "Operaciones con polinomios",
      points: 10,
      intro: "Sean \\(P(x)=3x^2+5x-2\\) y \\(Q(x)=2x^2-4x+7\\).",
      questions: [
        polynomialQuestion("v1", "\\(P(x)+Q(x)\\)", "5x^2 + x + 5", "Suma términos semejantes: (3x² + 2x²) + (5x - 4x) + (-2 + 7)."),
        polynomialQuestion("v2", "\\(P(x)-Q(x)\\)", "x^2 + 9x - 9", "Distribuye el signo negativo: 3x² + 5x - 2 - 2x² + 4x - 7.")
      ]
    },
    {
      id: "sectionVI",
      short: "VI",
      title: "Diagrama de Venn-Euler",
      points: 20,
      intro: "50 estudiantes: 28 usan videojuegos, 26 edición de música, 12 ambas y 8 ninguna.",
      questions: [
        {
          id: "vi1",
          type: "venn",
          prompt: "Coloca cada cantidad en la región correspondiente.",
          points: 10,
          fields: [
            { key: "gamesOnly", label: "Solo videojuegos", answer: 16 },
            { key: "both", label: "Ambas", answer: 12 },
            { key: "musicOnly", label: "Solo edición de música", answer: 14 },
            { key: "none", label: "Ninguna", answer: 8 }
          ],
          explanation: "Primero va la intersección: 12. Solo videojuegos es 28 - 12 = 16; solo música es 26 - 12 = 14; ninguna es 8."
        },
        numberQuestion("vi2", "¿Cuántos estudiantes usan solamente aplicaciones de videojuegos?", 16, "Solo videojuegos = total de videojuegos - ambas = 28 - 12 = 16.", 5),
        numberQuestion("vi3", "¿Cuántos estudiantes usan solamente aplicaciones de edición de música?", 14, "Solo edición de música = total de música - ambas = 26 - 12 = 14.", 5)
      ]
    }
  ];

  function choice(id, prompt, options, answer, explanation) {
    return { id, type: "choice", prompt, options, answer, points: SCORE_CONFIG.sectionIPerQuestion, explanation };
  }

  function numberQuestion(id, prompt, answer, explanation, points) {
    return { id, type: "number", prompt, answer, points: points || SCORE_CONFIG.sectionIIPerQuestion, explanation };
  }

  function relationQuestion(id, prompt, answer, explanation) {
    return { id, type: "relation", prompt, answer, points: SCORE_CONFIG.sectionIIIPerQuestion, explanation };
  }

  function polynomialQuestion(id, prompt, answer, explanation) {
    return { id, type: "polynomial", prompt, answer, points: SCORE_CONFIG.sectionVPerQuestion, explanation };
  }

  function ruffiniQuestion(id, prompt, coefficients, root, quotient, remainder, explanation) {
    return {
      id,
      type: "ruffini",
      prompt,
      coefficients,
      root,
      points: SCORE_CONFIG.ruffiniQuotient + SCORE_CONFIG.ruffiniRemainder,
      fields: {
        quotient: { answer: quotient, points: SCORE_CONFIG.ruffiniQuotient },
        remainder: { answer: remainder, points: SCORE_CONFIG.ruffiniRemainder }
      },
      explanation
    };
  }

  const state = {
    screen: "intro",
    currentSection: 0,
    student: {
      name: "",
      code: "",
      course: "3.º de secundaria",
      section: "",
      email: "",
      ownWork: false
    },
    answers: {},
    attemptId: "",
    startedAt: "",
    submittedAt: "",
    submitted: false,
    result: null,
    sendStatus: "idle",
    sendMessage: ""
  };

  let appRoot = null;
  let activeMathInput = null;
  let sendInProgress = false;

  function init() {
    appRoot = document.getElementById("app");
    if (!appRoot) return;
    loadDraft();
    render();
  }

  function validateScoreConfig() {
    const total = SCORE_CONFIG.sectionI + SCORE_CONFIG.sectionII + SCORE_CONFIG.sectionIII + SCORE_CONFIG.sectionIV + SCORE_CONFIG.sectionV + SCORE_CONFIG.sectionVI;
    return Math.abs(total - 100) < 0.0001;
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      Object.assign(state, saved);
      state.student = Object.assign({
        name: "",
        code: "",
        course: "3.º de secundaria",
        section: "",
        email: "",
        ownWork: false
      }, saved.student || {});
      state.answers = saved.answers || {};
    } catch (_error) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        screen: state.screen,
        currentSection: state.currentSection,
        student: state.student,
        answers: state.answers,
        attemptId: state.attemptId,
        startedAt: state.startedAt,
        submittedAt: state.submittedAt,
        submitted: state.submitted,
        result: state.result,
        sendStatus: state.sendStatus,
        sendMessage: state.sendMessage
      }));
    } catch (_error) {
      state.sendMessage = "No se pudo guardar el progreso en este navegador.";
    }
  }

  function render() {
    document.documentElement.dataset.theme = localStorage.getItem("math3_theme") || "light";
    appRoot.innerHTML = "";
    appRoot.appendChild(buildTopbar());
    if (!validateScoreConfig()) {
      appRoot.appendChild(configErrorView());
      return;
    }
    if (state.screen === "results" || state.submitted) {
      appRoot.appendChild(resultsView());
    } else if (state.screen === "exam") {
      appRoot.appendChild(examView());
      appRoot.appendChild(mathKeyboard());
    } else if (state.screen === "review") {
      appRoot.appendChild(reviewView());
    } else {
      appRoot.appendChild(introView());
    }
    typesetMath();
  }

  function buildTopbar() {
    const top = el("header", "topbar");
    const brand = el("div", "brand-lockup");
    const title = el("strong");
    title.textContent = "Examen extraordinario de Matemáticas";
    const sub = el("span");
    sub.textContent = "3.º de secundaria";
    brand.append(title, sub);
    const themeButton = el("button", "ghost-action");
    themeButton.type = "button";
    themeButton.textContent = (document.documentElement.dataset.theme === "dark") ? "Modo claro" : "Modo oscuro";
    themeButton.addEventListener("click", () => {
      const next = (document.documentElement.dataset.theme === "dark") ? "light" : "dark";
      localStorage.setItem("math3_theme", next);
      render();
    });
    top.append(brand, themeButton);
    return top;
  }

  function configErrorView() {
    const panel = el("main", "surface");
    panel.append(textBlock("h1", "Error de configuración"));
    panel.append(textBlock("p", "La suma de SCORE_CONFIG debe ser exactamente 100 puntos. Corrige app.js antes de usar el examen."));
    return panel;
  }

  function introView() {
    const main = el("main");
    const hero = el("section", "hero-panel");
    const grid = el("div", "hero-grid");
    const copy = el("div");
    copy.append(textBlock("p", "Plataforma autoevaluable", "eyebrow"));
    copy.append(textBlock("h1", "Examen extraordinario de Matemáticas"));
    copy.append(textBlock("p", "Completa el examen, revisa tus pendientes y entrega para recibir calificación sobre 100 con retroalimentación inmediata."));
    const meta = el("div", "meta-strip");
    [
      ["Curso", "3.º de secundaria"],
      ["Docente", "Francia Pérez Villa"],
      ["Centro", "Politécnico Arístides García Mella"],
      ["Intento", state.attemptId || "Se generará al iniciar"]
    ].forEach(([label, value]) => meta.append(metaPill(label, value)));
    copy.append(meta);

    const art = el("div", "intro-art");
    const formula = el("div", "formula-card");
    [["P(4)", "45"], ["x < 3", "Inecuación"], ["Venn", "50 estudiantes"]].forEach(([a, b]) => {
      const row = el("div", "formula-row");
      row.append(textBlock("span", a), textBlock("span", b));
      formula.append(row);
    });
    art.append(formula);
    grid.append(copy, art);
    hero.append(grid);
    main.append(hero);

    const form = el("section", "surface");
    form.append(textBlock("h2", "Datos del estudiante"));
    const alert = el("div", "alert");
    alert.textContent = "Nombre y sección son obligatorios. El correo es opcional.";
    form.append(alert);
    const gridForm = el("div", "form-grid");
    gridForm.append(
      field("Nombre completo", "student-name", "text", state.student.name, "Ej.: María López", true),
      field("Número o código", "student-code", "text", state.student.code, "Opcional", false),
      fixedField("Curso", state.student.course),
      selectField("Sección", "student-section", state.student.section, ["", "A", "B", "C", "D"], true),
      field("Correo del estudiante", "student-email", "email", state.student.email, "Opcional", false)
    );
    form.append(gridForm);
    const own = el("label", "checkbox-line");
    const ownInput = el("input");
    ownInput.type = "checkbox";
    ownInput.id = "student-own";
    ownInput.checked = Boolean(state.student.ownWork);
    ownInput.addEventListener("change", () => {
      state.student.ownWork = ownInput.checked;
      saveDraft();
    });
    own.append(ownInput, textBlock("span", "Confirmo que las respuestas son propias."));
    form.append(own);
    const msg = el("div", "status-note");
    msg.id = "intro-message";
    const actions = el("div", "toolbar");
    const start = el("button", "primary-action");
    start.type = "button";
    start.textContent = state.attemptId ? "Continuar" : "Iniciar examen";
    start.addEventListener("click", startExam);
    actions.append(start);
    form.append(msg, actions);
    main.append(form);
    bindStudentFields();
    return main;
  }

  function bindStudentFields() {
    const pairs = [
      ["student-name", "name"],
      ["student-code", "code"],
      ["student-section", "section"],
      ["student-email", "email"]
    ];
    setTimeout(() => {
      pairs.forEach(([id, key]) => {
        const node = document.getElementById(id);
        if (!node) return;
        node.addEventListener("input", () => {
          state.student[key] = node.value;
          saveDraft();
        });
      });
    }, 0);
  }

  function startExam() {
    const message = document.getElementById("intro-message");
    if (!state.student.name.trim() || !state.student.section) {
      message.textContent = "Completa el nombre y la sección para iniciar.";
      return;
    }
    if (!state.student.ownWork) {
      message.textContent = "Marca la confirmación de respuestas propias para continuar.";
      return;
    }
    if (!state.attemptId) state.attemptId = createAttemptId();
    if (!state.startedAt) state.startedAt = localDateTime();
    state.screen = "exam";
    saveDraft();
    render();
  }

  function examView() {
    const layout = el("main", "app-layout");
    layout.append(progressPanel());
    const section = EXAM_SECTIONS[state.currentSection];
    const card = el("section", "exam-card");
    const header = el("div", "section-header");
    header.append(textBlock("p", `Sección ${section.short}`, "eyebrow"));
    header.append(textBlock("h1", section.title));
    header.append(textBlock("p", section.intro));
    header.append(textBlock("div", `${section.points} puntos`, "section-points"));
    card.append(header);
    if (["sectionII", "sectionIII", "sectionIV", "sectionV", "sectionVI"].includes(section.id)) {
      card.append(formulaReminder());
    }
    const list = el("div", "question-list");
    section.questions.forEach((question, index) => list.append(renderQuestion(question, index + 1)));
    card.append(list);
    card.append(examToolbar());
    layout.append(card);
    return layout;
  }

  function progressPanel() {
    const panel = el("aside", "progress-panel");
    panel.append(textBlock("h2", "Progreso"));
    const answered = countAnswered();
    const total = countQuestions();
    panel.append(textBlock("p", `${answered} de ${total} preguntas respondidas.`));
    const bar = el("div", "progress-bar");
    const fill = el("div", "progress-fill");
    fill.style.width = `${Math.round((answered / total) * 100)}%`;
    bar.append(fill);
    panel.append(bar);
    const nav = el("div", "section-nav");
    EXAM_SECTIONS.forEach((section, index) => {
      const button = el("button", index === state.currentSection ? "active" : "");
      button.type = "button";
      button.textContent = `${section.short}. ${section.title}`;
      button.addEventListener("click", () => {
        state.currentSection = index;
        saveDraft();
        render();
      });
      nav.append(button);
    });
    panel.append(nav);
    const save = el("button", "secondary-action");
    save.type = "button";
    save.textContent = "Guardar progreso";
    save.addEventListener("click", () => {
      saveDraft();
      save.textContent = "Guardado";
      setTimeout(() => { save.textContent = "Guardar progreso"; }, 1200);
    });
    panel.append(el("div", "toolbar", [save]));
    return panel;
  }

  function formulaReminder() {
    const details = el("details", "formulas");
    const summary = el("summary");
    summary.textContent = "Recordatorio de fórmulas y procedimientos";
    const ul = el("ul");
    FORMULA_REMINDERS.forEach((item) => ul.append(textBlock("li", item)));
    details.append(summary, ul);
    return details;
  }

  function renderQuestion(question, number) {
    const wrap = el("article", "question");
    wrap.append(textBlock("div", String(number), "question-number"));
    const prompt = textBlock("p", question.prompt, "choice-title");
    if (question.prompt.includes("\\(")) prompt.classList.add("math-expression");
    wrap.append(prompt);
    if (question.type === "choice") renderChoice(wrap, question);
    if (question.type === "number" || question.type === "relation" || question.type === "polynomial") {
      renderSingleInput(wrap, question, question.type === "number" ? "number" : "text");
    }
    if (question.type === "ruffini") renderRuffini(wrap, question);
    if (question.type === "venn") renderVenn(wrap, question);
    return wrap;
  }

  function renderChoice(wrap, question) {
    const list = el("div", "choice-list");
    question.options.forEach((option, index) => {
      const letter = String.fromCharCode(65 + index);
      const id = `${question.id}-${letter}`;
      const label = el("label", "choice-option");
      const input = el("input");
      input.type = "radio";
      input.name = question.id;
      input.id = id;
      input.value = letter;
      input.checked = state.answers[question.id] === letter;
      input.addEventListener("change", () => {
        state.answers[question.id] = letter;
        saveDraft();
        render();
      });
      label.append(input, textBlock("span", `${letter}) ${option}`));
      list.append(label);
    });
    wrap.append(list);
  }

  function renderSingleInput(wrap, question, inputType) {
    const id = `${question.id}-answer`;
    const container = el("div", "field");
    const label = el("label");
    label.htmlFor = id;
    label.textContent = "Respuesta";
    const input = el("input");
    input.type = inputType;
    input.inputMode = inputType === "number" ? "numeric" : "text";
    input.id = id;
    input.value = state.answers[question.id] || "";
    if (question.type !== "number") input.classList.add("math-input");
    input.autocomplete = "off";
    input.addEventListener("input", () => {
      state.answers[question.id] = input.value;
      saveDraft();
    });
    attachMathFocus(input);
    container.append(label, input);
    wrap.append(container);
  }

  function renderRuffini(wrap, question) {
    const grid = el("div", "ruffini-grid");
    grid.append(textBlock("div", `Raíz ${question.root}`, "ruffini-cell"));
    question.coefficients.forEach((coefficient) => grid.append(textBlock("div", String(coefficient), "ruffini-cell")));
    wrap.append(grid);
    const pair = el("div", "field-pair");
    pair.append(compoundInput(question.id, "quotient", "Cociente", "text", true));
    pair.append(compoundInput(question.id, "remainder", "Resto", "number", false));
    wrap.append(pair);
  }

  function renderVenn(wrap, question) {
    const venn = el("div", "venn-wrap");
    const diagram = el("div", "venn-diagram");
    diagram.append(el("div", "venn-circle venn-left"));
    diagram.append(el("div", "venn-circle venn-right"));
    diagram.append(textBlock("div", "Videojuegos", "venn-label left"));
    diagram.append(textBlock("div", "Edición de música", "venn-label right"));
    const positions = ["venn-only-left", "venn-both", "venn-only-right", "venn-none"];
    question.fields.forEach((fieldInfo, index) => {
      const holder = el("div", `venn-input ${positions[index]}`);
      const input = el("input");
      input.type = "number";
      input.inputMode = "numeric";
      input.ariaLabel = fieldInfo.label;
      input.value = getCompoundAnswer(question.id, fieldInfo.key);
      input.addEventListener("input", () => setCompoundAnswer(question.id, fieldInfo.key, input.value));
      holder.append(input);
      diagram.append(holder);
    });
    const legend = el("div", "venn-legend");
    question.fields.forEach((fieldInfo) => legend.append(textBlock("div", fieldInfo.label)));
    venn.append(diagram, legend);
    wrap.append(venn);
  }

  function compoundInput(questionId, key, labelText, type, math) {
    const id = `${questionId}-${key}`;
    const fieldWrap = el("div", "field");
    const label = el("label");
    label.htmlFor = id;
    label.textContent = labelText;
    const input = el("input");
    input.id = id;
    input.type = type;
    input.inputMode = type === "number" ? "numeric" : "text";
    input.value = getCompoundAnswer(questionId, key);
    if (math) input.classList.add("math-input");
    input.autocomplete = "off";
    input.addEventListener("input", () => setCompoundAnswer(questionId, key, input.value));
    attachMathFocus(input);
    fieldWrap.append(label, input);
    return fieldWrap;
  }

  function getCompoundAnswer(questionId, key) {
    return (state.answers[questionId] && state.answers[questionId][key]) || "";
  }

  function setCompoundAnswer(questionId, key, value) {
    if (!state.answers[questionId] || typeof state.answers[questionId] !== "object") state.answers[questionId] = {};
    state.answers[questionId][key] = value;
    saveDraft();
  }

  function examToolbar() {
    const toolbar = el("div", "toolbar");
    const prev = el("button", "secondary-action");
    prev.type = "button";
    prev.textContent = "Anterior";
    prev.disabled = state.currentSection === 0;
    prev.addEventListener("click", () => {
      state.currentSection = Math.max(0, state.currentSection - 1);
      saveDraft();
      render();
    });
    const next = el("button", "secondary-action");
    next.type = "button";
    next.textContent = state.currentSection === EXAM_SECTIONS.length - 1 ? "Revisar respuestas" : "Siguiente";
    next.addEventListener("click", () => {
      if (state.currentSection === EXAM_SECTIONS.length - 1) {
        state.screen = "review";
      } else {
        state.currentSection += 1;
      }
      saveDraft();
      render();
    });
    const review = el("button", "primary-action");
    review.type = "button";
    review.textContent = "Revisar respuestas";
    review.addEventListener("click", () => {
      state.screen = "review";
      saveDraft();
      render();
    });
    toolbar.append(prev, next, review);
    return toolbar;
  }

  function reviewView() {
    const main = el("main");
    const panel = el("section", "surface");
    panel.append(textBlock("p", "Antes de entregar", "eyebrow"));
    panel.append(textBlock("h1", "Revisa tu intento"));
    const pending = unansweredItems();
    const strip = el("div", "review-strip");
    strip.append(metaPill("Respondidas", `${countAnswered()} de ${countQuestions()}`));
    strip.append(metaPill("Pendientes", String(pending.length)));
    strip.append(metaPill("Intento", state.attemptId || "Sin iniciar"));
    strip.append(metaPill("Fecha local", state.startedAt || "Sin iniciar"));
    panel.append(strip);
    if (pending.length) {
      const alert = el("div", "alert");
      alert.textContent = `Tienes ${pending.length} pregunta(s) pendiente(s): ${pending.join(", ")}. Puedes entregar, pero aparecerán como no respondidas.`;
      panel.append(alert);
    }
    const grid = el("div", "review-grid");
    EXAM_SECTIONS.forEach((section, index) => {
      const card = el("article", "summary-card");
      card.append(textBlock("h3", `${section.short}. ${section.title}`));
      const sectionPending = unansweredItems(section.id);
      card.append(textBlock("p", sectionPending.length ? `Pendientes: ${sectionPending.join(", ")}` : "Todo respondido."));
      const go = el("button", "secondary-action");
      go.type = "button";
      go.textContent = "Editar sección";
      go.addEventListener("click", () => {
        state.currentSection = index;
        state.screen = "exam";
        saveDraft();
        render();
      });
      card.append(go);
      grid.append(card);
    });
    panel.append(grid);
    const toolbar = el("div", "toolbar");
    const back = el("button", "secondary-action");
    back.type = "button";
    back.textContent = "Continuar";
    back.addEventListener("click", () => {
      state.screen = "exam";
      saveDraft();
      render();
    });
    const submit = el("button", "danger-action");
    submit.type = "button";
    submit.textContent = "Entregar examen";
    submit.addEventListener("click", submitExam);
    toolbar.append(back, submit);
    panel.append(toolbar);
    main.append(panel);
    return main;
  }

  async function submitExam() {
    if (!confirm("¿Entregar el examen ahora? Después de entregar se bloqueará este intento.")) return;
    state.submittedAt = localDateTime();
    state.submitted = true;
    state.screen = "results";
    state.result = gradeExam(state.answers);
    saveDraft();
    render();
    if (getEndpoint()) await sendReport();
  }

  function resultsView() {
    const main = el("main");
    const result = state.result || gradeExam(state.answers);
    const panel = el("section", "hero-panel");
    panel.append(textBlock("p", "Intento entregado", "eyebrow"));
    panel.append(textBlock("h1", `${result.total.toFixed(1).replace(".0", "")}/100 puntos`));
    const status = textBlock("p", result.total >= PASSING_SCORE ? "Estado: aprobado" : "Estado: no aprobado", result.total >= PASSING_SCORE ? "status-good" : "status-bad");
    panel.append(status);
    const strip = el("div", "score-strip");
    strip.append(metaPill("Porcentaje", `${result.total.toFixed(1)}%`));
    strip.append(metaPill("Nota mínima", `${PASSING_SCORE}/100`));
    strip.append(metaPill("Intento", state.attemptId));
    strip.append(metaPill("Entregado", state.submittedAt));
    panel.append(strip);
    main.append(panel);

    const results = el("section", "surface");
    results.append(textBlock("h2", "Resultado por sección"));
    const grid = el("div", "results-grid");
    EXAM_SECTIONS.forEach((section) => {
      const card = el("article", "result-card");
      card.append(textBlock("h3", `${section.short}. ${section.title}`));
      card.append(textBlock("p", `${formatScore(result.sections[section.id] || 0)} / ${section.points} puntos`));
      grid.append(card);
    });
    results.append(grid);
    const sendBox = el("div", "alert");
    sendBox.textContent = sendStatusText();
    results.append(sendBox);
    const actions = el("div", "toolbar download-row");
    const retry = el("button", "secondary-action");
    retry.type = "button";
    retry.textContent = "Reintentar envío";
    retry.disabled = !getEndpoint() || sendInProgress;
    retry.addEventListener("click", sendReport);
    const txt = el("button", "secondary-action");
    txt.type = "button";
    txt.textContent = "Descargar TXT";
    txt.addEventListener("click", () => downloadFile("informe-examen.txt", buildReportText(result), "text/plain;charset=utf-8"));
    const csv = el("button", "secondary-action");
    csv.type = "button";
    csv.textContent = "Descargar CSV";
    csv.addEventListener("click", () => downloadFile("informe-examen.csv", buildReportCsv(result), "text/csv;charset=utf-8"));
    const restart = el("button", "danger-action");
    restart.type = "button";
    restart.textContent = "Iniciar otro intento";
    restart.addEventListener("click", resetAttempt);
    actions.append(retry, txt, csv, restart);
    results.append(actions);
    main.append(results);
    main.append(feedbackView(result));
    return main;
  }

  function sendStatusText() {
    if (!getEndpoint()) return "El envío al docente no está configurado. La corrección funciona y puedes descargar el informe.";
    if (state.sendStatus === "sending") return "Enviando informe al docente...";
    if (state.sendStatus === "sent") return "Informe enviado correctamente.";
    if (state.sendStatus === "failed") return `No se pudo enviar. ${state.sendMessage || "Puedes reintentar o descargar el informe."}`;
    return "El informe está listo para enviarse al docente.";
  }

  function feedbackView(result) {
    const panel = el("section", "surface");
    panel.append(textBlock("h2", "Retroalimentación"));
    const list = el("div", "feedback-list");
    result.items.forEach((item) => {
      const card = el("article", `feedback-item ${item.correct ? "correct" : "incorrect"}`);
      card.append(textBlock("h3", `${item.label}: ${item.correct ? "Correcto" : "Revisar"}`));
      card.append(textBlock("p", `Respuesta dada: ${item.given || "No respondida"}`));
      card.append(textBlock("p", item.correct ? `Resumen: ${item.explanation}` : `Paso a paso: ${item.explanation}`));
      list.append(card);
    });
    panel.append(list);
    return panel;
  }

  function resetAttempt() {
    if (!confirm("¿Borrar solo los datos guardados de esta plataforma e iniciar otro intento?")) return;
    localStorage.removeItem(STORAGE_KEY);
    Object.assign(state, {
      screen: "intro",
      currentSection: 0,
      student: { name: "", code: "", course: "3.º de secundaria", section: "", email: "", ownWork: false },
      answers: {},
      attemptId: "",
      startedAt: "",
      submittedAt: "",
      submitted: false,
      result: null,
      sendStatus: "idle",
      sendMessage: ""
    });
    render();
  }

  async function sendReport() {
    const endpoint = getEndpoint();
    if (!endpoint || sendInProgress) return;
    sendInProgress = true;
    state.sendStatus = "sending";
    saveDraft();
    render();
    const result = state.result || gradeExam(state.answers);
    const response = await sendReportToEndpoint(endpoint, result, fetch);
    sendInProgress = false;
    state.sendStatus = response.ok ? "sent" : "failed";
    state.sendMessage = response.message || "";
    saveDraft();
    render();
  }

  async function sendReportToEndpoint(endpoint, result, fetcher) {
    try {
      const payload = {
        _subject: `Resultado examen Matemáticas 3ro - ${state.student.name || "Estudiante"}`,
        _gotcha: "",
        intento: state.attemptId,
        fecha: state.submittedAt || localDateTime(),
        estudiante: state.student.name,
        codigo: state.student.code,
        curso: state.student.course,
        seccion: state.student.section,
        correo_estudiante: state.student.email,
        puntaje: result.total,
        estado: result.total >= PASSING_SCORE ? "Aprobado" : "No aprobado",
        informe: buildReportText(result)
      };
      const response = await fetcher(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!response.ok) return { ok: false, message: `Respuesta del servicio: ${response.status}.` };
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error && error.message ? error.message : "Fallo de red." };
    }
  }

  function getEndpoint() {
    return String(CONFIG.FORMSPREE_ENDPOINT || "").trim();
  }

  function gradeExam(answers) {
    const result = { total: 0, sections: {}, items: [], unanswered: [] };
    EXAM_SECTIONS.forEach((section) => {
      let sectionScore = 0;
      section.questions.forEach((question, index) => {
        const label = `${section.short}.${index + 1}`;
        const graded = gradeQuestion(question, answers[question.id]);
        sectionScore += graded.score;
        if (graded.unanswered) result.unanswered.push(label);
        result.items.push({
          label,
          sectionId: section.id,
          prompt: question.prompt,
          given: graded.given,
          score: graded.score,
          possible: question.points,
          correct: Math.abs(graded.score - question.points) < 0.0001,
          explanation: question.explanation
        });
      });
      result.sections[section.id] = sectionScore;
      result.total += sectionScore;
    });
    result.total = roundScore(result.total);
    return result;
  }

  function gradeQuestion(question, answer) {
    if (question.type === "choice") {
      const given = String(answer || "").trim().toUpperCase();
      return {
        score: given && given === question.answer ? question.points : 0,
        given,
        unanswered: !given
      };
    }
    if (question.type === "number") {
      const normalized = normalizeNumberAnswer(answer);
      return {
        score: normalized.valid && normalized.value === question.answer ? question.points : 0,
        given: String(answer || "").trim(),
        unanswered: !String(answer || "").trim()
      };
    }
    if (question.type === "relation") {
      const correct = compareRelation(answer, question.answer);
      return {
        score: correct ? question.points : 0,
        given: String(answer || "").trim(),
        unanswered: !String(answer || "").trim()
      };
    }
    if (question.type === "polynomial") {
      const correct = comparePolynomials(answer, question.answer);
      return {
        score: correct ? question.points : 0,
        given: String(answer || "").trim(),
        unanswered: !String(answer || "").trim()
      };
    }
    if (question.type === "ruffini") {
      const given = answer && typeof answer === "object" ? answer : {};
      const quotientOk = comparePolynomials(given.quotient, question.fields.quotient.answer);
      const remainder = normalizeNumberAnswer(given.remainder);
      const remainderOk = remainder.valid && remainder.value === question.fields.remainder.answer;
      const score = (quotientOk ? question.fields.quotient.points : 0) + (remainderOk ? question.fields.remainder.points : 0);
      return {
        score,
        given: `Cociente: ${given.quotient || ""}; resto: ${given.remainder || ""}`,
        unanswered: !String(given.quotient || "").trim() || !String(given.remainder || "").trim()
      };
    }
    if (question.type === "venn") {
      const given = answer && typeof answer === "object" ? answer : {};
      let score = 0;
      let missing = false;
      question.fields.forEach((fieldInfo) => {
        const normalized = normalizeNumberAnswer(given[fieldInfo.key]);
        if (!String(given[fieldInfo.key] || "").trim()) missing = true;
        if (normalized.valid && normalized.value === fieldInfo.answer) score += SCORE_CONFIG.vennRegion;
      });
      return {
        score,
        given: question.fields.map((fieldInfo) => `${fieldInfo.label}: ${given[fieldInfo.key] || ""}`).join("; "),
        unanswered: missing
      };
    }
    return { score: 0, given: "", unanswered: true };
  }

  function normalizeNumberAnswer(value) {
    let text = String(value == null ? "" : value).trim();
    if (!text) return { valid: false, value: NaN };
    text = normalizeCommon(text).replace(/,/g, ".");
    const eq = text.lastIndexOf("=");
    if (eq >= 0) text = text.slice(eq + 1);
    text = text.replace(/\s+/g, "");
    if (!/^[+-]?\d+(\.\d+)?$/.test(text)) return { valid: false, value: NaN };
    return { valid: true, value: Number(text) };
  }

  function compareRelation(value, expected) {
    const raw = String(value == null ? "" : value).trim();
    if (!raw) return false;
    let text = normalizeCommon(raw)
      .replace(/menor\s+o\s+igual\s+que/g, "<=")
      .replace(/menor\s+igual\s+que/g, "<=")
      .replace(/menor\s+que/g, "<")
      .replace(/\s+/g, "");
    text = text.replace(/^x=/, "").replace(/^x/, "x");
    if (expected.kind === "eq") {
      const numeric = normalizeNumberAnswer(text.replace(/^x=/, ""));
      if (numeric.valid) return numeric.value === expected.value && !/[<>]/.test(text);
      return text === `x=${expected.value}`;
    }
    if (/^(<=|<|>=|>)/.test(text)) text = `x${text}`;
    const match = text.match(/^x(<=|<|>=|>)([+-]?\d+(?:\.\d+)?)$/);
    if (!match) return false;
    const operator = match[1];
    const valueNumber = Number(match[2]);
    const expectedOperator = expected.kind === "lt" ? "<" : expected.kind === "le" ? "<=" : expected.kind === "gt" ? ">" : ">=";
    return operator === expectedOperator && valueNumber === expected.value;
  }

  function comparePolynomials(input, expected) {
    const a = parsePolynomial(input);
    const b = parsePolynomial(expected);
    if (!a.valid || !b.valid) return false;
    const keys = new Set([...Object.keys(a.map), ...Object.keys(b.map)]);
    for (const key of keys) {
      if ((a.map[key] || 0) !== (b.map[key] || 0)) return false;
    }
    return true;
  }

  function parsePolynomial(input) {
    let text = normalizeCommon(String(input == null ? "" : input));
    text = text.replace(/cociente|respuesta|q\(x\)|p\(x\)/g, "");
    const eq = text.lastIndexOf("=");
    if (eq >= 0) text = text.slice(eq + 1);
    text = text.replace(/\s+/g, "").replace(/\*/g, "");
    if (!text) return { valid: false, map: {} };
    if (/[^0-9x+\-^.]/.test(text)) return { valid: false, map: {} };
    if (!/^[+-]/.test(text)) text = `+${text}`;
    const terms = text.match(/[+-][^+-]+/g) || [];
    const map = {};
    for (const term of terms) {
      const sign = term[0] === "-" ? -1 : 1;
      const body = term.slice(1);
      if (!body) return { valid: false, map: {} };
      if (body.includes("x")) {
        const parts = body.split("x");
        if (parts.length !== 2) return { valid: false, map: {} };
        let coefficient = parts[0] === "" ? 1 : Number(parts[0]);
        if (!Number.isFinite(coefficient)) return { valid: false, map: {} };
        let exponent = 1;
        if (parts[1]) {
          const expText = parts[1].startsWith("^") ? parts[1].slice(1) : parts[1];
          if (!/^\d+$/.test(expText)) return { valid: false, map: {} };
          exponent = Number(expText);
        }
        map[exponent] = (map[exponent] || 0) + sign * coefficient;
      } else {
        if (!/^\d+(\.\d+)?$/.test(body)) return { valid: false, map: {} };
        map[0] = (map[0] || 0) + sign * Number(body);
      }
    }
    Object.keys(map).forEach((key) => {
      if (Math.abs(map[key]) < 0.000001) delete map[key];
    });
    return { valid: true, map };
  }

  function normalizeCommon(value) {
    return String(value)
      .toLowerCase()
      .replace(/[−–—]/g, "-")
      .replace(/≤/g, "<=")
      .replace(/≥/g, ">=")
      .replace(/²/g, "^2")
      .replace(/³/g, "^3");
  }

  function countQuestions() {
    return EXAM_SECTIONS.reduce((total, section) => total + section.questions.length, 0);
  }

  function countAnswered() {
    return countQuestions() - unansweredItems().length;
  }

  function unansweredItems(sectionId) {
    const labels = [];
    EXAM_SECTIONS.filter((section) => !sectionId || section.id === sectionId).forEach((section) => {
      section.questions.forEach((question, index) => {
        if (!isAnswered(question, state.answers[question.id])) labels.push(`${section.short}.${index + 1}`);
      });
    });
    return labels;
  }

  function isAnswered(question, answer) {
    if (question.type === "ruffini") return Boolean(answer && String(answer.quotient || "").trim() && String(answer.remainder || "").trim());
    if (question.type === "venn") return Boolean(answer && question.fields.every((fieldInfo) => String(answer[fieldInfo.key] || "").trim()));
    return Boolean(String(answer || "").trim());
  }

  function buildReportText(result) {
    const lines = [
      "Informe de resultados - Examen extraordinario de Matemáticas",
      `Identificador de intento: ${state.attemptId}`,
      `Fecha y hora: ${state.submittedAt || localDateTime()}`,
      `Nombre: ${state.student.name}`,
      `Código: ${state.student.code || "No indicado"}`,
      `Curso: ${state.student.course}`,
      `Sección: ${state.student.section}`,
      `Correo: ${state.student.email || "No indicado"}`,
      "",
      "Puntuación por sección:"
    ];
    EXAM_SECTIONS.forEach((section) => {
      lines.push(`${section.short}. ${section.title}: ${formatScore(result.sections[section.id] || 0)} / ${section.points}`);
    });
    lines.push("", `Total: ${formatScore(result.total)} / 100`, `Porcentaje: ${result.total.toFixed(1)}%`, `Estado: ${result.total >= PASSING_SCORE ? "Aprobado" : "No aprobado"}`, "");
    lines.push("Detalle por ítem:");
    result.items.forEach((item) => {
      lines.push(`${item.label} | ${item.correct ? "Correcto" : "Incorrecto"} | ${formatScore(item.score)}/${item.possible} | Respuesta: ${item.given || "No respondida"}`);
    });
    lines.push("", `No respondidas: ${result.unanswered.length ? result.unanswered.join(", ") : "Ninguna"}`);
    lines.push(`Versión de la aplicación: ${APP_VERSION}`);
    return lines.join("\n");
  }

  function buildReportCsv(result) {
    const rows = [
      ["intento", "fecha", "nombre", "codigo", "curso", "seccion", "item", "puntaje", "posible", "resultado", "respuesta"]
    ];
    result.items.forEach((item) => {
      rows.push([state.attemptId, state.submittedAt || localDateTime(), state.student.name, state.student.code, state.student.course, state.student.section, item.label, item.score, item.possible, item.correct ? "correcto" : "incorrecto", item.given || "No respondida"]);
    });
    rows.push([state.attemptId, state.submittedAt || localDateTime(), state.student.name, state.student.code, state.student.course, state.student.section, "TOTAL", result.total, 100, result.total >= PASSING_SCORE ? "aprobado" : "no aprobado", ""]);
    return rows.map((row) => row.map(csvCell).join(",")).join("\n");
  }

  function csvCell(value) {
    const text = String(value == null ? "" : value);
    return `"${text.replace(/"/g, '""')}"`;
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function mathKeyboard() {
    const panel = el("section", "math-keyboard");
    panel.hidden = true;
    panel.id = "math-keyboard";
    panel.setAttribute("aria-label", "Teclado matemático");
    const head = el("div", "keyboard-head");
    head.append(textBlock("strong", "Teclado matemático"));
    const hide = el("button", "secondary-action");
    hide.type = "button";
    hide.textContent = "Ocultar";
    hide.addEventListener("click", () => {
      panel.hidden = true;
      activeMathInput = null;
    });
    head.append(hide);
    const grid = el("div", "keyboard-grid");
    const keys = ["x", "x²", "x³", "+", "−", "=", "<", ">", "≤", "≥", "(", ")", "÷", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Borrar", "Limpiar"];
    keys.forEach((key) => {
      const button = el("button");
      button.type = "button";
      button.textContent = key;
      button.addEventListener("click", () => handleMathKey(key));
      grid.append(button);
    });
    panel.append(head, grid);
    return panel;
  }

  function attachMathFocus(input) {
    if (!input.classList || !input.classList.contains("math-input")) return;
    input.addEventListener("focus", () => {
      activeMathInput = input;
      const keyboard = document.getElementById("math-keyboard");
      if (keyboard) keyboard.hidden = false;
    });
  }

  function handleMathKey(key) {
    if (!activeMathInput) return;
    if (key === "Borrar") {
      const start = activeMathInput.selectionStart || 0;
      const end = activeMathInput.selectionEnd || 0;
      if (start !== end) insertAtCursor("");
      else if (start > 0) {
        activeMathInput.value = activeMathInput.value.slice(0, start - 1) + activeMathInput.value.slice(end);
        activeMathInput.setSelectionRange(start - 1, start - 1);
      }
    } else if (key === "Limpiar") {
      activeMathInput.value = "";
    } else {
      insertAtCursor(key === "÷" ? "/" : key);
    }
    activeMathInput.dispatchEvent(new Event("input", { bubbles: true }));
    activeMathInput.focus();
  }

  function insertAtCursor(text) {
    const input = activeMathInput;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    const next = start + text.length;
    input.setSelectionRange(next, next);
  }

  function field(labelText, id, type, value, placeholder, required) {
    const wrap = el("div", "field");
    const label = el("label");
    label.htmlFor = id;
    label.textContent = required ? `${labelText} *` : labelText;
    const input = el("input");
    input.id = id;
    input.type = type;
    input.value = value || "";
    input.placeholder = placeholder || "";
    input.required = Boolean(required);
    wrap.append(label, input);
    return wrap;
  }

  function fixedField(labelText, value) {
    const wrap = el("div", "field");
    wrap.append(textBlock("label", labelText));
    const input = el("input");
    input.value = value;
    input.disabled = true;
    wrap.append(input);
    return wrap;
  }

  function selectField(labelText, id, value, options, required) {
    const wrap = el("div", "field");
    const label = el("label");
    label.htmlFor = id;
    label.textContent = required ? `${labelText} *` : labelText;
    const select = el("select");
    select.id = id;
    select.required = Boolean(required);
    options.forEach((option) => {
      const opt = el("option");
      opt.value = option;
      opt.textContent = option || "Selecciona";
      opt.selected = option === value;
      select.append(opt);
    });
    wrap.append(label, select);
    return wrap;
  }

  function metaPill(label, value) {
    const pill = el("div", "meta-pill");
    pill.append(textBlock("span", label), textBlock("strong", value));
    return pill;
  }

  function el(tag, className, children) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (children) children.forEach((child) => node.append(child));
    return node;
  }

  function textBlock(tag, text, className) {
    const node = el(tag, className || "");
    node.textContent = text;
    return node;
  }

  function formatScore(value) {
    return Number(value).toFixed(1).replace(".0", "");
  }

  function roundScore(value) {
    return Math.round(value * 10) / 10;
  }

  function createAttemptId() {
    return `MAT3-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  }

  function localDateTime() {
    return new Date().toLocaleString("es-DO", { dateStyle: "medium", timeStyle: "short" });
  }

  function typesetMath() {
    if (global.MathJax && global.MathJax.typesetPromise) {
      global.MathJax.typesetPromise().catch(() => {});
    }
  }

  async function runSelfTests() {
    const tests = [];
    const add = (name, pass, details) => tests.push({ name, pass: Boolean(pass), details: details || "" });
    add("SCORE_CONFIG suma 100", validateScoreConfig());
    add("x² equivale a x^2", comparePolynomials("5x² + x + 5", "5x^2+x+5"));
    add("Signo menos Unicode", comparePolynomials("x² − 2x − 3", "x^2-2x-3"));
    add("Términos reordenados", comparePolynomials("5 + x + 5x^2", "5x^2+x+5"));
    add("Coeficiente 1 implícito", comparePolynomials("x^2+9x-9", "1x^2+9x-9"));
    add("x<3 no se confunde con x≤3", compareRelation("x<3", { kind: "lt", value: 3 }) && !compareRelation("x<=3", { kind: "lt", value: 3 }));
    add("Inecuación con símbolo ≤", compareRelation("x≤3", { kind: "le", value: 3 }));
    add("Frase menor que 3", compareRelation("menor que 3", { kind: "lt", value: 3 }));
    add("Campo vacío detectado", !isAnswered({ type: "number" }, ""));
    add("Respuesta numérica con espacios", normalizeNumberAnswer(" P(4)= 45 ").valid && normalizeNumberAnswer(" P(4)= 45 ").value === 45);
    const mockState = { result: state.result, attemptId: state.attemptId, submittedAt: state.submittedAt };
    const previous = { ...state.student };
    state.student.name = "Prueba";
    state.attemptId = "TEST";
    state.submittedAt = "fecha";
    const failed = await sendReportToEndpoint("https://example.invalid", { total: 0, sections: {}, items: [], unanswered: [] }, async () => { throw new Error("fallo simulado"); });
    add("Fallo de red no pierde resultado", !failed.ok && /fallo simulado/.test(failed.message));
    Object.assign(state.student, previous);
    state.attemptId = mockState.attemptId;
    state.result = mockState.result;
    state.submittedAt = mockState.submittedAt;
    return tests;
  }

  global.ExamAppInternals = {
    SCORE_CONFIG,
    PASSING_SCORE,
    EXAM_SECTIONS,
    normalizeNumberAnswer,
    parsePolynomial,
    comparePolynomials,
    compareRelation,
    gradeExam,
    sendReportToEndpoint,
    runSelfTests
  };

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", init);
  }
})(typeof window !== "undefined" ? window : globalThis);
