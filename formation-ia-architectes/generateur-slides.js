const PptxGenJS = require("pptxgenjs");
const pres = new PptxGenJS();
pres.layout = "LAYOUT_WIDE";           // 13.333 x 7.5
pres.author = "ANCA Agency";
pres.title  = "L'IA au service du projet architectural - Conducteur de session";

/* ---------- Design tokens ---------- */
const INK = "14171A", PAPER = "FFFFFF", CARD = "EFF1F2", CARD2 = "E3E7E9";
const ACCENT = "C0542A", ASOFT = "F6E7E0", SLATE = "44555E", MUTED = "78868D";
const LINE = "D3D9DC", DKCARD = "23292E", DKMUT = "9AA6AC", RUST = "8A4A34";
const HEAD = "Cambria", BODY = "Calibri";

const W = 13.333, H = 7.5, M = 0.62, CW = W - M * 2;
const TIPY = 6.16, TIPH = 0.66;        // tip band
let N = 0;

/* ---------- Helpers ---------- */
function footer(s, dark) {
  s.addText("L'IA au service du projet architectural", {
    x: M, y: 6.96, w: 7, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, color: dark ? DKMUT : MUTED });
  s.addText(String(N), {
    x: W - M - 1.2, y: 6.96, w: 1.2, h: 0.28, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, color: dark ? DKMUT : MUTED, align: "right" });
}
function card(s, x, y, w, h, fill) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: fill || CARD } });
}
function numDot(s, x, y, n, d, fill, tc) {
  d = d || 0.42;
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill || ACCENT } });
  s.addText(String(n), { x, y, w: d, h: d, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: d > 0.38 ? 13 : 11, bold: true,
    color: tc || "FFFFFF", align: "center", valign: "middle" });
}
function label(s, x, y, w, t, color) {
  s.addText(t.toUpperCase(), { x, y, w, h: 0.26, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 10, bold: true, color: color || ACCENT, charSpacing: 1.2 });
}
function bullets(s, x, y, w, h, items, size, color, gap) {
  const rows = items.map((t, i) => ({ text: t, options: {
    bullet: { code: "2013" }, breakLine: i < items.length - 1,
    paraSpaceAfter: gap === undefined ? 7 : gap,
    fontSize: size || 12.5, color: color || SLATE, fontFace: BODY } }));
  s.addText(rows, { x, y, w, h, isTextBox: true, margin: 0, valign: "top" });
}
function promptBox(s, x, y, w, h, title, txt, fs) {
  card(s, x, y, w, h, "1B2126");
  if (title) s.addText(title.toUpperCase(), {
    x: x + 0.2, y: y + 0.14, w: w - 0.4, h: 0.24, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9, bold: true, color: ACCENT, charSpacing: 1 });
  s.addText(txt, { x: x + 0.2, y: y + (title ? 0.42 : 0.16), w: w - 0.4,
    h: h - (title ? 0.58 : 0.32), isTextBox: true, margin: 0, valign: "top",
    fontFace: "Consolas", fontSize: fs || 10.5, color: "DFE5E8", lineSpacingMultiple: 1.0 });
}
// The visible TIP band — the motif carried across the deck
function tip(s, text, dark) {
  card(s, M, TIPY, CW, TIPH, dark ? DKCARD : ASOFT);
  s.addShape(pres.ShapeType.roundRect, { x: M + 0.24, y: TIPY + 0.17, w: 0.66, h: 0.32,
    rectRadius: 0.07, fill: { color: ACCENT } });
  s.addText("TIP", { x: M + 0.24, y: TIPY + 0.17, w: 0.66, h: 0.32, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 9.5, bold: true, color: "FFFFFF", align: "center",
    valign: "middle", charSpacing: 1 });
  s.addText(text, { x: M + 1.06, y: TIPY, w: CW - 1.34, h: TIPH, isTextBox: true, margin: 0,
    valign: "middle", fontFace: BODY, fontSize: 12, italic: true, color: dark ? "C8D0D4" : RUST });
}
function light(kicker, title, clock) {
  N++;
  const s = pres.addSlide();
  s.background = { color: PAPER };
  if (clock) {
    s.addShape(pres.ShapeType.ellipse, { x: W - M - 0.86, y: 0.42, w: 0.86, h: 0.86, fill: { color: ACCENT } });
    s.addText(clock, { x: W - M - 0.86, y: 0.42, w: 0.86, h: 0.86, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  }
  if (kicker) s.addText(kicker.toUpperCase(), { x: M, y: 0.44, w: CW - 1.3, h: 0.28, isTextBox: true,
    margin: 0, fontFace: BODY, fontSize: 10.5, bold: true, color: ACCENT, charSpacing: 1.6 });
  s.addText(title, { x: M, y: 0.76, w: CW - 1.3, h: 0.7, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 29, bold: true, color: INK, valign: "top" });
  footer(s, false);
  return s;
}
function divider(letter, title, range, sub) {
  N++;
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addText(letter, { x: 10.3, y: 0.35, w: 2.6, h: 2.6, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 150, bold: true, color: "1F252A", align: "center", valign: "middle" });
  s.addText(range, { x: M, y: 0.78, w: 9.4, h: 0.32, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12, bold: true, color: ACCENT, charSpacing: 1.8 });
  s.addText(title, { x: M, y: 1.16, w: 9.6, h: 0.95, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 40, bold: true, color: "FFFFFF", valign: "top" });
  if (sub) s.addText(sub, { x: M, y: 2.14, w: 10.6, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13.5, italic: true, color: DKMUT });
  footer(s, true);
  return s;
}
const notes = t => pres.slides[pres.slides.length - 1].addNotes(t);

/* ============ 1. TITRE ============ */
{
  N++;
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addText("A", { x: 8.9, y: 0.4, w: 4.2, h: 6.4, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 340, bold: true, color: "1E242A", align: "center", valign: "middle" });
  s.addText("FORMATION · ARCHITECTES & MAÎTRISE D'ŒUVRE", { x: M, y: 1.35, w: 8.2, h: 0.3,
    isTextBox: true, margin: 0, fontFace: BODY, fontSize: 11.5, bold: true, color: ACCENT, charSpacing: 1.8 });
  s.addText("L'IA au service\ndu projet architectural", { x: M, y: 1.85, w: 8.4, h: 2.3,
    isTextBox: true, margin: 0, fontFace: HEAD, fontSize: 50, bold: true, color: "FFFFFF", lineSpacingMultiple: 1.05 });
  s.addText("Conducteur de session — support animateur", { x: M, y: 4.25, w: 8.2, h: 0.4,
    isTextBox: true, margin: 0, fontFace: BODY, fontSize: 16, italic: true, color: DKMUT });
  [["3 h 00", "180 minutes, sans temps mort"], ["2", "participants maximum"],
   ["3", "outils : ChatGPT · Seedance 2.0 · Claude"]].forEach((f, i) => {
    const x = M + i * 2.75;
    s.addText(f[0], { x, y: 5.15, w: 2.6, h: 0.62, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 30, bold: true, color: "FFFFFF" });
    s.addText(f[1], { x, y: 5.78, w: 2.6, h: 0.6, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, color: DKMUT });
  });
  footer(s, true);
  notes("Support à usage animateur : chaque slide porte en note ce qu'il faut dire, faire et surveiller. Les encarts TIP sont projetables — ce sont eux que les participants recopient.\n\nAvant d'ouvrir : vérifier que les deux participants sont connectés, et que vos clips vidéo de secours sont accessibles hors ligne.\n\nOuverture (2 min) : se présenter en une phrase, annoncer le format — atelier, chacun sur sa machine, sur leurs propres projets. Pas de théorie longue.");
}

/* ============ 2. LE FIL DE LA SESSION ============ */
{
  const s = light("Vue d'ensemble", "Le fil de la session", null);
  const rows = [
    ["00:00", "15 min", "CADRAGE", "Le paysage réel des outils · droits, confidentialité, ce qu'on ne met jamais dans une IA"],
    ["00:15", "30 min", "LE PROMPT, VRAIMENT", "La structure · le vocabulaire archi et photo · les mots inutiles · exercice comparatif"],
    ["00:45", "45 min", "L'IMAGE PHOTORÉALISTE", "Esquisse et capture 3D vers le rendu · reprendre une image à 80 % pour aller à 100 %"],
    ["01:30", "10 min", "PAUSE", ""],
    ["01:40", "35 min", "LA VIDÉO COURTE", "Seedance 2.0 · travelling, panoramique, révélation, survol · les règles du prompt vidéo"],
    ["02:15", "35 min", "CRÉER SON AGENT", "Le vrai basculement · construit en direct sur un cas d'agence"],
    ["02:50", "10 min", "PASSAGE À L'ÉCHELLE", "Quels outils garder, à quel budget · plan de démarrage sur 30 jours"]
  ];
  let y = 1.52;
  rows.forEach(r => {
    const pause = r[2] === "PAUSE", h = pause ? 0.40 : 0.60;
    card(s, M, y, CW, h, pause ? CARD2 : CARD);
    s.addText(r[0] + "   ·   " + r[1], { x: M + 0.28, y, w: 1.85, h, isTextBox: true, margin: 0,
      valign: "middle", fontFace: BODY, fontSize: 11.5, bold: true, color: pause ? MUTED : INK });
    s.addText(r[2], { x: M + 2.2, y: pause ? y : y + 0.06, w: 3.3, h: pause ? h : 0.26,
      isTextBox: true, margin: 0, valign: pause ? "middle" : "top",
      fontFace: BODY, fontSize: 12, bold: true, color: pause ? MUTED : ACCENT, charSpacing: 0.6 });
    if (r[3]) s.addText(r[3], { x: M + 2.2, y: y + 0.31, w: CW - 2.5, h: 0.26, isTextBox: true,
      margin: 0, fontFace: BODY, fontSize: 11, color: SLATE });
    y += h + 0.06;
  });
  tip(s, "Les deux séquences qui ne se sacrifient jamais : l'image photoréaliste et l'agent. Tout le reste peut se compresser.");
  notes("Slide de cadrage temporel — la montrer 30 secondes, ne pas la commenter ligne à ligne.\n\nCe qu'on annonce : « Trois heures, sept séquences, une pause. Vous repartez avec quatre choses concrètes. »\n\nSi vous prenez du retard, c'est sur le cadrage et le passage à l'échelle qu'on rogne — jamais sur l'image ni sur l'agent.");
}

/* ============ 3. AVANT LA SESSION ============ */
{
  const s = light("À envoyer avant la session", "Ce qu'ils doivent avoir en arrivant", null);
  const cols = [
    ["Comptes actifs", [
      "ChatGPT Plus — obligatoire, environ 23 €/mois. L'outil de 70 % de la session.",
      "CapCut / Dreamina — accès à Seedance 2.0. Essai gratuit puis crédits.",
      "Claude Pro — optionnel, environ 20 €/mois. Pour le module agent."]],
    ["Matériel", [
      "Portable et chargeur, souris externe si possible.",
      "Un partage de connexion 4G en secours, testé avant.",
      "Écran ou téléviseur pour projeter votre machine."]],
    ["Ce qu'ils apportent", [
      "Un projet en cours, pas un projet fini.",
      "2 à 3 captures 3D — vue perspective, 16:9, verticales droites.",
      "2 à 3 esquisses scannées ou photographiées.",
      "5 images de référence : matériaux, ambiances.",
      "Un document type de l'agence : note d'intention, descriptif, mail MOA."]]
  ];
  const cw = (CW - 0.5) / 3;
  cols.forEach((c, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 1.55, cw, 4.4, i === 2 ? ASOFT : CARD);
    numDot(s, x + 0.28, 1.82, i + 1, 0.44, i === 2 ? ACCENT : SLATE);
    s.addText(c[0], { x: x + 0.28, y: 2.42, w: cw - 0.56, h: 0.34, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 17, bold: true, color: INK });
    bullets(s, x + 0.28, 2.86, cw - 0.56, 2.95, c[1], 11.5, i === 2 ? RUST : SLATE, 8);
  });
  tip(s, "Sans capture 3D de leur propre projet, la session retombe sur des images génériques. C'est le seul prérequis vraiment bloquant — le rappeler nommément dans le mail.");
  notes("Slide de préparation, pas projetée pendant la session.\n\nEnvoyer la liste au plus tard le jeudi précédent, et rappeler le vendredi. L'erreur classique : ils arrivent sans capture 3D exploitable et on perd vingt minutes à en produire une.\n\nDemander les fichiers en amont par mail : ça vous permet de préparer deux ou trois exemples à l'avance.");
}

/* ============ 4. § CADRAGE ============ */
{
  const s = divider("1", "Cadrage", "00:00 → 00:15  ·  15 MINUTES",
    "Ce qui tient ses promesses, ce qui n'est qu'une démo — et ce qu'on ne met jamais dans une IA.");
  const items = [["3 min", "Tour de table : leur usage réel de l'IA, honnêtement"],
    ["5 min", "Les trois outils de la session et leur rôle exact"],
    ["5 min", "Droits, confidentialité, réglages à faire ensemble"],
    ["2 min", "Poser la limite de l'outil dès la première minute"]];
  const cw = (CW - 0.75) / 4;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 3.62, cw, 1.58, DKCARD);
    s.addText(it[0], { x: x + 0.24, y: 3.84, w: cw - 0.48, h: 0.36, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 18, bold: true, color: ACCENT });
    s.addText(it[1], { x: x + 0.24, y: 4.26, w: cw - 0.48, h: 0.86, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: DKMUT, lineSpacingMultiple: 1.12 });
  });
  tip(s, "Le tour de table sert à calibrer : s'ils connaissent déjà Midjourney, accélérez sur le prompt. S'ils n'ont jamais rien fait, ralentissez sur la structure.", true);
  notes("15 minutes, pas une de plus. C'est la séquence qui déborde le plus facilement.\n\nObjectif : qu'ils sachent, en sortant de ces quinze minutes, ce qu'ils ont le droit de faire et ce qu'ils ne feront jamais.");
}

