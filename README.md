
# 🟣 **FixIt AI — Ghost-Powered Smart Device Diagnosis (Kiroween Edition)**

FixIt AI is an AI-powered troubleshooting assistant that analyzes symptoms and instantly generates:

* 🎃 A spooky-accurate diagnosis
* 🔧 Beginner → intermediate → technician-level steps
* ⛔ What NOT to do
* 🧪 Severity & difficulty scores
* 💵 Cost estimate
* 🔮 Probability the fix will work
* 🕯 Spooky hints (Kiroween special theme)

This project was built for the *SUI x Walrus Hackathon*, combining:
**FastAPI + Python + Local Rules Engine + Clean Frontend + Animated Ghost UI.**

---

# 🚀 **Features**

* 🎯 Smart diagnosis powered by multi-layer rules + NLP
* ⚙ Structured steps (Beginner → Intermediate → Advanced)
* 🎭 Kiroween spooky UI theme (floating ghosts, mist, neon glow)
* 👻 Animated ghost loader
* 📡 Connection test + diagnosis test tools
* 🤖 JSON-based, scalable system
* 🧰 Device categories: phones, laptops, refrigerators, washing machines, microwaves
* 🌐 Clean API for 3rd-party integration

---

# 🏗 **System Architecture**

```
                   ┌─────────────────────────┐
                   │        Frontend         │
                   │  HTML • CSS • JS        │
                   │  Ghost Loader + UI      │
                   └───────────┬────────────┘
                               │ Fetch API (POST /diagnose)
                               ▼
                 ┌────────────────────────────┐
                 │          Backend            │
                 │        FastAPI (Python)     │
                 │  - Device rules engine      │
                 │  - AI-style logic + scoring │
                 │  - Severity & difficulty    │
                 │  - Cost estimation          │
                 └───────────┬────────────────┘
                               │
                               ▼
                 ┌────────────────────────────┐
                 │   Knowledge Base / Rules   │
                 │   device_rules.json        │
                 │   structured steps          │
                 │   causes, warnings, costs   │
                 └────────────────────────────┘
```

---

# 📁 **Project Structure**

```
FixIt-AI/
│
├── backend/
│   ├── main.py
│   ├── package.json
│   ├── server.js
│   └── routes/diagnose.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── loader.css
│   ├── script.js
│   └── package.json
│
└── README.md (root)
```

---

# 🛠 **Local Setup (Developer Mode)**

### **Backend (FastAPI + Uvicorn)**

```sh
cd backend
uvicorn main:app --reload --port 8000
```

Test at:

```
http://127.0.0.1:8000/test
```

---

### **Frontend (Static HTML/CSS/JS)**

Just open:

```
frontend/index.html
```

Or use Live Server (Recommended).

---

# 🌍 **Deploying Backend (FastAPI)**

### ⭐ **Render.com**

1. Create new “Web Service"
2. Runtime → Python
3. Start Command:

```
uvicorn main:app --host 0.0.0.0 --port 10000
```

---

# 🧠 **Future Enhancements**

### **1️⃣ AI Large Language Model Upgrade (Sui Move On-Chain Version)**

Integrate an LLM (OpenAI API / Llama 3 / Phi 3) for:

* Advanced natural symptom analysis
* Multi-device hierarchical reasoning
* Conversational troubleshooting
* Dynamic step generation


---

### **2️⃣ Blockchain Evidence Layer (ProofChain)**

Every diagnosis becomes:

* 📝 Signed
* 🔗 Hashed
* 📦 Stored on Sui or Walrus

Ensures tamper-proof repair history.


---

### **3️⃣ Component-Level Device Twin**

Local simulated digital twin of:

* Battery
* CPU temperature
* Fan behavior
* Sensor logs

Used for more accurate predictions.

---

### **4️⃣ Photo / Video Diagnosis (Computer Vision)**

Allow users to upload:

* Screen flicker videos
* Burn marks
* Leaking refrigerator pictures
* Wet motherboard photos

AI adds deeper insights.

---

### **5️⃣ Technician Marketplace (FixIt Pro)**

Users can:

* Contact verified technicians
* Get quotes
* Book repairs
* Track progress
* Pay on-chain
* Leave reviews

This turns FixIt into a **real business**.

---

### **6️⃣ On-Device PWA App**

Offline diagnosis
Installable app
Instant access
Save device history locally

---

### **7️⃣ Multi-Language Support**

Aimed at African + Global markets:

* English
* French
* Twi
* Hausa
* Yoruba
* And most of the various global languages

---

# 🔥 Live Demo: 
# 🎬 Demo Video: 
