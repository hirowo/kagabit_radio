//% weight=70 icon="\uf075" color=#00FF00 block="ラジオ"
namespace kagaradio {
    const FM = 1;
    const AM = 2;
    let mode : number;
    let ch : number;

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
        //% blockId=radio_init block="%strip| 初期化"
        //% advanced=true
        INIT6955(): void{
            this.DSP6955WReg(0x00, 0x80);
            this.DSP6955WReg(0x07, 0x31);
            this.DSP6955WReg(0x09, 0x07);
            mode = FM;
       
        }
        //% blockId=radio_setfreq block="%numver| 周波数設定"
        //% advanced=true
        SetFreq(Freq :number): void{
            
            if(mode  == FM){
                ch = ((((Freq*100)-3000)*10)/25);
            }
            else {
                ch = ((Freq*100) / 9)*3;
            }
        }
    }

}

