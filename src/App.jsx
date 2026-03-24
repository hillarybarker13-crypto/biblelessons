
import React, { useEffect, useMemo, useState } from "react";

const verseMap = {
  "Jeremiah 29:11": "For I know the plans I have for you,” declares the Lord, “plans to prosper you and not to harm you, plans to give you hope and a future.”",
  "Philippians 4:6-7": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
  "Isaiah 40:31": "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.",
  "2 Corinthians 5:7": "For we walk by faith, not by sight.",
  "Deuteronomy 31:6": "Be strong and courageous. Do not be afraid, for the Lord your God goes with you.",
  "Proverbs 3:5-6": "Trust in the Lord with all your heart and lean not on your own understanding.",
  "James 4:8": "Come near to God and he will come near to you.",
  "2 Corinthians 12:9": "My grace is sufficient for you, for my power is made perfect in weakness.",
  "Psalm 119:105": "Your word is a lamp for my feet, a light on my path.",
  "Matthew 11:28": "Come to me, all you who are weary and burdened, and I will give you rest.",
  "Genesis 16:13": "You are the God who sees me.",
  "Lamentations 3:22-23": "Because of the Lord’s great love we are not consumed. His mercies are new every morning.",
  "Joshua 1:9": "Be strong and courageous. Do not be discouraged, for the Lord your God will be with you.",
  "Nehemiah 8:10": "The joy of the Lord is your strength.",
  "Romans 8:6": "The mind governed by the Spirit is life and peace.",
  "Psalm 55:22": "Cast your cares on the Lord and he will sustain you.",
  "Psalm 27:14": "Wait for the Lord; be strong and take heart and wait for the Lord.",
  "Hebrews 10:23": "Let us hold unswervingly to the hope we profess, for he who promised is faithful.",
  "Psalm 25:4-5": "Show me your ways, Lord. Guide me in your truth and teach me.",
  "Mark 4:39": "Peace! Be still!",
  "Romans 8:38-39": "Nothing can separate us from the love of God that is in Christ Jesus our Lord.",
  "Colossians 3:12": "Clothe yourselves with compassion, kindness, humility, gentleness and patience.",
  "Matthew 7:7": "Ask and it will be given to you; seek and you will find.",
  "Isaiah 58:11": "The Lord will guide you always.",
  "Galatians 5:22-23": "The fruit of the Spirit is love, joy, peace, kindness, goodness, faithfulness, gentleness and self-control.",
  "1 John 1:9": "If we confess our sins, he is faithful and just and will forgive us our sins.",
  "Exodus 14:14": "The Lord will fight for you; you need only to be still.",
  "John 8:32": "Then you will know the truth, and the truth will set you free.",
  "Psalm 34:1": "I will extol the Lord at all times; his praise will always be on my lips.",
  "Isaiah 46:4": "I have made you and I will carry you; I will sustain you and I will rescue you.",
  "Galatians 6:9": "Let us not become weary in doing good."
};

const verseOfTheDay = {
  reference: "Psalm 46:10",
  text: "Be still, and know that I am God.",
  reflection: "A gentle reminder to pause, breathe, and remember that God is present even in the middle of a busy day."
};

const inspirationalTexts = [
  "God is still writing your story.",
  "What feels heavy to you is not too heavy for Him.",
  "You are seen, loved, and never forgotten.",
  "A small prayer can still move a big mountain.",
  "Grace meets you right where you are.",
  "Even slow growth is still beautiful growth.",
  "God can do so much with one surrendered day.",
  "You are not behind. God is still on time."
];