/* ============ 5. TROIS OUTILS ============ */
{
  const s = light("Le paysage réel", "Trois outils, trois rôles", "00:03");
  const tools = [
    ["ChatGPT", "Images 2.0", "Le cheval de trait", [
      "Génère et surtout ÉDITE une image existante",
      "La conversation garde la mémoire du projet",
      "C'est là que se joue l'itération"], "70 % de la session", ACCENT],
    ["Seedance 2.0", "ByteDance · via Dreamina", "L'image qui bouge", [
      "Transforme un rendu fixe en séquence vidéo",
      "Contrôle réel du mouvement de caméra",
      "Premier des classements image vers vidéo"], "Module vidéo · 35 min", SLATE],
    ["Claude", "Projects", "Le texte et la méthode", [
      "Documents longs, programmes, descriptifs",
      "Restitue un ton d'écriture avec justesse",
      "Ne génère pas d'image"], "Module agent · 10 min", SLATE]];
  const cw = (CW - 0.5) / 3;
  tools.forEach((t, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 1.52, cw, 3.25, CARD);
    s.addText(t[0], { x: x + 0.28, y: 1.7, w: cw - 0.56, h: 0.42, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 23, bold: true, color: INK });
    s.addText(t[1], { x: x + 0.28, y: 2.13, w: cw - 0.56, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED });
    s.addText(t[2], { x: x + 0.28, y: 2.45, w: cw - 0.56, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 13, bold: true, italic: true, color: t[5] });
    bullets(s, x + 0.28, 2.85, cw - 0.56, 1.4, t[3], 11.5, SLATE, 7);
    s.addText(t[4], { x: x + 0.28, y: 4.4, w: cw - 0.56, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, bold: true, color: t[5], charSpacing: 0.8 });
  });
  card(s, M, 5.02, CW, 0.78, INK);
  s.addText("Ce qu'on ne fera pas : Midjourney, Veo, Runway, les greffons de rendu dans SketchUp. On les cite, on ne les installe pas. Trois outils maîtrisés valent mieux que dix survolés.", {
    x: M + 0.3, y: 5.02, w: CW - 0.6, h: 0.78, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, color: "C8D0D4" });
  tip(s, "Un onglet par module, pas trois outils ouverts en même temps. La dispersion entre interfaces est la première cause de perte de temps en agence.");
  notes("5 minutes. Ne pas faire de démonstration ici — on annonce, on démontrera plus tard.\n\nChaque outil a un rôle et on ne les mélange pas : l'image chez ChatGPT, le mouvement chez Seedance, le document chez Claude.\n\nSi on vous demande « et Midjourney ? » : supérieur en esthétique pure, très inférieur en édition précise d'une image existante. En architecture, c'est l'édition qui compte.");
}

/* ============ 6. CONFIDENTIALITÉ + DROITS + LA PHRASE ============ */
{
  const s = light("Droits et confidentialité", "Ce qu'on ne met jamais dans une IA", "00:08");
  const half = (CW - 0.35) / 2;
  card(s, M, 1.55, half, 2.05, "F7E9E4");
  label(s, M + 0.3, 1.76, half - 0.6, "Jamais", ACCENT);
  bullets(s, M + 0.3, 2.08, half - 0.6, 1.4, [
    "Les pièces d'un concours en cours — anonymat, règlement",
    "Les données nominatives d'un client ou d'une MOA — RGPD",
    "Tout document couvert par un accord de confidentialité",
    "Le DCE d'un tiers : BET, entreprise, bureau de contrôle"], 11.5, RUST, 6);
  const x2 = M + half + 0.35;
  card(s, x2, 1.55, half, 2.05, CARD);
  label(s, x2 + 0.3, 1.76, half - 0.6, "Sans risque", SLATE);
  bullets(s, x2 + 0.3, 2.08, half - 0.6, 1.4, [
    "Vos captures 3D, vos esquisses, vos plans de projet interne",
    "Vos textes : notes d'intention, descriptifs, mails",
    "Des références publiques : photos de bâtiments publiés",
    "Un programme déjà rendu public"], 11.5, SLATE, 6);

  card(s, M, 3.72, CW, 0.78, CARD2);
  s.addText("Droits sur l'image produite : une image générée n'ouvre pas de protection au titre du droit d'auteur. Elle ne se dépose pas, elle ne s'oppose pas à un tiers — et elle ne se présente jamais comme un rendu contractuel.", {
    x: M + 0.3, y: 3.72, w: CW - 0.6, h: 0.78, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, color: SLATE });

  card(s, M, 4.62, CW, 1.36, ACCENT);
  s.addText("Une image générée est une image d'intention.", {
    x: M + 0.35, y: 4.8, w: CW - 0.7, h: 0.52, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 25, bold: true, color: "FFFFFF" });
  s.addText("Jamais un rendu conforme au modèle. Jamais une étude d'ensoleillement. À redire trois fois : ici, après le premier « waouh » vers 01:10, et au passage à l'échelle.", {
    x: M + 0.35, y: 5.38, w: CW - 0.7, h: 0.45, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 12.5, color: "F6DCD1" });
  tip(s, "Faites le réglage en direct sur les deux machines : ChatGPT → Paramètres → Contrôles des données → désactiver l'amélioration du modèle. Deux minutes, et c'est fait pour de bon.");
  notes("5 minutes. Séquence courte mais non négociable : c'est ce qui vous protège et ce qui les protège.\n\nFaire le réglage de confidentialité EN DIRECT. Ne pas se contenter de le dire.\n\nLa question qui vient toujours : « est-ce que je peux mettre le plan de mon client ? » Un plan de votre propre projet, oui. Un document reçu sous condition de confidentialité, non — le fait qu'il soit sur votre disque ne vous en donne pas la libre disposition.\n\nLa phrase sur l'image d'intention se pose MAINTENANT, avant la première image. Dans vingt minutes ils verront quelque chose d'impressionnant, et la limite ne s'entendra plus.");
}

/* ============ 7. § LE PROMPT ============ */
{
  const s = divider("2", "Le prompt, vraiment", "00:15 → 00:45  ·  30 MINUTES",
    "La structure qui sépare un résultat aléatoire d'un résultat maîtrisé.");
  const items = [["10 min", "La structure en six blocs, écrite en direct sur un vrai projet"],
    ["5 min", "Le vocabulaire d'architecture et de photographie qui change tout"],
    ["15 min", "Exercice comparatif : le même projet, deux prompts"]];
  const cw = (CW - 0.5) / 3;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 3.62, cw, 1.58, DKCARD);
    s.addText(it[0], { x: x + 0.26, y: 3.84, w: cw - 0.52, h: 0.36, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 19, bold: true, color: ACCENT });
    s.addText(it[1], { x: x + 0.26, y: 4.26, w: cw - 0.52, h: 0.86, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 12, color: DKMUT, lineSpacingMultiple: 1.12 });
  });
  tip(s, "Ne dépassez pas quinze minutes de théorie avant le premier exercice. C'est le seuil au-delà duquel on les perd.", true);
  notes("30 minutes. Annoncer clairement : « ce qu'on écrit dans les dix prochaines minutes, vous l'emportez. C'est la première pièce de votre bibliothèque de prompts. »");
}

