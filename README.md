
```
 ____  _       _                         _
|  _ \(_)_ __ | |__   ___   __ _ _ __ __| |
| |_) | | '_ \| '_ \ / _ \ / _` | '__/ _` |
|  __/| | | | | |_) | (_) | (_| | | | (_| |
|_|   |_|_| |_|_.__/ \___/ \__,_|_|  \__,_|
```

**A block-based IDE for Arduino, Raspberry Pi, and ESP32 — built for the classroom.**

[🚀 Try Pinboard](https://pinboard.stemsprouts.org) · [📖 Docs](https://docs.stemsprouts.org) · [❤️ Donate](https://hcb.hackclub.com/donations/start/stem-sprouts) · [🐛 Report a Bug](https://github.com/STEM-Sprouts/pinboard/issues)

</div>

---

## What is Pinboard?

Pinboard is a **browser-based, block-based coding environment** that lets students write real hardware code — without the setup friction. Built by [STEM Sprouts](https://stemsprouts.org), a 501(c)(3) nonprofit, and used in live classroom sessions to teach IoT and physical computing to beginners.

Think Scratch, but the code actually runs on your Arduino.

```
Drag blocks → See generated C/MicroPython → Flash to hardware → Watch it work
```

No IDE installs. No driver headaches. No "it works on my machine."

---

## ✨ Features

### 🧩 Block-Based Editor
Powered by [Google Blockly](https://developers.google.com/blockly). Drag-and-drop blocks across 7 categories:

| Category | Description |
|---|---|
| **Structure** | `setup()`, `loop()`, boot events |
| **Pins** | Digital/analog read & write |
| **Control** | If/else, loops, delays |
| **Logic** | Comparisons, boolean operations |
| **Math** | Arithmetic, mapping, constraints |
| **Serial** | Print, println, serial monitor |
| **Variables** | Declare, set, get |

### 🔌 Hardware Modules
Add specialized sensor/actuator blocks without writing import boilerplate:

- 🌡️ **DHT11/DHT22** — Temperature & humidity
- 🔆 **Photoresistor** — Light sensing
- 🔘 **Button** — Digital input
- ⚙️ **Servo** — Position control
- *(more being added continuously)*

### 🖥️ Multi-Platform Support

| Platform | Language | Status |
|---|---|---|
| Arduino (Uno, Nano, Mega) | C/C++ | ✅ Stable |
| Raspberry Pi | MicroPython | ✅ Stable |
| ESP32 | C/C++ | 🔧 Coming soon |

Switch between platforms with a single click — the same blocks generate the correct language automatically.

### 🧪 In-Browser Emulator
Test your code **before touching hardware**. The emulator simulates sensor values and pin states directly in the browser. An improved emulator with richer hardware simulation is in active development.

### 🎓 Live Session Mode
Built for classrooms. Instructors generate a **join code** to start a live session. Students connect instantly — no accounts required. Sessions include:

- Real-time participant view
- **Breakout challenges** — groups divided by sensor type work on different problems simultaneously
- Session-scoped code sharing

### 📟 Arduino C Preview
Every block change instantly updates a live C/MicroPython preview at the bottom of the screen. Students see the real code their blocks produce — bridging visual and text-based programming.

---

## 🚀 Getting Started

### Try it instantly
No install needed → **[pinboard.stemsprouts.org](https://pinboard.stemsprouts.org)**

### Run locally

```bash
git clone https://github.com/STEM-Sprouts/pinboard.git
cd pinboard
npm install
npm run dev
```

**Requirements:** Node.js 18+, npm 9+

### Flash to hardware
1. Build your program with blocks
2. Click **Enter Code** to switch to text mode (optional)
3. Click **Run** — Pinboard compiles and flashes over WebSerial
4. Watch the Serial Monitor for output

> **Note:** WebSerial requires Chrome or Edge. Firefox is not currently supported.

---

## 🗂️ Project Structure

```
pinboard/
├── src/
│   ├── blocks/          # Custom Blockly block definitions
│   │   ├── structure/   # Setup, loop, boot blocks
│   │   ├── pins/        # Digital/analog I/O blocks
│   │   ├── modules/     # Sensor & actuator library blocks
│   │   └── serial/      # Serial communication blocks
│   ├── generators/      # Blockly → C / MicroPython code generators
│   ├── emulator/        # In-browser hardware emulator
│   ├── session/         # Live session & join code logic
│   ├── hardware/        # WebSerial flash & serial monitor
│   └── ui/              # React components & layout
├── public/
├── docs/
└── tests/
```

---

## 🤝 Contributing

We welcome contributions! Pinboard is built by a small team and there's always more to build.

**Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a PR.**

Quick ways to help:
- 🐛 [Report bugs](https://github.com/STEM-Sprouts/pinboard/issues/new?template=bug_report.md)
- 💡 [Suggest features](https://github.com/STEM-Sprouts/pinboard/issues/new?template=feature_request.md)
- 🧩 Add new hardware module blocks
- 🌍 Translate the UI
- 📖 Improve documentation

---

## ❤️ Supporting STEM Sprouts

Pinboard is free because STEM Sprouts is donor-funded. If this project is useful to you or your students, please consider donating.

**[→ Donate to STEM Sprouts (501c3, tax-deductible)](https://hcb.hackclub.com/donations/start/stem-sprouts)**

All donations go directly to running programs, hardware kits for students, and infrastructure costs.

---

## 📄 License

MIT © [STEM Sprouts](https://stems-prouts.org)

Pinboard is free and open source. Built with [Google Blockly](https://github.com/google/blockly) and [WebSerial API](https://developer.chrome.com/docs/capabilities/serial).

---

<div align="center">
  <sub>Built with ❤️ by STEM Sprouts — making hardware accessible to every student.</sub>
</div>
