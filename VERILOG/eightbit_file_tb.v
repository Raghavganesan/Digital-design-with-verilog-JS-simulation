`timescale 1ns/1ps

module tb_binary_calculator;
    reg  [7:0] A, B;
    reg  [2:0] SEL;
    wire [8:0] RESULT;

    // Instantiate the Unit Under Test (UUT)
    binary_cal uut (
        .A(A),
        .B(B),
        .SEL(SEL),
        .RESULT(RESULT)
    );

    initial begin
        // --- GTKWave dump setup ---
        $dumpfile("binary_calculator.vcd");
        $dumpvars(0, tb_binary_calculator);

        // --- Console monitor ---
        $display("Time |  A         |  B         | SEL |  RESULT");
        $display("----------------------------------------------------");
        $monitor("%4t | %b | %b | %b | %b", $time, A, B, SEL, RESULT);

        // --- Stimulus ---
        A = 8'b00000101; B = 8'b00000011; SEL = 3'b000; #10; // ADD
        SEL = 3'b001; #10; // SUB
        SEL = 3'b010; #10; // AND
        SEL = 3'b011; #10; // OR
        SEL = 3'b100; #10; // XOR
        SEL = 3'b101; #10; // NOT
        SEL = 3'b110; #10; // INC
        SEL = 3'b111; #10; // DEC

        #5;
        $finish;
    end
endmodule