/* ============ 8. STRUCTURE 6 BLOCS ============ */
{
  const s = light("La méthode", "La structure en six blocs", "00:17");
  const blocks = [
    ["Sujet & typologie", "Ce que c'est, en langage d'architecte.", "Maison individuelle contemporaine, R+1, toiture à deux pans asymétriques"],
    ["Cadrage", "Où est l'appareil photo. Le bloc le plus négligé.", "Vue depuis l'angle sud-ouest, objectif 24 mm, hauteur d'œil 1,60 m, verticales redressées"],
    ["Matériaux", "Nommés précisément, pas par famille.", "Bardage mélèze vertical non traité, lames de 12 cm, soubassement béton brut lisse, menuiseries aluminium anthracite"],
    ["Lumière & ciel", "L'heure, la météo, la direction des ombres.", "Fin d'après-midi, ciel légèrement voilé, ombres longues portées vers l'est"],
    ["Contexte & staffage", "Ce qui donne l'échelle et la vraisemblance.", "Jardin en cours de plantation, allée en graviers, deux personnes de dos à l'échelle"],
    ["Rendu", "La nature de l'image, pas sa qualité.", "Photographie d'architecture, netteté d'ensemble, colorimétrie neutre, aucune distorsion"]];
  let y = 1.52;
  blocks.forEach((b, i) => {
    card(s, M, y, CW, 0.72, i === 1 ? ASOFT : (i % 2 === 0 ? CARD : "F6F7F8"));
    numDot(s, M + 0.25, y + 0.15, i + 1, 0.42, i === 1 ? ACCENT : SLATE);
    s.addText(b[0], { x: M + 0.82, y: y + 0.07, w: 2.5, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK });
    s.addText(b[1], { x: M + 0.82, y: y + 0.38, w: 2.5, h: 0.28, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED });
    s.addText("« " + b[2] + " »", { x: M + 3.5, y, w: CW - 3.8, h: 0.72, isTextBox: true,
      margin: 0, valign: "middle", fontFace: BODY, fontSize: 11.5,
      color: i === 1 ? RUST : SLATE, lineSpacingMultiple: 1.08 });
    y += 0.78;
  });
  tip(s, "L'ordre compte : le modèle lit du général au particulier. Un matériau annoncé avant le cadrage se retrouve appliqué à toute l'image.");
  notes("6 minutes. Écrire un prompt complet devant eux, bloc par bloc, sur un vrai projet.\n\nInsister sur le bloc 2, CADRAGE : personne ne l'écrit, et c'est celui qui change le plus le résultat.\n\nNe pas générer d'image tout de suite. On construit d'abord l'outil — sinon ils regardent l'image et n'écoutent plus.");
}

/* ============ 9. VOCABULAIRE (utile + inutile) ============ */
{
  const s = light("Le vocabulaire", "Ce qui compte, et ce qui ne sert à rien", "00:23");
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 4.5, CARD);
  label(s, M + 0.3, 1.72, half - 0.6, "Ce qui change le résultat", SLATE);
  let y = 2.06;
  [["Typologie & volumétrie", "R+1, attique, redent, faille, porte-à-faux, émergence"],
   ["Matières nommées", "mélèze, zinc à joint debout, béton matricé, brique de parement, enduit taloché"],
   ["Mise en œuvre", "joint creux, calepinage, tableau, acrotère, casquette, brise-soleil"],
   ["Focale & point de vue", "24 mm pour le contexte · 35 mm naturel · 50 mm le détail · hauteur d'œil 1,60 m"],
   ["Lumière & correction", "heure dorée · ciel couvert uniforme · verticales redressées, sans distorsion"]
  ].forEach(a => {
    s.addText(a[0], { x: M + 0.3, y, w: half - 0.6, h: 0.24, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: INK });
    s.addText(a[1], { x: M + 0.3, y: y + 0.25, w: half - 0.6, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, italic: true, color: SLATE, lineSpacingMultiple: 1.1 });
    y += 0.78;
  });

  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 1.62, "F7E9E4");
  label(s, x2 + 0.3, 1.72, half - 0.6, "À supprimer de vos prompts", ACCENT);
  s.addText("8K · ultra realistic · masterpiece · best quality · award winning · unreal engine 5 · octane render · --ar 16:9 --v 6 · « magnifique »", {
    x: x2 + 0.3, y: 2.04, w: half - 0.6, h: 1.0, isTextBox: true, margin: 0, valign: "top",
    fontFace: BODY, fontSize: 13, color: "9A5340", lineSpacingMultiple: 1.3, strike: true });

  card(s, x2, 3.26, half, 2.76, INK);
  label(s, x2 + 0.3, 3.46, half - 0.6, "Ce qu'on écrit à la place", ACCENT);
  y = 3.82;
  [["« professional photo »", "« verticales redressées, objectif 24 mm »"],
   ["« beautiful lighting »", "« ciel couvert uniforme, sans ombre portée »"],
   ["« wood facade »", "« bardage mélèze vertical, lames de 12 cm »"],
   ["« ultra detailed »", "« netteté du premier plan à l'arrière-plan »"]].forEach(sw => {
    s.addText(sw[0], { x: x2 + 0.3, y, w: half - 0.6, h: 0.24, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, color: "8A959B", strike: true });
    s.addText(sw[1], { x: x2 + 0.3, y: y + 0.23, w: half - 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, bold: true, color: "FFFFFF" });
    y += 0.56;
  });
  tip(s, "Testez « verticales redressées » toute seule sur une image déjà générée. L'écart se voit en un essai — c'est la démonstration la plus rapide de la session.");
  notes("4 minutes. Ne pas lire les listes — parcourir et s'arrêter sur trois mots.\n\nCe qui surprend toujours : on leur enlève du travail au lieu de leur en ajouter. Les mots barrés viennent de la génération précédente d'outils, où ils servaient vraiment.\n\nLeur faire remarquer qu'ils connaissent déjà le vocabulaire d'architecture. Ce qui leur manque, c'est celui du photographe — c'est là qu'ils progressent le plus vite.\n\nSi l'un d'eux utilise Midjourney, ne pas le contredire frontalement : « sur Midjourney ces réflexes ont encore un sens, ici non. »");
}

/* ============ 10. ATELIER EXERCICE COMPARATIF ============ */
{
  const s = light("Atelier · 15 minutes", "Le même projet, deux prompts", "00:30");
  card(s, M, 1.52, CW, 0.82, INK);
  s.addText("On ne cherche pas la belle image — on cherche à voir ce que la structure fait gagner. Interdiction de corriger pendant la première manche : c'est le contraste qui fait le cours.", {
    x: M + 0.3, y: 1.52, w: CW - 0.6, h: 0.82, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 13, color: "D8DEE1" });
  const steps = [
    ["5 min", "Manche 1 — le prompt naïf", "Tous les deux, exactement le même texte : « Une belle maison contemporaine en bois, rendu photoréaliste 8K. » On génère, on affiche les deux résultats côte à côte.", CARD],
    ["8 min", "Manche 2 — le prompt structuré", "On réécrit ensemble avec les six blocs, puis chacun l'applique à SON projet, avec ses matériaux et son cadrage.", ASOFT],
    ["2 min", "Débrief", "Deux questions, pas plus : qu'est-ce qui a bougé ? Qu'est-ce qui reste hors de contrôle ?", CARD]];
  let y = 2.55;
  steps.forEach((st, i) => {
    card(s, M, y, CW, 1.1, st[3]);
    s.addText(st[0], { x: M + 0.28, y: y + 0.32, w: 0.95, h: 0.42, isTextBox: true, margin: 0,
      valign: "middle", fontFace: HEAD, fontSize: 17, bold: true, color: i === 1 ? ACCENT : INK });
    s.addText(st[1], { x: M + 1.4, y: y + 0.18, w: CW - 1.75, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK });
    s.addText(st[2], { x: M + 1.4, y: y + 0.5, w: CW - 1.75, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: i === 1 ? RUST : SLATE });
    y += 1.18;
  });
  tip(s, "Ouvrez un fichier partagé maintenant et collez-y le prompt de la manche 2. C'est la première ligne de la bibliothèque que vous emportez.");
  notes("15 minutes chronométrées. Premier contact avec l'outil : laissez-les faire, n'intervenez pas techniquement.\n\nPiège d'animation : la tentation de corriger pendant la manche 1. Ne le faites pas, le résultat médiocre est pédagogique.\n\nSi vous êtes en retard : garder les 5 minutes de manche 1 et réduire le débrief. Ne jamais supprimer la manche 1.");
}

/* ============ 11. § IMAGE + TROIS PORTES ============ */
{
  const s = divider("3", "L'image photoréaliste", "00:45 → 01:30  ·  45 MINUTES",
    "Trois portes d'entrée — et une seule qui vous fait partir de votre modèle plutôt que d'une page blanche.");
  const doors = [
    ["L'esquisse", "Garde votre parti et votre trait. Mais le modèle invente tout ce que le trait ne dit pas : matières, percements, contexte.", "« Respecte strictement la géométrie du croquis joint. »", false],
    ["La capture 3D", "Volumétrie, proportions et cadrage verrouillés. L'IA n'apporte que la matière et la lumière. C'est la porte de la session.", "« Conserve exactement la géométrie et le point de vue. »", true],
    ["L'intention écrite", "Rapide, utile en recherche d'ambiance très amont. Le moins contrôlable : deux essais ne donnent jamais le même bâtiment.", "À réserver au moodboard, jamais à une présentation.", false]];
  const cw = (CW - 0.5) / 3;
  doors.forEach((d, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 2.82, cw, 2.72, d[3] ? "3A2A22" : DKCARD);
    numDot(s, x + 0.26, 3.04, i + 1, 0.4, d[3] ? ACCENT : "3C464C");
    if (d[3]) s.addText("RECOMMANDÉ", { x: x + cw - 1.7, y: 3.1, w: 1.45, h: 0.26, isTextBox: true,
      margin: 0, fontFace: BODY, fontSize: 8.5, bold: true, color: ACCENT, align: "right", charSpacing: 1 });
    s.addText(d[0], { x: x + 0.26, y: 3.56, w: cw - 0.52, h: 0.36, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 19, bold: true, color: "FFFFFF" });
    s.addText(d[1], { x: x + 0.26, y: 3.98, w: cw - 0.52, h: 1.02, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: DKMUT, lineSpacingMultiple: 1.14 });
    s.addText(d[2], { x: x + 0.26, y: 5.04, w: cw - 0.52, h: 0.42, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11, italic: true, color: d[3] ? ACCENT : "8A959B" });
  });
  tip(s, "Le renversement à leur faire trouver eux-mêmes : ce qu'ils maîtrisent déjà, c'est la géométrie. Ce qui leur coûte cher, c'est la matière et la lumière. Donc on donne la géométrie à l'IA et on lui demande le reste.", true);
  notes("45 minutes au total pour le module : 4 min ici, 12 min d'atelier capture 3D, 5 min sur matière et lumière, 5 min sur l'itération, 5 min sur la dérive, 15 min d'atelier libre.\n\nC'est la séquence la plus longue et la plus importante — elle ne se sacrifie jamais.\n\nPasser vite sur les portes 1 et 3, s'installer sur la 2.");
}

