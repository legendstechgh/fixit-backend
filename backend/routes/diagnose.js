export async function diagnose(device, symptom) {
    try {
        const text = (symptom || "").toLowerCase().trim();

        // -----------------------------------------------------
        // 1. DEVICE KNOWLEDGE BASE
        // -----------------------------------------------------
        const RULES = {
            laptop: [
                {
                    keywords: ["not turning on", "won't turn", "no power", "dead"],
                    diagnosis: "Laptop not powering on",
                    causes: [
                        "Faulty power adapter or loose connection",
                        "Drained or dead battery",
                        "Damaged power button circuitry",
                        "Motherboard power failure"
                    ],
                    severity: "high",
                    cost: "$20 – $120",
                    tech: true
                },
                {
                    keywords: ["overheat", "hot", "heating"],
                    diagnosis: "Laptop overheating",
                    causes: [
                        "Dust blocking vents or fans",
                        "Dried thermal paste",
                        "Overloaded background processes",
                        "Blocked air circulation"
                    ],
                    severity: "medium",
                    cost: "$10 – $40",
                    tech: false
                },
                {
                    keywords: ["slow", "lag", "freez"],
                    diagnosis: "Performance slowdown",
                    causes: [
                        "Too many startup programs",
                        "Low RAM",
                        "Fragmented HDD or failing SSD",
                        "Background malware"
                    ],
                    severity: "low",
                    cost: "$0 – $30",
                    tech: false
                }
            ],

            phone: [
                {
                    keywords: ["not charging", "charging", "charge"],
                    diagnosis: "Phone not charging",
                    causes: [
                        "Damaged charging cable or adapter",
                        "Dirty or faulty charging port",
                        "Battery degradation",
                        "Power IC (chip) failure"
                    ],
                    severity: "high",
                    cost: "$5 – $40",
                    tech: true
                },
                {
                    keywords: ["screen", "flicker", "flash"],
                    diagnosis: "Flickering display",
                    causes: [
                        "Loose display connector",
                        "Damaged screen",
                        "Software/driver glitch",
                        "Low battery powering instability"
                    ],
                    severity: "medium",
                    cost: "$20 – $80",
                    tech: false
                }
            ],

            refrigerator: [
                {
                    keywords: ["not cooling", "warm", "hot"],
                    diagnosis: "Cooling failure",
                    causes: [
                        "Low refrigerant gas",
                        "Faulty compressor",
                        "Blocked airflow",
                        "Bad thermostat"
                    ],
                    severity: "high",
                    cost: "$30 – $150",
                    tech: true
                }
            ],

            microwave: [
                {
                    keywords: ["not heating"],
                    diagnosis: "Microwave not heating",
                    causes: [
                        "Faulty magnetron",
                        "Broken diode",
                        "Door switch failure"
                    ],
                    severity: "high",
                    cost: "$20 – $60",
                    tech: true
                }
            ]
        };

        // -----------------------------------------------------
        // 2. MATCHING / SCORING ALGORITHM
        // -----------------------------------------------------
        const deviceRules = RULES[device] || [];
        let bestMatch = null;
        let bestScore = 0;

        for (const rule of deviceRules) {
            let score = 0;

            rule.keywords.forEach(k => {
                if (text.includes(k)) score += 1;
            });

            if (score > bestScore) {
                bestScore = score;
                bestMatch = rule;
            }
        }

        // -----------------------------------------------------
        // 3. FALLBACK DIAGNOSIS (if nothing matches)
        // -----------------------------------------------------
        if (!bestMatch) {
            bestMatch = {
                diagnosis: `${device} issue detected`,
                causes: ["The symptom does not match specific known issues."],
                severity: "medium",
                cost: "Varies",
                tech: false
            };
        }

        // -----------------------------------------------------
        // 4. PROFESSIONAL STEPS (auto-generated)
        // -----------------------------------------------------

        const BEGINNER = [
            "Restart the device and test again",
            "Check all cables, ports, and connections",
            "Ensure the device is not overheating",
            "Try a different power source or outlet"
        ];

        const INTERMEDIATE = [
            "Clean dust from vents and openings",
            "Test with another charger or cable",
            "Disable recently installed apps or drivers",
            "Run built-in diagnostics if available"
        ];

        const ADVANCED = [
            "Inspect internal components for damage",
            "Replace suspected faulty parts",
            "Perform firmware reset or motherboard diagnostics",
            "Check for burnt smell or damaged capacitors"
        ];

        // -----------------------------------------------------
        // 5. SPOOKY MESSAGE
        // -----------------------------------------------------
        const SPOOKY = [
            "🕯 The FixIt spirits whisper: something deeper is wrong…",
            "👻 A hidden glitch lurks within the device.",
            "🔮 The Kiroween oracle senses a hardware disturbance.",
            "🦇 Shadows flicker… your device is cursed with instability."
        ][Math.floor(Math.random() * 4)];

        // -----------------------------------------------------
        // 6. PROBABILITY ENGINE
        // -----------------------------------------------------
        const PROB = {
            low: "85%",
            medium: "65%",
            high: "40%",
            critical: "20%"
        }[bestMatch.severity] || "60%";

        // -----------------------------------------------------
        // 7. FINAL RESPONSE
        // -----------------------------------------------------
        return {
            device,
            symptom,
            diagnosis: bestMatch.diagnosis,
            causes: bestMatch.causes,
            severity: bestMatch.severity,
            costEstimate: bestMatch.cost,
            technicianRequired: bestMatch.tech,

            steps: {
                beginner: BEGINNER,
                intermediate: INTERMEDIATE,
                advanced: ADVANCED
            },

            doNot: [
                "Do NOT open the device while plugged in.",
                "Do NOT continue using the device if you smell burning.",
                "Do NOT poke internal components without proper tools.",
                "Do NOT attempt repairs you're not trained for."
            ],

            lifespanNotes:
                device === "laptop"
                    ? "Laptop thermal paste lasts ~2–4 years before efficiency drops."
                    : device === "phone"
                    ? "Phone batteries degrade after ~500 charge cycles."
                    : "Regular maintenance extends device lifespan.",

            probabilityOfSuccess: PROB,
            difficulty: bestMatch.severity,
            confidence: PROB === "85%" ? "high" : PROB === "65%" ? "medium" : "low",
            spooky: SPOOKY,
            timestamp: Date.now()
        };
    } catch (err) {
        return {
            diagnosis: "AI Engine Error",
            steps: ["Try again later."],
            confidence: "low",
            error: err.message
        };
    }
}
