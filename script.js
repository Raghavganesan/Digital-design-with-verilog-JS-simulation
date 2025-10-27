/* =========================================================
   DIGITAL ALU VISUALIZER — HARDWARE-ACCURATE VERSION
   ---------------------------------------------------------
   Implements Verilog-style ALU behavior for 4-bit / 8-bit modes.
   Correctly simulates:
   - Bitwise carry chain addition/subtraction
   - Carry, Zero, and Overflow (C_in ⊕ C_out)
   ========================================================= */

/* --------------------------
   1. UPDATE BINARY DISPLAY
---------------------------*/
function updateBinaryDisplay() {
  const mode = document.getElementById("mode").value;
  const bitWidth = mode === "4bit" ? 4 : 8;

  // Use the default value (0) if the input is empty or NaN
  const A = parseInt(document.getElementById("A").value) || 0;
  const B = parseInt(document.getElementById("B").value) || 0;

  const A_bin = A.toString(2).padStart(bitWidth, "0");
  const B_bin = B.toString(2).padStart(bitWidth, "0");

  document.getElementById("A_bin").innerText = A_bin;
  document.getElementById("B_bin").innerText = B_bin;
}

/* =========================================================
   2. CORE CALCULATION: RESULT + FLAGS (Hardware Accurate)
   ========================================================= */
function calcFlagsAndResult(A, B, bitWidth, SEL) {
  const mask = (1 << bitWidth) - 1;
  let B_eff = B;
  let doArithmetic = false;

  // A. DETERMINE EFFECTIVE B (B_eff) for Arithmetic Operations
  if (SEL === "001") { // SUBTRACTION (A - B)
    B_eff = (~B & mask) + 1; // A + (~B + 1)
    doArithmetic = true;
  } else if (SEL === "000") { // ADDITION (A + B)
    doArithmetic = true;
  } else if (SEL === "110") { // INCREMENT (A + 1)
    B_eff = 1;
    doArithmetic = true;
  } else if (SEL === "111") { // DECREMENT (A - 1)
    B_eff = (~1 & mask) + 1; // A + (-1)
    doArithmetic = true;
  }

  // B. BITWISE ADDITION WITH CARRY PROPAGATION
  let result = 0;
  let carry = 0;
  let carryInMSB = 0;
  let carryOutMSB = 0;

  if (doArithmetic) {
    // Mask inputs to ensure they are interpreted correctly within the bitWidth
    const A_masked = A & mask;
    const B_eff_masked = B_eff & mask;

    for (let i = 0; i < bitWidth; i++) {
      const a = (A_masked >> i) & 1;
      const b = (B_eff_masked >> i) & 1;

      if (i === bitWidth - 1) carryInMSB = carry; // carry into MSB (C_N-1)

      const sumBit = a ^ b ^ carry;
      result |= (sumBit << i);

      // Full Adder Carry-Out Logic: (A AND B) OR (A AND Carry-In) OR (B AND Carry-In)
      carry = (a & b) | (a & carry) | (b & carry);

      if (i === bitWidth - 1) carryOutMSB = carry; // carry out of MSB (C_N)
    }
  } else {
    // C. LOGIC OPERATIONS (V and C flags are undefined/cleared)
    switch (SEL) {
      case "010": result = A & B; break; // AND
      case "011": result = A | B; break; // OR
      case "100": result = A ^ B; break; // XOR
      case "101": result = (~A) & mask; break; // NOT
    }
  }

  // D. CALCULATE FLAGS
  const decResult = result & mask;
  const zeroFlag = decResult === 0;
  let carryFlag = 0;
  let overflowFlag = 0;

  if (doArithmetic) {
    // Overflow (V): Carry-in XOR Carry-out of MSB (C_N-1 ⊕ C_N)
    overflowFlag = carryInMSB ^ carryOutMSB;

    // Carry (C): Standard hardware definition is C_out_MSB for both ADD and SUB
    // C=1 for ADD means Unsigned Overflow.
    // C=1 for SUB (A-B) means No Borrow (A >= B).
    carryFlag = carryOutMSB;
  }

  // E. RETURN PACKED RESULT OBJECT
  return {
    result_dec: decResult,
    result_bin: decResult.toString(2).padStart(bitWidth, "0"),
    zeroFlag,
    carryFlag: carryFlag === 1,
    overflowFlag: overflowFlag === 1,
    operation: {
      "000": "Addition", "001": "Subtraction", "010": "AND", "011": "OR",
      "100": "XOR", "101": "NOT (A)", "110": "Increment A", "111": "Decrement A"
    }[SEL]
  };
}

/* =========================================================
   3. MAIN EXECUTION — RUN ALU & UPDATE UI
   ========================================================= */
function runALU() {
  const mode = document.getElementById("mode").value;
  const bitWidth = mode === "4bit" ? 4 : 8;

  const A = parseInt(document.getElementById("A").value) || 0;
  const B = parseInt(document.getElementById("B").value) || 0;
  const SEL = document.getElementById("SEL").value;

  if (isNaN(A) || (SEL !== "101" && isNaN(B))) {
    alert("Please enter valid numbers for A and B");
    return;
  }

  updateBinaryDisplay();

  // Perform operation
  const data = calcFlagsAndResult(A, B, bitWidth, SEL);

  // Signed interpretation helper
  const signed = val => (val & (1 << (bitWidth - 1))) ? val - (1 << bitWidth) : val;
  const signedR = signed(data.result_dec);

  /* =========================================================
     DISPLAY RESULTS
     ========================================================= */
  document.getElementById("resultBox").innerHTML = `
    <b>Mode:</b> ${mode.toUpperCase()}<br>
    <b>Operation:</b> ${data.operation}<br>
    <b>Result (Signed):</b> ${signedR}<br>
    <b>Result (Unsigned):</b> ${data.result_dec}<br>
    <b>Result (Binary):</b> ${data.result_bin}<br>
    <hr style="border:0.5px solid #00ffff33; margin:6px 0;">
    <small style="color:#00ffaa;">Overflow Logic: Hardware (C<sub>in</sub> ⊕ C<sub>out</sub>)</small>
  `;

  // Update Flag LEDs
  document.getElementById("carryFlag").className = data.carryFlag ? "flag on" : "flag off";
  document.getElementById("zeroFlag").className = data.zeroFlag ? "flag on" : "flag off";
  document.getElementById("overflowFlag").className = data.overflowFlag ? "flag on" : "flag off";
}

/* =========================================================
   4. AUTO-UPDATE BINARIES WHEN INPUT CHANGES
   ========================================================= */
// Assuming you have elements with IDs 'A', 'B', and 'mode'
// These lines ensure the binary display updates as the user types
document.getElementById("A").addEventListener("input", updateBinaryDisplay);
document.getElementById("B").addEventListener("input", updateBinaryDisplay);
document.getElementById("mode").addEventListener("change", updateBinaryDisplay);