/* ============ 12. ATELIER CAPTURE 3D ============ */
{
  const s = light("Atelier · 12 minutes", "De la capture 3D au rendu", "00:51");
  const half = (CW - 0.4) / 2;
  const steps = [
    ["Préparer la capture", "Vue perspective, pas axonométrie. Verticales droites. Format 16:9. Ombres activées. Export PNG le plus grand possible."],
    ["Verrouiller la géométrie", "La contrainte se pose AVANT toute description d'ambiance. C'est la phrase la plus importante du module."],
    ["Apporter matière et lumière", "Les blocs 3 et 4 de la structure. Un matériau par élément, nommé précisément."],
    ["Dire ce qui peut bouger", "Le sol, le ciel, la végétation peuvent être réinterprétés. La façade, non. Le dire explicitement."]];
  let y = 1.52;
  steps.forEach((st, i) => {
    card(s, M, y, half, 1.08, i === 1 ? ASOFT : CARD);
    numDot(s, M + 0.26, y + 0.2, i + 1, 0.42, i === 1 ? ACCENT : SLATE);
    s.addText(st[0], { x: M + 0.82, y: y + 0.14, w: half - 1.1, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK });
    s.addText(st[1], { x: M + 0.82, y: y + 0.45, w: half - 1.1, h: 0.56, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11, color: i === 1 ? RUST : SLATE, lineSpacingMultiple: 1.1 });
    y += 1.14;
  });
  promptBox(s, M + half + 0.4, 1.52, half, 4.5, "Le prompt type — à copier dans la bibliothèque",
    "Voici une capture de ma maquette 3D.\n\nConserve exactement la géométrie, les\nproportions, le cadrage et le point de vue.\nN'ajoute ni ne supprime aucun volume,\naucune ouverture, aucun niveau.\n\nTransforme-la en photographie d'architecture :\n\n— Bardage mélèze vertical non traité,\n  lames de 12 cm, joint creux\n— Soubassement béton brut lisse\n— Menuiseries aluminium anthracite\n— Fin d'après-midi, ciel voilé, ombres\n  longues portées vers l'est\n— Deux personnes de dos, à l'échelle\n— Objectif 24 mm, verticales redressées\n\nLe sol, le ciel et la végétation : libres.\nLa façade, non.");
  tip(s, "Vue perspective, jamais axonométrie : l'IA traite une axo comme la photo d'une maquette physique et le résultat est décevant. Vérifiez leurs captures avant de lancer.");
  notes("12 minutes : 4 min de démonstration par vous, 8 min chacun sur son projet.\n\nFaites la démonstration sur VOTRE fichier d'abord, pour que le premier résultat soit propre.\n\nSi une capture n'a pas les verticales droites, la corriger dans SketchUp plutôt que de compter sur l'IA.");
}

/* ============ 13. MATIÈRE ET LUMIÈRE ============ */
{
  const s = light("Objectif B", "Apporter la matière et régler la lumière", "01:03");
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 2.2, CARD);
  label(s, M + 0.3, 1.72, half - 0.6, "Les matériaux par image de référence", SLATE);
  bullets(s, M + 0.3, 2.04, half - 0.6, 1.55, [
    "Une à trois images jointes, jamais plus : au-delà, le modèle mélange les intentions.",
    "Nommer le rôle de chaque image dans le texte : « Image 2 = le bardage voulu, matière et teinte uniquement. »",
    "Une bonne référence est un gros plan de matière, pas la photo d'un bâtiment entier."], 11.5, SLATE, 7);

  card(s, M, 3.84, half, 2.18, "F7E9E4");
  label(s, M + 0.3, 4.04, half - 0.6, "Le piège du premier jour", ACCENT);
  s.addText("Vous joignez la photo d'une maison en zinc pour montrer le matériau — et le modèle vous rend VOTRE projet redessiné avec la forme de CETTE maison.\n\nIl ne distingue pas spontanément la matière de la forme. Il faut le lui dire : « matière et teinte uniquement ».", {
    x: M + 0.3, y: 4.36, w: half - 0.6, h: 1.5, isTextBox: true, margin: 0, valign: "top",
    fontFace: BODY, fontSize: 11.5, color: RUST, lineSpacingMultiple: 1.14 });

  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 4.5, CARD);
  label(s, x2 + 0.3, 1.72, half - 0.6, "Quatre ambiances, quatre usages", SLATE);
  let y = 2.08;
  [["Milieu de matinée", "« 10 h, soleil au sud-est, ombres franches »", "Lecture des volumes — comité, permis", false],
   ["Fin d'après-midi", "« soleil rasant, ombres longues »", "Chaleur et relief de la matière — communication", false],
   ["Ciel couvert uniforme", "« ciel couvert uniforme, aucune ombre portée »", "Lecture neutre — présentation MOA, le plus honnête", true],
   ["Heure bleue", "« crépuscule, intérieurs allumés »", "L'image vitrine — réseaux sociaux, et celle qui ment le plus", false]
  ].forEach(a => {
    s.addText(a[0], { x: x2 + 0.3, y, w: half - 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: a[3] ? ACCENT : INK });
    s.addText(a[1], { x: x2 + 0.3, y: y + 0.26, w: half - 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, italic: true, color: SLATE });
    s.addText(a[2], { x: x2 + 0.3, y: y + 0.52, w: half - 0.6, h: 0.3, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, color: a[3] ? ACCENT : MUTED });
    y += 0.96;
  });
  tip(s, "Constituez dès cette semaine un dossier « Références matières » sur le serveur : quinze gros plans nommés par matériau et finition. C'est ce qui rend la méthode reproductible à l'échelle de l'agence.");
  notes("5 minutes. Démonstration en direct : joindre une référence matière et montrer le résultat. Montrez volontairement le piège — l'erreur vue une fois ne se refait plus.\n\nLe point professionnel : l'heure bleue est la plus vendeuse et la plus trompeuse. Une agence qui ne montre que des heures bleues perd en crédibilité auprès d'une MOA publique.\n\nLeur faire choisir une ambiance par défaut d'agence. C'est une décision, pas une préférence.\n\nAjouter la saison coûte six mots et évite le jardin toujours parfait : « arbres en fin d'automne, feuillage clairsemé ».");
}

/* ============ 14. GRILLE D'ITÉRATION ============ */
{
  const s = light("Le cœur du module · Objectif C", "Passer de 80 % à 100 % sans repartir de zéro", "01:12");
  card(s, M, 1.52, CW, 0.70, INK);
  s.addText("On ne relance jamais le prompt entier. On corrige dans la même conversation, une seule chose à la fois.", {
    x: M + 0.3, y: 1.52, w: CW - 0.6, h: 0.70, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HEAD, fontSize: 15.5, bold: true, color: "FFFFFF" });
  const rows = [
    ["Une matière", "« Garde tout identique. Change uniquement le bardage en zinc à joint debout gris quartz. »"],
    ["La lumière", "« Même image, même cadrage, mêmes matériaux. Passe en ciel couvert uniforme et supprime les ombres portées. »"],
    ["Un détail", "« Conserve l'ensemble. Supprime le garde-corps du balcon nord et remplace-le par un mur plein enduit. »"],
    ["Le staffage", "« Même image. Retire les personnages, garde la voiture, ajoute deux vélos contre le mur. »"],
    ["Le cadrage", "Exception : un cadrage ne se corrige pas. On repart de la capture 3D avec un nouveau point de vue."]];
  let y = 2.32;
  rows.forEach((r, i) => {
    const last = i === 4;
    card(s, M, y, CW, 0.56, last ? "F7E9E4" : (i % 2 === 0 ? CARD : "F6F7F8"));
    s.addText(r[0], { x: M + 0.3, y, w: 1.95, h: 0.56, isTextBox: true, margin: 0, valign: "middle",
      fontFace: BODY, fontSize: 12.5, bold: true, color: last ? ACCENT : INK });
    s.addText(r[1], { x: M + 2.35, y, w: CW - 2.65, h: 0.56, isTextBox: true, margin: 0,
      valign: "middle", fontFace: BODY, fontSize: 11.5, italic: !last, color: last ? RUST : SLATE });
    y += 0.62;
  });
  card(s, M, 5.50, CW, 0.46, CARD2);
  s.addText("Les trois ancrages :   « Garde tout identique. »   ·   « Change uniquement… »   ·   « Même cadrage, même lumière. »", {
    x: M + 0.3, y: 5.50, w: CW - 0.6, h: 0.46, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, bold: true, color: ACCENT });
  tip(s, "Une seule modification par message. Deux demandes dans le même message, et le modèle en applique une et demie — c'est l'erreur la plus fréquente.");
  notes("5 minutes. C'est LA slide de la formation — celle qu'ils photographieront. Laissez-la à l'écran.\n\nÀ démontrer en direct, en trois itérations enchaînées sur la même image. Ils doivent voir que l'image ne se réinitialise pas.\n\nLe réflexe à casser : réécrire tout le prompt à chaque essai, parce que c'est ce que Midjourney impose. Ici c'est une conversation — on parle à quelqu'un qui a l'image sous les yeux.\n\nC'est le livrable numéro 2 du programme : la grille d'itération. Le dire explicitement.");
}

/* ============ 15. CONTRÔLE DE DÉRIVE ============ */
{
  const s = light("Ce que le modèle a redessiné à sa façon", "Le contrôle de dérive, en trente secondes", "01:17");
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 4.5, CARD);
  label(s, M + 0.3, 1.72, half - 0.6, "La checklist, dans cet ordre", SLATE);
  const checks = [
    "Nombre de niveaux et de travées — le modèle en ajoute volontiers un",
    "Percements : nombre, proportions, alignements verticaux",
    "Débords, acrotères, casquettes — souvent redessinés au jugé",
    "Sens du bardage : vertical devenu horizontal sans prévenir",
    "Garde-corps, descentes d'eau pluviale, seuils — inventés",
    "Échelle du staffage : personnages trop petits, bâtiment trop grand",
    "Cohérence des ombres avec l'heure annoncée"];
  let y = 2.1;
  checks.forEach((c, i) => {
    numDot(s, M + 0.3, y, i + 1, 0.3, SLATE);
    s.addText(c, { x: M + 0.72, y: y - 0.04, w: half - 1.04, h: 0.44, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: SLATE, lineSpacingMultiple: 1.06 });
    y += 0.53;
  });
  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 1.72, CARD);
  label(s, x2 + 0.3, 1.72, half - 0.6, "La méthode", SLATE);
  s.addText("Capture 3D et image générée ouvertes côte à côte, sur deux moitiés d'écran. Trente secondes de lecture, systématiquement, avant toute nouvelle itération.", {
    x: x2 + 0.3, y: 2.04, w: half - 0.6, h: 1.0, isTextBox: true, margin: 0, valign: "top",
    fontFace: BODY, fontSize: 12, color: SLATE, lineSpacingMultiple: 1.14 });
  card(s, x2, 3.36, half, 1.28, "F7E9E4");
  s.addText("Une image passée devant un client avec une travée de plus, c'est une reprise de confiance qui coûte plus cher que tout le temps gagné.", {
    x: x2 + 0.3, y: 3.36, w: half - 0.6, h: 1.28, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, color: RUST, lineSpacingMultiple: 1.14 });
  card(s, x2, 4.76, half, 1.26, INK);
  s.addText("Le modèle ne se trompe pas : il produit l'image la plus plausible, pas la plus conforme. Là où votre projet s'écarte de l'ordinaire, il ramène vers la moyenne.", {
    x: x2 + 0.3, y: 4.76, w: half - 0.6, h: 1.26, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, color: "C8D0D4", lineSpacingMultiple: 1.14 });
  tip(s, "Règle d'agence à poser dès demain : une image qui n'a pas subi le contrôle de dérive ne sort pas de l'agence. C'est le geste qui protège votre crédibilité.");
  notes("5 minutes. Moment le plus professionnel de la session — c'est ce qui vous distingue d'un tutoriel.\n\nFaire l'exercice en direct sur une image que VOUS avez générée, en trouvant les erreurs devant eux. Montrer que vous les cherchez, pas que vous les connaissez.\n\nLa formulation clé, à dire lentement : le modèle ramène vers la moyenne ce que votre projet a de singulier. Un architecte comprend immédiatement ce que ça implique.\n\nSi vous êtes en retard, ne coupez pas cette slide. Coupez cinq minutes sur l'atelier suivant.");
}

