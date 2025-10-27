module alu_4bit(
    input [3:0] A,B,
    input [2:0] SEL,
    output reg[4:0] RESULT
);

   always @(*) begin
        case (SEL)
            3'b000: RESULT = A + B;       // Addition
            3'b001: RESULT = A - B;       // Subtraction
            3'b010: RESULT = A & B;       // AND
            3'b011: RESULT = A | B;       // OR
            3'b100: RESULT = A ^ B;       // XOR
            3'b101: RESULT = {1'b0, ~A};  // add 0 as MSB
            3'b110: RESULT = A + 1;       // Increment
            3'b111: RESULT = A - 1;       // Decrement
            default: RESULT = 5'b00000;
        endcase
    end
endmodule
