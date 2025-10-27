module alu_8bit(
    input [7:0] A,B,
    input [2:0] SEL,
    output reg[8:0] RESULT
);

   always @(*) begin
        case (SEL)
            3'b000: RESULT = A + B;       // Addition
            3'b001: RESULT = A - B;       // Subtraction
            3'b010: RESULT = A & B;       // AND
            3'b011: RESULT = A | B;       // OR
            3'b100: RESULT = A ^ B;       // XOR
            3'b101: RESULT = {1'b0, ~A};    // MSB padding for NOT
            3'b110: RESULT = {1'b0, A + 8'd1};  // ✅ 8-bit decimal 1
            3'b111: RESULT = {1'b0, A - 8'd1};  // ✅ 8-bit decimal 1

            default: RESULT = 9'b000000000;
        endcase
    end
endmodule