/* ============ 16. ATELIER ITÉRATION ============ */
{
  const s = light("Atelier · 15 minutes", "Itérer sur votre propre projet", "01:20");
  const steps = [
    ["5 min", "Une première image à 80 %", "Depuis votre capture 3D, avec le prompt type. On ne cherche pas la perfection — on cherche une base."],
    ["7 min", "Trois itérations, une par catégorie", "Une matière, une lumière, un détail. Dans la même conversation, avec les trois ancrages."],
    ["3 min", "Contrôle de dérive croisé", "Chacun relit l'image de l'autre avec la checklist. On trouve toujours quelque chose."]];
  let y = 1.55;
  steps.forEach((st, i) => {
    card(s, M, y, CW, 1.12, i === 1 ? ASOFT : CARD);
    s.addText(st[0], { x: M + 0.28, y: y + 0.32, w: 0.95, h: 0.44, isTextBox: true, margin: 0,
      valign: "middle", fontFace: HEAD, fontSize: 17, bold: true, color: i === 1 ? ACCENT : INK });
    s.addText(st[1], { x: M + 1.4, y: y + 0.2, w: CW - 1.75, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK });
    s.addText(st[2], { x: M + 1.4, y: y + 0.53, w: CW - 1.75, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: i === 1 ? RUST : SLATE });
    y += 1.2;
  });
  card(s, M, 5.2, CW, 0.82, INK);
  s.addText("Sortie attendue : chacun quitte l'atelier avec une image de son projet qu'il assume de montrer, et le prompt qui l'a produite, collé dans la bibliothèque.", {
    x: M + 0.3, y: 5.2, w: CW - 0.6, h: 0.82, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12.5, color: "C8D0D4" });
  tip(s, "Une image tenue vaut mieux que dix images moyennes. Et si une image sort parfaite du premier coup, c'est suspect — faites-lui quand même passer le contrôle de dérive.");
  notes("15 minutes. Vous circulez, vous ne parlez pas depuis l'écran.\n\nCe que vous surveillez : celui qui recommence son prompt depuis le début au lieu d'itérer. Ça ne s'attrape qu'en regardant par-dessus l'épaule.\n\nLe contrôle croisé de la fin est important : relire l'image de quelqu'un d'autre est beaucoup plus efficace que relire la sienne.\n\nAnnoncer la pause à 01:30 précises, même si l'atelier n'est pas fini. Ils continueront pendant la pause, c'est très bien.\n\nPENDANT LA PAUSE : vérifier l'accès Seedance et les crédits sur les deux machines, charger les clips de secours, préparer une de leurs images validées comme point de départ du module vidéo.");
}

/* ============ 17. § VIDÉO (avec la pause) ============ */
{
  const s = divider("4", "La vidéo courte", "01:40 → 02:15  ·  35 MINUTES",
    "Les règles du prompt vidéo n'ont rien à voir avec celles de l'image.");
  s.addShape(pres.ShapeType.roundRect, { x: 8.55, y: 0.72, w: 4.16, h: 0.46, rectRadius: 0.08,
    fill: { color: DKCARD } });
  s.addText("PAUSE  01:30 → 01:40  ·  10 MINUTES", { x: 8.55, y: 0.72, w: 4.16, h: 0.46,
    isTextBox: true, margin: 0, valign: "middle", align: "center",
    fontFace: BODY, fontSize: 11, bold: true, color: DKMUT, charSpacing: 1 });
  const items = [["5 min", "Seedance 2.0 : ce qu'il fait, où y accéder, ce qu'il coûte"],
    ["8 min", "Le prompt vidéo en six blocs, et les six pièges"],
    ["4 min", "Travelling, panoramique, révélation, survol"],
    ["20 min", "Atelier : animer une image validée du module précédent"]];
  const cw = (CW - 0.75) / 4;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 3.62, cw, 1.58, DKCARD);
    s.addText(it[0], { x: x + 0.24, y: 3.84, w: cw - 0.48, h: 0.36, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 18, bold: true, color: ACCENT });
    s.addText(it[1], { x: x + 0.24, y: 4.26, w: cw - 0.48, h: 0.86, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: DKMUT, lineSpacingMultiple: 1.12 });
  });
  tip(s, "Séquence la plus fragile techniquement : file d'attente, crédits épuisés, génération qui échoue. Annoncez dès le début qu'une génération sur trois est jetable — c'est normal, et ça fait partie du coût.", true);
  notes("35 minutes. Objectif D du programme : animer une image fixe.\n\nVos deux clips de secours doivent être prêts et lisibles hors ligne. C'est le point de défaillance le plus probable de la session.");
}

/* ============ 18. SEEDANCE 2.0 ============ */
{
  const s = light("L'outil", "Seedance 2.0, en cinq minutes", "01:40");
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 2.05, CARD);
  label(s, M + 0.3, 1.72, half - 0.6, "Ce que c'est", SLATE);
  s.addText("Le modèle vidéo de ByteDance, sorti début 2026. Il occupe la première place des classements image vers vidéo, devant Veo 3, Sora 2 et Runway.\n\nUne seule fonction nous intéresse : donner à un rendu fixe un mouvement de caméra crédible.", {
    x: M + 0.3, y: 2.04, w: half - 0.6, h: 1.4, isTextBox: true, margin: 0, valign: "top",
    fontFace: BODY, fontSize: 12, color: SLATE, lineSpacingMultiple: 1.14 });
  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 2.05, CARD);
  label(s, x2 + 0.3, 1.72, half - 0.6, "Où y accéder, à quel prix", SLATE);
  s.addText("Dreamina, dans CapCut — web, application de bureau ou mobile. Disponible en Europe.\n\nUn essai gratuit, puis un système de crédits. Environ 0,05 $ par seconde générée : un clip de six secondes revient à une trentaine de centimes.", {
    x: x2 + 0.3, y: 2.04, w: half - 0.6, h: 1.4, isTextBox: true, margin: 0, valign: "top",
    fontFace: BODY, fontSize: 12, color: SLATE, lineSpacingMultiple: 1.14 });
  const stats = [["15 s", "durée maximale par génération"], ["4K", "disponible, 1080p suffisant"],
    ["9", "images de référence acceptées"], ["× 3", "le vrai coût : deux essais sur trois sont jetés"]];
  const cw = (CW - 0.75) / 4;
  stats.forEach((st, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 3.75, cw, 1.4, i === 3 ? ASOFT : CARD2);
    s.addText(st[0], { x: x + 0.22, y: 3.92, w: cw - 0.44, h: 0.6, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 32, bold: true, color: i === 3 ? ACCENT : INK });
    s.addText(st[1], { x: x + 0.22, y: 4.54, w: cw - 0.44, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: i === 3 ? RUST : SLATE });
  });
  card(s, M, 5.32, CW, 0.7, INK);
  s.addText("Seedance 2.5 est déjà sorti, avec la même logique de prompt. Ce que vous apprenez ici ne sera pas périmé au prochain modèle : on apprend une méthode, pas une interface.", {
    x: M + 0.3, y: 5.32, w: CW - 0.6, h: 0.7, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, color: "C8D0D4" });
  tip(s, "Générez toujours deux versions du même plan d'un coup : la seconde est souvent la bonne, et elle coûte trente centimes. Attendre pour relancer coûte bien plus cher en temps.");
  notes("5 minutes. Montrer l'interface Dreamina brièvement — ils la découvriront en faisant.\n\nLe chiffre à ne pas cacher : deux générations sur trois partent à la poubelle. C'est un outil de tirage, pas de commande.\n\nSi la question du coût vient : environ un euro pour un clip de six secondes utilisable, tout compris. À comparer à un devis de motion design.\n\nLa phrase sur Seedance 2.5 désamorce l'objection « ça change tous les six mois ». Ils y pensent tous.");
}

/* ============ 19. PROMPT VIDÉO + PIÈGES ============ */
{
  const s = light("La règle du module", "Le prompt vidéo, et les six pièges", "01:45");
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 0.66, INK);
  s.addText("En image on décrit un état. En vidéo, un mouvement dans le temps.", {
    x: M + 0.28, y: 1.52, w: half - 0.56, h: 0.66, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HEAD, fontSize: 15, bold: true, color: "FFFFFF" });
  let y = 2.3;
  [["Sujet", "ce qui est à l'image, repris de votre rendu"],
   ["Action", "ce qui bouge : feuillage, nuages, reflets"],
   ["Caméra", "un seul mouvement, jamais deux"],
   ["Environnement", "lumière, météo, moment de la journée"],
   ["Son", "ambiance sonore, ou « aucun son »"],
   ["Rythme", "durée et découpage des plans"]].forEach((b, i) => {
    card(s, M, y, half, 0.5, i === 2 ? ASOFT : CARD);
    numDot(s, M + 0.22, y + 0.1, i + 1, 0.3, i === 2 ? ACCENT : SLATE);
    s.addText(b[0], { x: M + 0.62, y, w: 1.78, h: 0.5, isTextBox: true, margin: 0, valign: "middle",
      fontFace: BODY, fontSize: 12, bold: true, color: INK });
    s.addText(b[1], { x: M + 2.42, y, w: half - 2.67, h: 0.5, isTextBox: true, margin: 0,
      valign: "middle", fontFace: BODY, fontSize: 10.5, color: i === 2 ? RUST : SLATE });
    y += 0.56;
  });
  card(s, M, 5.7, half, 0.32, CARD2);
  s.addText("60 à 100 mots — l'inverse du prompt image, où la précision paie toujours.", {
    x: M + 0.28, y: 5.7, w: half - 0.56, h: 0.32, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 10.5, italic: true, color: SLATE });

  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 4.5, CARD);
  label(s, x2 + 0.3, 1.72, half - 0.6, "Les six pièges", ACCENT);
  y = 2.1;
  [["Le mot « rapide »", "Le terme qui dégrade le plus la qualité. Un seul élément rapide."],
   ["Deux mouvements de caméra", "Un travelling qui devient panoramique : tremblements garantis."],
   ["La durée mal calibrée", "4 à 6 s tiennent en un plan. Au-delà de 8 s, annoncer les plans."],
   ["Le staffage animé", "Les personnages qui marchent se déforment. Préférez le feuillage."],
   ["Le texte dans l'image", "Enseigne, panneau, numéro de rue : ils fondent en deux secondes."],
   ["Attendre la conformité", "Les menuiseries bougent. Choisissez des plans qui pardonnent."]
  ].forEach((t, i) => {
    s.addText(t[0], { x: x2 + 0.3, y, w: half - 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: i === 0 ? ACCENT : INK });
    s.addText(t[1], { x: x2 + 0.3, y: y + 0.26, w: half - 0.6, h: 0.28, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11, color: SLATE });
    y += 0.63;
  });
  tip(s, "La règle d'or : le mouvement de la caméra et le mouvement du sujet vont dans deux phrases séparées. « La caméra avance lentement. Le feuillage bouge au vent. » Jamais dans la même phrase.");
  notes("8 minutes. Le renversement mental : ils viennent de passer 45 minutes à être très précis sur l'image, et là il faut être plus économe.\n\nLa règle d'or — séparer caméra et sujet — évite le plus d'échecs. La dire deux fois.\n\nLe piège numéro 4, le staffage animé, est celui qu'ils vont tous rencontrer : ils voudront faire marcher des gens devant leur bâtiment. Prévenir avant l'atelier fait gagner cinq minutes et une déception.\n\nLe piège numéro 6 est le prolongement de « image d'intention » : une vidéo IA se choisit pour ses angles morts.");
}

