/* Chat section, animated live conversation between architecte & MO */

const getChatScript = () => [
  { type: "msg", side: "them", who: "MA", name: L("Marie Armand · Maître d'ouvrage", "Marie Armand · Client"), time: "14:32", text: L("Bonjour Marc, nous avons bien regardé vos trois propositions pour la cuisine. La verrière nous plaît beaucoup.", "Hi Marc, we've looked closely at your three kitchen proposals. We really like the glass roof.") },
  { type: "msg", side: "me", who: "ML", name: L("Vous · Architecte", "You · Architect"), time: "14:35", text: L("Excellente nouvelle. Ma préférence va aussi à la n°2 — verrière plein sud, et on reste dans le budget.", "Great news. My preference is also option 2 — south-facing glass roof, and we stay on budget."), attach: "proposition-2-cuisine.pdf" },
  { type: "msg", side: "them", who: "MA", name: L("Marie Armand · Maître d'ouvrage", "Marie Armand · Client"), time: "14:38", text: L("Alors c'est décidé, on part sur la n°2 !", "It's settled then, we're going with option 2!") },
  { type: "decision", title: L("Décision validée — Cuisine · proposition n°2", "Decision approved — Kitchen · option 2"), sub: L("SIGNÉE PAR MARIE ARMAND · 14:39 · ARCHIVÉE AU PROJET", "SIGNED BY MARIE ARMAND · 14:39 · ARCHIVED TO PROJECT") },
  { type: "msg", side: "me", who: "ML", name: L("Vous · Architecte", "You · Architect"), time: "14:41", text: L("Noté et archivé. Je lance les plans d'exécution, vous les verrez arriver dans Documents d'ici vendredi.", "Noted and archived. I'm starting the construction drawings, you'll see them in Documents by Friday.") },
];

const Chat = () => {
  const CHAT_SCRIPT = getChatScript();
  const [steps, setSteps] = React.useState([]);   // revealed steps
  const [typing, setTyping] = React.useState(null); // side currently typing
  const [done, setDone] = React.useState(false);
  const bodyRef = React.useRef(null);
  const sectionRef = React.useRef(null);
  const playingRef = React.useRef(false);
  const timersRef = React.useRef([]);

  const clearTimers = () => { timersRef.current.forEach(clearTimeout); timersRef.current = []; };
  const wait = (fn, ms) => { const t = setTimeout(fn, ms); timersRef.current.push(t); };

  const scrollBottom = () => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const play = React.useCallback(() => {
    if (playingRef.current) return;
    playingRef.current = true;
    clearTimers();
    setSteps([]); setTyping(null); setDone(false);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setSteps(CHAT_SCRIPT.map((_, i) => i));
      setDone(true);
      playingRef.current = false;
      return;
    }

    let t = 600;
    CHAT_SCRIPT.forEach((step, i) => {
      if (step.type === "msg") {
        wait(() => { setTyping(step.side); requestAnimationFrame(scrollBottom); }, t);
        t += 500 + Math.min(step.text.length * 9, 1300);
        wait(() => {
          setTyping(null);
          setSteps((s) => [...s, i]);
          requestAnimationFrame(scrollBottom);
        }, t);
        t += 750;
      } else {
        t += 350;
        wait(() => {
          setSteps((s) => [...s, i]);
          requestAnimationFrame(scrollBottom);
        }, t);
        t += 1000;
      }
    });
    wait(() => { setDone(true); playingRef.current = false; }, t + 300);
  }, []);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { play(); io.unobserve(el); }
      }),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimers(); };
  }, [play]);

  return (
    <section className="chat-section" id="messagerie" ref={sectionRef}>
      <div className="container chat-layout">
        <Reveal className="chat-text">
          <span className="eyebrow">{L("Messagerie intégrée", "Built-in messaging")}</span>
          <h2>{L("Architecte et maître d'ouvrage, ", "Architect and client, ")}<em>{L("enfin sur le même fil.", "finally on the same thread.")}</em></h2>
          <p>{L("Chaque échange vit dans le projet, pas dans une boîte mail. Et quand une conversation devient une décision, elle est signée, horodatée et archivée. Automatiquement.", "Every exchange lives in the project, not in an inbox. And when a conversation becomes a decision, it's signed, timestamped and archived. Automatically.")}</p>
          <ul className="tour-bullets">
            <li><Icon name="check" size={12}/> {L("Un fil par projet, par phase, contexte toujours préservé", "One thread per project and phase, context always preserved")}</li>
            <li><Icon name="check" size={12}/> {L("Pièces jointes versionnées, jamais réécrasées", "Versioned attachments, never overwritten")}</li>
            <li><Icon name="check" size={12}/> {L("Les décisions prises dans le fil sont archivées au projet", "Decisions made in the thread are archived to the project")}</li>
          </ul>
          {done && (
            <button className="chat-replay" onClick={play}>
              <Icon name="arrow-right" size={12} style={{transform:"rotate(-45deg)"}}/> {L("Rejouer la conversation", "Replay the conversation")}
            </button>
          )}
        </Reveal>

        <Reveal delay={120}>
          <div className="chat-phone">
            <div className="chat-phone-notch"></div>
            <div className="chat-status"><span>9:41</span><span>●●● 5G ▢</span></div>
            <div className="chat-win">
            <div className="chat-head">
              <div className="chat-head-avatars">
                <span className="av blue">MA</span>
                <span className="av gold">ML</span>
              </div>
              <div>
                <div className="chat-head-title">{L("Grange Lissieu — Cuisine", "Grange Lissieu — Kitchen")}</div>
                <div className="chat-head-sub"><span className="on"/> {L("Marie est en ligne", "Marie is online")}</div>
              </div>
              <span className="chat-head-phase">{L("PHASE · APS", "PHASE · DESIGN")}</span>
            </div>

            <div className="chat-body" ref={bodyRef}>
              <span className="chat-day">{L("AUJOURD'HUI · 14:32", "TODAY · 14:32")}</span>
              {CHAT_SCRIPT.map((step, i) => {
                if (!steps.includes(i)) return null;
                if (step.type === "decision") {
                  return (
                    <div key={i} className="chat-decision">
                      <span className="dec-ic"><Icon name="check" size={17}/></span>
                      <div>
                        <div className="dec-t">{step.title}</div>
                        <div className="dec-s">{step.sub}</div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={i} className={`chat-row ${step.side === "me" ? "me" : ""}`}>
                    <span className={`chat-av ${step.side === "me" ? "av gold" : "av blue"}`}>{step.who}</span>
                    <div className="chat-bubble">
                      <div className="chat-meta">{step.name} · {step.time}</div>
                      {step.text}
                      {step.attach && <div className="chat-attach"><Icon name="doc" size={12}/> {step.attach}</div>}
                    </div>
                  </div>
                );
              })}
              {typing && (
                <div className={`chat-typing ${typing === "me" ? "me" : ""}`}>
                  <span className={`chat-av ${typing === "me" ? "av gold" : "av blue"}`}>{typing === "me" ? "ML" : "MA"}</span>
                  <div className="bub"><span/><span/><span/></div>
                </div>
              )}
            </div>

            <div className="chat-input">
              <div className="field-fake">{L("Écrire à Marie…", "Message Marie…")}</div>
              <button className="send" aria-label={L("Envoyer", "Send")}><Icon name="arrow-up-right" size={15}/></button>
            </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

window.Chat = Chat;
