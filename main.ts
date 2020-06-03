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

            pins.i2cWriteBuffer(0x0, buf, false);
        }
        private DSP6955RReg(addr: number): number {
            let buf: Buffer = pins.createBuffer(1);

            buf[0] = addr;

            pins.i2cWriteBuffer(0x20, buf, false);

            buf = pins.i2cReadBuffer(0x20, 1, false);

            return buf[0];
        }
        //% blockId=radio_init block ="初期化"
        INIT6955(): void{
            this.DSP6955WReg(0x00, 0x80);
            this.DSP6955WReg(0x07, 0x31);
            this.DSP6955WReg(0x09, 0x07);
            mode = FM;
       
        }
        //% blockId=radio_setfreq block="周波数設定  %f "
         //% Freq.min=0 Freq.max=89
        
        SetFreq(Freq :number): void{
            
            if(mode  == FM){
                ch = ((((Freq*100)-3000)*10)/25);
            }
            else {
                ch = ((Freq*100) / 9)*3;
            }
        }
        //% blockId=radio_testfreq block="|周波数|%dispData|at digit|%bitAddr"
        //% dispData.min=0 dispData.max=9
        //% bitAddr.min=0 bitAddr.max=3
        bit(dispData: number, bitAddr: number) {
            if ((dispData == 0x7f) || ((dispData <= 9) && (bitAddr <= 3))) {
                let segData = 0;

            }
        }        
    }
}