/* ============ 20. LES QUATRE MOUVEMENTS ============ */
{
  const s = light("Le vocabulaire de la caméra", "Quatre mouvements qui marchent", "01:53");
  const moves = [
    ["Travelling avant", "La caméra avance lentement vers l'entrée, sans à-coups, hauteur constante. »", "Ouverture de présentation, page projet", true],
    ["Panoramique", "Panoramique lent de gauche à droite le long de la façade sud, caméra fixe. »", "Lire une façade longue, un linéaire", false],
    ["Révélation", "La caméra part d'un premier plan de végétation et découvre le bâtiment. »", "Effet d'annonce, réseaux sociaux", false],
    ["Survol", "Lent mouvement orbital autour du bâtiment, altitude et vitesse constantes. »", "Insertion dans le site, volumétrie", false]];
  const cw = (CW - 0.75) / 4;
  moves.forEach((m, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 1.52, cw, 3.7, m[3] ? ASOFT : CARD);
    numDot(s, x + 0.26, 1.76, i + 1, 0.42, m[3] ? ACCENT : SLATE);
    s.addText(m[0], { x: x + 0.26, y: 2.3, w: cw - 0.52, h: 0.6, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 18, bold: true, color: INK });
    s.addText("« " + m[1], { x: x + 0.26, y: 2.94, w: cw - 0.52, h: 1.45, isTextBox: true,
      margin: 0, valign: "top", fontFace: BODY, fontSize: 11.5, italic: true,
      color: m[3] ? RUST : SLATE, lineSpacingMultiple: 1.12 });
    s.addText("POUR", { x: x + 0.26, y: 4.42, w: cw - 0.52, h: 0.22, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 9, bold: true, color: ACCENT, charSpacing: 1 });
    s.addText(m[2], { x: x + 0.26, y: 4.66, w: cw - 0.52, h: 0.5, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, color: SLATE });
  });
  card(s, M, 5.36, CW, 0.66, INK);
  s.addText("Le mot qui sauve la plupart des plans : LENTEMENT. Un travelling lent réussit neuf fois sur dix ; le même travelling rapide, une fois sur cinq.", {
    x: M + 0.3, y: 5.36, w: CW - 0.6, h: 0.66, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, color: "D8DEE1" });
  tip(s, "Pour un premier essai, prenez le travelling avant lent : c'est celui qui réussit le plus souvent, et il donne tout de suite un résultat montrable.");
  notes("4 minutes. Idéalement, avoir un exemple généré de chacun des quatre mouvements. Si vous n'en avez que deux, prenez le travelling avant et le survol.\n\nUtiliser leur vocabulaire de cinéma, pas les termes anglais des interfaces — ils comprennent mieux et retiennent mieux.");
}

/* ============ 21. ATELIER VIDÉO ============ */
{
  const s = light("Atelier · 20 minutes", "Animez votre image", "01:57");
  const steps = [
    ["3 min", "Choisir l'image et le mouvement", "Une image validée du module précédent. Un seul mouvement, décidé avant d'écrire."],
    ["7 min", "Premier clip de cinq secondes", "On génère, on regarde ensemble, on identifie ce qui a cassé et dans quel piège ça tombe."],
    ["7 min", "Deuxième version corrigée", "Une seule correction par rapport à la première. Même logique que l'itération sur l'image."],
    ["3 min", "Où ça sert, où ça ne sert pas", "Page projet et publication : oui. Présentation MOA : avec la mention d'intention. Dossier de concours : non."]];
  let y = 1.52;
  steps.forEach((st, i) => {
    card(s, M, y, CW, 1.02, i === 1 ? ASOFT : CARD);
    s.addText(st[0], { x: M + 0.28, y: y + 0.28, w: 0.95, h: 0.44, isTextBox: true, margin: 0,
      valign: "middle", fontFace: HEAD, fontSize: 16, bold: true, color: i === 1 ? ACCENT : INK });
    s.addText(st[1], { x: M + 1.4, y: y + 0.16, w: CW - 1.75, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK });
    s.addText(st[2], { x: M + 1.4, y: y + 0.48, w: CW - 1.75, h: 0.44, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11.5, color: i === 1 ? RUST : SLATE });
    y += 1.1;
  });
  card(s, M, 5.94, CW, 0.0, CARD2);
  tip(s, "Lancez votre propre génération en même temps que les leurs : ça vous donne un troisième exemple à commenter et ça masque l'attente. Le silence pendant une génération est plus long qu'il n'y paraît.");
  notes("20 minutes. Les temps de génération sont longs : profitez de l'attente pour parler des usages plutôt que de laisser le silence s'installer.\n\nPlan de repli : si la génération échoue ou si les crédits sont épuisés, passez aux clips préparés et transformez l'atelier en analyse commentée. Le contenu passe quand même.\n\nLe point d'atterrissage est le dernier bloc, trois minutes sur les usages. Ne pas le sacrifier : c'est ce qui transforme une démonstration technique en décision d'agence.\n\nÀ 02:15, on bascule sur l'agent même si un clip est encore en cours de génération.");
}

/* ============ 22. § AGENT ============ */
{
  const s = divider("5", "Créer son agent", "02:15 → 02:50  ·  35 MINUTES",
    "Le vrai basculement : un assistant à qui vous transmettez votre méthode, et qui l'applique sans qu'on réexplique.");
  const items = [["5 min", "De la conversation jetable à l'assistant qui vous connaît"],
    ["5 min", "ChatGPT ou Claude — lequel pour quel usage"],
    ["5 min", "L'anatomie d'un agent d'agence en cinq blocs"],
    ["20 min", "Construction en direct, avec leurs documents réels"]];
  const cw = (CW - 0.75) / 4;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 3.62, cw, 1.58, DKCARD);
    s.addText(it[0], { x: x + 0.24, y: 3.84, w: cw - 0.48, h: 0.36, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 18, bold: true, color: ACCENT });
    s.addText(it[1], { x: x + 0.24, y: 4.26, w: cw - 0.48, h: 0.86, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: DKMUT, lineSpacingMultiple: 1.12 });
  });
  tip(s, "Sortie attendue, au sens strict : leur agent tourne avant qu'ils quittent la salle. La construction commence à 02:30 au plus tard — ne passez pas tout le temps à expliquer.", true);
  notes("35 minutes. Objectif E et livrable numéro 3 du programme — le plus différenciant : les deux premiers modules, ils pourraient les trouver ailleurs. Celui-ci, non.");
}

/* ============ 23. BASCULEMENT + CHATGPT/CLAUDE ============ */
{
  const s = light("Le basculement", "Arrêter de tout réexpliquer à chaque fois", "02:15");
  card(s, M, 1.52, CW, 0.78, INK);
  s.addText("À chaque nouvelle conversation, vous réexpliquez qui vous êtes et comment l'agence écrit : vingt minutes de contexte pour dix minutes de travail. Un agent garde tout ça en permanence — ce n'est plus un outil qu'on utilise, c'est un collaborateur qu'on a formé.", {
    x: M + 0.3, y: 1.52, w: CW - 0.6, h: 0.78, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12.5, color: "D8DEE1" });
  const half = (CW - 0.4) / 2;
  const tools = [
    ["ChatGPT", "Projets et GPT personnalisés", [
      ["Fort en", "Image, multimodal, tout au même endroit. Il génère aussi les visuels."],
      ["L'agent qu'il porte", "L'agent RENDU — votre grammaire d'images et vos prompts types."],
      ["Sa limite", "Sur un document long, il survole au lieu de restituer."]], CARD, SLATE, SLATE],
    ["Claude", "Projects", [
      ["Fort en", "Documents longs, rigueur de restitution, justesse du ton."],
      ["Les agents qu'il porte", "L'agent ÉCRITURE et l'agent PROGRAMME — un CCTP de 80 pages déposé."],
      ["Sa limite", "Ne génère pas d'image. C'est un outil de texte."]], ASOFT, ACCENT, RUST]];
  tools.forEach((t, i) => {
    const x = M + i * (half + 0.4);
    card(s, x, 2.44, half, 2.82, t[3]);
    s.addText(t[0], { x: x + 0.3, y: 2.6, w: half - 0.6, h: 0.42, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 23, bold: true, color: INK });
    s.addText(t[1], { x: x + 0.3, y: 3.02, w: half - 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 10.5, color: MUTED });
    let y = 3.38;
    t[2].forEach(p => {
      s.addText(p[0].toUpperCase(), { x: x + 0.3, y, w: half - 0.6, h: 0.22, isTextBox: true,
        margin: 0, fontFace: BODY, fontSize: 9, bold: true, color: t[4], charSpacing: 0.8 });
      s.addText(p[1], { x: x + 0.3, y: y + 0.23, w: half - 0.6, h: 0.28, isTextBox: true, margin: 0,
        fontFace: BODY, fontSize: 11.5, color: t[5] });
      y += 0.6;
    });
  });
  card(s, M, 5.42, CW, 0.56, ACCENT);
  s.addText("La règle à retenir : l'image chez ChatGPT, le document chez Claude.", {
    x: M + 0.3, y: 5.42, w: CW - 0.6, h: 0.56, isTextBox: true, margin: 0, valign: "middle",
    fontFace: HEAD, fontSize: 18, bold: true, color: "FFFFFF" });
  tip(s, "Choisissez l'agent à construire en répondant à une seule question : qu'est-ce que vous réexpliquez le plus souvent ? La réponse désigne l'agent. Dans une agence de deux personnes, c'est presque toujours l'écriture.");
  notes("10 minutes, dont trois de démonstration Claude — le seul passage de la session sur Claude, à cadrer serré.\n\nCe qu'il faut montrer, et rien de plus : un Project, un PDF de programme déposé, deux questions précises (« quelles surfaces imposées par lot ? », « qu'est-ce que le règlement interdit explicitement ? »), deux réponses sourcées avec les pages. L'écart avec ChatGPT sur ce cas est visible immédiatement.\n\nNe pas ouvrir de débat comparatif entre modèles. La règle « l'image chez ChatGPT, le document chez Claude » est suffisante et opérationnelle.\n\nSi le budget les inquiète : Claude est optionnel, on peut tout faire dans ChatGPT, moins bien sur les documents longs. Le dire honnêtement.\n\nLe mot à employer : « former un collaborateur », pas « configurer un outil ».");
}

