import { createContext, useContext, useState, useEffect } from "react";

// ─── AUTH CONTEXT ────────────────────────────────────────────────
const AuthContext = createContext(null);

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email, password) => {
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu!");
      setLoading(false);
      return false;
    }
    setUser({
      name: "Hai Dang",
      role: "Mobile developer",
      email,
      bio: "I have above 5 years of experience in native mobile apps development, now i am learning React Native",
      avatar: "HN",
    });
    setLoading(false);
    return true;
  };

  const loginWithProvider = async (provider) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser({
      name: "Hai Dang",
      role: "Mobile developer",
      email: `hai@${provider.toLowerCase()}.com`,
      bio: "I have above 5 years of experience in native mobile apps development, now i am learning React Native",
      avatar: "HN",
    });
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    setError("");
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, loginWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── NAV CONTEXT ─────────────────────────────────────────────────
const NavContext = createContext(null);
const useNav = () => useContext(NavContext);

const NavProvider = ({ children }) => {
  const [tab, setTab] = useState("explorer");
  return (
    <NavContext.Provider value={{ tab, setTab }}>
      {children}
    </NavContext.Provider>
  );
};

// ─── DATA ────────────────────────────────────────────────────────
const categories = [
  { id: 1, name: "Pizza", emoji: "🍕", color: "#FF6B35" },
  { id: 2, name: "Burgers", emoji: "🍔", color: "#E8A838" },
  { id: 3, name: "Steak", emoji: "🥩", color: "#C0392B" },
  { id: 4, name: "Sushi", emoji: "🍣", color: "#2ECC71" },
];

const popularItems = [
  { id: 1, name: "Grilled Salmon", restaurant: "Viet Nam Kitchen", price: "1$", tag: null, emoji: "🐟" },
  { id: 2, name: "Caesar Salad", restaurant: "Green Bowl", price: "3$", tag: null, emoji: "🥗" },
  { id: 3, name: "BBQ Platter", restaurant: "Smoke House", price: "5$", tag: "10% OFF", emoji: "🍖" },
  { id: 4, name: "Fresh Smoothie", restaurant: "Juice Bar", price: "2$", tag: null, emoji: "🥤" },
];

