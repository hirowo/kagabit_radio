//% weight=70 icon="\uf075" color=#00FF00 block="ラジオ"
namespace kagaradio {
    export class DSP6955 {
        private DSP6955WReg(addr: number, cmd: number) {
            let buf: Buffer = pins.createBuffer(2);
            buf[0] = addr;
            buf[1] = cmd;

            pins.i2cWriteBuffer(0x20, buf, false);
        }
        private DSP6955RReg(addr: number): number {
            let buf: Buffer = pins.createBuffer(1);

            buf[0] = addr;

            pins.i2cWriteBuffer(0x20, buf, false);

            buf = pins.i2cReadBuffer(0x20, 1, false);

            return buf[0];
        }
        INIT6955(): void{
            this.DSP6955WReg(0x00, 0x80);
            this.DSP6955WReg(0x07, 0x31);
            this.DSP6955WReg(0x09, 0x07);
       
        }
    }

}