/* ============ 24. ANATOMIE DE L'AGENT ============ */
{
  const s = light("La construction", "L'anatomie d'un agent d'agence, en cinq blocs", "02:25");
  const blocks = [
    ["Rôle", "Qui il est, pour qui il travaille.", "Tu es l'assistant de rédaction de l'agence [X], agence d'architecture de deux personnes basée à [ville], qui intervient en logement collectif et en équipement public."],
    ["Méthode", "Ce qu'il fait avant de produire.", "Avant de rédiger, tu poses systématiquement trois questions : le destinataire, la phase du projet, la longueur attendue. Tu ne rédiges pas sans les réponses."],
    ["Ton et interdits", "Comment l'agence écrit — et n'écrit jamais.", "Phrases courtes, voix active, aucun superlatif. On n'écrit jamais « écrin », « skyline », « à taille humaine », « au service de ». Pas de point d'exclamation."],
    ["Références", "Ce sur quoi il s'appuie.", "Les documents déposés : trois notes d'intention livrées, un descriptif type, la présentation de l'agence, un mail représentatif du ton."],
    ["Garde-fous", "Ce qu'il n'a pas le droit de faire.", "Si une donnée manque — surface, budget, date, nom de la MOA — tu la demandes. Tu n'inventes jamais un chiffre, une référence de projet ou un nom propre."]];
  let y = 1.52;
  blocks.forEach((b, i) => {
    const last = i === 4;
    card(s, M, y, CW, 0.86, last ? ASOFT : CARD);
    numDot(s, M + 0.26, y + 0.22, i + 1, 0.42, last ? ACCENT : SLATE);
    s.addText(b[0], { x: M + 0.82, y: y + 0.12, w: 2.35, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 15, bold: true, color: INK });
    s.addText(b[1], { x: M + 0.82, y: y + 0.43, w: 2.35, h: 0.4, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 9.5, italic: true, color: MUTED, lineSpacingMultiple: 1.02 });
    s.addText("« " + b[2] + " »", { x: M + 3.35, y, w: CW - 3.65, h: 0.86, isTextBox: true,
      margin: 0, valign: "middle", fontFace: BODY, fontSize: 11.5,
      color: last ? RUST : SLATE, lineSpacingMultiple: 1.1 });
    y += 0.92;
  });
  tip(s, "Le bloc 5 est celui que tout le monde oublie, et celui qui rend l'agent utilisable en production : sans garde-fou, il comble les trous par de la vraisemblance — et une surface inventée dans une note d'intention est un vrai risque.");
  notes("5 minutes. Ne pas la lire — l'utiliser comme canevas pendant la construction de la slide suivante.\n\nLe bloc 3, ton et interdits, est celui qui les amuse le plus et produit l'effet le plus immédiat. Leur faire dire à voix haute les mots qu'ils détestent : la liste sort toute seule, très personnelle à chaque agence.\n\nCette slide est un livrable : ils la recopient telle quelle pour créer leurs autres agents plus tard.");
}

/* ============ 25. ATELIER AGENT ============ */
{
  const s = light("Atelier · 20 minutes", "On construit l'agent en direct", "02:30");
  const half = (CW - 0.4) / 2;
  const steps = [["3 min", "Choisir l'agent", "Un seul, celui qui sert dès mardi."],
    ["5 min", "Écrire les cinq blocs", "Ensemble, à l'écran, avec leurs mots."],
    ["5 min", "Déposer les documents", "Trois à cinq documents réels de l'agence."],
    ["5 min", "Le tester sur un vrai cas", "Une note d'intention réellement en cours."],
    ["2 min", "Corriger les instructions", "À partir de ce qui a raté au test."]];
  let y = 1.52;
  steps.forEach((st, i) => {
    card(s, M, y, half, 0.86, i === 3 ? ASOFT : CARD);
    s.addText(st[0], { x: M + 0.26, y, w: 0.85, h: 0.86, isTextBox: true, margin: 0, valign: "middle",
      fontFace: HEAD, fontSize: 16, bold: true, color: i === 3 ? ACCENT : INK });
    s.addText(st[1], { x: M + 1.2, y: y + 0.14, w: half - 1.45, h: 0.3, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 14.5, bold: true, color: INK });
    s.addText(st[2], { x: M + 1.2, y: y + 0.46, w: half - 1.45, h: 0.32, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, color: i === 3 ? RUST : SLATE });
    y += 0.88;
  });
  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 2.5, CARD);
  label(s, x2 + 0.3, 1.72, half - 0.6, "Les documents à déposer", SLATE);
  bullets(s, x2 + 0.3, 2.04, half - 0.6, 1.85, [
    "Deux à trois notes d'intention déjà livrées — les meilleures, pas les dernières",
    "Un descriptif ou un CCTP type de l'agence",
    "La plaquette ou la présentation de l'agence",
    "Un mail à une MOA, représentatif du ton",
    "La liste des mots bannis, écrite pendant l'atelier"], 11.5, SLATE, 7);
  card(s, x2, 4.16, half, 1.86, INK);
  label(s, x2 + 0.3, 4.36, half - 0.6, "Sortie attendue", ACCENT);
  s.addText("Leur agent tourne avant qu'ils quittent la salle, et il a produit au moins un texte qu'ils garderaient.\n\nC'est le livrable numéro 3 du programme : « votre agent, opérationnel dès le lendemain ». Il doit être vrai au sens strict.", {
    x: x2 + 0.3, y: 4.68, w: half - 0.6, h: 1.2, isTextBox: true, margin: 0, valign: "top",
    fontFace: BODY, fontSize: 11.5, color: "C8D0D4", lineSpacingMultiple: 1.14 });
  tip(s, "Ce sont les documents qui font la valeur, pas les instructions. Un agent sans documents n'est qu'un prompt un peu long. Si le temps manque, sacrifiez l'étape 5, jamais l'étape 3.");
  notes("20 minutes. Vous tenez le clavier pour l'étape 2, ils tiennent le leur pour les étapes 3 à 5.\n\nLe test de l'étape 4 doit porter sur un cas RÉEL et en cours, pas sur un exemple. C'est ce qui déclenche la conviction.\n\nSi le résultat du test est décevant, c'est une bonne nouvelle : l'étape 5 devient concrète et ils apprennent à corriger un agent — la vraie compétence.\n\nÀ 02:50, on arrête, même si l'agent n'est pas parfait. Ils le finiront eux-mêmes.");
}

/* ============ 26. § PASSAGE À L'ÉCHELLE ============ */
{
  const s = divider("6", "Passage à l'échelle", "02:50 → 03:00  ·  10 MINUTES",
    "Ce qui transforme une bonne journée en changement de pratique.");
  const items = [["3 min", "Quels outils garder, à quel budget"],
    ["4 min", "Le plan de démarrage sur trente jours"],
    ["3 min", "Ce qu'ils emportent, point par point"]];
  const cw = (CW - 0.5) / 3;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 3.62, cw, 1.58, DKCARD);
    s.addText(it[0], { x: x + 0.26, y: 3.84, w: cw - 0.52, h: 0.36, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 19, bold: true, color: ACCENT });
    s.addText(it[1], { x: x + 0.26, y: 4.26, w: cw - 0.52, h: 0.86, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 12, color: DKMUT, lineSpacingMultiple: 1.12 });
  });
  tip(s, "C'est aussi le moment de reprendre les questions de droits et de confidentialité que vous avez repoussées au cadrage. Vous leur aviez promis d'y revenir : tenez-le.", true);
  notes("10 minutes serrées. Si vous êtes en retard, c'est ici que vous compressez — mais ne supprimez jamais le plan 30 jours. Sans lui, la formation reste une démonstration.");
}

/* ============ 27. BUDGET + PLAN 30 JOURS ============ */
{
  const s = light("Le démarrage", "Quels outils garder, et le plan sur trente jours", "02:50");
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 4.5, CARD);
  label(s, M + 0.3, 1.72, half - 0.6, "Le budget réel", SLATE);
  let y = 2.08;
  [["ChatGPT Plus", "Image, itération, agent rendu", "≈ 23 € / mois / personne", "Indispensable", ACCENT],
   ["Dreamina — Seedance", "Vidéo courte, ponctuelle", "≈ 10 à 25 € / mois, ou à la carte", "Utile, à la demande", SLATE],
   ["Claude Pro", "Documents, notes, programmes", "≈ 20 € / mois / personne", "Si vous écrivez beaucoup", SLATE]
  ].forEach(r => {
    s.addText(r[0], { x: M + 0.3, y, w: half - 0.6, h: 0.24, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: INK });
    s.addText(r[1] + "  ·  " + r[2], { x: M + 0.3, y: y + 0.24, w: half - 0.6, h: 0.24,
      isTextBox: true, margin: 0, fontFace: BODY, fontSize: 11, color: SLATE });
    s.addText(r[3], { x: M + 0.3, y: y + 0.46, w: half - 0.6, h: 0.24, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 11, bold: true, color: r[4] });
    y += 0.84;
  });
  card(s, M + 0.3, 4.66, half - 0.6, 0.72, INK);
  s.addText("55 à 70 € / mois pour l'agence entière — à comparer à une demi-journée de perspectiviste.", {
    x: M + 0.5, y: 4.66, w: half - 1.0, h: 0.72, isTextBox: true, margin: 0, valign: "middle",
    fontFace: BODY, fontSize: 12, bold: true, color: "FFFFFF" });
  s.addText("On n'achète pas maintenant : les greffons de rendu spécial archi, Midjourney, les suites vidéo pro. À réévaluer dans six mois.", {
    x: M + 0.3, y: 5.5, w: half - 0.6, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, italic: true, color: MUTED });

  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 4.5, CARD);
  label(s, x2 + 0.3, 1.72, half - 0.6, "Le plan sur trente jours", SLATE);
  y = 2.08;
  [["Semaine 1 · Ancrer", "Une image par jour sur un projet réel, avec le contrôle de dérive. Quinze minutes suffisent. L'objectif est la méthode, pas le résultat.", false],
   ["Semaine 2 · Industrialiser", "La bibliothèque de prompts de l'agence : un fichier partagé, un prompt par typologie, et le dossier de références matières.", false],
   ["Semaine 3 · Sortir", "Une image et un clip de six secondes sur un projet à communiquer. Passage réel devant un client. C'est le test de vérité.", true],
   ["Semaine 4 · Cadrer", "La règle d'agence en cinq lignes : ce qui va dans l'IA, ce qui n'y va jamais, la mention qui accompagne toute image.", false]
  ].forEach(w2 => {
    s.addText(w2[0], { x: x2 + 0.3, y, w: half - 0.6, h: 0.26, isTextBox: true, margin: 0,
      fontFace: BODY, fontSize: 12, bold: true, color: w2[2] ? ACCENT : INK });
    s.addText(w2[1], { x: x2 + 0.3, y: y + 0.26, w: half - 0.6, h: 0.56, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11, color: w2[2] ? RUST : SLATE, lineSpacingMultiple: 1.06 });
    y += 0.86;
  });
  s.addText("Le vrai coût n'est pas l'abonnement, c'est le temps d'apprentissage — et vous venez de le payer.", {
    x: x2 + 0.3, y: 5.56, w: half - 0.6, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, italic: true, color: MUTED });
  tip(s, "Faites-leur poser le rendez-vous J+30 dans leur agenda pendant que vous parlez, pas après. Trente minutes à deux pour décider ce qu'on garde. Sans cette date, la semaine 3 n'arrive jamais.");
  notes("7 minutes. Les montants sont indicatifs — les vérifier le matin même.\n\nLa comparaison qui parle : une image de perspectiviste se situe entre 400 et 1500 €. Le budget annuel des trois outils représente moins d'une image.\n\nNe pas survendre : Claude est optionnel, Seedance peut se prendre à la carte. Une agence de deux personnes qui démarre peut tenir avec deux comptes ChatGPT Plus.\n\nLa semaine 1 est la seule qui compte vraiment : si la pratique quotidienne ne s'installe pas dans les sept premiers jours, tout le reste tombe.\n\nLa semaine 3 est le test de vérité : tant qu'ils n'ont pas montré une image IA à un vrai client, la formation n'a rien changé.");
}

