import * as Blockly from 'blockly/core';

const COLORS = {
  STRUCTURE: '#FFAB19',
  PINS: '#4C97FF',
  CONTROL: '#FFBF00',
  LOGIC: '#59C059',
  SERIAL: '#5CB1D6',
};

export const defineBlocks = () => {
  Blockly.defineBlocksWithJsonArray([
    // Structure: Setup
    {
      "type": "arduino_setup",
      "message0": "setup %1 %2",
      "args0": [
        { "type": "input_dummy" },
        { "type": "input_statement", "name": "DO" }
      ],
      "colour": COLORS.STRUCTURE,
      "tooltip": "Runs once when the program starts",
      "helpUrl": ""
    },
    // Structure: Loop
    {
      "type": "arduino_loop",
      "message0": "loop %1 %2",
      "args0": [
        { "type": "input_dummy" },
        { "type": "input_statement", "name": "DO" }
      ],
      "colour": COLORS.STRUCTURE,
      "tooltip": "Runs over and over forever",
      "helpUrl": ""
    },
    // Pins: set pin [n] to [HIGH/LOW]
    {
      "type": "set_pin",
      "message0": "set pin %1 to %2",
      "args0": [
        { "type": "field_number", "name": "PIN", "value": 13, "min": 0, "max": 13, "precision": 1 },
        {
          "type": "field_dropdown",
          "name": "STATE",
          "options": [
            ["HIGH", "HIGH"],
            ["LOW", "LOW"]
          ]
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": COLORS.PINS,
      "tooltip": "Set digital pin to HIGH or LOW",
      "helpUrl": ""
    },
    // Pins: read digital pin [n]
    {
      "type": "read_pin",
      "message0": "read digital pin %1",
      "args0": [
        { "type": "field_number", "name": "PIN", "value": 2, "min": 0, "max": 13, "precision": 1 }
      ],
      "output": "Boolean",
      "colour": COLORS.PINS,
      "tooltip": "Reads the state of a digital pin",
      "helpUrl": ""
    },
    // Control: delay [ms]
    {
      "type": "delay_ms",
      "message0": "delay %1 ms",
      "args0": [
        { "type": "field_number", "name": "DELAY", "value": 1000, "min": 0, "precision": 1 }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": COLORS.CONTROL,
      "tooltip": "Pause the program for a number of milliseconds",
      "helpUrl": ""
    },
    // Control: repeat [n] times
    {
      "type": "repeat_times",
      "message0": "repeat %1 times %2 %3",
      "args0": [
        { "type": "field_number", "name": "TIMES", "value": 10, "min": 0, "precision": 1 },
        { "type": "input_dummy" },
        { "type": "input_statement", "name": "DO" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": COLORS.CONTROL,
      "tooltip": "Repeat blocks a specified number of times",
      "helpUrl": ""
    },
    // Logic: if [condition] do
    {
      "type": "if_do",
      "message0": "if %1 do %2 %3",
      "args0": [
        { "type": "input_value", "name": "CONDITION", "check": "Boolean" },
        { "type": "input_dummy" },
        { "type": "input_statement", "name": "DO" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": COLORS.LOGIC,
      "tooltip": "If a value is true, then do some statements",
      "helpUrl": ""
    },
    // Serial: print to serial [value]
    {
      "type": "serial_print",
      "message0": "print to serial %1",
      "args0": [
        { "type": "input_value", "name": "VALUE" }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": COLORS.SERIAL,
      "tooltip": "Prints text or numbers to the Serial Monitor",
      "helpUrl": ""
    },
    // String Block for Serial
    {
      "type": "string_text",
      "message0": "\" %1 \"",
      "args0": [
        { "type": "field_input", "name": "TEXT", "text": "Hello" }
      ],
      "output": "String",
      "colour": COLORS.SERIAL,
      "tooltip": "A string of text",
      "helpUrl": ""
    }
  ]);
};
