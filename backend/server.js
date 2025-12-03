import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { diagnose } from "./routes/diagnose.js";

const app = express();
const PORT = 8000;

// ========== MIDDLEWARE ==========
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ========== DATA LOADING ==========
const issuesPath = path.join(process.cwd(), "data", "issues.json");
let issues = [];

try {
    issues = JSON.parse(fs.readFileSync(issuesPath, "utf8"));
    console.log(`✅ Loaded ${issues.length} issues from knowledge base`);
} catch (error) {
    console.error(`❌ Failed to load issues.json: ${error.message}`);
    // Create default issues if file doesn't exist
    issues = [
        {
            "device": "phone",
            "keywords": ["phone", "iphone", "android", "screen", "battery", "charge"],
            "diagnosis": "Phone display or power issue",
            "fixes": [
                "Check charging cable and adapter",
                "Force restart the device",
                "Check for software updates",
                "Test in safe mode to rule out apps",
                "Check for physical damage to screen"
            ],
            "difficulty": "easy"
        },
        {
            "device": "laptop", 
            "keywords": ["laptop", "computer", "keyboard", "slow", "overheat", "boot"],
            "diagnosis": "Laptop performance or hardware issue",
            "fixes": [
                "Check power connection and battery",
                "Run disk cleanup and defragmentation",
                "Update drivers and operating system",
                "Clean vents to prevent overheating",
                "Run hardware diagnostics"
            ],
            "difficulty": "medium"
        }
    ];
}


// ========== API ENDPOINTS ==========

// Health check endpoint
app.get("/", (req, res) => {
    res.json({
        message: "🔧 FixIt-AI Backend API",
        version: "1.0.0",
        status: "operational",
        timestamp: new Date().toISOString(),
        endpoints: {
            health: "GET /",
            diagnose: "POST /diagnose",
            test: "GET /test",
            testDiagnose: "POST /diagnose/test",
            testSymptoms: "GET /test-diagnoses",
            allIssues: "GET /issues"
        },
        stats: {
            totalIssues: issues.length,
            supportedDevices: [...new Set(issues.map(i => i.device))],
            serverTime: new Date().toLocaleTimeString()
        }
    });
});

// Connection test endpoint
app.get("/test", (req, res) => {
    res.json({
        status: "connected",
        message: "FixIt-AI Backend is ready",
        timestamp: new Date().toISOString(),
        serverInfo: {
            nodeVersion: process.version,
            platform: process.platform,
            uptime: process.uptime()
        },
        endpoints: [
            { method: "GET", path: "/", description: "Health check" },
            { method: "POST", path: "/diagnose", description: "Get diagnosis for a symptom" },
            { method: "GET", path: "/test", description: "Connection test" },
            { method: "POST", path: "/diagnose/test", description: "Test diagnosis endpoint" },
            { method: "GET", path: "/test-diagnoses", description: "Get test symptoms for verification" },
            { method: "GET", path: "/issues", description: "Get all issues from knowledge base" }
        ]
    });
});

// Test symptoms endpoint
app.get("/test-diagnoses", (req, res) => {
    const testSymptoms = [
        { symptom: "phone won't charge", expectedDevice: "phone", description: "Tests phone power issues" },
        { symptom: "laptop is overheating", expectedDevice: "laptop", description: "Tests laptop cooling issues" },
        { symptom: "fridge not cooling", expectedDevice: "refrigerator", description: "Tests refrigerator cooling" },
        { symptom: "washing machine leaking", expectedDevice: "washing machine", description: "Tests washing machine drainage" },
        { symptom: "microwave not heating food", expectedDevice: "microwave", description: "Tests microwave heating element" }
    ];
    
    res.json({
        message: "Test symptoms for frontend-backend verification",
        symptoms: testSymptoms,
        instructions: "Use POST /diagnose with { \"symptom\": \"test symptom\" }",
        knowledgeBase: {
            totalIssues: issues.length,
            devices: [...new Set(issues.map(i => i.device))]
        },
        timestamp: new Date().toISOString()
    });
});

// Test diagnosis endpoint
app.post("/diagnose/test", (req, res) => {
    console.log("🧪 Test diagnosis requested");
    
    const testResponse = {
        device: "test-device",
        diagnosis: "✅ Connection Test Successful!",
        steps: [
            "Frontend successfully sent request to backend ✓",
            "Backend received and processed the request ✓", 
            "Backend is returning this structured response ✓",
            "Frontend should parse and display this correctly ✓"
        ],
        difficulty: "easy",
        confidence: "high",
        timestamp: new Date().toISOString(),
        backendVersion: "1.0.0",
        note: "This is a test response to verify frontend-backend communication",
        testInfo: {
            requestBody: req.body,
            headers: req.headers,
            serverTime: new Date().toLocaleTimeString()
        }
    };
    
    res.json(testResponse);
});

// Get all issues
app.get("/issues", (req, res) => {
    res.json({
        count: issues.length,
        issues: issues,
        timestamp: new Date().toISOString()
    });
});

// Main diagnosis endpoint
app.post("/diagnose", async (req, res) => {
    try {
        const { symptom, device } = req.body;
        
        // Validate input
        if (!symptom) {
            return res.status(400).json({ 
                error: "Symptom is required",
                message: "Please provide a symptom description",
                example: { "symptom": "my phone won't charge" }
            });
        }

        console.log(`🩺 Diagnosis requested: "${symptom}"${device ? ` for device: ${device}` : ''}`);
        
        // Get diagnosis
        const diagnosis = await diagnose(symptom, device);
        
        // Log successful diagnosis
        console.log(`✅ Diagnosis complete: ${diagnosis.diagnosis} (confidence: ${diagnosis.confidence})`);
        
        // Return diagnosis
        res.json(diagnosis);
        
    } catch (err) {
        console.error("❌ Diagnosis error:", err);
        res.status(500).json({ 
            error: "Diagnosis failed", 
            details: err.message,
            timestamp: new Date().toISOString(),
            suggestion: "Check the symptom format and try again"
        });
    }
});

// ========== ERROR HANDLING ==========
app.use((req, res) => {
    res.status(404).json({
        error: "Endpoint not found",
        message: `The requested endpoint ${req.method} ${req.path} does not exist`,
        availableEndpoints: [
            "GET  /",
            "GET  /test",
            "GET  /test-diagnoses", 
            "GET  /issues",
            "POST /diagnose",
            "POST /diagnose/test"
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("🔥 Server error:", err);
    res.status(500).json({
        error: "Internal server error",
        message: err.message,
        timestamp: new Date().toISOString()
    });
});

// ========== START SERVER ==========
app.listen(PORT, () => {
    console.log(`\n🎯 FixIt-AI Backend Server`);
    console.log(`===============================`);
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log(`📁 Knowledge base: ${issues.length} issues loaded`);
    console.log(`🔗 Frontend URL: http://127.0.0.1:${PORT}`);
    console.log(`📝 Test endpoints:`);
    console.log(`   • GET  /              - Health check`);
    console.log(`   • GET  /test          - Connection test`);
    console.log(`   • POST /diagnose      - Main diagnosis endpoint`);
    console.log(`   • POST /diagnose/test - Test diagnosis flow`);
    console.log(`\n💡 Tip: Run the frontend and click "Test Connection" to verify`);
    console.log(`===============================\n`);
});

// Export for testing
export { app, diagnose};