# ⚙️ Digital ALU Visualizer

An interactive educational tool and Verilog reference for visualizing core arithmetic and logic operations in digital hardware. Compare **4-bit** and **8-bit** ALU modules, observe results and CPU flags, and simulate actual hardware behavior.

---

## 🌐 Website Landing Image

<img width="1238" height="727" alt="image" src="https://github.com/user-attachments/assets/020ea9b8-0b10-448a-b123-c9357f91ca04" />

---

## 🔢 4-Bit vs 8-Bit ALU Operations

This project supports two ALU architectures:
- **4-bit ALU:** Works with numbers 0–15, simulates minimal processors.
- **8-bit ALU:** Works with numbers 0–255, matching microcontroller/CPU basics.

Both modules support addition, subtraction, AND, OR, XOR, NOT, increment, and decrement operations. The select lines determine which operation is performed.

---

## 🎛️ ALU Control Lines Table

| SEL (Select) | Operation      | Description        |
|--------------|---------------|--------------------|
| `000`        | Addition      | A + B              |
| `001`        | Subtraction   | A - B              |
| `010`        | AND           | A & B              |
| `011`        | OR            | A \| B             |
| `100`        | XOR           | A ^ B              |
| `101`        | NOT (A)       | ~A                 |
| `110`        | Increment     | A + 1              |
| `111`        | Decrement     | A - 1              |

---

## 🧩 How The ALUs Work

**4-Bit ALU**
- Inputs: 4-bit operands (`A`, `B`)
- Output: 5 bits (`RESULT`) for extended range and flags
- Implements standard logic and arithmetic, zero-extend for NOT operation
- Used for teaching and simulation of small-scale digital systems

**8-Bit ALU**
- Inputs: 8-bit operands (`A`, `B`)
- Output: 9 bits (`RESULT`), allowing for overflow/carry visualization
- Mirrors more complex CPU designs
- Handles logic, arithmetic, increment, decrement, and signed operations

---

## 📝 Verilog Modules
1. alu4bit
2. alu8bit

### 4-Bit ALU Code
<img width="1460" height="768" alt="image" src="https://github.com/user-attachments/assets/ef67445f-159e-4599-8c68-818022565180" />

<img width="1007" height="271" alt="image" src="https://github.com/user-attachments/assets/5421486e-7bb9-41b4-85c0-afde74bbd2c4" />



