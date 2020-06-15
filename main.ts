//% weight=70 icon="\uf075" color=#00FF00 block="ラジオ"
namespace kagaradio {
 

   export enum radio_mode{
        //%block="FM"
        FM = 1,
        //%block="AM"
        AM = 2
    }

    //% blockId=radio_Setmode block="mode %r_mode"
    export function Set_mode(r_mode: radio_mode) {

    }    
}

