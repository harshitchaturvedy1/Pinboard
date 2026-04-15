# Contributing to Pinboard

Thanks for your interest in contributing to Pinboard! This project is maintained by [STEM Sprouts](https://stemsprouts.org), a 501(c)(3) nonprofit. Every contribution — big or small — helps us bring hardware education to more students.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Development Setup](#development-setup)
- [How to Submit a PR](#how-to-submit-a-pr)
- [Adding Hardware Modules](#adding-hardware-modules)
- [Adding Code Generators](#adding-code-generators)
- [Style Guide](#style-guide)
- [Issue Labels](#issue-labels)

---

## Code of Conduct

Be kind. This project is used in classrooms with students of all ages. We hold contributors to a high standard of respectful, constructive collaboration. Harassment of any kind will not be tolerated.

---

## Ways to Contribute

### 🐛 Bug Reports
Found something broken? [Open a bug report](https://github.com/stemsprouts/pinboard/issues/new?template=bug_report.md). Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS
- Screenshots or console errors if possible

### 💡 Feature Requests
Have an idea? [Open a feature request](https://github.com/stemsprouts/pinboard/issues/new?template=feature_request.md). Check existing issues first to avoid duplicates.

### 🧩 Hardware Module Blocks
Adding support for a new sensor or actuator is one of the most impactful contributions. See [Adding Hardware Modules](#adding-hardware-modules) below.

### 📖 Documentation
Docs live in `/docs`. Improvements to clarity, examples, and tutorials are always welcome.

### 🌍 Translations
The UI strings are centralized in `src/i18n/`. If you're fluent in another language, we'd love your help.

### 🧪 Tests
We're always looking for more test coverage, especially around code generators.

---

## Development Setup

**Requirements:** Node.js 18+, npm 9+

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/pinboard.git
cd pinboard

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Run tests
npm test

# 5. Lint
npm run lint
```

---

## How to Submit a PR

1. **Fork** the repo and create a branch from `main`
   ```bash
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes.** Keep commits focused and descriptive.

3. **Test your changes** — run `npm test` and make sure nothing is broken.

4. **Open a pull request** against `main`. Fill out the PR template completely.

5. A maintainer will review within a few days. Be responsive to feedback.

### PR Guidelines
- One feature or fix per PR
- Include a clear description of *what* and *why*
- Reference any related issues with `Closes #123`
- Screenshots or screen recordings for UI changes are extremely helpful
- Don't bump version numbers — maintainers handle releases

---

## Adding Hardware Modules

Hardware modules are the sensor/actuator library blocks (DHT, Servo, etc.). Each module needs:

### 1. Block Definition (`src/blocks/modules/`)
```typescript
// src/blocks/modules/your_sensor.ts
import * as Blockly from 'blockly';

Blockly.Blocks['module_your_sensor_read'] = {
  init() {
    this.appendDummyInput()
      .appendField('read your sensor on pin')
      .appendField(new Blockly.FieldNumber(2), 'PIN');
    this.setOutput(true, 'Number');
    this.setColour(/* your module color */);
    this.setTooltip('Reads a value from your sensor');
  }
};
```

### 2. C Generator (`src/generators/arduino/modules/`)
```typescript
// Generates valid Arduino C
generators.arduino['module_your_sensor_read'] = (block) => {
  const pin = block.getFieldValue('PIN');
  // Add any required #include at top of file
  return [`yourSensor.read(${pin})`, Order.FUNCTION_CALL];
};
```

### 3. MicroPython Generator (`src/generators/micropython/modules/`)
```typescript
// Generates valid MicroPython
generators.micropython['module_your_sensor_read'] = (block) => {
  const pin = block.getFieldValue('PIN');
  return [`your_sensor.read(${pin})`, Order.FUNCTION_CALL];
};
```

### 4. Register the Module
Add your module to `src/blocks/modules/index.ts` and the module library panel in `src/ui/ModuleLibrary.tsx`.

### 5. Emulator Support (optional but encouraged)
Add a simulated version of your sensor to `src/emulator/sensors/`.

---

## Adding Code Generators

Generators translate Blockly blocks into C or MicroPython. They live in:
- `src/generators/arduino/` — Arduino C
- `src/generators/micropython/` — Raspberry Pi MicroPython

Each generator file exports a function:
```typescript
export function registerGenerators(generators: ArduinoGenerator) {
  generators['block_name'] = (block) => {
    // return [code, Order] for expressions
    // return code string for statements
  };
}
```

---

## Style Guide

- **TypeScript** everywhere. No `any` unless absolutely necessary — prefer explicit types.
- **Prettier** for formatting. Run `npm run format` before committing.
- **ESLint** must pass. Run `npm run lint`.
- Component files: `PascalCase.tsx`
- Utility/logic files: `camelCase.ts`
- Block definition names: `snake_case` (matches Blockly convention)
- Write comments for anything non-obvious, especially in generators

---

## Issue Labels

| Label | Meaning |
|---|---|
| `good first issue` | Great for new contributors |
| `hardware` | Relates to a specific hardware platform |
| `new-module` | Adding a new sensor/actuator block |
| `emulator` | In-browser emulator work |
| `session` | Live classroom session features |
| `generator` | Code generation (C or MicroPython) |
| `ui` | Frontend / visual changes |
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `docs` | Documentation only |

---

## Questions?

Open a [Discussion](https://github.com/stemsprouts/pinboard/discussions) or reach out via the STEM Sprouts contact page.

Thank you for helping make hardware education more accessible. 🙏
