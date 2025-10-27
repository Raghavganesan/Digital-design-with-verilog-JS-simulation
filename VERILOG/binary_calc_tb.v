`timescale 1ns/1ps

module tb_binary_calculator;
    reg [3:0] A, B;
    reg [2:0] SEL;
    wire [4:0] RESULT;

    binary_cal uut (.A(A), .B(B), .SEL(SEL), .RESULT(RESULT));

    initial begin
        // --- GTKWave dump ---
        $dumpfile("binary_calculator.vcd");      // VCD file name
        $dumpvars(0, tb_binary_calculator);      // dump this TB and everything under it (uut too)

        // Console monitor
        $monitor("Time=%0t | A=%b | B=%b | SEL=%b | RESULT=%b", $time, A, B, SEL, RESULT);

        // Stimulus
        A=4'b0101; B=4'b0011; SEL=3'b000; #10; // ADD
        SEL=3'b001; #10; // SUB
        SEL=3'b010; #10; // AND
        SEL=3'b011; #10; // OR
        SEL=3'b100; #10; // XOR
        SEL=3'b101; #10; // NOT
        SEL=3'b110; #10; // INC
        SEL=3'b111; #10; // DEC

        #1;  // small settle time before finish
        $finish;
    end
endmodule
