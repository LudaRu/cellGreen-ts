// declare module "CnvsMap1" {
//     export interface CnvsMap1 {
//         [index: number]: {solid: boolean}[];
//     }
// }
//
// declare var CnvsMap1: {
//     [index: number]: {solid: boolean}[];
// };


// UMD globally available from scripts but requiring import from modules
export = interfaces;
export as namespace interfaces;
declare namespace interfaces {
    export interface CnvsMap1 {
    }
    export interface Identity {
        id: number;
    }
}