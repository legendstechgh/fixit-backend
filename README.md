
# 🔮 **FixIt AI — Intelligent Device Diagnosis Engine**

*Your spooky-smart, AI-powered repair assistant for any device*
Live Demo → **[https://fixit-ai-kiroween.netlify.app](https://fixit-ai-kiroween.netlify.app)**
Backend API → **[https://fixit-backend-up86.onrender.com](https://fixit-backend-up86.onrender.com)**

---

## 🧩 **1. Problem Statement**

Every year, millions of people experience device failures: phones overheating, laptops slowing down, fridges leaking, microwaves sparking, and countless mysterious malfunctions.
But the real problem isn’t the breakdown…

It’s **not knowing what to do next.**

Most users lack the technical skill to diagnose issues, and technicians often charge inspection fees even before revealing what’s wrong. The result is:

* Anxiety when expensive devices malfunction
* Unnecessary technician visits
* Overpayment for simple issues the user could fix
* Confusion, misinformation, and guesswork

During power fluctuations, poor ventilation, dust, or aging components, devices quietly begin to fail. The signs are there — but users can’t interpret them.

### ⚡ **FixIt AI solves this.**

It **translates symptoms into diagnosis**, breaking down:

* Severity
* Possible causes
* Beginner / Intermediate / Advanced repair steps
* Safety warnings
* Cost estimates
* Whether a technician is required
* Probability the fix will work

In a friendly, spooky, Kiroween-themed interface.

FixIt AI is the **bridge between device confusion and device clarity**.

---

## 🧠 **2. What is FixIt AI?**

FixIt AI is a lightweight, fast, rule-enhanced AI diagnosis engine that intelligently analyzes device symptoms and returns a detailed structured diagnosis.

### 💀 Kiroween Edition

During the hackathon season, FixIt AI has a fun, spooky theme:

* Ghost loader
* Neon purple UI
* Spooky hints
* “Whispering spirits” diagnosis lines

The theme increases user engagement without compromising functionality.

---

## ✨ **3. Live Project Links**

| Component   | Status            | Link                                                                                               |
| ----------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| Frontend    | ✅ Live on Netlify | [https://fixit-ai-kiroween.netlify.app](https://fixit-ai-kiroween.netlify.app)                     |
| Backend     | ✅ Live on Render  | [https://fixit-backend-up86.onrender.com](https://fixit-backend-up86.onrender.com)                 |
| Source Code | GitHub (Frontend) | [https://github.com/legendstechgh/fixit-ai](https://github.com/legendstechgh/fixit-ai) |
| Source Code | GitHub (Backend)  | [https://github.com/legendstechgh/fixit-backend](https://github.com/legendstechgh/fixit-backend)   |

---

## 🚀 **4. Core Features**

### 🩺 **AI-Powered Diagnosis Engine**

* Matches symptoms with device-specific rules
* Produces structured results (severity, difficulty, cost, steps)
* Computes probability of success
* Generates multi-tier repair steps:

  * Beginner
  * Intermediate
  * Advanced / Technician-level

### 💀 **Spooky Kiroween UI**

* Floating ghost loader
* Purple neon animations
* Animated title
* Spooky hints
* Smooth fade-in diagnosis container

### 🛠 **Multi-Device Support**

* Phone
* Laptop
* Refrigerator
* Microwave
* Washing machine
  (extensible in JSON rules)

### 🧪 **Testing Tools**

* Backend connection tester
* AI diagnosis tester
* Automatic timestamping

---

## 🏗 **5. System Architecture**

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

# 🧱 **6. Technical Stack**

### **Frontend**

* HTML 5
* CSS 3
* Custom animations (ghost loader, neon glow)
* Vanilla JavaScript
* Hosted on **Netlify**

### **Backend**

* Python 3
* FastAPI
* Uvicorn
* CORS middleware
* Hosted on **Render**

---

# 🎛 **7. API Documentation**

### **Endpoint: POST /diagnose**

Request:

```json
{
  "device": "laptop",
  "symptom": "keeps overheating and shutting down"
}
```

Response:

```json
{
  "device": "laptop",
  "diagnosis": "Laptop overheating",
  "severity": "high",
  "costEstimate": "$0 - $60",
  "technicianRequired": false,
  "steps": {
      "beginner": [],
      "intermediate": [],
      "advanced": []
  },
  "doNot": [],
  "lifespanNotes": "Typical laptop thermal paste lasts 2–4 years…",
  "probabilityOfSuccess": "65%",
  "difficulty": "hard",
  "confidence": "medium",
  "timestamp": 1733196811836
}
```

---

# 📦 **8. Local Development**

### **Clone repos**

```bash
git clone https://github.com/legendstechgh/fixit-backend
git clone https://github.com/legendstechgh/fixit-ai
```

---

## 🔧 **Backend Setup**

```bash
cd fixit-backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## 💻 **Frontend Setup**

Open `index.html` in browser
or
use Live Server in VS Code or Kiro IDE.

---

# 🚀 **9. Future Enhancements**

This is where you win judges.
These are designed to sound impressive, visionary, but achievable.

### **1. AI Predictive Failure Engine**

Use device symptoms + environmental patterns to predict failures before they happen.

### **2. Technician Marketplace**

Licensed technicians can accept repair jobs.
User gets quotes instantly.

### **3. Voice Diagnosis (Whisper API)**

Users describe issues by speaking.
Works even with heavy accents.

### **4. Augmented Reality Repair Guide**

Point your camera → FixIt overlays arrows showing what to clean, tighten, replace.

### **5. Auto-Part Recommendation System**

AI suggests:

* compatible parts
* prices
* availability
* nearby stores

### **6. Device Health Monitoring (IoT)**

Tiny USB sensors monitor:

* heat
* voltage
* airflow
* battery cycles

AI warns the user before failure.

### **7. AI Chat Mode (Continuous Troubleshooting)**

A guided repair chatbot:

* asks questions
* narrows down the problem
* gives real-time instructions

### **8. Data-Driven Repair Index**

FixIt builds a repair index across devices — a living database of device failure patterns.

### **9. SUI Blockchain Repair History**

Device repair logs become:

* tamper-proof
* portable
* transferable upon resale
  Perfect synergy with your ProofChain experience.

---

# 🏆 **10. Why FixIt AI Stands Out**

FixIt AI isn’t “just another repair suggestion tool.”
It’s:

### ✔ Human-centered

Solves a real, daily problem for normal users.

### ✔ Lightweight & fast

No heavy ML. Instant responses.

### ✔ Extensible

Add new devices in 2 minutes.

### ✔ Cross-platform

Works on any device with a browser.

### ✔ Theme & experience

The Kiroween edition adds personality and user delight.

### ✔ Strong future potential

Easy to scale into:

* tech marketplaces
* predictive analytics
* IoT services
* AI repair agents

---