const lessonSeeds = [
  ["Created With Purpose","Jeremiah 29:11","Jeremiah 29","Your life is not random. Even when you cannot see the full picture, God has intention in the way He is leading you.","Lord, help me trust that Your plans are good and full of hope."],
  ["Peace Over Worry","Philippians 4:6-7","Philippians 4","God invites you to bring your anxious thoughts to Him. His peace can settle your heart before your situation even changes.","Jesus, replace my worry with Your peace today."],
  ["Strength for Today","Isaiah 40:31","Isaiah 40","You do not have to run on empty. God renews tired hearts and gives fresh strength for what today asks of you.","Father, renew my strength and carry me through this day."],
  ["Walking by Faith","2 Corinthians 5:7","2 Corinthians 5","Faith is trusting God with the next step even when you do not know how everything will unfold.","Lord, help me trust You when you cannot see the whole path."],
  ["You Are Not Alone","Deuteronomy 31:6","Deuteronomy 31","God does not leave when life gets hard. He remains near, steady, and faithful in every season.","Thank You for staying with me and never letting me walk alone."],
  ["A Heart That Trusts","Proverbs 3:5-6","Proverbs 3","Letting go of your own understanding makes room for God’s wisdom to guide you more clearly.","God, teach me to trust You more deeply than my own understanding."],
  ["Closer to God","James 4:8","James 4","Every small step toward God matters. He welcomes you near with grace, not pressure.","Draw my heart closer to You today."],
  ["Held by Grace","2 Corinthians 12:9","2 Corinthians 12","Grace is not just what saved you. It is what sustains you when you feel weak, uncertain, or worn out.","Let Your grace be enough for me today."],
  ["Light for the Next Step","Psalm 119:105","Psalm 119","God often gives light for the next step instead of the whole road. Trust what He has shown you today.","Help me follow the light You have already given me."],
  ["Rest for Your Soul","Matthew 11:28","Matthew 11","Jesus welcomes tired people. You do not need to arrive polished to find rest in Him.","Teach me to rest in You instead of striving."],
  ["When You Feel Unseen","Genesis 16:13","Genesis 16","God sees what other people miss. He notices your tears, your effort, and the hidden parts of your story.","Thank You for seeing me fully and lovingly."],
  ["New Mercies","Lamentations 3:22-23","Lamentations 3","Today is not empty. God has already filled it with fresh mercy before you even stepped into it.","Help me receive the mercy You have for me today."],
  ["Courage for Today","Joshua 1:9","Joshua 1","Courage is not pretending you are fearless. It is moving forward while remembering that God is with you.","Make me strong and courageous through Your presence."],
  ["Joy in the Middle","Nehemiah 8:10","Nehemiah 8","Joy is not always loud. Sometimes it is the quiet strength that keeps you going.","Fill my heart with Your joy and strength."],
  ["A Calm Mind","Romans 8:6","Romans 8","Setting your mind on God brings life and peace. What you focus on shapes how you walk through the day.","Help me fix my thoughts on what is true and life-giving."],
  ["Let God Carry It","Psalm 55:22","Psalm 55","What feels heavy to you is not too heavy for God. He is strong enough to hold what you cannot.","I give You what I have been trying to carry alone."],
  ["Faithful in Waiting","Psalm 27:14","Psalm 27","Waiting is not wasted when God is in it. He often grows strength in the places where answers feel delayed.","Teach me to wait with hope and steady trust."],
  ["Hope That Holds","Hebrews 10:23","Hebrews 10","Your hope is not built on changing feelings. It is anchored in the faithfulness of God.","Help me hold tightly to the hope You give."],
  ["A Teachable Heart","Psalm 25:4-5","Psalm 25","God can guide a willing heart. The more teachable you are, the more clearly you can follow Him.","Show me Your ways and lead me in truth."],
  ["Peace in the Storm","Mark 4:39","Mark 4","Jesus is not absent in the storm. He is present, powerful, and still able to speak peace.","Speak peace into the stormiest parts of my heart."],
  ["Love That Stays","Romans 8:38-39","Romans 8","Nothing can separate you from the love of God. Not your fear, not your failure, not your doubt.","Help me rest in the love You never withdraw."],
  ["A Gentle Spirit","Colossians 3:12","Colossians 3","Strength and gentleness can live together. God shapes a beautiful heart through compassion and patience.","Clothe me with kindness and gentleness today."],
  ["Ask Boldly","Matthew 7:7","Matthew 7","God welcomes your prayers. Bring Him the big hopes, the little needs, and the honest questions.","Help me come to You with bold and trusting prayer."],
  ["God Will Guide You","Isaiah 58:11","Isaiah 58","You are not wandering unnoticed. God knows how to lead you in dry places and restore what feels worn down.","Guide me clearly and refresh my soul."],
  ["Fruit of the Spirit","Galatians 5:22-23","Galatians 5","The Spirit grows beautiful things in you over time. Growth may be slow, but it is still sacred.","Grow Your fruit in my life, one day at a time."],
  ["You Can Begin Again","1 John 1:9","1 John 1","God is not finished with you because you stumbled. Grace makes room for new starts.","Thank You for forgiveness and fresh beginnings."],
  ["God Fights for You","Exodus 14:14","Exodus 14","Not every battle is yours to manage. Some moments call for trust more than striving.","Teach me when to be still and let You fight for me."],
  ["Rooted in Truth","John 8:32","John 8","God’s truth brings freedom. The more deeply you root yourself in it, the steadier your soul becomes.","Ground me in truth and free me from lies."],
  ["Praise in Every Season","Psalm 34:1","Psalm 34","Praise is not denial. It is choosing to remember God’s goodness in every season.","Put praise in my heart no matter what today holds."],
  ["Carried by God","Isaiah 46:4","Isaiah 46","You are not carrying your whole life alone. God is able to sustain, help, and hold you through it all.","Carry me where I feel weak and tired."],
  ["Keep Going","Galatians 6:9","Galatians 6","Do not underestimate quiet faithfulness. God sees every small act of obedience and growth.","Help me not give up on the good work You are doing in me."]
];