/* ============ 28. CE QUE VOUS EMPORTEZ ============ */
{
  N++;
  const s = pres.addSlide();
  s.background = { color: INK };
  s.addText("CLÔTURE  ·  03:00", { x: M, y: 0.75, w: CW, h: 0.32, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 11, bold: true, color: ACCENT, charSpacing: 2 });
  s.addText("Ce que vous emportez", { x: M, y: 1.15, w: CW, h: 0.85, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 40, bold: true, color: "FFFFFF" });
  const items = [["01", "La bibliothèque de prompts", "Structurés, spécifiques à l'architecture, et déjà éprouvés sur vos projets."],
    ["02", "La grille d'itération", "Les trois ancrages et la checklist de contrôle de dérive."],
    ["03", "Votre agent", "Configuré, nourri de vos documents, opérationnel dès demain matin."],
    ["04", "La sélection d'outils", "À jour, avec les usages et les budgets associés."]];
  const cw = (CW - 0.75) / 4;
  items.forEach((it, i) => {
    const x = M + i * (cw + 0.25);
    card(s, x, 2.35, cw, 2.5, DKCARD);
    s.addText(it[0], { x: x + 0.26, y: 2.56, w: cw - 0.52, h: 0.5, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 26, bold: true, color: ACCENT });
    s.addText(it[1], { x: x + 0.26, y: 3.12, w: cw - 0.52, h: 0.62, isTextBox: true, margin: 0,
      fontFace: HEAD, fontSize: 16, bold: true, color: "FFFFFF" });
    s.addText(it[2], { x: x + 0.26, y: 3.8, w: cw - 0.52, h: 0.9, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: DKMUT, lineSpacingMultiple: 1.14 });
  });
  card(s, M, 5.15, CW, 1.32, ACCENT);
  s.addText("Et une phrase : une image générée est une image d'intention.", {
    x: M + 0.35, y: 5.33, w: CW - 0.7, h: 0.5, isTextBox: true, margin: 0,
    fontFace: HEAD, fontSize: 22, bold: true, color: "FFFFFF" });
  s.addText("Jamais un rendu conforme au modèle. Jamais une étude d'ensoleillement. C'est ce qui vous autorise à vous en servir devant un client.", {
    x: M + 0.35, y: 5.88, w: CW - 0.7, h: 0.42, isTextBox: true, margin: 0,
    fontFace: BODY, fontSize: 13, color: "F6DCD1" });
  footer(s, true);
  notes("3 minutes. Reprendre les quatre livrables un par un et vérifier à voix haute qu'ils les ont vraiment : le fichier de prompts est-il ouvert ? L'agent tourne-t-il ? Si non, prendre deux minutes de plus.\n\nDernière question à leur poser, et attendre la réponse : « qu'est-ce que vous faites demain matin avec ça ? » La réponse vous dit si la session a fonctionné.\n\nEnvoyer dans les 24 h : le fichier de prompts consolidé, cette présentation en PDF, la grille d'itération.");
}

/* ============ 29. ANTISÈCHE ANIMATEUR ============ */
{
  const s = light("Usage animateur · non projeté", "Antisèche : points de bascule et plans de repli", null);
  const half = (CW - 0.4) / 2;
  card(s, M, 1.52, half, 2.6, CARD);
  label(s, M + 0.3, 1.72, half - 0.6, "Les cinq moments à surveiller", SLATE);
  let y = 2.06;
  [["00:12", "Si le débat sur les droits s'installe, le couper : on y revient à 02:50."],
   ["00:45", "Si l'exercice comparatif traîne, garder la manche 1, réduire le débrief."],
   ["01:17", "Le contrôle de dérive est LE moment de la session. Ne jamais le sacrifier."],
   ["02:10", "Si la vidéo échoue, basculer sur les clips préparés sans hésiter."],
   ["02:45", "L'agent doit tourner. Si retard, prendre sur le passage à l'échelle."]].forEach(w2 => {
    s.addText(w2[0], { x: M + 0.3, y, w: 0.8, h: 0.38, isTextBox: true, margin: 0, valign: "top",
      fontFace: BODY, fontSize: 12, bold: true, color: ACCENT });
    s.addText(w2[1], { x: M + 1.16, y, w: half - 1.46, h: 0.38, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: SLATE });
    y += 0.4;
  });
  const x2 = M + half + 0.4;
  card(s, x2, 1.52, half, 2.6, "F7E9E4");
  label(s, x2 + 0.3, 1.72, half - 0.6, "Plans de repli", ACCENT);
  y = 2.06;
  [["Connexion HS", "Partage 4G depuis votre téléphone, testé avant."],
   ["Compte bloqué", "Travailler à deux sur une machine. La session tient."],
   ["Seedance saturé", "Deux clips préparés en local, lisibles hors ligne."],
   ["Pas de capture 3D", "Basculer sur l'esquisse scannée, ou fournir un modèle neutre."],
   ["Trop en avance", "Approfondir les références matières, lancer un deuxième agent."]].forEach(f => {
    s.addText(f[0], { x: x2 + 0.3, y, w: 1.75, h: 0.38, isTextBox: true, margin: 0, valign: "top",
      fontFace: BODY, fontSize: 11.5, bold: true, color: RUST });
    s.addText(f[1], { x: x2 + 2.15, y, w: half - 2.45, h: 0.38, isTextBox: true, margin: 0,
      valign: "top", fontFace: BODY, fontSize: 11.5, color: RUST });
    y += 0.4;
  });
  card(s, M, 4.26, CW, 1.76, INK);
  label(s, M + 0.3, 4.46, CW - 0.6, "Les trois choses à préparer la veille", ACCENT);
  bullets(s, M + 0.3, 4.8, CW - 0.6, 1.1, [
    "Deux clips vidéo de secours, générés depuis un rendu d'architecture, disponibles hors ligne",
    "Un projet de démonstration à vous : capture 3D propre, image générée, trois itérations déjà faites",
    "Un fichier partagé ouvert et vide, qui deviendra leur bibliothèque de prompts pendant la session"],
    11.5, "C8D0D4", 6);
  tip(s, "Le seul indicateur qui compte en fin de session : est-ce que chacun repart avec une image de son projet qu'il assume, et un agent qui tourne ? Le reste est du contenu.");
  notes("Slide de préparation, jamais projetée. À relire le dimanche soir.\n\nLes cinq moments de surveillance sont ceux où une session de trois heures se joue : les quatre premiers sont des arbitrages de temps, le cinquième est un arbitrage de valeur.\n\nLes trois préparations de la veille prennent environ une heure. C'est la meilleure heure investie sur cette formation.");
}

/* ============ 30. ANNEXE — BIBLIOTHÈQUE DE PROMPTS ============ */
{
  const s = light("Annexe · à distribuer", "Bibliothèque de prompts, à copier telle quelle", null);
  const cw = (CW - 0.5) / 3, h = 2.14;
  const P = [
    ["Image · capture 3D → rendu", "Voici une capture de ma maquette 3D.\nConserve exactement la géométrie, les\nproportions, le cadrage, le point de vue.\nN'ajoute ni ne supprime aucun volume.\n\nTransforme-la en photographie\nd'architecture : [matériaux] ·\n[lumière et ciel] · [staffage]\nObjectif 24 mm, verticales redressées."],
    ["Image · esquisse → maquette blanche", "Voici un croquis à main levée.\nRespecte strictement la géométrie,\nles proportions et l'implantation.\n\nProduis-en une maquette blanche :\nvolumes en plâtre mat, socle neutre,\nlumière rasante de trois quarts,\nfond gris clair. Aucun matériau,\naucune couleur, aucun décor."],
    ["Image · les trois itérations", "MATIÈRE\nGarde tout identique. Change\nuniquement le bardage en [matériau].\n\nLUMIÈRE\nMême image, même cadrage. Passe en\n[ambiance] et ajuste les ombres.\n\nDÉTAIL\nConserve l'ensemble. Supprime [élément]."],
    ["Vidéo · travelling avant", "Photographie d'architecture d'une\n[typologie] en [matériau], en fin\nd'après-midi.\n\nLa caméra avance lentement et\nrégulièrement vers l'entrée, hauteur\nconstante, sans à-coups.\n\nLe feuillage bouge légèrement au vent.\n\nAucun son. Un plan, six secondes."],
    ["Vidéo · panoramique de façade", "Façade sud d'un [typologie] en\n[matériau], ciel couvert uniforme.\n\nPanoramique lent et régulier de\ngauche à droite, caméra fixe,\nvitesse constante.\n\nAucun mouvement en dehors de la\nvégétation.\n\nAucun son. Un plan, huit secondes."],
    ["Vidéo · survol du projet", "Vue aérienne d'un [typologie] dans\nson contexte, en milieu de matinée.\n\nLent mouvement orbital autour du\nbâtiment, altitude et vitesse\nconstantes.\n\nLa végétation bouge légèrement.\nAucun personnage en mouvement.\n\nAucun son. Un plan, huit secondes."]];
  P.forEach((p, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    promptBox(s, M + col * (cw + 0.25), 1.52 + row * (h + 0.22), cw, h, p[0], p[1], 9);
  });
  tip(s, "Les crochets sont volontaires : remplissez-les avec votre propre vocabulaire. Un prompt entièrement pré-écrit ne devient jamais le vôtre — et c'est le vôtre qui vous fera gagner du temps.");
  notes("Annexe à envoyer en PDF après la session, et à copier dans leur fichier de prompts pendant la session.\n\nLes trois prompts vidéo respectent la règle d'or : caméra et sujet dans des phrases séparées. Leur faire remarquer la longueur — entre 50 et 70 mots, la zone où le modèle est le plus fiable.\n\nLe prompt « esquisse vers maquette blanche » est celui qui surprend le plus favorablement les architectes : il correspond à un geste qu'ils connaissent déjà et qu'ils font à la main.\n\nLe survol précise « aucun personnage en mouvement » : c'est le garde-fou contre le piège du staffage animé.");
}

pres.writeFile({ fileName: "formation-ia-architectes.pptx" })
  .then(f => console.log("OK →", f, "| slides:", N));
