/* App-style notifications, welcome toast + contextual scroll toasts */

const Notifications = ({ lang }) => {
  const [toasts, setToasts] = React.useState([]);
  const idRef = React.useRef(0);
  const shownRef = React.useRef({});

  const dismiss = (id) => {
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 450);
  };

  const notify = React.useCallback((key, title, body, opts = {}) => {
    if (shownRef.current[key]) return;
    shownRef.current[key] = true;
    const id = ++idRef.current;
    setToasts((t) => [...t.slice(-2), { id, title, body, ...opts }]);
    setTimeout(() => dismiss(id), opts.duration || 6500);
  }, []);

  React.useEffect(() => {
    // Welcome toast shortly after arrival (after the intro curtain)
    const t = setTimeout(() => {
      notify(
        "welcome",
        L("Bienvenue à bord", "Welcome on board"),
        L("Découvrez comment ALBA pilote vos projets, laissez-vous guider.", "See how ALBA runs your projects, scroll to take the tour.")
      );
    }, 3800);
    return () => clearTimeout(t);
  }, [notify]);

  React.useEffect(() => {
    // Contextual toasts on scroll
    const targets = [
      { sel: "#messagerie", key: "msg",
        title: L("Marie Armand · Maître d'ouvrage", "Marie Armand · Client"),
        body: L("Nouveau message, « Alors c'est décidé, on part sur la n°2 ! »", "New message — \"It's settled, we're going with option 2!\"") },
      { sel: "#pricing", key: "trial",
        title: L("Votre premier projet est offert", "Your first project is free"),
        body: L("Gérez un projet complet gratuitement, sans carte bleue. Activez-le quand vous voulez.", "Run one full project free, no credit card. Activate it whenever you like.") },
    ];
    const observers = [];
    targets.forEach((tg) => {
      const el = document.querySelector(tg.sel);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => notify(tg.key, tg.title, tg.body), 900);
            io.unobserve(el);
          }
        }),
        { threshold: 0.4 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, [notify, lang]);

  return (
    <div className="notif-stack" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`notif ${t.leaving ? "leaving" : ""}`}>
          <div className="notif-icon"><img src="images/logo-alba.png" alt=""/></div>
          <div className="notif-content">
            <div className="notif-app">
              ALBA STUDIO <span>· {L("maintenant", "now")}</span>
            </div>
            <div className="notif-title">{t.title}</div>
            <div className="notif-body">{t.body}</div>
          </div>
          <button className="notif-close" onClick={() => dismiss(t.id)} aria-label={L("Fermer", "Close")}>
            <Icon name="x" size={12}/>
          </button>
        </div>
      ))}
    </div>
  );
};

window.Notifications = Notifications;