const biblePlan = lessonSeeds.map((item, index) => ({ day:index+1, title:item[0], verse:item[1], reading:item[2], focus:item[3], prayer:item[4] }));
const biblePlanKids = lessonSeeds.map((item, index) => ({ day:index+1, title:item[0], verse:item[1], reading:item[2], focus:item[3].split(".")[0] + ".", prayer:"God, help me today. Thank You for loving me. Amen." }));

const stickyColors = ["#F6E7A1", "#FFD8BE", "#CDE7BE", "#D8E8F0", "#E8D7F1"];
const stickyRotations = [-4,-2,2,3,5];
const adultPalette = { bg:"#EEDECD", text:"#3C5667", header:"#A6B2B8", verse:"#80917B", accent:"#7B665A", panel:"#FFFFFF", soft:"#F7F4EF", lesson:"#EEDECD", button:"#3C5667" };
const kidPalette = { bg:"#B5D5C8", text:"#1E5A8A", header:"#EBBEC6", verse:"#54B7AF", accent:"#F1EDC3", panel:"#FFF7EF", soft:"#F1EDC3", lesson:"#C4E3E6", button:"#1E5A8A" };

export default function App() {
  const [kidsMode, setKidsMode] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("plan");
  const [newPrayer, setNewPrayer] = useState("");
  const [prayers, setPrayers] = useState([]);
  const [toast, setToast] = useState(null);
  const [checkInMood, setCheckInMood] = useState("");
  const [showCheckInResponse, setShowCheckInResponse] = useState(false);
  const [userName, setUserName] = useState("");
  const [askName, setAskName] = useState(false);
  const [askAge, setAskAge] = useState(false);
  const [userAge, setUserAge] = useState(10);
  const [selectedDay, setSelectedDay] = useState(biblePlan[0]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [openVerse, setOpenVerse] = useState(null);
  const [streak, setStreak] = useState(0);
  const [streakFreeze, setStreakFreeze] = useState(1);
  const [showMilestone, setShowMilestone] = useState(null);
  const [flamePulse, setFlamePulse] = useState(false);

  const autoKids = userAge <= 10;
  const currentPlan = kidsMode || autoKids ? biblePlanKids : biblePlan;
  const palette = kidsMode || autoKids ? kidPalette : adultPalette;

  const moodOptions = [
    { emoji: "😞", value: "sad", label: "Struggling" },
    { emoji: "😕", value: "bad", label: "Off track" },
    { emoji: "😐", value: "okay", label: "Okay" },
    { emoji: "🙂", value: "good", label: "Good" },
    { emoji: "😄", value: "great", label: "Growing" }
  ];

  const s = {
    shell: { minHeight: "100vh", background: palette.bg, color: palette.text, fontFamily: "Arial, sans-serif", padding: 24 },
    container: { maxWidth: 1100, margin: "0 auto" },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 },
    card: (bg, color = "inherit") => ({ backgroundColor: bg, color, borderRadius: 24, padding: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }),
    btn: (bg, color = "white") => ({ backgroundColor: bg, color, border: "none", borderRadius: 16, padding: "12px 16px", cursor: "pointer", fontWeight: 600 }),
    btnOutline: { backgroundColor: "white", color: "#333", border: "1px solid #ddd", borderRadius: 16, padding: "12px 16px", cursor: "pointer", fontWeight: 600 },
    input: { width: "100%", boxSizing: "border-box", borderRadius: 14, border: "1px solid #ddd", padding: "12px 14px", fontSize: 16, backgroundColor: "white" }
  };

  const filteredPlan = useMemo(() => {
    return currentPlan.filter((item) => {
      const value = `${item.day} ${item.title} ${item.verse} ${item.reading} ${item.focus}`.toLowerCase();
      return value.includes(search.toLowerCase());
    });
  }, [search, currentPlan]);

  const progress = Math.round((completed.length / currentPlan.length) * 100);
  const answeredCount = prayers.filter((p) => p.answered).length;
  const featuredText = inspirationalTexts[(answeredCount + completed.length + selectedDay.day) % inspirationalTexts.length];
  const needsEncouragement = checkInMood === "sad" || checkInMood === "bad";

  const showToast = (message, tone = "blue") => setToast({ id: Date.now(), message, tone });
  const showMilestoneText = (message) => setShowMilestone(message);

  useEffect(() => {
    try {
      const savedCompleted = JSON.parse(localStorage.getItem("bpw-completed") || "[]");
      const savedPrayers = JSON.parse(localStorage.getItem("bpw-prayers") || "[]");
      const savedMood = localStorage.getItem("bpw-checkin-mood") || "";
      const savedName = localStorage.getItem("bpw-username") || "";
      const savedAge = localStorage.getItem("bpw-age") || "";
      const savedView = localStorage.getItem("bpw-view") || "plan";
      const savedDay = Number(localStorage.getItem("bpw-selected-day") || 1);
      const savedKidsMode = localStorage.getItem("bpw-kids-mode") === "true";
      const savedStreak = Number(localStorage.getItem("bpw-streak") || 0);
      const savedLastVisit = localStorage.getItem("bpw-last-visit");
      const savedFreeze = Number(localStorage.getItem("bpw-freeze") || 1);

      if (Array.isArray(savedCompleted)) setCompleted(savedCompleted.filter((n) => n >= 1 && n <= biblePlan.length));
      if (Array.isArray(savedPrayers)) setPrayers(savedPrayers);
      if (savedMood) setCheckInMood(savedMood);
      if (savedName) {
        setUserName(savedName);
        if (savedAge) setUserAge(Number(savedAge));
        else setAskAge(true);
      } else {
        setAskName(true);
      }
      setView(savedView);
      setKidsMode(savedKidsMode);
      setSelectedDay((biblePlan.find((d) => d.day === savedDay) || biblePlan[0]));
      setStreakFreeze(savedFreeze);

      const tutorialSeen = localStorage.getItem("bpw-tutorial-seen") || "";
      if (!tutorialSeen) setShowTutorial(true);

      const today = new Date(); today.setHours(0,0,0,0);
      if (!savedLastVisit) {
        const initial = savedStreak || 1;
        setStreak(initial);
        localStorage.setItem("bpw-streak", String(initial));
        localStorage.setItem("bpw-last-visit", today.toISOString());
      } else {
        const last = new Date(savedLastVisit); last.setHours(0,0,0,0);
        const diffDays = Math.floor((today - last) / 86400000);
        if (diffDays <= 0) {
          setStreak(savedStreak);
        } else if (diffDays === 1) {
          const nextStreak = Math.max(1, savedStreak + 1);
          setStreak(nextStreak);
          localStorage.setItem("bpw-streak", String(nextStreak));
          localStorage.setItem("bpw-last-visit", today.toISOString());
          setFlamePulse(true);
          if ([7,30,100].includes(nextStreak)) setShowMilestone(`🔥 ${nextStreak} day streak!`);
        } else {
          if (savedFreeze > 0) {
            setStreak(savedStreak);
            const nextFreeze = savedFreeze - 1;
            setStreakFreeze(nextFreeze);
            localStorage.setItem("bpw-freeze", String(nextFreeze));
            localStorage.setItem("bpw-last-visit", today.toISOString());
            setShowMilestone("Streak freeze used ❄️");
          } else {
            setStreak(1);
            localStorage.setItem("bpw-streak", "1");
            localStorage.setItem("bpw-last-visit", today.toISOString());
          }
        }
      }
    } catch (error) {
      console.error("Could not load saved progress", error);
    }
  }, []);

  useEffect(() => { localStorage.setItem("bpw-completed", JSON.stringify(completed)); }, [completed]);
  useEffect(() => { localStorage.setItem("bpw-prayers", JSON.stringify(prayers)); }, [prayers]);
  useEffect(() => { localStorage.setItem("bpw-checkin-mood", checkInMood); }, [checkInMood]);
  useEffect(() => { if (userName) localStorage.setItem("bpw-username", userName); }, [userName]);
  useEffect(() => { localStorage.setItem("bpw-age", String(userAge)); }, [userAge]);
  useEffect(() => { localStorage.setItem("bpw-view", view); }, [view]);
  useEffect(() => { localStorage.setItem("bpw-selected-day", String(selectedDay.day)); }, [selectedDay.day]);
  useEffect(() => { localStorage.setItem("bpw-kids-mode", String(kidsMode)); }, [kidsMode]);
  useEffect(() => { localStorage.setItem("bpw-freeze", String(streakFreeze)); }, [streakFreeze]);
  useEffect(() => { if (!showTutorial) localStorage.setItem("bpw-tutorial-seen", "yes"); }, [showTutorial]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);
  useEffect(() => { if (!showMilestone) return; const t = setTimeout(() => setShowMilestone(null), 2500); return () => clearTimeout(t); }, [showMilestone]);
  useEffect(() => { if (!flamePulse) return; const t = setTimeout(() => setFlamePulse(false), 900); return () => clearTimeout(t); }, [flamePulse]);
  useEffect(() => {
    const match = currentPlan.find((item) => item.day === selectedDay.day) || currentPlan[0];
    setSelectedDay(match);
  }, [currentPlan, selectedDay.day]);

  const protectStreakToday = () => {
    const today = new Date(); today.setHours(0,0,0,0);
    localStorage.setItem("bpw-last-visit", today.toISOString());
  };

  const toggleComplete = (day) => {
    const isCompleting = !completed.includes(day);
    setCompleted((prev) => prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b));
    if (isCompleting) {
      protectStreakToday();
      setFlamePulse(true);
      if ([7,30,100].includes(streak)) setShowMilestone(`🔥 ${streak} day streak!`);
      showToast("Streak protected 🔥 Keep going!", "green");
      setTimeout(() => {
        setShowCheckInResponse(false);
        setCheckInMood("");
        document.getElementById("checkin-section")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const toggleAnswered = (id) => {
    const current = prayers.find((p) => p.id === id);
    const wasAnswered = current?.answered;
    setPrayers((prev) => prev.map((note) => note.id === id ? { ...note, answered: !note.answered, answeredAt: !note.answered ? new Date().toLocaleDateString() : "" } : note));
    if (!wasAnswered) showToast("Prayer answered ✨ God is moving, even in the little things.", "green");
  };

  const addPrayer = () => {
    if (!newPrayer.trim()) return;
    setPrayers((prev) => [...prev, {
      id: Date.now(),
      text: newPrayer.trim(),
      answered: false,
      createdAt: new Date().toLocaleDateString(),
      answeredAt: "",
      color: stickyColors[prev.length % stickyColors.length],
      x: 8 + ((prev.length * 17) % 68),
      y: 10 + ((prev.length * 13) % 62),
      rotate: stickyRotations[prev.length % stickyRotations.length]
    }]);
    setNewPrayer("");
    setView("board");
    showToast("Your prayer note was added 🤍", "blue");
  };

  return (
    <div style={s.shell}>
      {toast && <div style={{ position:"fixed", right:20, bottom:20, zIndex:60, backgroundColor: toast.tone === "green" ? "#80917B" : "#3C5667", color:"white", padding:"14px 16px", borderRadius:20, boxShadow:"0 10px 24px rgba(0,0,0,0.2)", maxWidth:320 }}>{toast.message}</div>}
      {showMilestone && <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", zIndex:70, background:"#fff", color:"#3C5667", padding:"14px 18px", borderRadius:999, boxShadow:"0 10px 24px rgba(0,0,0,0.18)", fontWeight:700 }}>{showMilestone}</div>}

      {askName && <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, zIndex:50 }}><div style={{ width:"100%", maxWidth:650, background:"white", borderRadius:24, padding:24 }}><h2>Welcome 🤍</h2><p style={{ color: adultPalette.accent }}>What’s your name?</p><input style={{ ...s.input, marginTop:12 }} placeholder="Enter your name..." value={userName} onChange={(e) => setUserName(e.target.value)} /><button style={{ ...s.btn(adultPalette.button), marginTop:16 }} onClick={() => { if (!userName.trim()) return; setAskName(false); setAskAge(true); }}>Continue</button></div></div>}
      {askAge && <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, zIndex:50 }}><div style={{ width:"100%", maxWidth:650, background:"white", borderRadius:24, padding:24 }}><h2>Hello {userName} 🤍</h2><p style={{ color: adultPalette.accent }}>How old are you? This will help give lessons for your age!</p><div style={{ marginTop:24 }}><input type="range" min="2" max="100" value={userAge} onChange={(e) => setUserAge(Number(e.target.value))} style={{ width:"100%" }} /><p style={{ fontSize:20, fontWeight:700 }}>{userAge} years old</p></div><button style={{ ...s.btn(adultPalette.button), marginTop:16 }} onClick={() => setAskAge(false)}>Continue</button></div></div>}

      {showTutorial && !askName && !askAge && <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", padding:16, zIndex:50 }}><div style={{ width:"100%", maxWidth:850, maxHeight:"88vh", overflow:"auto", background:"white", borderRadius:24, padding:24 }}><div style={{ display:"flex", justifyContent:"space-between", gap:16 }}><div><h2 style={{ margin:0, color:palette.button }}>Quick tour 🤍</h2><p style={{ color: adultPalette.accent }}>Here’s how to use your Bible app.</p></div><button style={s.btnOutline} onClick={() => setShowTutorial(false)}>Close</button></div><div style={{ ...s.grid2, marginTop:20 }}>{[
        ["1. Read your lesson", "Tap Bible plan, choose a day, and read the lesson, verse, and prayer."],
        ["2. Tap the verse", "Tap the verse reference to open a popup with the scripture text."],
        ["3. Mark days complete", "Press Mark Complete when you finish a day to grow your progress and protect your streak."],
        ["4. Add prayer notes", "Tap Prayer board, type a prayer request, then press Add sticky note."],
        ["5. Mark prayers answered", "Tap any sticky note on the corkboard when God answers that prayer."],
        ["6. Build your streak", "Come back each day to keep your flame alive. Milestones unlock at 7, 30, and 100 days."]
      ].map((item, i) => <div key={i} style={s.card(i % 2 === 0 ? palette.lesson : palette.soft)}><h3 style={{ marginTop:0 }}>{item[0]}</h3><p style={{ lineHeight:1.6 }}>{item[1]}</p></div>)}</div><div style={{ ...s.card(palette.header), marginTop:18 }}><h3 style={{ marginTop:0 }}>Extra features</h3><p style={{ lineHeight:1.6 }}>Your name and age personalize the app, younger users get the kid-friendly version automatically, all of your progress saves, and you start with one streak freeze ❄️.</p></div><div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:18 }}><button style={s.btn(palette.button)} onClick={() => setShowTutorial(false)}>Got it</button><button style={s.btnOutline} onClick={() => { setShowTutorial(false); setView("board"); }}>Show me the prayer board</button></div></div></div>}

      <div style={s.container}>
        <div style={{ ...s.grid2, marginBottom:24 }}>
          <div style={s.card(palette.header)}>
            <div>
              <h1 style={{ marginTop:0 }}>{userName ? `Hi, ${userName} 🤍` : "Bible Plan"}</h1>
              {userAge ? <p style={{ marginTop:4, fontSize:12 }}>{autoKids ? "Kids lessons are on for you ✨" : "Personalized for your age ✨"}</p> : null}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:10, flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.65)", padding:"8px 14px", borderRadius:999 }}>
                  <span style={{ fontSize: flamePulse ? 26 : 22, transform: flamePulse ? "scale(1.18)" : "scale(1)", transition:"all .25s ease" }}>🔥</span>
                  <span style={{ fontWeight:700 }}>{streak} day streak</span>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.65)", padding:"8px 14px", borderRadius:999 }}>
                  <span>❄️</span>
                  <span style={{ fontWeight:700 }}>{streakFreeze} freeze</span>
                </div>
              </div>
            </div>
            <p>{userName ? "A calm place to grow closer to God today." : "A calm place to grow closer to God."}</p>
            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <button style={s.btn(palette.button)} onClick={() => setView("plan")}>Bible plan</button>
              <button style={s.btnOutline} onClick={() => setView("board")}>Prayer board</button>
            </div>
          </div>

          <div style={s.card(palette.verse, "white")}>
            <h2 style={{ marginTop:0 }}>{verseOfTheDay.reference}</h2>
            <p style={{ fontSize:20, lineHeight:1.7 }}>“{verseOfTheDay.text}”</p>
            <p style={{ lineHeight:1.6 }}>{verseOfTheDay.reflection}</p>
          </div>
        </div>

        <div style={{ ...s.card(palette.panel), marginBottom:24 }}>
          <div style={{ fontWeight:700, color:palette.verse }}>Inspirational text</div>
          <p style={{ fontSize:28, lineHeight:1.4, fontWeight:700, marginBottom:6 }}>{userName ? `Hi ${userName}, ${featuredText}` : featuredText}</p>
          <p style={{ color:adultPalette.accent }}>A little encouragement to come back to whenever you need it.</p>
        </div>

        <div style={{ ...s.grid2, marginBottom:24 }}>
          <div style={s.card(palette.verse, "white")}><h3 style={{ marginTop:0 }}>Daily encouragement</h3><p style={{ lineHeight:1.7 }}>God is with you in the ordinary moments, the hard moments, and the hopeful moments still ahead.</p></div>
          <div style={s.card(palette.accent, palette.text)}><h3 style={{ marginTop:0 }}>Little reminder</h3><p style={{ lineHeight:1.7 }}>You do not have to have everything figured out today. Take the next step, pray the next prayer, and trust God with the rest.</p></div>
        </div>

        <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:24 }}>
          <button style={s.btnOutline} onClick={() => setShowTutorial(true)}>Tutorial</button>
          <button style={s.btn(kidsMode ? palette.verse : palette.accent, kidsMode ? "white" : palette.text)} onClick={() => { setKidsMode((prev) => !prev); setSelectedDay((kidsMode ? biblePlan : biblePlanKids)[0]); showToast(kidsMode ? "Switched to regular plan" : "Kids mode on 🤍", "blue"); }}>{kidsMode || autoKids ? "Regular Mode" : "Kids Mode"}</button>
          <button style={s.btn(view === "plan" ? palette.button : palette.accent, view === "plan" ? "white" : palette.text)} onClick={() => setView("plan")}>Bible plan</button>
          <button style={s.btn(view === "board" ? palette.button : palette.accent, view === "board" ? "white" : palette.text)} onClick={() => setView("board")}>Corkboard prayers</button>
          <button style={s.btnOutline} onClick={() => { localStorage.clear(); window.location.reload(); }}>Reset App</button>
        </div>

        {view === "plan" ? (
          <>
            <div style={{ ...s.card(palette.accent, palette.text), marginBottom:24 }}>
              <h2 style={{ marginTop:0 }}>Progress: {progress}%</h2>
              <p>{completed.length} of {currentPlan.length} days completed</p>
              <div style={{ width:"100%", height:14, backgroundColor:"rgba(255,255,255,0.45)", borderRadius:999 }}>
                <div style={{ width:`${progress}%`, height:"100%", backgroundColor:palette.button, borderRadius:999 }} />
              </div>
            </div>

            <div style={{ marginBottom:24 }}>
              <input style={s.input} placeholder="Search by day, topic, verse, or reading..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <div style={s.grid2}>
              <div style={{ maxHeight:780, overflow:"auto", paddingRight:8 }}>
                {filteredPlan.map((item) => {
                  const done = completed.includes(item.day);
                  return (
                    <button key={item.day} onClick={() => setSelectedDay(item)} style={{ width:"100%", textAlign:"left", marginBottom:12, padding:16, borderRadius:18, border:"none", cursor:"pointer", backgroundColor:selectedDay.day === item.day ? palette.lesson : palette.header }}>
                      <div style={{ display:"flex", justifyContent:"space-between", gap:12 }}>
                        <div>
                          <div style={{ fontWeight:700 }}>Day {item.day}: {item.title}</div>
                          <div style={{ marginTop:6, fontSize:14, opacity:0.8 }}>{item.verse}</div>
                        </div>
                        {done ? <div>✓</div> : null}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={s.card(palette.panel)}>
                <div style={{ color:palette.verse, fontWeight:700 }}>Day {selectedDay.day}</div>
                <h2>{selectedDay.title}</h2>

                <p style={{ color:adultPalette.accent, fontWeight:700, cursor:"pointer", textDecoration:"underline" }} onClick={() => setOpenVerse(selectedDay.verse)}>
                  {selectedDay.verse}
                </p>

                <p style={{ color:palette.verse }}>Reading: {selectedDay.reading}</p>

                <div style={{ ...s.card(palette.lesson), boxShadow:"none", padding:16, marginTop:18 }}>
                  <div style={{ color:adultPalette.accent, fontWeight:700 }}>Lesson</div>
                  <p style={{ lineHeight:1.7 }}>{selectedDay.focus}</p>
                </div>

                <div style={{ ...s.card(palette.soft), boxShadow:"none", padding:16, marginTop:14 }}>
                  <div style={{ color:adultPalette.accent, fontWeight:700 }}>Prayer</div>
                  <p style={{ lineHeight:1.7, fontStyle:"italic" }}>{selectedDay.prayer}</p>
                </div>

                <button style={{ ...s.btn(palette.button), marginTop:18 }} onClick={() => toggleComplete(selectedDay.day)}>
                  {completed.includes(selectedDay.day) ? "Completed" : "Mark Complete"}
                </button>

                <div style={{ ...s.card(palette.soft), boxShadow:"none", padding:16, marginTop:18 }}>
                  <div style={{ color:adultPalette.accent, fontWeight:700 }}>Quick reflection quiz</div>
                  <p>What was the main message of today’s lesson?</p>
                  {[selectedDay.focus, "You have to be perfect to grow", "God is distant from your life"].map((option, idx) => {
                    const correct = option === selectedDay.focus;
                    return (
                      <button key={idx} onClick={() => showToast(correct ? "Yes 🤍 you got it. Let this stay with you today." : "Not quite 🤍 go back and reflect again.", correct ? "green" : "blue")} style={{ width:"100%", textAlign:"left", padding:12, borderRadius:12, border:"1px solid #D9D1C7", backgroundColor:"#FFFDF9", marginTop:10, cursor:"pointer" }}>
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div id="checkin-section" style={{ ...s.card(palette.panel), marginTop:24 }}>
              <div style={{ color:palette.verse, fontWeight:700 }}>End of day check-in</div>
              <h3>How do you feel about your walk with God today?</h3>
              <p style={{ color:adultPalette.accent }}>Pick the face that feels closest to your heart right now.</p>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginTop:16 }}>
                {moodOptions.map((mood) => (
                  <button key={mood.value} onClick={() => { setCheckInMood(mood.value); setShowCheckInResponse(true); }} style={{ minWidth:92, borderRadius:16, border:`1px solid ${checkInMood === mood.value ? palette.button : "#D9D1C7"}`, backgroundColor:checkInMood === mood.value ? palette.lesson : "#FFFDF9", padding:14, cursor:"pointer" }}>
                    <div style={{ fontSize:28 }}>{mood.emoji}</div>
                    <div style={{ marginTop:6, fontSize:12, color:adultPalette.accent, fontWeight:700 }}>{mood.label}</div>
                  </button>
                ))}
              </div>

              {showCheckInResponse && checkInMood && !needsEncouragement ? <div style={{ ...s.card(palette.lesson), boxShadow:"none", padding:16, marginTop:18 }}><div style={{ color:palette.button, fontWeight:700 }}>That is beautiful.</div><p>Keep showing up. Even simple, steady faith matters more than you know.</p></div> : null}
              {showCheckInResponse && needsEncouragement ? <div style={{ ...s.card(palette.soft), boxShadow:"none", padding:16, marginTop:18 }}><div style={{ color:palette.button, fontWeight:700 }}>A word for your heart</div><p style={{ lineHeight:1.7 }}>Even if today felt distant, heavy, or quiet, God did not step away from you. A hard day does not mean a broken faith. He is still near, still kind, and still reaching for your heart. You do not have to force yourself into perfection tonight. Just come as you are. One honest prayer is enough to begin again.</p></div> : null}
            </div>
          </>
        ) : (
          <>
            <div style={{ ...s.card(palette.header), marginBottom:24 }}>
              <h2 style={{ marginTop:0 }}>Prayer Corkboard</h2>
              <p>Add little sticky notes with prayer requests, then tap them when the prayer is answered.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:12, alignItems:"center" }}>
                <input style={s.input} placeholder="Write a prayer request..." value={newPrayer} onChange={(e) => setNewPrayer(e.target.value)} />
                <button style={s.btn(palette.button)} onClick={addPrayer}>Add sticky note</button>
              </div>
              <p>Answered prayers: {answeredCount} / {prayers.length}</p>
              <div style={{ ...s.card("rgba(255,255,255,0.7)"), boxShadow:"none", padding:16 }}>
                <div style={{ color:palette.button, fontWeight:700 }}>Encouragement for today</div>
                <p style={{ color:adultPalette.accent, lineHeight:1.6 }}>Keep praying, even when you do not see the answer yet. Some prayers are being held, grown, and answered in ways you cannot fully see right now.</p>
              </div>
            </div>

            <div style={{ position:"relative", minHeight:700, overflow:"hidden", borderRadius:28, border:`4px solid ${adultPalette.accent}`, boxShadow:"0 10px 24px rgba(0,0,0,0.14)", backgroundColor:"#B58B62", backgroundImage:"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0), linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.03))", backgroundSize:"18px 18px, 100% 100%" }}>
              <div style={{ position:"absolute", inset:0, padding:24 }}>
                {prayers.length === 0 ? (
                  <div style={{ display:"flex", height:"100%", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
                    <div style={{ ...s.card("rgba(255,255,255,0.72)"), maxWidth:500 }}>
                      <h3>Your prayer board is ready 🤍</h3>
                      <p style={{ color:adultPalette.accent, lineHeight:1.7 }}>Start fresh by adding your first sticky note prayer. When it gets answered, tap it to celebrate what God has done.</p>
                    </div>
                  </div>
                ) : (
                  prayers.map((note) => (
                    <button key={note.id} onClick={() => toggleAnswered(note.id)} style={{ position:"absolute", width:176, textAlign:"left", padding:"12px 14px", borderRadius:4, border:"none", cursor:"pointer", boxShadow:"0 10px 18px rgba(0,0,0,0.18)", left:`${note.x}%`, top:`${note.y}%`, transform:`rotate(${note.rotate}deg)`, backgroundColor:note.color, color:adultPalette.button, textDecoration:note.answered ? "line-through" : "none", opacity:note.answered ? 0.92 : 1 }}>
                      <div style={{ position:"absolute", left:"50%", top:4, width:12, height:12, transform:"translateX(-50%)", borderRadius:999, backgroundColor:"#7B665A" }} />
                      {note.answered ? <div style={{ position:"absolute", top:6, right:8, color:"#2e9d53", fontWeight:700 }}>✓</div> : null}
                      <p style={{ marginTop:18, fontSize:12, opacity:0.7 }}>{note.createdAt}</p>
                      <p style={{ marginTop:8, fontSize:14, fontWeight:600, lineHeight:1.5 }}>{note.text}</p>
                      <p style={{ marginTop:12, fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{note.answered ? `Answered prayer • ${note.answeredAt}` : "Tap to mark answered"}</p>
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {openVerse && (
        <div onClick={() => setOpenVerse(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, animation:"fadeIn 0.25s ease" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background:palette.panel, borderRadius:24, padding:24, maxWidth:520, width:"90%", boxShadow:"0 20px 40px rgba(0,0,0,0.2)", animation:"scaleIn 0.25s ease" }}>
            <div style={{ color:palette.verse, fontWeight:700 }}>{openVerse}</div>
            <p style={{ lineHeight:1.7, marginTop:12 }}>{verseMap[openVerse] || "Verse coming soon 🤍"}</p>
            <button style={{ ...s.btn(palette.button), marginTop:16 }} onClick={() => setOpenVerse(null)}>Close</button>
          </div>
          <style>{`
            @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
            @keyframes scaleIn { from { transform:scale(.92); opacity:0; } to { transform:scale(1); opacity:1; } }
          `}</style>
        </div>
      )}
    </div>
  );
}
