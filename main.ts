//% weight=70 icon="\uf075" color=#00FF00 block="ラジオ"
namespace kagaradio {
    const FM = 1;
    const AM = 2;
    let mode : number;
    let ch : number;

    export class DSP6955 {
        DSP6955WReg(addr: number, cmd: number) {
            let buf: Buffer = pins.createBuffer(2);
            buf[0] = addr;
            buf[1] = cmd;

            pins.i2cWriteBuffer(0x0, buf, false);
        }
        DSP6955RReg(addr: number): number {
            let buf: Buffer = pins.createBuffer(1);

            buf[0] = addr;

            pins.i2cWriteBuffer(0x20, buf, false);

            buf = pins.i2cReadBuffer(0x20, 1, false);

            return buf[0];
        }
 
    }

    let dsp: DSP6955;
    //% blockId=radio_init block="初期化 "
    export function INIT6955(): void {
        dsp.DSP6955WReg(0x00, 0x80);
        dsp.DSP6955WReg(0x07, 0x31);
        dsp.DSP6955WReg(0x09, 0x07);
        mode = 1;
       
    }

    //% blockId=radio_testfreq block="周波数%Freq"
    //% Freq.min=60.5Freq.max=90.5f
    export function bit(Freq: number) {
        if (mode == FM) {
            ch = ((((Freq * 100) - 3000) * 10) / 25);
        }
        else {
            ch = ((Freq * 100) / 9) * 3;
        }
        dsp.DSP6955WReg(0x03, (ch & 0x00ff));
        dsp.DSP6955WReg(0x02, (ch >> 8));
 //       dsp.DSP6955WReg(0x03, 0x80);
    }     
}

