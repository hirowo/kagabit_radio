//% weight=70 icon="\uf075" color=#00FF00 block="ラジオ"
namespace kagaradio {
 
    let mode : number;
    let ch : number;

    export enum radio_mode{
        //% block = "FM"
        FM = 1,
        //% block = "AM"
        AM =2
    }


    export class DSP6955 {
        DSP6955WReg(addr: number, cmd: number) {
            let buf: Buffer = pins.createBuffer(2);
            buf[0] = addr;
            buf[1] = cmd;
            pins.i2cWriteBuffer(0x10, buf, false);
        }
        DSP6955RReg(addr: number): number {
            let buf: Buffer = pins.createBuffer(1);

            buf[0] = addr;

            pins.i2cWriteBuffer(0x10, buf, false);

            buf = pins.i2cReadBuffer(0x10, 1, false);

            return buf[0];
        }
        DSP6955Tune(mode : number){
          this.DSP6955WReg(0, 0xc0);
          this.DSP6955WReg(0, 0xd0);
          this.DSP6955WReg(0, 0xc0);  
        }
 
    }

    
    //% blockId=radio_init block="ラジオ初期化 "
    export function Init6955(): void {
        let dsp = new DSP6955;
        dsp.DSP6955WReg(0x00, 0x80);
        dsp.DSP6955WReg(0x07, 0x31);
        dsp.DSP6955WReg(0x09, 0x07);
        mode = 1;
       
    }

    //% blockId=radio_sestfreq block="周波数%Freq |MHz"
    //% Freq.min=60.5Freq.max=90.5f
    export function Set_Freq(Freq: number) {
        let dsp = new DSP6955;
        if (mode == 1) {
            ch = ((((Freq * 100) - 3000) * 10) / 25);
        }
        else {
            ch = ((Freq * 100) / 9) * 3;
        }
        dsp.DSP6955WReg(0x03, (ch & 0x00ff));
        dsp.DSP6955WReg(0x02, ((ch >> 8) | 0x40));
        dsp.DSP6955Tune(mode);
    }
    //% blockId=radio_Setmode block="モード%r_mode %v"

    export function Set_mode(r_mode: radio_mode) {
        mode = r_mode;
    }    
}

