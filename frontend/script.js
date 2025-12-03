// DOM Elements
const diagnoseBtn = document.getElementById("diagnoseBtn");
const resultBox = document.getElementById("result");
const loader = document.getElementById("loader");
const symptomInput = document.getElementById("symptom");
const deviceSelect = document.getElementById("device");
const connectionResult = document.getElementById("connectionResult");

// Backend URL Configuration
const BACKEND_URL = "http://127.0.0.1:8000";

// Event Listeners
diagnoseBtn.addEventListener("click", () => startDiagnosis());
symptomInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        startDiagnosis();
    }
});

// ========== MAIN DIAGNOSIS FUNCTION ==========
async function startDiagnosis() {
    const symptom = (symptomInput.value || "").trim();
    const device = deviceSelect.value || "phone";

    // Basic validation
    if (!symptom) {
        showResult({ error: "Please enter a symptom or problem description." });
        symptomInput.focus();
        return;
    }

    // UI state: loading
    setLoading(true);
    resultBox.hidden = true;

    // Timeout support
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    try {
        const res = await fetch(`${BACKEND_URL}/diagnose`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ device, symptom }),
            signal: controller.signal
        });

        clearTimeout(timeout);

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Server returned ${res.status}: ${errorText}`);
        }

        const payload = await res.json();
        console.log("✅ Diagnosis response:", payload);
        
        // Show the diagnosis result
        showResult({ data: payload });

    } catch (err) {
        console.error("❌ Diagnosis error:", err);
        
        if (err.name === "AbortError") {
            showResult({ error: "Request timed out. The backend might be slow or unresponsive." });
        } else if (err.message.includes("Failed to fetch")) {
            showResult({ error: "Cannot connect to backend. Make sure the server is running at " + BACKEND_URL });
        } else {
            showResult({ error: err.message || "Unknown error occurred" });
        }
    } finally {
        setLoading(false);
    }
}

// ========== CONNECTION TEST FUNCTIONS ==========
async function runConnectionTest() {
    connectionResult.innerHTML = "🔍 Testing backend connection...";
    connectionResult.style.color = "#ffcc00";
    connectionResult.style.background = "rgba(255, 204, 0, 0.1)";

    try {
        const response = await fetch(`${BACKEND_URL}/test`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        connectionResult.innerHTML = `
            <div style="margin-bottom: 8px;">
                ✅ <strong style="color: #2ecc71;">Backend Connected!</strong>
            </div>
            <div style="font-size: 0.9em; opacity: 0.9;">
                <strong>Status:</strong> ${data.status}<br>
                <strong>Time:</strong> ${new Date(data.timestamp).toLocaleTimeString()}<br>
                <strong>Endpoints:</strong> ${data.endpoints.length} available
            </div>
            <div style="margin-top: 10px; font-size: 0.85em; opacity: 0.8;">
                Backend is ready to receive requests at ${BACKEND_URL}
            </div>
        `;
        connectionResult.style.color = "#2ecc71";
        connectionResult.style.background = "rgba(46, 204, 113, 0.1)";
        
    } catch (err) {
        connectionResult.innerHTML = `
            ❌ <strong style="color: #e74c3c;">Connection Failed</strong><br>
            <div style="font-size: 0.9em; margin-top: 5px;">
                ${escapeHtml(err.message)}<br>
                <em>Make sure the backend server is running on port 8000</em>
            </div>
        `;
        connectionResult.style.color = "#e74c3c";
        connectionResult.style.background = "rgba(231, 76, 60, 0.1)";
    }
}

async function runDiagnosisTest() {
    connectionResult.innerHTML = "🔧 Testing diagnosis flow...";
    connectionResult.style.color = "#ffcc00";
    connectionResult.style.background = "rgba(255, 204, 0, 0.1)";

    try {
        const response = await fetch(`${BACKEND_URL}/diagnose/test`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Display the test diagnosis
        connectionResult.innerHTML = `
            <div style="margin-bottom: 8px;">
                ✅ <strong style="color: #2ecc71;">Diagnosis Flow Working!</strong>
            </div>
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; margin-top: 8px; font-size: 0.9em;">
                <strong>${data.diagnosis}</strong><br><br>
                <strong>Steps:</strong>
                <ul style="margin: 5px 0 10px 15px; padding-left: 0;">
                    ${data.steps.map(step => `<li>${escapeHtml(step)}</li>`).join('')}
                </ul>
                <div style="opacity: 0.8;">
                    <strong>Confidence:</strong> ${data.confidence}<br>
                    <strong>Backend Version:</strong> ${data.backendVersion}
                </div>
            </div>
        `;
        connectionResult.style.color = "#2ecc71";
        connectionResult.style.background = "rgba(46, 204, 113, 0.1)";
        
    } catch (err) {
        connectionResult.innerHTML = `
            ❌ <strong style="color: #e74c3c;">Diagnosis Test Failed</strong><br>
            <div style="font-size: 0.9em; margin-top: 5px;">
                ${escapeHtml(err.message)}<br>
                <em>The /diagnose/test endpoint might not be implemented</em>
            </div>
        `;
        connectionResult.style.color = "#e74c3c";
        connectionResult.style.background = "rgba(231, 76, 60, 0.1)";
    }
}

// ========== HELPER FUNCTIONS ==========
function setLoading(on) {
    if (on) {
        loader.classList.add("show");
        loader.style.display = "flex";
        diagnoseBtn.disabled = true;
        diagnoseBtn.textContent = "Summoning… 👻";
    } else {
        loader.classList.remove("show");
        setTimeout(() => {
            loader.style.display = "none";
        }, 350); // wait for fade-out
        diagnoseBtn.disabled = false;
        diagnoseBtn.textContent = "Diagnose Now 🔧";
    }
}


function showResult({ data = null, error = null } = {}) {
    resultBox.hidden = false;
    resultBox.style.opacity = "0";

    setTimeout(() => {
        resultBox.style.transition = "opacity 0.3s";
        resultBox.style.opacity = "1";

        // ----- ERROR CASE -----
        if (error) {
            resultBox.innerHTML = `
                <div class="title" style="color:#e74c3c;">❌ Error</div>
                <div style="padding:10px;background:rgba(231,76,60,0.1);border-radius:6px;">
                    ${escapeHtml(error)}
                </div>
            `;
            return;
        }

        if (!data || typeof data !== "object") {
            resultBox.innerHTML = `
                <div class="title">🩺 Raw Response</div>
                <pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>
            `;
            return;
        }

        // Extract fields
        const title = data.diagnosis || "Diagnosis Result";
        const device = data.device || "";
        const causes = data.causes || [];
        const severity = data.severity || "unknown";
        const difficulty = data.difficulty || "unknown";
        const confidence = data.confidence || "medium";

        // ----------- STEPS FIX (NO MORE 'None available') -----------
        const beginner = data.steps?.beginner || [];
        const intermediate = data.steps?.intermediate || [];
        const advanced = data.steps?.advanced || [];

        // ----------- DO NOT DO -----------
        const dont = data.doNot || [];

        resultBox.innerHTML = `
            <div class="title spooky-title"><span class="emoji">🎃</span> ${escapeHtml(title)}</div>

            <div class="device-info">
                <strong>🛠 Device:</strong> ${escapeHtml(device)}
            </div>

            <div class="confidence-meter">
                <strong>📊 Confidence:</strong>
                <span class="conf-${confidence}">${escapeHtml(confidence.toUpperCase())}</span>
            </div>

            ${causes.length > 0 ? `
                <div class="section">
                    <strong>🔍 Possible Causes:</strong>
                    <ul class="list spooky-list">
                        ${causes.map(c => `<li>🟣 ${escapeHtml(c)}</li>`).join("")}
                    </ul>
                </div>
            ` : ""}

            <div class="section">
                <strong>🔧 Beginner Steps (Quick Wins):</strong>
                <ul class="list spooky-list">
                    ${beginner.map(s => `<li>🟢 ${escapeHtml(s)}</li>`).join("")}
                </ul>

                <strong>🛠 Intermediate Steps:</strong>
                <ul class="list spooky-list">
                    ${intermediate.map(s => `<li>🔵 ${escapeHtml(s)}</li>`).join("")}
                </ul>

                <strong>⚙ Advanced / Technician-Level Steps:</strong>
                <ul class="list spooky-list">
                    ${advanced.map(s => `<li>🔴 ${escapeHtml(s)}</li>`).join("")}
                </ul>
            </div>

            <div class="section danger-box">
                <strong>❌ What NOT to Do:</strong>
                <ul>
                    ${dont.map(d => `<li>⛔ ${escapeHtml(d)}</li>`).join("")}
                </ul>
            </div>

            <div class="section">
                <strong>📅 Lifespan Insight:</strong><br>
                <em>${escapeHtml(data.lifespanNotes || "")}</em>
            </div>

            <div class="section">
                <strong>🔮 Probability Fix Will Work:</strong>
                <span class="probability">${escapeHtml(data.probabilityOfSuccess)}</span>
            </div>

            <div class="meta spooky-meta">
                <strong>⚙ Difficulty:</strong> ${escapeHtml(difficulty)}<br>
                <strong>🧪 Severity:</strong> ${escapeHtml(severity)}<br>
                <strong>💵 Cost Estimate:</strong> ${escapeHtml(data.costEstimate)}<br>
                <strong>👨‍🔧 Technician Needed:</strong> ${data.technicianRequired ? "YES" : "No"}<br>
                <strong>🕯 Spooky Hint:</strong> ${escapeHtml(data.spooky || "")}<br>
                <strong>⏰ Time:</strong> ${new Date(data.timestamp).toLocaleString()}
            </div>
        `;
    }, 10);
}




function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return "";
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ========== INITIALIZATION ==========
function initializeApp() {
    console.log("🔮 FixIt-AI Frontend initialized");
    console.log(`🌐 Backend URL: ${BACKEND_URL}`);
    
    // Set initial UI states
    loader.style.display = "none";
    resultBox.hidden = true;
    
    // Auto-focus on symptom input
    symptomInput.focus();
    
    // Auto-test connection after 1 second (optional)
    setTimeout(() => {
        console.log("🔄 Running auto connection test...");
        runConnectionTest();
    }, 2000);
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', initializeApp);

// Export for testing (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        startDiagnosis, 
        runConnectionTest, 
        runDiagnosisTest,
        showResult 
    };
}