// ─── STYLES ──────────────────────────────────────────────────────
const S = {
  app: {
    fontFamily: "'Nunito', sans-serif",
    background: "#f5f5f5",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  phone: {
    width: 375,
    minHeight: 680,
    background: "#fff",
    borderRadius: 32,
    boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  statusBar: {
    background: "#fff",
    padding: "10px 20px 6px",
    fontSize: 12,
    fontWeight: 700,
    display: "flex",
    justifyContent: "space-between",
    color: "#222",
  },
};

// ─── SIGN IN SCREEN ───────────────────────────────────────────────
const SignInScreen = () => {
  const { login, loginWithProvider, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = async () => {
    const ok = await login(email, password);
    if (!ok) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{ flex: 1, padding: "24px 28px 16px", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .shake { animation: shake 0.5s ease; }
        .input-field:focus { outline:none; border-color:#F5A623 !important; box-shadow: 0 0 0 3px rgba(245,166,35,0.15); }
      `}</style>

      <div style={{ flex: 1, justifyContent: "center", display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, textAlign: "center", marginBottom: 36, color: "#1a1a1a", letterSpacing: -0.5 }}>
          Sign In
        </h1>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#333", display: "block", marginBottom: 6 }}>Email ID</label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email here!"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "13px 14px", border: "1.5px solid #e0e0e0",
              borderRadius: 10, fontSize: 14, color: "#444", background: "#fafafa",
              boxSizing: "border-box", transition: "all 0.2s",
            }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 700, color: "#333", display: "block", marginBottom: 6 }}>Password</label>
          <input
            className="input-field"
            type="password"
            placeholder="Enter your password here!"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{
              width: "100%", padding: "13px 14px", border: "1.5px solid #e0e0e0",
              borderRadius: 10, fontSize: 14, color: "#444", background: "#fafafa",
              boxSizing: "border-box", transition: "all 0.2s",
            }}
          />
        </div>

        <div style={{ textAlign: "right", marginBottom: 22 }}>
          <span style={{ color: "#F5A623", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>For got password?</span>
        </div>

        {error && (
          <div className={shake ? "shake" : ""} style={{
            background: "#fff3f3", border: "1px solid #ffcdd2", color: "#c0392b",
            borderRadius: 8, padding: "10px 14px", fontSize: 12, fontWeight: 600,
            marginBottom: 14, textAlign: "center",
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            background: loading ? "#f0c060" : "linear-gradient(135deg,#F5A623,#f0781e)",
            color: "#fff", border: "none", borderRadius: 12, padding: "15px",
            fontSize: 16, fontWeight: 800, cursor: "pointer", width: "100%",
            boxShadow: "0 6px 20px rgba(245,166,35,0.4)", transition: "all 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {loading ? (
            <div style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
          ) : "Sign In"}
        </button>

        <div style={{ textAlign: "center", margin: "18px 0", color: "#999", fontSize: 13, fontWeight: 600 }}>Or sign in with</div>

        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <button onClick={() => loginWithProvider("Google")} style={{
            flex: 1, padding: "12px", border: "1.5px solid #e0e0e0", borderRadius: 12,
            background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, fontWeight: 700, fontSize: 14, color: "#333",
          }}>
            <span style={{ fontSize: 18 }}>G</span> Google
          </button>
          <button onClick={() => loginWithProvider("Facebook")} style={{
            flex: 1, padding: "12px", border: "none", borderRadius: 12,
            background: "#1877F2", cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8, fontWeight: 700, fontSize: 14, color: "#fff",
          }}>
            <span style={{ fontSize: 18 }}>f</span> Facebook
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "#666", fontWeight: 600 }}>
          Not yet a member?{" "}
          <span style={{ color: "#F5A623", fontWeight: 800, cursor: "pointer" }}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

// ─── EXPLORER SCREEN ──────────────────────────────────────────────
const ExplorerScreen = () => {
  const [search, setSearch] = useState("");

  return (
    <div style={{ flex: 1, overflowY: "auto", paddingBottom: 8 }}>
      <div style={{ padding: "16px 20px 12px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 14px", color: "#1a1a1a" }}>Explorer</h2>

        {/* Search */}
        <div style={{
          display: "flex", alignItems: "center", background: "#f5f5f5",
          borderRadius: 12, padding: "10px 14px", gap: 10, marginBottom: 20,
          border: "1.5px solid #eee",
        }}>
          <span style={{ fontSize: 18 }}>📍</span>
          <input
            placeholder="Search for meals or area"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, color: "#555", outline: "none" }}
          />
          <span style={{ fontSize: 18, cursor: "pointer" }}>🔍</span>
        </div>

        {/* Top Categories */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>Top Categories</h3>
          <span style={{ fontSize: 13, color: "#F5A623", fontWeight: 700, cursor: "pointer" }}>⚙️ Filter</span>
        </div>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6, marginBottom: 22 }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ textAlign: "center", cursor: "pointer", minWidth: 78, flexShrink: 0 }}>
              <div style={{
                width: 78, height: 78, borderRadius: 14, background: `linear-gradient(135deg, ${cat.color}22, ${cat.color}44)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 32, marginBottom: 6, border: `2px solid ${cat.color}33`,
                transition: "transform 0.2s",
              }}>
                {cat.emoji}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#444" }}>{cat.name}</span>
            </div>
          ))}
        </div>

        {/* Popular Items */}
        {["Popular Items", "Deals Near You"].map((section, si) => (
          <div key={si} style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#1a1a1a" }}>{section}</h3>
              <span style={{ fontSize: 13, color: "#F5A623", fontWeight: 700, cursor: "pointer" }}>View all</span>
            </div>
            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
              {popularItems.slice(si * 2, si * 2 + 2).map(item => (
                <div key={item.id} style={{
                  minWidth: 150, background: "#fafafa", borderRadius: 14,
                  overflow: "hidden", border: "1.5px solid #f0f0f0",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)", cursor: "pointer",
                  flexShrink: 0, position: "relative",
                }}>
                  <div style={{
                    height: 90, background: `linear-gradient(135deg, #fff8ee, #fff3d6)`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42,
                  }}>
                    {item.emoji}
                    {item.tag && (
                      <div style={{
                        position: "absolute", top: 8, left: 8,
                        background: "#F5A623", color: "#fff", fontSize: 10,
                        fontWeight: 800, padding: "3px 7px", borderRadius: 6,
                      }}>{item.tag}</div>
                    )}
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <p style={{ margin: "0 0 2px", fontWeight: 800, fontSize: 13, color: "#1a1a1a" }}>{item.name}</p>
                    <p style={{ margin: "0 0 6px", fontSize: 11, color: "#999" }}>By {item.restaurant}</p>
                    <p style={{ margin: 0, fontWeight: 800, fontSize: 14, color: "#F5A623" }}>{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── ACCOUNT SCREEN ───────────────────────────────────────────────
const AccountScreen = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ flex: 1 }}>
      {/* Blue header */}
      <div style={{ height: 160, background: "linear-gradient(135deg, #00BFFF, #0080FF)" }} />

      {/* Avatar */}
      <div style={{ textAlign: "center", marginTop: -44, marginBottom: 16, position: "relative" }}>
        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "linear-gradient(135deg, #F5A623, #f0781e)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 28, fontWeight: 900, color: "#fff",
          border: "4px solid #fff",
          boxShadow: "0 6px 24px rgba(0,0,0,0.15)",
        }}>
          {user?.avatar}
        </div>
      </div>

      {/* User info */}
      <div style={{ textAlign: "center", padding: "0 28px 24px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, margin: "0 0 4px", color: "#1a1a1a" }}>{user?.name}</h2>
        <p style={{ color: "#00BFFF", fontWeight: 700, fontSize: 14, margin: "0 0 16px" }}>{user?.role}</p>
        <p style={{ color: "#888", fontSize: 13, lineHeight: 1.6, margin: "0 0 28px" }}>{user?.bio}</p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 0, borderRadius: 14, overflow: "hidden", border: "1.5px solid #f0f0f0", marginBottom: 28 }}>
          {[["12", "Orders"], ["4.8", "Rating"], ["3", "Saved"]].map(([val, lbl], i) => (
            <div key={i} style={{
              flex: 1, padding: "14px 8px", textAlign: "center",
              borderRight: i < 2 ? "1px solid #f0f0f0" : "none",
              background: "#fafafa",
            }}>
              <div style={{ fontWeight: 900, fontSize: 18, color: "#1a1a1a" }}>{val}</div>
              <div style={{ fontSize: 11, color: "#aaa", fontWeight: 600 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <button
          onClick={logout}
          style={{
            background: "linear-gradient(135deg, #F5A623, #f0781e)",
            color: "#fff", border: "none", borderRadius: 12, padding: "14px 48px",
            fontSize: 15, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 6px 20px rgba(245,166,35,0.4)",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

// ─── BOTTOM NAV ───────────────────────────────────────────────────
const BottomNav = () => {
  const { tab, setTab } = useNav();
  const tabs = [
    { id: "explorer", label: "Explorer", icon: "🍽️" },
    { id: "account", label: "Account", icon: "👤" },
  ];

  return (
    <div style={{
      borderTop: "1px solid #f0f0f0", display: "flex",
      background: "#fff", paddingBottom: 4,
    }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          style={{
            flex: 1, padding: "10px 0 6px", border: "none", background: "transparent",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          }}
        >
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: tab === t.id ? "#F5A623" : "#bbb",
          }}>{t.label}</span>
          {tab === t.id && (
            <div style={{ width: 20, height: 3, borderRadius: 2, background: "#F5A623" }} />
          )}
        </button>
      ))}
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────
const AppContent = () => {
  const { user } = useAuth();
  const { tab } = useNav();

  if (!user) {
    return (
      <>
        <div style={S.statusBar}><span>5:18</span><span>▲▲■</span></div>
        <SignInScreen />
      </>
    );
  }

  return (
    <>
      <div style={S.statusBar}><span>5:18</span><span>▲▲■</span></div>
      {tab === "explorer" ? <ExplorerScreen /> : <AccountScreen />}
      <BottomNav />
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <NavProvider>
        <div style={S.app}>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
          <div style={S.phone}>
            <AppContent />
          </div>
        </div>
      </NavProvider>
    </AuthProvider>
  );
}
